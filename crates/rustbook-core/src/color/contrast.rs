//! Contrast Auditing Engine: WCAG 2.1 and APCA (Advanced Perceptual Contrast Algorithm)
//!
//! Provides mathematically accurate contrast calculations and compliance checking
//! for accessible design systems.

use super::oklch::Rgb;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ContrastReport {
    pub foreground_hex: String,
    pub background_hex: String,
    pub wcag_ratio: f64,
    pub wcag_aa_normal: bool,   // >= 4.5:1
    pub wcag_aa_large: bool,    // >= 3.0:1
    pub wcag_aaa_normal: bool,  // >= 7.0:1
    pub wcag_aaa_large: bool,   // >= 4.5:1
    pub apca_lc: f64,           // Lightness Contrast (Lc value)
    pub apca_body_text: bool,   // |Lc| >= 75
    pub apca_large_text: bool,  // |Lc| >= 60
    pub apca_ui_element: bool,  // |Lc| >= 45
}

/// Calculate relative luminance according to WCAG 2.1 specifications (0.0 to 1.0)
pub fn relative_luminance(rgb: &Rgb) -> f64 {
    let (r, g, b) = rgb.to_linear();
    0.2126 * r + 0.7152 * g + 0.0722 * b
}

/// Calculate WCAG 2.1 contrast ratio between two colors (1.0 to 21.0)
pub fn wcag_contrast_ratio(fg: &Rgb, bg: &Rgb) -> f64 {
    let l1 = relative_luminance(fg);
    let l2 = relative_luminance(bg);

    let lighter = l1.max(l2);
    let darker = l1.min(l2);

    (lighter + 0.05) / (darker + 0.05)
}

/// Calculate APCA Lightness Contrast (Lc) value based on human perceptual vision
pub fn apca_contrast(fg: &Rgb, bg: &Rgb) -> f64 {
    // APCA 0.98G power curve constants
    let _main_trc = 2.4;
    let norm_bg = 0.56;
    let norm_txt = 0.57;
    let rev_bg = 0.62;
    let rev_txt = 0.65;
    let blk_thresh = 0.022;
    let blk_clamp = 1.414;

    let (r_txt, g_txt, b_txt) = fg.to_linear();
    let (r_bg, g_bg, b_bg) = bg.to_linear();

    // Soft clamp black level
    let y_txt = 0.2126729 * r_txt + 0.7151522 * g_txt + 0.0721750 * b_txt;
    let y_bg = 0.2126729 * r_bg + 0.7151522 * g_bg + 0.0721750 * b_bg;

    let y_txt_c = if y_txt > blk_thresh {
        y_txt
    } else {
        y_txt + (blk_thresh - y_txt).powf(blk_clamp)
    };

    let y_bg_c = if y_bg > blk_thresh {
        y_bg
    } else {
        y_bg + (blk_thresh - y_bg).powf(blk_clamp)
    };

    // Dark text on light background (positive contrast)
    if y_bg_c > y_txt_c {
        let sapc = (y_bg_c.powf(norm_bg) - y_txt_c.powf(norm_txt)) * 1.14;
        if sapc < 0.1 {
            0.0
        } else {
            (sapc - 0.027) * 100.0
        }
    } else {
        // Light text on dark background (negative contrast)
        let sapc = (y_bg_c.powf(rev_bg) - y_txt_c.powf(rev_txt)) * 1.14;
        if sapc > -0.1 {
            0.0
        } else {
            (sapc + 0.027) * 100.0
        }
    }
}

/// Generate a complete accessibility compliance report for foreground on background
pub fn audit_contrast(fg: &Rgb, bg: &Rgb) -> ContrastReport {
    let ratio = wcag_contrast_ratio(fg, bg);
    let apca_lc = apca_contrast(fg, bg);
    let apca_abs = apca_lc.abs();

    ContrastReport {
        foreground_hex: fg.to_hex(),
        background_hex: bg.to_hex(),
        wcag_ratio: (ratio * 100.0).round() / 100.0,
        wcag_aa_normal: ratio >= 4.5,
        wcag_aa_large: ratio >= 3.0,
        wcag_aaa_normal: ratio >= 7.0,
        wcag_aaa_large: ratio >= 4.5,
        apca_lc: (apca_lc * 10.0).round() / 10.0,
        apca_body_text: apca_abs >= 75.0,
        apca_large_text: apca_abs >= 60.0,
        apca_ui_element: apca_abs >= 45.0,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_black_on_white() {
        let black = Rgb::new(0, 0, 0);
        let white = Rgb::new(255, 255, 255);

        let report = audit_contrast(&black, &white);
        assert_eq!(report.wcag_ratio, 21.0);
        assert!(report.wcag_aa_normal);
        assert!(report.wcag_aaa_normal);
        assert!(report.apca_body_text);
    }

    #[test]
    fn test_skycompare_brand_blue() {
        let brand_blue = Rgb::from_hex("#2563EB").unwrap();
        let white = Rgb::from_hex("#FFFFFF").unwrap();

        let report = audit_contrast(&white, &brand_blue);
        assert!(report.wcag_ratio >= 4.5); // Accessible for UI & large text
    }
}
