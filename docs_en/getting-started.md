# Getting Started

From zero to running in a few minutes.

## 1. Install

```bash
pip install pawui
```

`PySide6>=6.5` is installed automatically. On a slow network, install PySide6 first:

```bash
pip install pyside6
pip install pawui
```

Verify:

```bash
pawui --version
```

## 2. Create your first app

Create `app.paw`:

```html
<Window title="Counter" width="400" height="300" theme="dark">
  <Column padding="32" spacing="16">
    <Text size="28" bold color="accent">Counter</Text>
    <Text size="48" bold>{$count}</Text>
    <Row spacing="12">
      <Button on_click="increment">+1</Button>
      <Button on_click="decrement" bg="surface" fg="text">-1</Button>
      <Button on_click="reset" bg="surface" fg="subtext">Reset</Button>
    </Row>
  </Column>
</Window>

<script>
state.count = 0

def increment():
    state.count = state.count + 1

def decrement():
    state.count = max(0, state.count - 1)

def reset():
    state.count = 0
</script>
```

## 3. Run it

```bash
pawui app.paw
```

The window opens immediately. Click a button and `{$count}` updates from `state.count`.

> `pawui run app.paw` is equivalent.

Result:

![Counter app running](../static/shots/counter-dark.png)

## 4. Hot reload

While developing:

```bash
pawui watch app.paw
```

Saving the `.paw` file rebuilds the window automatically. **State and functions defined in the script are preserved.**

## 5. Syntax check

Get diagnostics with line numbers:

```bash
pawui check app.paw
```

Example output:

```
✓ app.paw: syntax OK
  Elements: 1
  Script: yes
```

Errors print as `PawUI error: ... (at line N:col)`.

## 6. Built-in help

```bash
pawui help              # list topics
pawui help components   # show a topic
pawui help syntax
pawui help theming
```

## Project layout

A minimal project needs just one file:

```
myapp/
├── app.paw
└── assets/
    └── logo.png     # used by <Image src="assets/logo.png"/>
```

`<Image>` paths resolve relative to the current working directory.

## Next steps

- [Syntax](#/syntax) — full tag and attribute list
- [Layout](#/layout) — containers and spacing
- [Components](#/components) — attribute tables for every component
- [State & Scripts](#/state-scripts) — how `state` drives the UI
