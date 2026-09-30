# Components Reference

## Window

Root element (exactly one per file).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | "PawUI" | Window title |
| `width` | int | 480 | Initial width |
| `height` | int | 640 | Initial height |
| `theme` | "dark" \| "light" | "light" | Base theme |
| `padding` | int | 0 | Window padding |
| `spacing` | int | theme.spacing | Child spacing |

```html
<Window title="My App" width="800" height="600" theme="dark" padding="24" spacing="16">
  <!-- content -->
</Window>
```

## Column / Row

Container layouts.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `padding` | int \| tuple | theme.padding | Inner padding |
| `spacing` | int | theme.spacing | Child gap |
| `bg` | color | - | Background color |
| `radius` | int | theme.radius | Border radius |
| `expand` | bool | false | Expand to fill |
| `stagger` | int | 0 | Child animation delay increment |

```html
<Column padding="20" spacing="12" bg="surface" radius="12" stagger="60">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</Column>

<Row spacing="8">
  <Button>Left</Button>
  <Spacer width="10"/>
  <Button>Right</Button>
</Row>
```

## Text

Display text content.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | int | theme.font_size | Font size (px) |
| `bold` | bool | false | Bold weight |
| `italic` | bool | false | Italic style |
| `color` | color | theme.text | Text color |
| `fg` | color | theme.text | Alias for color |

```html
<Text size="24" bold="true" color="accent">Title</Text>
<Text size="14" color="subtext">{$description}</Text>
<!-- Content between tags -->
<Text>Static text</Text>
```

## Button

Clickable button.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `on_click` | string | - | Handler function name |
| `bg` | color | theme.accent | Background color |
| `fg` | color | theme.background | Text color |
| `size` | int | theme.font_size | Font size |
| `radius` | int | 17 | Border radius |
| `disabled` | bool | false | Disable button |

```html
<Button on_click="submit" bg="accent" fg="background">Submit</Button>
<Button on_click="cancel" bg="surface" fg="text" disabled="true">Cancel</Button>
```

## Input

Text input field.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | string | "" | Placeholder text |
| `value` | string | "" | Initial value (bindable) |
| `on_change` | string | - | Handler(text) |
| `on_enter` | string | - | Handler(text) on Enter |
| `size` | int | 14 | Font size |
| `show` | string | "" | Set to "password" for masked |

```html
<Input placeholder="Name" on_change="on_name" value="{$name}"/>
<Input placeholder="Password" show="password" on_enter="login"/>
```

## Checkbox (Toggle Switch)

iOS-style toggle switch.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | bool | false | Initial state |
| `on_change` | string | - | Handler(checked) |
| `size` | int | theme.font_size | Label font size |

```html
<Checkbox checked="true" on_change="on_toggle">Enable feature</Checkbox>
```

## Divider

Horizontal line.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | color | theme.border | Line color |
| `thickness` | int | 2 | Line height (px) |

```html
<Divider color="border" thickness="1"/>
```

## Spacer

Empty space.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | int | 1 | Width (px) |
| `height` | int | 1 | Height (px) |

```html
<Spacer height="20"/>
<Spacer width="10"/>  <!-- In Row -->
```

## If

Conditional rendering (logical container, no visual border).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `condition` | bool \| string | - | `{$flag}` / `$flag` / `true` / `false` / `yes` / `on` / `1` |

```html
<If condition="{$logged_in}">
  <Text>Welcome back!</Text>
</If>
```

## For

List loop (logical container, no visual border).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `each` | string | "item" | Loop variable name |
| `in` | any | - | List reference, use `{$items}` to keep the raw object |

```html
<For each="item" in="{$items}">
  <Text>{$item.name} — {$item.price}$</Text>
</For>
```

Supports nested `<For>`, `<If>` inside loops, and attribute/index access
(`{$item.name}`, `{$row[0]}`) on the loop value.

## Slider

Horizontal value slider.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `min` | int | 0 | Minimum value |
| `max` | int | 100 | Maximum value |
| `value` | int | min | Initial value |
| `step` | int | 1 | Single step |
| `on_change` | string | - | Handler(value) |
| `accent` | color | theme.accent | Track fill + handle color |
| `bg` | color | theme.border | Track background |

```html
<Slider min="0" max="100" value="40" on_change="on_volume"/>
```

## Progress

Progress bar.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | int | 0 | Current value (bindable) |
| `max` | int | 100 | Maximum value |
| `height` | int | 10 | Bar height (px) |
| `text` | bool | false | Show percentage text |
| `accent` | color | theme.accent | Fill color |
| `bg` | color | theme.surface | Track color |

```html
<Progress value="{$pct}" max="100"/>
```

## Tabs

Tabbed container. Direct children act as pages; use a `label` prop for the
tab text, or wrap content in `<Tab label="...">`.

```html
<Tabs>
  <Tab label="Overview">
    <Text>First tab</Text>
  </Tab>
  <Tab label="Details">
    <Text>Second tab</Text>
  </Tab>
</Tabs>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | tag | Tab title (on child `<Tab>` or directly on a child) |
| `bg` | color | theme.background | Pane background |

## Image

Displays an image (file path or loadable source).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | string | - | Image path or source |
| `width` | int | native | Target width (scaled) |
| `height` | int | - | Target height (with `cover`) |
| `cover` | bool | false | Cover-crop instead of width-fit |

```html
<Image src="logo.png" width="120"/>
```

## Tooltip

Attaches a hover tooltip to wrapped child widget(s).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | string | content | Tooltip text |
| `content` | string | - | Text between the tags as tooltip |

```html
<Tooltip text="Save the file">
  <Button on_click="save">Save</Button>
</Tooltip>
```

## TextArea

Multiline text editor. Scrolls internally; good for log/terminal-style output or
editing longer text.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | string | - | Initial text, or `{$state}` template to sync from |
| `placeholder` | string | - | Hint shown when empty |
| `on_change` | string | - | Handler(text) |
| `readonly` | boolean | false | Disable editing |
| `height` | integer | - | Fixed height in px (default grows) |
| `bind` | string | - | Two-way bind to state key |

```html
<TextArea placeholder="Type a message..." bind="draft" height="120"/>
```

## Scroll

Scrollable container for overflowing content (long lists, logs, etc.). Same
props as `Column`/`Row` plus `axis`; children are placed inside a scroll view.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `axis` | string | `y` | `y` (vertical) or `x` (horizontal) |
| `bg` | string | - | Background color |

```html
<Scroll height="200">
  <For each="line" in="{$log}">
    <Text>{$line}</Text>
  </For>
</Scroll>
```

## Web

iframe-like embedded web view. Requires `PySide6-Addons` (ships with
`pip install PySide6`).

| Prop | Type | Description |
|------|------|-------------|
| `src` | string | URL to load |
| `html` | string | Inline HTML (used when no `src`); accepts `{$state}` templates |

```html
<Web src="https://example.com" height="300"/>
<Web height="300" html="<iframe width='100%' height='288' src='https://player.vimeo.com/video/1'/></iframe>"/>
```

## Async Task in Script (invoke_async)

Long-running work should never touch Qt widgets directly or it will freeze the
UI. Run it in a background thread with `app.invoke_async(handler, done=fn)`.
`handler` only computes; `done(result, error)` runs back on the main thread and
is the safe place to update `state`.

```html
<Window width="480" height="360">
  <Column>
    <Text size="16" bold>{$status}</Text>
    <Button on_click="run_task">Compute</Button>
  </Column>
</Window>
```

```python
<script>
def run_task():
    state.status = "working..."
    def work():
        import time
        time.sleep(1)
        return 42
    def done(result, error):
        state.result = result if error is None else str(error)
        state.status = "done"
    app.invoke_async(work, done=done)
</script>
```

## Two-Way Binding

Form components accept a `bind` prop. The value is written back to `state`
when the user changes the widget; the widget keeps updating from `state` too.

| Component | `bind` writes |
|-----------|---------------|
| `Input` | text (string) |
| `Checkbox` | checked (bool) |
| `Slider` | value (int) |
| `TextArea` | text (string) |

```html
<Input bind="name"/>
<Checkbox bind="enabled">Enable</Checkbox>
<Slider min="0" max="10" bind="volume"/>
```

`bind` accepts `name`, `$name` or `{$name}`. Pair it with `value="{$name}"`
when the initial value should also come from state:

```html
<Input bind="name" value="{$name}"/>
```

## Default Props

Custom components can declare defaults. Any `name` the caller does not pass
falls back to `default`:

```html
<Component name="Card">
  <Prop name="label" default="Untitled"/>
  <Prop name="value" default="{$count}"/>
  <Column>
    <Text color="subtext">{$label}</Text>
    <Text size="22" bold>{$value}</Text>
  </Column>
</Component>
```

```html
<Card/>              <!-- label="Untitled", value={$count} -->
<Card label="Hi"/>   <!-- label="Hi" -->
```

## Animation Props (All Elements)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `animate` | string | - | "fade" \| "reveal" \| "slide-up" \| "slide-down" \| "slide-left" \| "slide-right" |
| `duration` | int | 260 | Animation duration (ms) |
| `delay` | int | 0 | Initial delay (ms) |
| `easing` | string | "out-cubic" | Easing curve |

```html
<Text animate="slide-up" duration="400" delay="100" easing="out-back">Animated</Text>
```
## Select

Native dropdown selector.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | list | `[]` | String options or `{$state}` list reference |
| `value` | string | `""` | Selected option |
| `on_change` | string | - | Handler receiving the selected string |
| `bind` | string | - | Two-way state binding |

```html
<Select items="{$options}" value="{$selected}" bind="selected" on_change="on_select"/>
```


## Dialog

Inline dialog panel. Use `open` to bind visibility and `on_accept` / `on_reject` for actions.

```html
<Dialog title="Confirm" open="{$show}" on_accept="confirm" on_reject="cancel">
  <Text>Continue?</Text>
</Dialog>
```

## Menu

Native popup menu. `items` accepts a string list or a `{$state}` list reference.

```html
<Menu label="Actions" items="{$actions}" bind="selected" on_select="select_action"/>
```

## Shortcut

Application-wide keyboard shortcut. Renders as a 0x0 placeholder, so it takes up no visual space.

| Prop | Type | Description |
|------|------|-------------|
| `keys` | string | Key combination, e.g. `Ctrl+S` |
| `on_press` | string | Handler invoked on activation |

```html
<Shortcut keys="Ctrl+S" on_press="save"/>
<Shortcut keys="Ctrl+Q" on_press="quit"/>
```

Both `keys` and `on_press` must be set for the shortcut to register. The scope is the whole application, so it fires whenever any window has focus.

## Form validation

Wrap fields in `<Form>`. Call `app.validate()` in a handler; failures are available in `app.validation_errors`.

```html
<Form>
  <Input required="true" min_length="3"/>
</Form>
```
