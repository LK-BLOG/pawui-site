# Checkbox

An iOS-style toggle; the label is written between the tags.

## Attributes

| Attribute | Type | Default | Notes |
|-----------|------|---------|-------|
| `checked` | bool | `false` | Initial state |
| `on_change` | str | — | Calls `handler(checked)` on toggle |
| `size` | int | 12 | Label font size |
| `fg` | str | `text` | Label color |
| `bind` | str | — | Writes back to state |

```html
<Checkbox bind="auto_save" checked="true">Auto save</Checkbox>
<Checkbox bind="notifications" on_change="on_toggle">Desktop notifications</Checkbox>
```

## Events and binding

```python
def on_toggle(checked):
    state.enabled = checked
```

`on_change` receives a boolean. If you only need the state, use `bind` with no handler:

```html
<Checkbox bind="agreed">I agree</Checkbox>
```

`bind` writes the toggle state to `state.agreed`.

## Reading the toggle state

```python
if state.agreed:
    ...
```

When unchecked and uninitialized, `state.agreed` may be `""` (falsy); for a strict boolean use `state.get("agreed", False)`, or initialize:

```python
state.agreed = False
```

## Dynamic label

Label content supports interpolation:

```html
<Checkbox bind="enabled">Feature enabled</Checkbox>
```

## Common patterns

### Settings list

```html
<Column spacing="12" padding="16">
  <Checkbox bind="opt_auto_save" checked="true">Auto save</Checkbox>
  <Checkbox bind="opt_sync">Cloud sync</Checkbox>
  <Checkbox bind="opt_updates" checked="true">Auto update</Checkbox>
</Column>
```

### Unlock an action

```html
<Checkbox bind="agreed">I have read and agree</Checkbox>
<Button on_click="proceed">Continue</Button>
```

Combine with conditional rendering to hide/disable until checked (`disabled` doesn't react to state, so switch between two buttons with `<If>`):

```html
<If condition="{$agreed}">
  <Button on_click="proceed">Continue</Button>
</If>
<If condition="{$not_agreed}">
  <Button disabled>Please agree first</Button>
</If>
```

## Next

- [Forms](#/docs/forms) — form fields
- [Data Binding](#/docs/data-binding) — write-back rules
