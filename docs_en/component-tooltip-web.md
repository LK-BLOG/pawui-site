# Tooltip & Web

Two special components: a hover-tooltip wrapper, and an embedded web view.

## Tooltip — hover hints

Wraps a child; shows a tooltip on hover.

| Attribute | Type | Notes |
|-----------|------|-------|
| `text` | str | Tooltip text (or as tag content) |

```html
<Tooltip text="Save the current file">
  <Button on_click="save">Save</Button>
</Tooltip>
```

The hint can also be the content:

```html
<Tooltip>Delete this item
  <Button on_click="remove" bg="surface" fg="danger">Delete</Button>
</Tooltip>
```

`Tooltip` is a container; the wrapped component keeps its layout, and the hint attaches to it.

## Web — embedded web view

Embeds a web view; requires an extra install:

```bash
pip install PySide6-Addons
```

| Attribute | Type | Notes |
|-----------|------|-------|
| `src` | str | URL to load |
| `html` | str | Inline HTML (used when `src` is empty) |
| `bg` | str | Background |

```html
<Web src="https://example.com"/>
```

Or inject local HTML:

```html
<Web html="<h1>Hello Web</h1><p>Inline HTML</p>" expand="true"/>
```

Without `PySide6-Addons`:

```
PawUI error: Web component requires PySide6-Addons
```

## Pattern: help button

```html
<Tooltip text="Open help docs">
  <Button on_click="open_help" bg="surface" fg="text">?</Button>
</Tooltip>
```

## Pattern: embedded docs

```html
<Window title="Docs" width="820" height="600">
  <Column padding="12" spacing="10" expand="true">
    <Row spacing="8">
      <Input bind="url" value="{$url}" placeholder="https://..." expand="true"/>
      <Button on_click="go">Go</Button>
    </Row>
    <Web src="{$url}" expand="true"/>
  </Column>
</Window>

<script>
state.url = "https://pypi.org/project/pawui/"

def go():
    pass   # url is already bound back via value
</script>
```

> `src` supports templates, but the web view is created at build time; changing `url` may require rebuilding the UI to load the new address.

## Notes

- `Web` significantly increases bundle size (QtWebEngine); exclude it with `--exclude-module` when unused.
- `Tooltip`'s hint triggers over the wrapped widget's hover area.

## Next

- [Components](#/components) — all components
- [Packaging](#/packaging) — excluding the Web module
