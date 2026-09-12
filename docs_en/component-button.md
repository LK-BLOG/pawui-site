# Button

A clickable button; its label is written between the tags.

## Attributes

| Attribute | Type | Default | Notes |
|-----------|------|---------|-------|
| `on_click` | str | — | Click handler name |
| `bg` | str | `accent` | Background |
| `fg` | str | `background` | Text color |
| `size` | int | 12 | Font size |
| `radius` | int | 17 | Corner radius |
| `disabled` | bool | `false` | Disabled |

```html
<Button on_click="save">Save</Button>
<Button on_click="cancel" bg="surface" fg="text">Cancel</Button>
<Button bg="danger" fg="background" on_click="delete">Delete</Button>
<Button disabled>Unavailable</Button>
```

Hover and pressed states are handled automatically (blending the base color), no manual styling needed.

## Handlers

`on_click` resolves a function by name from the script. Zero-arg or arg-taking both work; click events carry no value, so zero-arg is typical:

```python
def save():
    ...
```

Dynamic handlers can come from a template too: `<Button on_click="{$handler}">`.

## Primary / secondary

Differentiate hierarchy with `bg`/`fg`:

```html
<Row spacing="10">
  <Button on_click="submit">Primary</Button>
  <Button on_click="later" bg="surface" fg="text">Secondary</Button>
  <Button on_click="cancel" bg="surface" fg="subtext">Cancel</Button>
</Row>
```

## Icon buttons

There is no icon prop; use a symbol or short text, or compose with `<Image>`:

```html
<Button on_click="close" bg="surface" fg="subtext" radius="17">×</Button>
```

## Full width

`expand` makes a button fill the remaining space in its container:

```html
<Column spacing="10" padding="24">
  <Button on_click="login" expand="true">Sign in</Button>
</Column>
```

## Disabling by state

`disabled` is resolved at build time and does not react to state. To control it dynamically, rebuild the UI, or render two buttons conditionally:

```html
<If condition="{$valid}">
  <Button on_click="submit">Submit</Button>
</If>
<If condition="{$invalid}">
  <Button disabled>Submit</Button>
</If>
```

## Buttons as navigation

Buttons also work as menu/sidebar items:

```html
<For each="item" in="{$nav}">
  <Button on_click="{$select}" bg="surface" fg="text">{$item}</Button>
</For>
```

## Next

- [Input](#/component-input) — text input
- [Events](#/events) — handler rules
