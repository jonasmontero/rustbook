//! OKLCH & Oklab Perceptual Color Space Engine
//!
//! Implements exact mathematical transformations between linear sRGB,
//! Oklab (L, a, b), and OKLCH (Lightness, Chroma, Hue) based on
//! Björn Ottosson's perceptual color model.

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub struct Rgb {
    pub r: u8,
    pub g: u8,
    pub b: u8,
}

#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub struct Oklab {
    pub l: f64, // 0.0 to 1.0 (Lightness)
    pub a: f64, // Green (-) to Red (+)
    pub b: f64, // Blue (-) to Yellow (+)
}

#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub struct Oklch {
    pub l: f64, // 0.0 to 1.0 (Perceived Lightness)
    pub c: f64, // >= 0.0 (Chroma / Saturation)
    pub h: f64, // 0.0 to 360.0 (Hue angle in degrees)
}

impl Rgb {
    pub fn new(r: u8, g: u8, b: u8) -> Self {
        Self { r, g, b }
    }

    pub fn from_hex(hex: &str) -> Option<Self> {
        let clean = hex.trim().trim_start_matches('#');
        if clean.len() != 6 {
            return None;
        }
        let r = u8::from_str_radix(&clean[0..2], 16).ok()?;
        let g = u8::from_str_radix(&clean[2..4], 16).ok()?;
        let b = u8::from_str_radix(&clean[4..6], 16).ok()?;
        Some(Self { r, g, b })
    }

    pub fn to_hex(&self) -> String {
        format!("#{:02X}{:02X}{:02X}", self.r, self.g, self.b)
    }

    pub fn to_linear(&self) -> (f64, f64, f64) {
        let to_lin = |c: u8| -> f64 {
            let v = c as f64 / 255.0;
            if v <= 0.04045 {
                v / 12.92
            } else {
                ((v + 0.055) / 1.055).powf(2.4)
            }
        };
        (to_lin(self.r), to_lin(self.g), to_lin(self.b))
    }

    pub fn from_linear(r: f64, g: f64, b: f64) -> Self {
        let from_lin = |v: f64| -> u8 {
            let clamped = v.clamp(0.0, 1.0);
            let srgb = if clamped <= 0.0031308 {
                12.92 * clamped
            } else {
                1.055 * clamped.powf(1.0 / 2.4) - 0.055
            };
            (srgb * 255.0).round().clamp(0.0, 255.0) as u8
        };
        Self {
            r: from_lin(r),
            g: from_lin(g),
            b: from_lin(b),
        }
    }

    pub fn to_oklab(&self) -> Oklab {
        let (r, g, b) = self.to_linear();

        let l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
        let m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
        let s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

        let l_ = l.cbrt();
        let m_ = m.cbrt();
        let s_ = s.cbrt();

        Oklab {
            l: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
            a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
            b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_,
        }
    }

    pub fn to_oklch(&self) -> Oklch {
        self.to_oklab().to_oklch()
    }
}

impl Oklab {
    pub fn to_rgb(&self) -> Rgb {
        let l_ = self.l + 0.3963377774 * self.a + 0.2158037573 * self.b;
        let m_ = self.l - 0.1055613458 * self.a - 0.0638541728 * self.b;
        let s_ = self.l - 0.0894841775 * self.a - 1.2914855480 * self.b;

        let l = l_ * l_ * l_;
        let m = m_ * m_ * m_;
        let s = s_ * s_ * s_;

        let r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
        let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
        let b = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

        Rgb::from_linear(r, g, b)
    }

    pub fn to_oklch(&self) -> Oklch {
        let c = (self.a * self.a + self.b * self.b).sqrt();
        let mut h = self.b.atan2(self.a).to_degrees();
        if h < 0.0 {
            h += 360.0;
        }
        Oklch { l: self.l, c, h }
    }
}

impl Oklch {
    pub fn new(l: f64, c: f64, h: f64) -> Self {
        let h_norm = if h < 0.0 {
            (h % 360.0) + 360.0
        } else {
            h % 360.0
        };
        Self {
            l: l.clamp(0.0, 1.0),
            c: c.max(0.0),
            h: h_norm,
        }
    }

    pub fn to_oklab(&self) -> Oklab {
        let rad = self.h.to_radians();
        Oklab {
            l: self.l,
            a: self.c * rad.cos(),
            b: self.c * rad.sin(),
        }
    }

    pub fn to_rgb(&self) -> Rgb {
        self.to_oklab().to_rgb()
    }

    pub fn to_hex(&self) -> String {
        self.to_rgb().to_hex()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_hex_roundtrip() {
        let hex = "#2563EB";
        let rgb = Rgb::from_hex(hex).unwrap();
        assert_eq!(rgb.r, 0x25);
        assert_eq!(rgb.g, 0x63);
        assert_eq!(rgb.b, 0xEB);
        assert_eq!(rgb.to_hex(), "#2563EB");
    }

    #[test]
    fn test_oklch_conversion() {
        let rgb = Rgb::new(37, 99, 235); // #2563EB
        let oklch = rgb.to_oklch();
        assert!(oklch.l > 0.4 && oklch.l < 0.6);
        assert!(oklch.c > 0.15);

        let reconstructed = oklch.to_rgb();
        // Allow at most 1 unit rounding difference
        assert!((reconstructed.r as i32 - rgb.r as i32).abs() <= 1);
        assert!((reconstructed.g as i32 - rgb.g as i32).abs() <= 1);
        assert!((reconstructed.b as i32 - rgb.b as i32).abs() <= 1);
    }
}
