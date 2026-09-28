//! WebAssembly Interface Bindings for Rustbook Core Engine
//!
//! Provides zero-overhead JS/TS bridges to the Rust color science,
//! APCA contrast engine, and design token generators.

use crate::color::{
    audit_contrast, audit_cvd, generate_harmonies, generate_tonal_palette, CvdType, Rgb,
};
use crate::tokens::ThemeTokens;
use wasm_bindgen::prelude::*;

/// Calculates WCAG 2.1 ratio and APCA score in microseconds
#[wasm_bindgen]
pub fn rustbook_calc_contrast(fg_hex: &str, bg_hex: &str) -> Result<String, JsValue> {
    let fg = Rgb::from_hex(fg_hex)
        .ok_or_else(|| JsValue::from_str(&format!("Invalid foreground hex: {}", fg_hex)))?;
    let bg = Rgb::from_hex(bg_hex)
        .ok_or_else(|| JsValue::from_str(&format!("Invalid background hex: {}", bg_hex)))?;

    let report = audit_contrast(&fg, &bg);
    serde_json::to_string(&report)
        .map_err(|e| JsValue::from_str(&format!("Serialization error: {}", e)))
}

/// Generates an 11-step perceptual tonal scale (50-950) in OKLCH
#[wasm_bindgen]
pub fn rustbook_generate_tonal_palette(base_hex: &str) -> Result<String, JsValue> {
    let base = Rgb::from_hex(base_hex)
        .ok_or_else(|| JsValue::from_str(&format!("Invalid base hex: {}", base_hex)))?;

    let palette = generate_tonal_palette(&base);
    serde_json::to_string(&palette)
        .map_err(|e| JsValue::from_str(&format!("Serialization error: {}", e)))
}

/// Simulates color appearance for Color Vision Deficiency (Daltonism)
#[wasm_bindgen]
pub fn rustbook_simulate_cvd(hex: &str, cvd_type_str: &str) -> Result<String, JsValue> {
    let rgb = Rgb::from_hex(hex)
        .ok_or_else(|| JsValue::from_str(&format!("Invalid hex: {}", hex)))?;

    let cvd = match cvd_type_str.to_lowercase().as_str() {
        "protanopia" => CvdType::Protanopia,
        "deuteranopia" => CvdType::Deuteranopia,
        "tritanopia" => CvdType::Tritanopia,
        "achromatopsia" => CvdType::Achromatopsia,
        _ => return Err(JsValue::from_str("Invalid CVD type (use protanopia, deuteranopia, tritanopia, achromatopsia)")),
    };

    let result = audit_cvd(&rgb, cvd);
    serde_json::to_string(&result)
        .map_err(|e| JsValue::from_str(&format!("Serialization error: {}", e)))
}

/// Generates geometric color harmonies (complementary, analogous, triadic)
#[wasm_bindgen]
pub fn rustbook_generate_harmonies(base_hex: &str) -> Result<String, JsValue> {
    let base = Rgb::from_hex(base_hex)
        .ok_or_else(|| JsValue::from_str(&format!("Invalid base hex: {}", base_hex)))?;

    let harmonies = generate_harmonies(&base);
    serde_json::to_string(&harmonies)
        .map_err(|e| JsValue::from_str(&format!("Serialization error: {}", e)))
}

/// Compiles ThemeTokens JSON schema directly to CSS variables
#[wasm_bindgen]
pub fn rustbook_compile_css(tokens_json: &str) -> Result<String, JsValue> {
    let tokens: ThemeTokens = serde_json::from_str(tokens_json)
        .map_err(|e| JsValue::from_str(&format!("JSON Parse Error: {}", e)))?;
    Ok(tokens.to_css_variables())
}
