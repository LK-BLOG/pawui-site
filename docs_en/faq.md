# FAQ

## Install & run

### `pawui` command not found

Confirm the install and that the scripts directory is on PATH:

```bash
pip show pawui
python -m pawui --version
```

You can always run it as a module: `python -m pawui app.paw`.

### Missing Qt dependency

```
ModuleNotFoundError: No module named 'PySide6'
```

```bash
pip install "PySide6>=6.5"
```

### Window flashes and closes / no display

On headless machines (CI, remote), use offscreen mode:

```bash
pawui render app.paw
```

Or set `QT_QPA_PLATFORM=offscreen`.

## Common errors

### `PawUI error: unknown component <X>`

A misspelled tag or a non-existent component. Run `pawui schema` for the full list. Names are case-sensitive.

### `mismatched closing tag`

Opening and closing tags don't match. Check for a missing `</Column>` or a `</Row>` typo. The error includes line/column.

### `top-level elements must live inside <Window>`

UI elements appeared outside `<Window>`. Only one `<Window>` is allowed (or a set of elements auto-wrapped); other top-level items may only be `<script>` / `<Component>` / `<Theme>`.

### `script block has invalid Python syntax`

`<script>` is raw Python. Common causes:

- mixed tabs and spaces
- a missing colon
- HTML syntax mixed into Python

### `image not found: <src>`

`<Image src="...">` resolves relative to the **current working directory** (not the `.paw` directory). Use an absolute path or run from the project directory.

### `Web component requires PySide6-Addons`

```bash
pip install PySide6-Addons
```

## State & UI

### State changed but the UI didn't update

- Make sure the template uses `{$key}` / `{key}` with the exact key name.
- Direct assignment `state.count = x` triggers; **in-place mutation does not**:

```python
state.items.append(x)              # does NOT refresh
state.items = state.items + [x]    # correct
```

Assign a new object so listeners fire.

### Input value isn't synced to state

Add `bind` to interactive components:

```html
<Input bind="username"/>
```

Add `value="{$username}"` too for the reverse direction.

### `TypeError` on arithmetic

Unset keys return `""`. Use `state.get("count", 0)`:

```python
state.count = state.get("count", 0) + 1
```

### `<If condition="{$a and $b}">` doesn't work

`condition` accepts **a single boolean or state reference**; it does not evaluate expressions. Compute it in the script:

```python
def refresh():
    state.visible = bool(state.a and state.b)
```

```html
<If condition="{$visible}">...</If>
```

### How do I negate a condition?

Avoid expressions the same way — keep a boolean state or a function:

```python
state.empty = True

def update():
    state.empty = len(state.items) == 0
```

```html
<If condition="{$empty}"><Text>No data</Text></If>
```

## Layout

### Content isn't centered

PawUI has **no** `align` / `justify`. Containers lay children out from the top-left. To center:

- use `expand` so an element fills space, relying on the widget's own alignment;
- use `Spacer` elements on both sides;
- or adjust `padding` manually.

### A widget doesn't fill the width

Add `expand` to the widget that should stretch:

```html
<Row spacing="8">
  <Input bind="q" expand/>
  <Button on_click="search">Search</Button>
</Row>
```

### Content is cut off

Put it inside `<Scroll>`:

```html
<Scroll expand>
  ...
</Scroll>
```

## Hot reload

### `pawui watch` does nothing

- Confirm you're saving the watched file.
- Some editors use atomic replace; polling is 400ms, so give it a moment.
- On syntax errors the old window stays and the error prints; it rebuilds once fixed.

### State resets after hot reload

Hot reload **preserves State**, but re-runs the script. A line like `state.count = 0` overwrites the current value. Use conditional initialization:

```python
if not state.has("count"):
    state.count = 0
```

## Performance

### UI stutters

- Don't do heavy work in handlers; use `app.invoke_async`.
- Avoid rendering huge lists all at once.

## Still stuck?

Run `pawui check app.paw` to inspect parsing, then reduce to a minimal snippet. Most issues come down to tag matching, state key spelling, or condition expressions.
