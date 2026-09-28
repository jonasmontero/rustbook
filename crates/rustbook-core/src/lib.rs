//! Rustbook Core Engine
//!
//! High-performance design tokens compiler, OKLCH perceptual color math,
//! APCA contrast auditing, and WebAssembly bindings.

pub mod color;
pub mod tokens;
pub mod wasm;

pub use color::*;
pub use tokens::*;
pub use wasm::*;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_full_pipeline_verification() {
        let base_blue = Rgb::from_hex("#2563EB").unwrap();

        // 1. OKLCH Perceptual conversion
        let oklch = base_blue.to_oklch();
        assert!(oklch.l > 0.0 && oklch.l < 1.0);

        // 2. 11-Step Tonal Scale
        let tonal = generate_tonal_palette(&base_blue);
        assert_eq!(tonal.steps.len(), 11);

        // 3. APCA and WCAG Contrast
        let white = Rgb::new(255, 255, 255);
        let contrast = audit_contrast(&white, &base_blue);
        assert!(contrast.wcag_ratio > 4.5);

        // 4. Multi-target compilation
        let tokens = ThemeTokens::default();
        let css = tokens.to_css_variables();
        assert!(css.contains("--color-primary: #2563EB"));
        assert!(css.contains("--radius-md: 8px"));
    }
}
