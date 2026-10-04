# Dialogs & pickers: Dialog, Menu, Shortcut, Select

Usage for the `Dialog` / `Menu` / `Shortcut` / `Select` components. They live in
different README categories, so they are documented together here.

## `<Select>`

```xml
<Select items="[Day, Week, Month]" value="{$range}" bind="range" on_change="on_range"/>
<Select items="{$cities}" placeholder="Pick a city"/>
```

A native dropdown (`QComboBox`). `items` accepts an inline array or a `{$state}`
reference; the list rebuilds when the state changes.

| prop | type | default | notes |
| --- | --- | --- | --- |
| `items` | array | `[]` | options; `[a, b, c]` or `{$list}` |
| `value` | string | `""` | current option; `{$x}` follows state both ways |
| `on_change` | handler | — | receives the selected text (`str`) |
| `bind` | string | — | writes the selected text back to this state key |

`<Select>` vs `<Segmented>`: use `<Segmented>` for 2–5 options you want visible
at once; use `<Select>` when the list is long or horizontal space is tight.

## `<Dialog>`

```xml
<Dialog title="Confirm delete" open="{$show}"
        cancel="Cancel" accept="Delete"
        on_accept="do_delete" on_reject="cancel_it">
  <Text>This record will be permanently deleted.</Text>
</Dialog>
```

An inline dialog panel: title, footer buttons, content area. It is not a popup
window — visibility is driven by `open`, so it binds directly to state.

| prop | type | default | notes |
| --- | --- | --- | --- |
| `title` | string | `""` | title text; empty hides the title row |
| `open` | boolean | `true` | visibility; `{$show}` follows state |
| `cancel` | string | `"Cancel"` | **label** of the cancel button; empty hides it |
| `accept` | string | `"OK"` | **label** of the accept button; empty hides it |
| `on_accept` | handler | — | called on accept, no args |
| `on_reject` | handler | — | called on cancel, no args |
| `radius` | integer | `12` | panel corner radius |
| `button_radius` | integer | `10` | button corner radius |

`cancel` / `accept` are button **labels**, not callbacks — the callbacks are
`on_reject` / `on_accept`.

## `<Menu>`

```xml
<Menu label="File" items="[Open, Save, Quit]" on_select="on_file" bind="picked"/>
```

A button that opens a native menu.

| prop | type | default | notes |
| --- | --- | --- | --- |
| `label` | string | `"Menu"` | button text |
| `items` | array | `[]` | menu items; `[a, b, c]` or `{$list}` |
| `on_select` | handler | — | receives the selected item text (`str`) |
| `bind` | string | — | writes the selected item text back to this state key |
| `bg` | color | `surface` | button background (theme token) |
| `fg` | color | `text` | button text color |
| `radius` | integer | `10` | button corner radius |

Items are plain text — no submenus or icons.

## `<Shortcut>`

```xml
<Shortcut keys="Ctrl+S" on_press="save"/>
```

An application-wide keyboard shortcut. It takes **no visual space** (the widget
is 0×0), so it can sit anywhere inside `<Window>`.

| prop | type | default | notes |
| --- | --- | --- | --- |
| `keys` | string | — | Qt shortcut string, e.g. `Ctrl+S`, `Ctrl+Shift+F` |
| `on_press` | handler | — | called on press, no args |
