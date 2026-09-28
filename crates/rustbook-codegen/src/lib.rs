//! Rustbook Codegen Engine
//!
//! Compiles design tokens into target code for multiple frontend and mobile platforms.

use rustbook_core::tokens::ThemeTokens;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
pub enum TargetPlatform {
    CssCustomProperties,
    Tailwind,
    SwiftUi,
    JetpackCompose,
    FlutterDart,
}

pub fn compile_tokens(tokens: &ThemeTokens, target: TargetPlatform) -> String {
    match target {
        TargetPlatform::CssCustomProperties => tokens.to_css_variables(),
        TargetPlatform::Tailwind => tokens.to_tailwind_theme(),
        TargetPlatform::SwiftUi => tokens.to_swift_colors(),
        TargetPlatform::JetpackCompose => tokens.to_kotlin_compose(),
        TargetPlatform::FlutterDart => tokens.to_flutter_dart(),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_codegen_all_targets() {
        let tokens = ThemeTokens::default();

        let css = compile_tokens(&tokens, TargetPlatform::CssCustomProperties);
        assert!(css.contains("--color-primary"));

        let swift = compile_tokens(&tokens, TargetPlatform::SwiftUi);
        assert!(swift.contains("static let brandPrimary"));

        let kotlin = compile_tokens(&tokens, TargetPlatform::JetpackCompose);
        assert!(kotlin.contains("val BrandPrimary"));

        let dart = compile_tokens(&tokens, TargetPlatform::FlutterDart);
        assert!(dart.contains("static const Color primary"));
    }
}
