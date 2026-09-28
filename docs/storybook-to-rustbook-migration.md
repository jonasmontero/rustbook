# Migrating from Storybook to Rustbook 🦀

Rustbook is a 100% drop-in, blazing-fast, AI-native alternative to Storybook built in Rust. It eliminates heavy Webpack/Babel overhead, provides microsecond color math via WebAssembly, and connects AI coding assistants directly to your design system through the native Model Context Protocol (MCP).

---

## ⚡ Performance Comparison

| Metric | Legacy Storybook 8 | Rustbook (Rust Engine) | Improvement |
| :--- | :--- | :--- | :--- |
| **Cold Startup Time** | 4.8s – 12.5s | **< 5ms** | **~100x faster** |
| **Memory Consumption (Idle)** | 480MB – 950MB (Node.js) | **~18MB (Rust)** | **~96% less RAM** |
| **Color Math & APCA Auditing**| JS library (15ms - 40ms) | **Wasm / Rust (0.01ms)** | **~1500x faster** |
| **Multi-Target Codegen** | Plugins / Manual | **Built-in (SwiftUI, Compose, Flutter, Tailwind)** | **Native** |
| **AI Assistant Integration** | External CLI wrappers | **Native JSON-RPC 2.0 MCP & Stdio** | **Zero-config** |

---

## 🚀 3-Step Migration Guide

### Step 1: Install Rustbook CLI

```bash
# Via Cargo (Native binary)
cargo install rustbook

# Or via NPM
npx rustbook dev
```

### Step 2: Replace `.storybook/` with `rustbook.config.json`

You can remove the heavy `.storybook/main.ts` and `.storybook/preview.ts` configuration. Rustbook uses a single, zero-overhead config:

```json
{
  "$schema": "https://rustbook.dev/schema.json",
  "name": "My Design System",
  "port": 6006,
  "stories": [
    "src/app/**/*.stories.ts",
    "src/components/**/*.stories.{tsx,jsx,vue,svelte}"
  ],
  "mcp": {
    "enabled": true,
    "endpoint": "/mcp"
  },
  "codegen": {
    "targets": ["css", "tailwind", "swift", "kotlin", "dart"]
  }
}
```

### Step 3: Keep Your Existing Story Files (`*.stories.ts`)

Rustbook natively reads the Component Story Format (CSF 3.0). Your existing stories require zero changes:

```typescript
import type { Meta, StoryObj } from 'rustbook';
import { ButtonAtom } from './button.atom';

const meta: Meta<ButtonAtom> = {
  title: 'Atoms/Button',
  component: ButtonAtom,
};
export default meta;

export const Primary: StoryObj<ButtonAtom> = {
  args: {
    label: 'Confirm Action',
    variant: 'primary',
  },
};
```

---

## 🤖 Connecting AI Assistants (Cursor / Claude / Antigravity)

Add Rustbook to your `.cursor/mcp.json` or `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "rustbook": {
      "command": "rustbook",
      "args": ["mcp"]
    }
  }
}
```

Now your AI assistant can directly call:
- `list_design_tokens`
- `audit_color_contrast`
- `generate_tonal_palette`
- `compile_tokens`
