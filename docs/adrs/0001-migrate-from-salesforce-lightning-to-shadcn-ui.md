# ADR 0001: Migrate from Salesforce Lightning Design System to shadcn/ui

## Status

Accepted

## Context

The project currently uses Salesforce Lightning Design System (SLDS) via `@salesforce-ux/design-system` and `react-lightning-design-system` for UI components. However, this introduces significant overhead:

- **Issue #364**: The installed directory contains 3,946 icon files, despite only using one icon (approval)
- The total package size is unnecessarily large for a Chrome extension
- We only use a minimal set of components:
  - 1 icon (approval)
  - Basic layout components (Grid, Row)
  - Form components (Form, Input, Button)
  - Toast notification

### Current Usage

**Popup.tsx**:
- `Icon` component (approval icon only)
- `Grid`, `Row` for layout
- SLDS CSS utility classes

**Options.tsx**:
- `Form`, `Input`, `Button`, `Toast` components
- SLDS CSS utility classes for typography and spacing

## Decision

We will migrate to **shadcn/ui** with **Tailwind CSS**.

## Rationale

### Alternatives Considered

1. **shadcn/ui + Tailwind CSS** (Selected)
2. **Lucide React + Custom CSS**
3. **Mantine**

### Why shadcn/ui?

**Advantages**:
- **Copy-paste approach**: Only the components we need are added to the project, no unused code
- **Lightweight**: No bundling thousands of unused icons
- **Built-in icon support**: Uses Lucide React, which is tree-shakeable and lightweight
- **Modern and maintainable**: Built on Radix UI primitives
- **TypeScript first**: Full TypeScript support out of the box
- **Accessibility**: Components are built with accessibility in mind
- **Customizable**: Components are part of your codebase, fully customizable
- **Tailwind CSS integration**: Modern utility-first CSS framework

**Components needed**:
- Button
- Input
- Toast (Alert/Sonner)
- Icon (from Lucide React)

### Why not alternatives?

**Lucide React + Custom CSS**:
- Pros: Most lightweight option
- Cons: Requires building form components from scratch, more development time

**Mantine**:
- Pros: Comprehensive component library, good tree-shaking
- Cons: Larger bundle size than shadcn/ui, less customization control

## Consequences

### Positive

- **Significant size reduction**: Eliminate 3,946 unused icon files
- **Better performance**: Smaller bundle size improves extension load time
- **Modern developer experience**: Better TypeScript support and tooling
- **Easier customization**: Components are in our codebase, not in node_modules
- **Better maintainability**: Modern, actively maintained library

### Negative

- **Migration effort**: Need to rewrite existing components
- **Learning curve**: Team needs to learn shadcn/ui and Tailwind CSS conventions
- **Breaking changes**: UI may look different initially (can be mitigated by custom styling)

### Migration Tasks

- [ ] Install and configure Tailwind CSS
- [ ] Install and configure shadcn/ui
- [ ] Migrate Popup component
- [ ] Migrate Options component
- [ ] Remove SLDS dependencies
- [ ] Update postinstall script in package.json
- [ ] Test all UI functionality
- [ ] Update documentation

## References

- [Issue #364](https://github.com/zaki-yama/copy-title-and-url-as-markdown/issues/364)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)
