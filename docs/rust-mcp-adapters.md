# Rust MCP Server & Universal Adapters Specification

## 1. Native Rust MCP Server Architecture

The **Model Context Protocol (MCP)** provides open standard communication between AI coding agents (Antigravity, Claude, Cursor) and the Design System engine.

```
┌─────────────────────────────────┐
│     AI Coding Agent (Client)    │
│  (Antigravity / Claude / Cursor)│
└────────────────┬────────────────┘
                 │ JSON-RPC 2.0 over Stdin / HTTP SSE
                 ▼
┌────────────────────────────────────────────────────────┐
│             RUST MCP SERVER (ds-server)                │
│  • Latency: < 1ms per tool execution                   │
│  • Safe async memory management (Tokio)                │
│  • Zero Node.js runtime dependency                     │
└────────────────┬───────────────────────────────────────┘
                 │
                 ├─────────► Tool: `list_components`
                 ├─────────► Tool: `get_tokens_schema`
                 ├─────────► Tool: `generate_atom_component`
                 ├─────────► Tool: `validate_a11y_contrast`
                 └─────────► Tool: `render_component_preview`
```

---

## 2. Universal Adapters Layer

Using the **W3C Web Components standard (Custom Elements)**, the Design System delivers friction-free integration across all major frontend frameworks:
* **Angular 21:** Standalone signals & Custom Elements.
* **React 19 / Next.js:** React wrappers with full TypeScript autocomplete.
* **Vue 3 / Svelte 5:** Native HTML tags with reactive prop bindings.
* **Vanilla HTML:** Works with zero bundler or build steps.

---

## 3. Multi-Target Codegen

The Rust compiler engine emits platform-native token definitions:
1. **Web:** `:root { --color-primary: #2563EB; ... }`
2. **Tailwind CSS:** `theme.extend.colors`
3. **iOS (SwiftUI):** `extension Color { static let brandPrimary = Color(...) }`
4. **Android (Jetpack Compose):** `val BrandPrimary = Color(0xFF2563EB)`
5. **Flutter (Dart):** `static const Color brandPrimary = Color(0xFF2563EB);`
