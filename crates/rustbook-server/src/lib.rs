//! Rustbook Server
//!
//! Axum HTTP & WebSocket Server and Native MCP Endpoint.

pub mod mcp;

use axum::{
    extract::Json,
    response::IntoResponse,
    routing::{get, post},
    Router,
};
use mcp::{execute_mcp_tool, get_mcp_tools, JsonRpcRequest, JsonRpcResponse};
use std::net::SocketAddr;
use tower_http::cors::{Any, CorsLayer};

/// Builds the Axum router for Rustbook
pub fn build_app() -> Router {
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    Router::new()
        .route("/health", get(health_handler))
        .route("/mcp/tools", get(mcp_tools_handler))
        .route("/mcp", post(mcp_rpc_handler))
        .layer(cors)
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
