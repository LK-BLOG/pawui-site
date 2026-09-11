# Syntax

A PawUI file is an **element tree** plus an optional **`<script>` Python block**, with HTML-like syntax.

## File structure

```html
<Window title="Title" width="480" height="360" theme="dark">
  <!-- component tree -->
  <Column padding="24">
    <Text>Content</Text>
  </Column>
</Window>

<script>
# plain Python here
state.count = 0

def handler():
    state.count += 1
</script>
```

Rules:

- Top level is either a **single** `<Window>`, or a set of elements (auto-wrapped in an implicit Window).
- Outside `<Window>` only `<script>`, `<Component>`, `<Theme>` are allowed.
- Elements may self-close (`<Divider/>`) or be paired (`<Text>...</Text>`).
- `<!-- comments -->` are supported.

## Tags at a glance

### Containers

| Tag | Purpose |
|-----|---------|
| `Window` | Root window, exactly one per file |
| `Column` | Vertical layout |
| `Row` | Horizontal layout |
| `Scroll` | Scrollable container |
| `Tabs` / `Tab` | Tabbed pages |
| `Tooltip` | Hover tooltip wrapper |

### Display

| Tag | Purpose |
|-----|---------|
| `Text` | Text |
| `Image` | Image |
| `Divider` | Separator |
| `Spacer` | Flexible space |
| `Progress` | Progress bar |

### Interaction

| Tag | Purpose |
|-----|---------|
| `Button` | Button |
| `Input` | Single-line input |
| `TextArea` | Multi-line input |
| `Checkbox` | Toggle switch |
| `Slider` | Slider |
| `Web` | Embedded web view (needs PySide6-Addons) |

### Logic

| Tag | Purpose |
|-----|---------|
| `If` | Conditional rendering |
| `For` | List loop |

Full attributes for each component are in [Components](#/docs/components).

## Attributes

### Forms

```html
<Text size="20" bold color="accent">Title</Text>
<Button disabled>Disabled</Button>
<Divider thickness=2/>
```

- Values may be double-quoted, single-quoted, or unquoted: `size="20"`, `size='20'`, `size=20`.
- A bare attribute means `true`: `<Button disabled/>`.
- `true` / `false` (case-insensitive) parse as booleans.

### Color attributes

Any color attribute (`bg`, `fg`, `color`, `accent`, ...) accepts a **theme token name**:

```html
<Text color="accent">Accent text</Text>
<Button bg="surface" fg="text">Secondary</Button>
```

Tokens: `background` `surface` `text` `subtext` `accent` `border` `danger`, plus any custom color names. Hex values like `#ff6b6b` also work.

## Template interpolation

Reference state in text or attribute values. Three equivalent forms:

```html
<Text>{$count}</Text>      <!-- $ prefix, recommended -->
<Text>{count}</Text>       <!-- no prefix -->
```

Paths are supported:

```html
<Text>{$user.name}</Text>
<Text>{$items[0]}</Text>
<Text>{$data["key"]}</Text>
```

Interpolation works inside a sentence:

```html
<Text>Hello {$name}! You have {$count} messages</Text>
```

## Control flow

### `<If>` — conditional rendering

`condition` takes a **boolean value** or a **single state reference**:

```html
<If condition="{$show_detail}">
  <Text>Details</Text>
</If>
```

> **Note**: `condition` does not evaluate expressions. `condition="{$a and $b}"` will not work as expected.
> Compute a boolean state in the script instead:

```python
def refresh():
    state.show_detail = bool(state.count > 0 and state.logged_in)
```

```html
<If condition="{$show_detail}">
  <Text>Details</Text>
</If>
```

### `<For>` — list loop

```html
<For each="user" in="{$users}">
  <Row spacing="8">
    <Text>{$user.name}</Text>
    <Text color="subtext">{$user.email}</Text>
  </Row>
</For>
```

- `each` is the loop variable name, default `item`.
- `in` takes a list, usually a reference like `{$list}`.
- The loop variable is visible only inside the `<For>` subtree.

## Events

```html
<Button on_click="save">Save</Button>
<Input on_change="on_name" on_enter="submit" bind="name"/>
<Checkbox on_change="on_toggle" bind="enabled"/>
<Slider on_change="on_volume" bind="volume"/>
```

Handlers are Python functions with the same name in the script. The runtime **only passes the parameters the handler declares**: zero-arg functions get nothing, handlers with `text` receive the text. See [Events](#/docs/events).

## Custom components

```html
<Component name="Card">
  <Prop name="title" default="Card"/>
  <Column padding="16" bg="surface" radius="12" spacing="8">
    <Text size="16" bold>{$title}</Text>
  </Column>
</Component>

<!-- usage -->
<Card title="My card"/>
```

See [Custom Components](#/docs/custom-components).

## Theming

```html
<Window theme="dark"> ... </Window>

<!-- or customize -->
<Theme extends="light">
  <Color name="accent" value="#ff6b6b"/>
  <Color name="brand" value="#4ecdc4"/>
</Theme>
```

See [Theming](#/docs/theming).

## Animation

```html
<Text animate="fade">Fade in</Text>
<Button animate="slide-up" duration="320" delay="80">Slide in</Button>
<Column stagger="60">
  <Text>First</Text>
  <Text>Second</Text>
</Column>
```

See [Animation](#/docs/animation).
