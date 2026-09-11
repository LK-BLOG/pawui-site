# Introduction

**PawUI** is a lightweight declarative UI library for Python. You describe the interface in an HTML-like `.paw` file, write logic in Python, and Qt (PySide6) renders it natively.

No build step, no frontend toolchain, no hand-written `QWidget` boilerplate — `pip install pawui` and run.

## The problem it solves

Qt development means writing lots of imperative code: create widgets, set up layouts, connect signals, update the UI by hand. PawUI turns this into declarative syntax:

```html
<Window title="Greeter" width="360" height="200">
  <Column padding="24" spacing="12">
    <Text size="20" bold>Hello, {$name}</Text>
    <Input bind="name" placeholder="Your name" on_change="greet"/>
  </Column>
</Window>

<script>
state.name = "World"

def greet(text):
    state.name = text or "World"
</script>
```

When state changes, the UI refreshes automatically. Event handlers are just plain Python functions.

## Highlights

- **HTML-like syntax** — familiar tags and attributes, learn it in minutes
- **Reactive state** — `{$name}` template binding; `state.name = ...` refreshes the UI
- **17 built-in components** — layout, display, interaction
- **Native rendering** — Qt antialiasing, rounded corners, hover states, IME support
- **Two themes + custom colors** — `dark` / `light`, or define your own tokens
- **Entrance animations** — declarative fade / slide / reveal with easing and stagger
- **Hot reload** — `pawui watch app.paw` rebuilds on save, state preserved

## Requirements

| Item | Requirement |
|------|-------------|
| Python | 3.10 or newer |
| Dependency | `PySide6 >= 6.5` |
| Platforms | Windows / macOS / Linux |

## A complete example

```html
<Window title="Counter" width="400" height="320" theme="dark">
  <Column padding="32" spacing="16">
    <Text size="28" bold color="accent">Counter</Text>
    <Text size="48" bold>{$count}</Text>
    <Row spacing="12">
      <Button on_click="dec" bg="surface" fg="text">-</Button>
      <Button on_click="inc">+1</Button>
      <Button on_click="reset" bg="surface" fg="subtext">Reset</Button>
    </Row>
  </Column>
</Window>

<script>
state.count = 0

def inc():
    state.count = state.count + 1

def dec():
    state.count = max(0, state.count - 1)

def reset():
    state.count = 0
</script>
```

## Documentation map

- [Getting Started](#/docs/getting-started) — install and run your first app
- [Syntax](#/docs/syntax) — tags, attributes, templates, control flow
- [Layout](#/docs/layout) — containers, spacing, flex
- [Components](#/docs/components) — all 17 components
- [State & Scripts](#/docs/state-scripts) — `state` and `<script>`
- [Events](#/docs/events) — handlers, binding, async
- [Animation](#/docs/animation) — entrance animations and easing
- [Theming](#/docs/theming) — color tokens and customization
- [Custom Components](#/docs/custom-components) — `<Component>` and `<Prop>`
- [API Reference](#/docs/api) — Python interfaces
- [CLI](#/docs/cli) — the `pawui` command
- [Examples](#/docs/examples) — complete apps
- [FAQ](#/docs/faq) — pitfalls and troubleshooting
