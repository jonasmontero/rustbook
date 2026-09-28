//! Native Model Context Protocol (MCP) Server for Rustbook
//!
//! Handles JSON-RPC 2.0 messages over standard I/O and HTTP SSE,
//! exposing Design System intelligence and compilation tools to AI agents.

use rustbook_core::color::{audit_contrast, generate_harmonies, generate_tonal_palette, Rgb};
use rustbook_core::tokens::ThemeTokens;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct JsonRpcRequest {
    pub jsonrpc: String,
    pub id: Option<serde_json::Value>,
    pub method: String,
    pub params: Option<serde_json::Value>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct JsonRpcResponse {
    pub jsonrpc: String,
    pub id: Option<serde_json::Value>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub result: Option<serde_json::Value>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub error: Option<JsonRpcError>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct JsonRpcError {
    pub code: i32,
    pub message: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct McpTool {
    pub name: String,
    pub description: String,
    pub input_schema: serde_json::Value,
}

/// Returns the registry of tools exposed by the Rustbook MCP Server
pub fn get_mcp_tools() -> Vec<McpTool> {
    vec![
        McpTool {
            name: "list_design_tokens".to_string(),
            description: "Returns the active design system tokens dictionary (colors, radii, typography)".to_string(),
            input_schema: serde_json::json!({
                "type": "object",
                "properties": {}
            }),
        },
        McpTool {
            name: "audit_color_contrast".to_string(),
            description: "Calculates WCAG 2.1 AA/AAA and APCA contrast ratios with microsecond latency".to_string(),
            input_schema: serde_json::json!({
                "type": "object",
                "required": ["foreground_hex", "background_hex"],
                "properties": {
                    "foreground_hex": { "type": "string", "description": "Foreground color in #RRGGBB format" },
                    "background_hex": { "type": "string", "description": "Background color in #RRGGBB format" }
                }
            }),
        },
        McpTool {
            name: "generate_tonal_palette".to_string(),
            description: "Generates a perceptually uniform 11-step tonal scale (50-950) in OKLCH space".to_string(),
            input_schema: serde_json::json!({
                "type": "object",
                "required": ["base_hex"],
                "properties": {
                    "base_hex": { "type": "string", "description": "Brand seed color in #RRGGBB format" }
                }
            }),
        },
        McpTool {
            name: "generate_harmonies".to_string(),
            description: "Computes geometric harmonies (complementary, analogous, triadic, split-comp)".to_string(),
            input_schema: serde_json::json!({
                "type": "object",
                "required": ["base_hex"],
                "properties": {
                    "base_hex": { "type": "string", "description": "Base color in #RRGGBB format" }
                }
            }),
        },
        McpTool {
            name: "compile_tokens".to_string(),
            description: "Compiles design tokens into target code (css, tailwind, swift, kotlin, dart)".to_string(),
            input_schema: serde_json::json!({
                "type": "object",
                "required": ["target"],
                "properties": {
                    "target": {
                        "type": "string",
                        "enum": ["css", "tailwind", "swift", "kotlin", "dart"],
                        "description": "Target language or framework format"
                    }
                }
            }),
        },
    ]
}

/// Executes an MCP tool call by name with arguments
pub fn execute_mcp_tool(name: &str, args: Option<serde_json::Value>) -> Result<serde_json::Value, String> {
    let args = args.unwrap_or(serde_json::json!({}));

    match name {
        "list_design_tokens" => {
            let tokens = ThemeTokens::default();
            Ok(serde_json::to_value(tokens).map_err(|e| e.to_string())?)
        }
        "audit_color_contrast" => {
            let fg_str = args.get("foreground_hex").and_then(|v| v.as_str()).ok_or("Missing foreground_hex")?;
            let bg_str = args.get("background_hex").and_then(|v| v.as_str()).ok_or("Missing background_hex")?;

            let fg = Rgb::from_hex(fg_str).ok_or_else(|| format!("Invalid hex: {}", fg_str))?;
            let bg = Rgb::from_hex(bg_str).ok_or_else(|| format!("Invalid hex: {}", bg_str))?;

            let report = audit_contrast(&fg, &bg);
            Ok(serde_json::to_value(report).map_err(|e| e.to_string())?)
        }
        "generate_tonal_palette" => {
            let base_str = args.get("base_hex").and_then(|v| v.as_str()).ok_or("Missing base_hex")?;
            let base = Rgb::from_hex(base_str).ok_or_else(|| format!("Invalid hex: {}", base_str))?;

            let palette = generate_tonal_palette(&base);
            Ok(serde_json::to_value(palette).map_err(|e| e.to_string())?)
        }
        "generate_harmonies" => {
            let base_str = args.get("base_hex").and_then(|v| v.as_str()).ok_or("Missing base_hex")?;
            let base = Rgb::from_hex(base_str).ok_or_else(|| format!("Invalid hex: {}", base_str))?;

            let harmonies = generate_harmonies(&base);
            Ok(serde_json::to_value(harmonies).map_err(|e| e.to_string())?)
        }
        "compile_tokens" => {
            let target = args.get("target").and_then(|v| v.as_str()).unwrap_or("css");
            let tokens = ThemeTokens::default();
            let code = match target {
                "tailwind" => tokens.to_tailwind_theme(),
                "swift" => tokens.to_swift_colors(),
                "kotlin" => tokens.to_kotlin_compose(),
                "dart" => tokens.to_flutter_dart(),
                _ => tokens.to_css_variables(),
            };
            Ok(serde_json::json!({ "target": target, "code": code }))
        }
        _ => Err(format!("Unknown tool: {}", name)),
    }
}

/// Runs a persistent JSON-RPC 2.0 loop reading from Stdin and writing to Stdout
pub fn run_stdio_mcp_loop() -> Result<(), Box<dyn std::error::Error>> {
    use std::io::{BufRead, Write};
    let stdin = std::io::stdin();
    let mut stdout = std::io::stdout();

    for line in stdin.lock().lines() {
        let line = line?;
        if line.trim().is_empty() {
            continue;
        }

        if let Ok(req) = serde_json::from_str::<JsonRpcRequest>(&line) {
            let resp = match execute_mcp_tool(&req.method, req.params) {
                Ok(val) => JsonRpcResponse {
                    jsonrpc: "2.0".to_string(),
                    id: req.id,
                    result: Some(val),
                    error: None,
                },
                Err(err_msg) => JsonRpcResponse {
                    jsonrpc: "2.0".to_string(),
                    id: req.id,
                    result: None,
                    error: Some(JsonRpcError {
                        code: -32603,
                        message: err_msg,
                    }),
                },
            };
            let resp_json = serde_json::to_string(&resp)?;
            writeln!(stdout, "{}", resp_json)?;
            stdout.flush()?;
        }
    }
    Ok(())
}
