# Best Practices

Advice for keeping a PawUI project clear and maintainable.

## Project structure

A small tool is fine as one file; larger apps split by responsibility:

```
myapp/
├── main.py              # entry: from pawui import run; run("app.paw")
├── app.paw              # UI + event bindings
├── components/          # reusable components (paste-in or split as needed)
├── assets/              # images, fonts
└── docs/                # notes
```

PawUI maps one file to one app today. Keep complex logic in `<script>` functions rather than piling it into the markup.

## Designing state

- Use **flat, semantic** keys: `user_name`, `cart_total` — not `a`, `x1`.
- Store collections as **lists/dicts** and reassign on change.
- Expose derived values as functions on state and use `{$total}` directly.

```python
state.items = []
state.filter = ""

def visible():
    f = state.filter.strip().lower()
    return [x for x in state.items if f in x.lower()] if f else state.items

def count():
    return len(visible())

state.visible = visible
state.count = count
```

```html
<For each="item" in="{$visible}">
  <Text>{$item}</Text>
</For>
<Text size="12" color="subtext">{$count} items</Text>
```

## Reuse UI: custom components

Extract repeated blocks into `<Component>`:

```html
<Component name="StatCard">
  <Prop name="label" default="Metric"/>
  <Prop name="value" default="0"/>
  <Column padding="16" bg="surface" radius="12" expand="true">
    <Text size="28" bold color="accent">{$value}</Text>
    <Text size="12" color="subtext">{$label}</Text>
  </Column>
</Component>
```

## Use theme tokens, not hardcoded colors

```html
<!-- good: follows the theme -->
<Text color="subtext">Caption</Text>

<!-- avoid: won't change with the theme -->
<Text color="#9aa0a6">Caption</Text>
```

For brand colors, define once in `<Theme>` and reuse globally:

```html
<Theme extends="dark">
  <Color name="brand" value="#ff5c8a"/>
</Theme>
```

## Keep handlers small

Handlers should "read state → compute → write state". Extract complex logic into plain functions:

```python
def validate_email(text):
    return "@" in text and "." in text.split("@")[-1]

def submit():
    if not validate_email(state.email):
        state.error = "Invalid email"
        return
    state.error = ""
```

## Naming conventions

| Thing | Convention | Example |
|-------|------------|---------|
| state keys | lower_snake_case | `user_name` |
| handlers | verb-first | `submit`, `toggle_theme` |
| components | UpperCamelCase | `UserCard` |
| theme colors | semantic | `brand`, `danger` |

## Error handling

- Run `pawui check app.paw` during development to catch syntax issues early.
- Async errors surface via `error` in `done(result, error)`; always handle it.
- Show users readable messages, not stack traces:

```python
def on_loaded(result, error):
    if error:
        state.status = "Loading failed, please try again"
        return
    state.data = result
```

## Dev loop

```bash
pawui watch app.paw   # rebuild on save, state preserved
pawui check app.paw   # syntax check
```

## Next

- [Performance](#/docs/performance) — keep it smooth
- [Packaging](#/docs/packaging) — ship to users
- [Custom Components](#/docs/custom-components) — componentize
