# Getting Started

## Installation

```bash
pip install pawui
```

Requires Python 3.10+ and PySide6.

## Your First App

Create `app.paw`:

```html
<Window title="Hello PawUI" width="400" height="300">
  <Column padding="24" spacing="16">
    <Text size="28" bold="true">Welcome! 👋</Text>
    <Text size="14" color="subtext">Your first PawUI app</Text>
    
    <Button on_click="say_hello">Click Me</Button>
    
    <Text size="16" color="accent">{$message}</Text>
  </Column>
</Window>

<script>
def say_hello():
    state.message = "Hello from PawUI!"
</script>
```

Run it:

```bash
pawui app.paw
```

## Key Concepts

- **`.paw` files** - HTML-like declarative UI
- **Single `<Window>`** - Every app has exactly one root window
- **State binding** - `{$var}` in markup, `state.var = value` in script
- **Events** - `on_click="function_name"` references script functions
- **Components** - Reusable `<Component name="X">` definitions