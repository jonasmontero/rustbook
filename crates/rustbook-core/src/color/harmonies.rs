//! Color Harmonies & Tonal Palette Generator
//!
//! Generates perceptually uniform 11-step tonal scales (50 to 950) and
//! geometric color harmonies (complementary, analogous, triadic, tetradic)
//! in OKLCH space.

use super::oklch::{Oklch, Rgb};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TonalStep {
    pub step: u16,      // 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
    pub hex: String,
    pub lightness: f64,
    pub chroma: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct TonalPalette {
    pub base_hex: String,
    pub hue: f64,
    pub steps: Vec<TonalStep>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GeometricHarmonies {
    pub base_hex: String,
    pub complementary_hex: String,
    pub analogous_1_hex: String,
    pub analogous_2_hex: String,
    pub triadic_1_hex: String,
    pub triadic_2_hex: String,
    pub split_comp_1_hex: String,
    pub split_comp_2_hex: String,
}

/// Generates a standardized 11-step design system tonal palette (50-950)
pub fn generate_tonal_palette(base: &Rgb) -> TonalPalette {
    let oklch = base.to_oklch();
    let target_hue = oklch.h;
    let base_chroma = oklch.c.min(0.26); // Guard maximum chroma

    // Standardized target lightnesses for design system scales
    let scale_definitions: [(u16, f64, f64); 11] = [
        (50, 0.97, 0.15),  // Very light tint
        (100, 0.93, 0.30),
        (200, 0.86, 0.55),
        (300, 0.77, 0.75),
        (400, 0.68, 0.90),
        (500, 0.59, 1.00), // Mid tone (Reference)
        (600, 0.50, 0.95),
        (700, 0.41, 0.85),
        (800, 0.32, 0.70),
        (900, 0.23, 0.50),
        (950, 0.15, 0.35), // Deep dark shade
    ];

    let steps = scale_definitions
        .iter()
        .map(|&(step, l, c_mult)| {
            let c = base_chroma * c_mult;
            let step_oklch = Oklch::new(l, c, target_hue);
            TonalStep {
                step,
                hex: step_oklch.to_hex(),
                lightness: (l * 100.0).round() / 100.0,
                chroma: (c * 1000.0).round() / 1000.0,
            }
        })
        .collect();

    TonalPalette {
        base_hex: base.to_hex(),
        hue: (target_hue * 10.0).round() / 10.0,
        steps,
    }
}

/// Generates geometric color harmonies using hue angle offsets in OKLCH
pub fn generate_harmonies(base: &Rgb) -> GeometricHarmonies {
    let oklch = base.to_oklch();

    let offset_hue = |deg: f64| -> String {
        let mut new_h = (oklch.h + deg) % 360.0;
        if new_h < 0.0 {
            new_h += 360.0;
        }
        Oklch::new(oklch.l, oklch.c, new_h).to_hex()
    };

    GeometricHarmonies {
        base_hex: base.to_hex(),
        complementary_hex: offset_hue(180.0),
        analogous_1_hex: offset_hue(30.0),
        analogous_2_hex: offset_hue(-30.0),
        triadic_1_hex: offset_hue(120.0),
        triadic_2_hex: offset_hue(240.0),
        split_comp_1_hex: offset_hue(150.0),
        split_comp_2_hex: offset_hue(210.0),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_tonal_palette_generation() {
        let brand = Rgb::from_hex("#2563EB").unwrap();
        let palette = generate_tonal_palette(&brand);

        assert_eq!(palette.steps.len(), 11);
        assert_eq!(palette.steps[0].step, 50);
        assert_eq!(palette.steps[10].step, 950);

        // Lightness must decrease monotonically
        for i in 0..palette.steps.len() - 1 {
            assert!(palette.steps[i].lightness > palette.steps[i + 1].lightness);
        }
    }
}
