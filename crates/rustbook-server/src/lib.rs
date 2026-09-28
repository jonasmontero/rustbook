//! Rustbook Server
//!
//! Axum HTTP & WebSocket Server and Native MCP Endpoint.

pub mod mcp;

use axum::{
    extract::Json,
    response::{Html, IntoResponse},
    routing::{get, post},
    Router,
};
use mcp::{execute_mcp_tool, get_mcp_tools, JsonRpcRequest, JsonRpcResponse};
use std::net::SocketAddr;
use std::path::Path;
use tower_http::cors::{Any, CorsLayer};
use tower_http::services::{ServeDir, ServeFile};

/// Builds the Axum router for Rustbook
pub fn build_app() -> Router {
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let mut router = Router::new()
        .route("/health", get(health_handler))
        .route("/mcp/tools", get(mcp_tools_handler))
        .route("/mcp", post(mcp_rpc_handler));

    let dist_path = Path::new("dist/design-system/browser");
    if dist_path.exists() {
        let serve_dir = ServeDir::new(dist_path)
            .fallback(ServeFile::new(dist_path.join("index.html")));
        router = router.fallback_service(serve_dir);
    } else {
        router = router.route("/", get(welcome_handler));
    }

    router.layer(cors)
}

async fn welcome_handler() -> impl IntoResponse {
    Html(r#"<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rustbook Engine Server</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0F172A; color: #F8FAFC; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    .card { background: #1E293B; border: 1px solid #334155; border-radius: 16px; padding: 40px; max-width: 580px; text-align: center; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }
    h1 { color: #38BDF8; font-size: 28px; margin-bottom: 8px; }
    p { color: #94A3B8; font-size: 15px; line-height: 1.6; }
    .badge { display: inline-block; padding: 6px 12px; background: rgba(56, 189, 248, 0.15); color: #38BDF8; border-radius: 9999px; font-weight: 700; font-size: 12px; margin-bottom: 16px; }
    .endpoint { background: #0F172A; padding: 12px; border-radius: 8px; font-family: monospace; color: #E2E8F0; margin: 16px 0; text-align: left; font-size: 13px; }
    .btn { display: inline-block; padding: 10px 20px; background: #2563EB; color: #FFFFFF; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 12px; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">🦀 RUSTBOOK ENGINE ACTIVE</span>
    <h1>Rustbook Dev & MCP Server</h1>
    <p>The native Rust Axum server and Model Context Protocol (MCP) endpoint are active on port 6006.</p>
    <div class="endpoint">
      <strong>AI MCP Endpoint:</strong> POST http://localhost:6006/mcp<br>
      <strong>MCP Tools Schema:</strong> GET http://localhost:6006/mcp/tools<br>
      <strong>Health Check:</strong> GET http://localhost:6006/health
    </div>
    <a href="http://localhost:4200/workbench" class="btn">Open Angular Dev Studio (Port 4200) →</a>
  </div>
</body>
</html>"#)
}

async fn health_handler() -> impl IntoResponse {
    Json(serde_json::json!({
        "status": "ok",
        "engine": "rustbook",
        "version": "0.1.0"
    }))
}

async fn mcp_tools_handler() -> impl IntoResponse {
    Json(get_mcp_tools())
}

async fn mcp_rpc_handler(Json(req): Json<JsonRpcRequest>) -> impl IntoResponse {
    let result = execute_mcp_tool(&req.method, req.params);
    match result {
        Ok(val) => Json(JsonRpcResponse {
            jsonrpc: "2.0".to_string(),
            id: req.id,
            result: Some(val),
            error: None,
        }),
        Err(err_msg) => Json(JsonRpcResponse {
            jsonrpc: "2.0".to_string(),
            id: req.id,
            result: None,
            error: Some(mcp::JsonRpcError {
                code: -32603,
                message: err_msg,
            }),
        }),
    }
}

/// Starts the native Rustbook HTTP & MCP server on the specified port
pub async fn start_server(port: u16) -> Result<(), Box<dyn std::error::Error>> {
    let app = build_app();
    let addr = SocketAddr::from(([0, 0, 0, 0], port));
    println!("🦀 Rustbook Server running at http://localhost:{}", port);
    println!("🤖 Native MCP Endpoint ready at http://localhost:{}/mcp", port);

    let listener = tokio::net::TcpListener::bind(addr).await?;
    axum::serve(listener, app).await?;
    Ok(())
}
