//! Zero-config Project Initializer for Rustbook (`rustbook init`)
//!
//! Automatically inspects project structure, detects UI frameworks,
//! creates `rustbook.config.json`, wires IDE MCP configs, and injects scripts.

use std::fs;
use std::path::Path;

pub fn init_project(explicit_framework: Option<String>) -> Result<(), Box<dyn std::error::Error>> {
    println!("[INFO] Initializing Rustbook in current project...");

    // 1. Detect Framework
    let framework = if let Some(fw) = explicit_framework {
        fw.to_lowercase()
    } else {
        detect_framework()
    };

    println!("[DETECT] Framework: \x1b[1;36m{}\x1b[0m", framework);

    // 2. Generate `rustbook.config.json`
    let config_path = Path::new("rustbook.config.json");
    if !config_path.exists() {
        let config_content = serde_json::json!({
            "$schema": "https://rustbook.dev/schema/v1.json",
            "name": "Project Design System",
            "framework": framework,
            "stories": [
                "src/**/*.stories.ts",
                "src/**/*.stories.json",
                "stories/**/*.stories.ts"
            ],
            "tokens": {
                "primaryColor": "#2563EB",
                "secondaryColor": "#64748B",
                "accentColor": "#10B981",
                "borderRadius": 8,
                "fontFamily": "Inter, system-ui, -apple-system, sans-serif"
            },
            "mcp": {
                "enabled": true,
                "port": 6006,
                "stdio": true
            },
            "studio": {
                "theme": "light",
                "defaultViewport": "fluid"
            }
        });

        fs::write(config_path, serde_json::to_string_pretty(&config_content)?)?;
        println!("  \x1b[32m[CREATE]\x1b[0m \x1b[1mrustbook.config.json\x1b[0m (zero-config schema)");
    } else {
        println!("  \x1b[33m[SKIP]\x1b[0m \x1b[1mrustbook.config.json\x1b[0m already exists. Preserving configuration.");
    }

    // 3. Configure IDE MCP Assistant Integrations (.cursor & antigravity)
    let cursor_dir = Path::new(".cursor");
    if !cursor_dir.exists() {
        let _ = fs::create_dir_all(cursor_dir);
    }
    let cursor_mcp_path = cursor_dir.join("mcp.json");
    if !cursor_mcp_path.exists() {
        let cursor_config = serde_json::json!({
            "mcpServers": {
                "rustbook": {
                    "command": "rustbook",
                    "args": ["mcp", "--stdio"]
                }
            }
        });
        fs::write(cursor_mcp_path, serde_json::to_string_pretty(&cursor_config)?)?;
        println!("  \x1b[32m[CREATE]\x1b[0m \x1b[1m.cursor/mcp.json\x1b[0m for Cursor AI IDE");
    }

    let antigravity_mcp_path = Path::new("antigravity.mcp.json");
    if !antigravity_mcp_path.exists() {
        let antigravity_config = serde_json::json!({
            "mcpServers": {
                "rustbook": {
                    "serverUrl": "http://localhost:6006/mcp",
                    "transport": "http"
                }
            }
        });
        fs::write(antigravity_mcp_path, serde_json::to_string_pretty(&antigravity_config)?)?;
        println!("  \x1b[32m[CREATE]\x1b[0m \x1b[1mantigravity.mcp.json\x1b[0m for AI Agents");
    }

    // 4. Update `package.json` with scripts if present
    let pkg_path = Path::new("package.json");
    if pkg_path.exists() {
        if let Ok(content) = fs::read_to_string(pkg_path) {
            if let Ok(mut pkg_json) = serde_json::from_str::<serde_json::Value>(&content) {
                if let Some(scripts) = pkg_json.get_mut("scripts").and_then(|s| s.as_object_mut()) {
                    let mut updated = false;
                    if !scripts.contains_key("rustbook") {
                        scripts.insert("rustbook".to_string(), serde_json::json!("rustbook dev"));
                        updated = true;
                    }
                    if !scripts.contains_key("rustbook:build") {
                        scripts.insert("rustbook:build".to_string(), serde_json::json!("rustbook export css"));
                        updated = true;
                    }
                    if updated {
                        fs::write(pkg_path, serde_json::to_string_pretty(&pkg_json)?)?;
                        println!("  \x1b[32m[UPDATE]\x1b[0m Injected \x1b[1m\"npm run rustbook\"\x1b[0m scripts into package.json");
                    }
                }
            }
        }
    }

    println!();
    println!("\x1b[1;32m[SUCCESS] Rustbook successfully initialized!\x1b[0m");
    println!("------------------------------------------------------------");
    println!("Start development & MCP server:");
    println!("   \x1b[1;36mrustbook dev\x1b[0m  (or \x1b[1;36mnpm run rustbook\x1b[0m)");
    println!();
    println!("Open Studio in your browser:");
    println!("   \x1b[1;34mhttp://localhost:6006/studio\x1b[0m (Axum Native Server)");
    println!("   \x1b[1;34mhttp://localhost:4200/studio\x1b[0m (Angular Dev Server)");
    println!("------------------------------------------------------------");

    Ok(())
}

fn detect_framework() -> String {
    if Path::new("angular.json").exists() {
        return "angular".to_string();
    }
    if Path::new("next.config.js").exists() || Path::new("next.config.mjs").exists() || Path::new("next.config.ts").exists() {
        return "nextjs".to_string();
    }
    if Path::new("nuxt.config.ts").exists() || Path::new("nuxt.config.js").exists() {
        return "nuxt".to_string();
    }
    if Path::new("svelte.config.js").exists() {
        return "svelte".to_string();
    }

    if let Ok(pkg_content) = fs::read_to_string("package.json") {
        if pkg_content.contains("\"vue\"") {
            return "vue".to_string();
        }
        if pkg_content.contains("\"react\"") {
            return "react".to_string();
        }
    }

    "web-components".to_string()
}
