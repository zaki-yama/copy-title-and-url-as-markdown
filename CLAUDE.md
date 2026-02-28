# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Chrome/Firefox browser extension that copies the current tab's title and URL as Markdown format (`[title](url)`). Built with WXT (Web Extension framework) + React + TypeScript.

## Commands

```bash
# Development (hot-reload dev mode)
pnpm dev

# Build for Chrome/Edge
pnpm build

# Build for Firefox
pnpm build:firefox

# Run tests (Vitest)
pnpm test

# Run a single test file
pnpm test src/util.test.ts

# Lint (runs ESLint on entrypoints/**)
pnpm lint

# Build zip for distribution
pnpm zip           # Chrome/Edge
pnpm zip:firefox   # Firefox
```

## Architecture

### Framework: WXT

[WXT](https://wxt.dev/) is the web extension framework. The `wxt.config.ts` defines the manifest (permissions, keyboard shortcuts, icons). WXT automatically picks up entrypoints from the `entrypoints/` directory.

### Entrypoints (`entrypoints/`)

WXT convention — each subdirectory/file here becomes a distinct extension page:

- `entrypoints/background.ts` — Service worker. Listens for `chrome.commands.onCommand` (keyboard shortcuts `Ctrl+Shift+1/2`) and triggers clipboard copy via `chrome.scripting.executeScript`.
- `entrypoints/popup/` — Rendered when the user clicks the toolbar icon. Immediately copies to clipboard on load and renders the `<Popup>` component showing title/URL.
- `entrypoints/options/` — Options page rendered via `chrome.runtime.openOptionsPage`. Allows users to customize the copy format template.

### Source (`src/`)

Shared code used by entrypoints:

- `src/util.ts` — Core logic: `buildTemplate` (applies `${title}`/`${url}` substitution), `copyToClipboard` (uses `document.execCommand('copy')`), `escapeBrackets` (percent-encodes `()[]` in URLs), `escapeTabsAndNewLines`/`unescapeTabsAndNewLines` (for Options UI display).
- `src/constant.ts` — Default format string (`[${title}](${url})`) and `INITIAL_OPTION_VALUES`.
- `src/popup/Popup.tsx` — Presentational component showing title and URL using Salesforce Lightning Design System.
- `src/options/Options.tsx` — Form for configuring up to 3 format templates stored in `chrome.storage.local`.

### Key Design Points

- **Format templates** use `${title}` and `${url}` as placeholders. Users can configure `format` (main), `optionalFormat1`, and `optionalFormat2` in Options. The background script maps keyboard shortcut commands (`copy_as_format_1`, `copy_as_format_2`) to the optional formats.
- **Clipboard copy** in the popup happens in the page context (not the background), using `document.execCommand('copy')`. The background script uses `chrome.scripting.executeScript` to inject `copyToClipboard` into the active tab.
- **UI library**: `react-lightning-design-system` (Salesforce SLDS) with `@salesforce-ux/design-system` CSS assets. The `postinstall` script copies these assets into `public/`.

### pnpm

The project uses pnpm (`packageManager: pnpm@10.30.3`).

### Tests

Tests are in `src/util.test.ts` using Vitest. Only `src/util.ts` functions are tested (pure functions with no browser API dependencies).

### i18n

Extension name/description are internationalized via `_locales/en/messages.json` and `_locales/ja/messages.json`. Referenced in `wxt.config.ts` as `__MSG_appName__` etc.
