//! Color Vision Deficiency (Daltonism) Simulation Engine
//!
//! Simulates how color palettes and UI components appear to users with
//! Protanopia, Deuteranopia, Tritanopia, and Achromatopsia using the
//! Machado / Brettel spectral cone response matrices.

use super::oklch::Rgb;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub enum CvdType {
    Protanopia,    // Red deficiency (~1% of males)
    Deuteranopia,  // Green deficiency (~5% of males)
    Tritanopia,    // Blue deficiency (~0.01% of population)
    Achromatopsia, // Complete color blindness (monochromacy)
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CvdSimulationResult {
    pub original_hex: String,
    pub cvd_type: CvdType,
    pub simulated_hex: String,
}

/// Simulates color appearance under a specific Color Vision Deficiency type
pub fn simulate_cvd(rgb: &Rgb, cvd: CvdType) -> Rgb {
    let (r_lin, g_lin, b_lin) = rgb.to_linear();

    // 3x3 Transformation matrices in linear sRGB space
    let (r_sim, g_sim, b_sim) = match cvd {
        CvdType::Protanopia => (
            0.56667 * r_lin + 0.43333 * g_lin + 0.0 * b_lin,
            0.55833 * r_lin + 0.44167 * g_lin + 0.0 * b_lin,
            0.0 * r_lin + 0.24167 * g_lin + 0.75833 * b_lin,
        ),
        CvdType::Deuteranopia => (
            0.625 * r_lin + 0.375 * g_lin + 0.0 * b_lin,
            0.700 * r_lin + 0.300 * g_lin + 0.0 * b_lin,
            0.0 * r_lin + 0.300 * g_lin + 0.700 * b_lin,
        ),
        CvdType::Tritanopia => (
            0.950 * r_lin + 0.050 * g_lin + 0.0 * b_lin,
            0.0 * r_lin + 0.43333 * g_lin + 0.56667 * b_lin,
            0.0 * r_lin + 0.475 * g_lin + 0.525 * b_lin,
        ),
        CvdType::Achromatopsia => {
            let gray = 0.2126 * r_lin + 0.7152 * g_lin + 0.0722 * b_lin;
            (gray, gray, gray)
        }
    };

    Rgb::from_linear(r_sim, g_sim, b_sim)
}

/// Helper returning a complete simulation result struct
pub fn audit_cvd(rgb: &Rgb, cvd: CvdType) -> CvdSimulationResult {
    let sim = simulate_cvd(rgb, cvd);
    CvdSimulationResult {
        original_hex: rgb.to_hex(),
        cvd_type: cvd,
        simulated_hex: sim.to_hex(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_achromatopsia_is_grayscale() {
        let red = Rgb::new(255, 0, 0);
        let sim = simulate_cvd(&red, CvdType::Achromatopsia);
        assert_eq!(sim.r, sim.g);
        assert_eq!(sim.g, sim.b);
    }
}
