//! Rustbook CLI Main Entry Point
//!
//! Sub-millisecond commands:
//! - `rustbook dev [--port 6006]` -> Starts native HTTP & MCP server
//! - `rustbook audit <fg> <bg>` -> Microsecond WCAG / APCA contrast calculation
//! - `rustbook palette <hex>` -> Generates 11-step OKLCH tonal scale
//! - `rustbook export <target>` -> Compiles tokens to target language (css, tailwind, swift, kotlin, dart)

mod init;

use clap::{Parser, Subcommand};
use init::init_project;
use rustbook_codegen::{compile_tokens, TargetPlatform};
use rustbook_core::color::{audit_contrast, generate_tonal_palette, Rgb};
use rustbook_core::tokens::ThemeTokens;

#[derive(Parser)]
#[command(name = "rustbook")]
#[command(about = "Rustbook: The blazing-fast, AI-native Storybook alternative in Rust", long_about = None)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Initialize Rustbook in a new or existing project (zero-config scaffolding)
    Init {
        #[arg(short, long, help = "Explicit framework: angular, react, next, vue, svelte, web-components")]
        framework: Option<String>,
    },
    /// Start the native Rustbook development & MCP server
    Dev {
        #[arg(short, long, default_value_t = 6006)]
        port: u16,
    },
    /// Audit color contrast in microseconds using WCAG and APCA
    Audit {
        #[arg(help = "Foreground hex color (e.g. #FFFFFF)")]
        foreground: String,
        #[arg(help = "Background hex color (e.g. #2563EB)")]
        background: String,
    },
    /// Generate an 11-step OKLCH perceptual tonal palette (50-950)
    Palette {
        #[arg(help = "Base brand hex color (e.g. #2563EB)")]
        base_color: String,
    },
    /// Export design tokens to target platform code
    Export {
        #[arg(help = "Target platform: css, tailwind, swift, kotlin, dart", default_value = "css")]
        target: String,
    },
    /// Run the native Model Context Protocol (MCP) server
    Mcp {
        #[arg(long, default_value_t = true, help = "Run in Stdio transport mode")]
        stdio: bool,
    },
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let cli = Cli::parse();

    match cli.command {
        Commands::Init { framework } => {
            init_project(framework)?;
        }
        Commands::Dev { port } => {
            println!("============================================================");
            println!(" Rustbook — The AI-Native Storybook Alternative in Rust");
            println!("============================================================");
            rustbook_server::start_server(port).await?;
        }
        Commands::Mcp { .. } => {
            rustbook_server::mcp::run_stdio_mcp_loop()?;
        }
        Commands::Audit { foreground, background } => {
            let fg = Rgb::from_hex(&foreground).expect("Invalid foreground hex");
            let bg = Rgb::from_hex(&background).expect("Invalid background hex");

            let report = audit_contrast(&fg, &bg);
            println!("{}", serde_json::to_string_pretty(&report)?);
        }
        Commands::Palette { base_color } => {
            let base = Rgb::from_hex(&base_color).expect("Invalid base hex");
            let palette = generate_tonal_palette(&base);
            println!("{}", serde_json::to_string_pretty(&palette)?);
        }
        Commands::Export { target } => {
            let tokens = ThemeTokens::default();
            let platform = match target.to_lowercase().as_str() {
                "tailwind" => TargetPlatform::Tailwind,
                "swift" => TargetPlatform::SwiftUi,
                "kotlin" => TargetPlatform::JetpackCompose,
                "dart" => TargetPlatform::FlutterDart,
                _ => TargetPlatform::CssCustomProperties,
            };
            let code = compile_tokens(&tokens, platform);
            println!("{}", code);
        }
    }

    Ok(())
}
