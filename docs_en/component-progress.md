# Progress

Shows progress between 0 and `max`. Self-closing.

## Attributes

| Attribute | Type | Default | Notes |
|-----------|------|---------|-------|
| `value` | int | 0 | Current value; supports `{$x}` |
| `max` | int | 100 | Maximum |
| `height` | int | 10 | Height (px) |
| `text` | bool | `false` | Show percentage |
| `accent` | str | `accent` | Fill color |
| `bg` | str | `surface` | Track background |

```html
<Progress value="{$progress}" max="100"/>
<Progress value="{$progress}" max="100" text="true"/>
```

## Binding state

`value` supports templates; the bar updates when state changes:

```html
<Progress value="{$done}" max="{$total}" text="true"/>
<Text size="12" color="subtext">{$done} / {$total}</Text>
```

```python
state.done = 3
state.total = 10
```

## As a completion indicator

```python
def update_progress():
    total = len(state.tasks)
    done = sum(1 for t in state.tasks if t.get("done"))
    state.done = done
    state.total = max(1, total)
```

Keep `max` at least 1 to avoid division by zero or an empty bar.

## Indeterminate

There's no separate "busy" mode. For indeterminate work, use a text status:

```html
<Text color="subtext">{$status}</Text>
```

```python
def start():
    state.status = "Working..."
    app.invoke_async(work, done=on_done)
```

## Colors

```html
<Progress value="{$p}" accent="accent" bg="surface"/>
<Progress value="{$p}" accent="danger" bg="surface"/>
```

## Sizes

```html
<Progress value="{$p}" height="6"/>    <!-- thin -->
<Progress value="{$p}" height="16"/>   <!-- thick -->
```

## Pattern: labeled progress

```html
<Column spacing="8">
  <Text size="13">Uploading</Text>
  <Progress value="{$uploaded}" max="{$size}" text="true"/>
</Column>
```

## Next

- [Slider](#/component-slider) — draggable values
- [Async](#/async) — loading tasks and progress
