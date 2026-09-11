# Glossary

Concise definitions of terms used throughout the PawUI docs.

## Core concepts

**State**
The reactive data container. Read/write `state.key`; writes auto-update components bound to it.

**Template**
The syntax for referencing state in props or text: `{$count}`, `{count}`, `$count`.

**Interpolation**
Replacing a template with its actual value, supporting attribute paths and indexing: `{$user.name}`, `{$items[0]}`.

**Bind**
`bind="key"` writes an interactive component's value to state. Combined with `value="{$key}"` it forms two-way binding.

**Derived value**
A callable stored on state. Templates call it automatically for live-computed values.

## Structure

**Component**
A built-in tag (`Text`, `Button`, …) or a user-defined `<Component name="...">`.

**Container**
A component that holds children: `Window`, `Column`, `Row`, `Scroll`, `Tabs`, `Tooltip`.

**Logical container**
`<If>` and `<For>`. They provide condition/iteration without a visible border.

**Prop**
A default argument declared by a custom component via `<Prop name="..." default="..."/>`.

**Scope**
The visibility range for name resolution. A `<For>` loop variable is visible only in its subtree.

**Script block**
The Python in `<script>`, defining handlers and initial logic.

**Runtime**
The engine driving parsing, building, events, and state; accessible as `app` in the script.

**Context**
External objects injected into the script namespace via the Python API (dependency injection).

## Styling & animation

**Theme**
A set of colors, fonts, and spacing. Built-in `dark` / `light`.

**Token**
A named color in a theme: `background`, `surface`, `text`, `subtext`, `accent`, `border`, `danger`, plus custom names.

**Entrance animation**
A one-shot effect when a component is built, declared with `animate`.

**Easing**
The speed distribution of an animation over time, chosen with `easing` (e.g. `out-cubic`).

**Stagger**
A container's `stagger` attribute, revealing children in sequence.

## Tooling

**Hot reload**
`pawui watch` monitors the file, rebuilding on save while preserving State.

**Check**
`pawui check` parses without running and prints structure stats.

**Schema**
The component/prop/animation/theme JSON description printed by `pawui schema`.

**Offscreen render**
`pawui render` builds the window without a display, for CI validation.

## Abbreviations

| Abbr. | Full form | Meaning |
|-------|-----------|---------|
| QSS | Qt Style Sheet | Qt's stylesheet language (used internally) |
| IME | Input Method Editor | Input-method editor (CJK input) |
| CWD | Current Working Directory | Base for resource paths |
