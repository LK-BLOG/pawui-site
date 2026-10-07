# Extra fields & display: Alert, GroupBox, DoubleInput, DateTimePicker, ColorPicker, Dial, LCD, Tree

The eight components added in 0.1.3.4 — all Qt widgets that PawUI had not exposed yet.

## `<Alert>`

```xml
<Alert kind="warning" title="Heads up">Disk is almost full.</Alert>
```

An inline message bar. `kind` is `info` / `success` / `warning` / `error` (`danger` aliases
`error`). Colors come from the theme status colors (`theme.accent` / `success` / `warning` /
`danger`), so the same `kind` matches `app.toast()`.

| prop | type | default | notes |
| --- | --- | --- | --- |
| `kind` | string | `info` | info / success / warning / error |
| `title` | string | `""` | bold title; omit for body only |
| `accent` | color | by kind | override the bar color |
| `radius` | integer | `10` | corner radius |
| `shadow` | boolean | theme `shadow` | drop shadow |

Body goes between the tags, or in the `text` prop.

## `<GroupBox>`

```xml
<GroupBox title="Advanced" shadow="true"><Input/></GroupBox>
```

A titled group container. It is a container, so it accepts any children plus
`justify` / `align` / `padding` / `gap`.

| prop | type | default | notes |
| --- | --- | --- | --- |
| `title` | string | `""` | group title (drawn on the border) |
| `bg` | color | `surface` | background |
| `radius` | integer | `10` | corner radius |
| `shadow` | boolean | `false` | drop shadow |

## `<DoubleInput>`

```xml
<DoubleInput min="0" max="1" step="0.01" value="{$ratio}" bind="ratio"/>
```

Float input (`QDoubleSpinBox`). `<NumberInput>` only takes integers; use this for decimals.

| prop | type | default | notes |
| --- | --- | --- | --- |
| `min` / `max` | number | `0` / `100` | range |
| `step` | number | `0.1` | step |
| `decimals` | integer | `2` | decimal places |
| `value` | number / `{$x}` | — | initial value |
| `readonly` | boolean | `false` | read-only |
| `on_change` | handler | — | receives a `float` |
| `bind` | string | — | write back to state |

## `<DateTimePicker>`

```xml
<DateTimePicker value="2026-09-27T13:45" on_change="on_when"/>
```

Date **and** time in one widget (`QDateTimeEdit`). The value is an ISO string, so it replaces a
`<DatePicker>` + `<TimePicker>` pair.

| prop | type | default | notes |
| --- | --- | --- | --- |
| `value` | string | — | ISO datetime |
| `format` | string | `yyyy-MM-dd HH:mm` | display format |
| `calendar` | boolean | `true` | calendar popup |
| `on_change` | handler | — | receives an ISO string |
| `bind` | string | — | write back to state |

## `<ColorPicker>`

```xml
<ColorPicker value="{$picked}" bind="picked"/>
```

A swatch button that opens the system color dialog; the value is `#rrggbb`.

| prop | type | default | notes |
| --- | --- | --- | --- |
| `value` | string | `#ffffff` | current color |
| `size` | integer | `34` | swatch height (width is 2x) |
| `radius` | integer | `8` | corner radius |
| `title` | string | `""` | dialog title |
| `on_change` | handler | — | receives `#rrggbb` |
| `bind` | string | — | write back to state |

## `<Dial>`

```xml
<Dial min="0" max="100" value="{$volume}" bind="volume" text="true"/>
```

A knob (`QDial`) — good for volume/brightness-style input.

| prop | type | default | notes |
| --- | --- | --- | --- |
| `min` / `max` | integer | `0` / `100` | range |
| `step` | integer | `1` | step |
| `value` | integer | `0` | current value |
| `size` | integer | `64` | widget size |
| `notches` | boolean | `true` | show notches |
| `text` | boolean | `false` | show the value below |
| `on_change` | handler | — | receives an `int` |
| `bind` | string | — | write back to state |

## `<LCD>`

```xml
<LCD value="{$count}" digits="4" color="accent"/>
```

Seven-segment style number display (`QLCDNumber`).

| prop | type | default | notes |
| --- | --- | --- | --- |
| `value` | integer / `{$x}` | `0` | number to show |
| `digits` | integer | `4` | digit count |
| `color` | color | `accent` | digit color |
| `radius` | integer | `8` | corner radius |

## `<Tree>`

```xml
<Tree headers="Name,Kind" height="200" items="{$nodes}" on_select="on_pick"/>
```

A tree view (`QTreeWidget`). `items` takes nested dicts (or a flat string list):

```python
state.nodes = [
    {"label": "Layout", "items": [{"label": "Window"}, {"label": "Column"}]},
    {"label": "Data", "items": [{"label": "Table"}]},
]
```

Each node is `{"label": ..., "items": [...]}` (`text` / `children` are aliases).

| prop | type | default | notes |
| --- | --- | --- | --- |
| `items` | array | `[]` | nested nodes; supports `{$state}` |
| `headers` | string | `""` | comma-separated column names; empty hides header |
| `height` | integer | — | fixed height |
| `indent` | integer | `16` | indent width |
| `radius` | integer | `10` | corner radius |
| `on_select` | handler | — | receives the node text |
| `bind` | string | — | write back to state |

All nodes are expanded by default.
