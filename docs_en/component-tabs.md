# Tabs

Split content into switchable pages.

## Structure

```html
<Tabs>
  <Tab label="General">
    <Column padding="16" spacing="10">
      <Text>General settings</Text>
    </Column>
  </Tab>
  <Tab label="Advanced">
    <Column padding="16" spacing="10">
      <Text>Advanced settings</Text>
    </Column>
  </Tab>
</Tabs>
```

- `<Tabs>` is the container; each inner `<Tab>` is a page.
- `label` is the tab text; supports templates.
- Each `<Tab>` can hold any layout.

## Attributes

| Tag | Attribute | Type | Default | Notes |
|-----|-----------|------|---------|-------|
| `Tabs` | `bg` | str | `background` | Selected-page background |
| `Tab` | `label` | str | `"Tab"` | Tab text |

```html
<Tabs bg="surface">
  <Tab label="Home"><Text>Home</Text></Tab>
  <Tab label="Settings"><Text>Settings</Text></Tab>
</Tabs>
```

## Dynamic labels

Labels support interpolation:

```html
<Tab label="{$tab_name}">
  <Text>Content</Text>
</Tab>
```

## Direct children

Direct children that aren't `<Tab>` become a page with a default label. Always use `<Tab label="...">` explicitly.

## Pattern: settings panel

```html
<Window title="Settings" width="460" height="420" theme="dark">
  <Column padding="20" spacing="16">
    <Text size="22" bold>Preferences</Text>
    <Tabs>
      <Tab label="General">
        <Column padding="16" spacing="14">
          <Checkbox bind="auto_save" checked="true">Auto save</Checkbox>
          <Checkbox bind="notifications">Desktop notifications</Checkbox>
        </Column>
      </Tab>
      <Tab label="Appearance">
        <Column padding="16" spacing="14">
          <Text size="13" color="subtext">Theme</Text>
          <Button on_click="toggle_theme" bg="surface" fg="text">Toggle dark / light</Button>
        </Column>
      </Tab>
      <Tab label="Sound">
        <Column padding="16" spacing="14">
          <Text size="13" color="subtext">Volume: {$volume}</Text>
          <Slider min="0" max="100" value="{$volume}" bind="volume"/>
        </Column>
      </Tab>
    </Tabs>
  </Column>
</Window>
```

```python
state.auto_save = True
state.notifications = False
state.volume = 60
state.dark = True

def toggle_theme():
    state.dark = not state.dark
    app.set_theme("dark" if state.dark else "light")
```

## Current tab

PawUI doesn't expose the active tab index; for per-tab logic, give each section its own component and handlers.

## Next

- [Layout](#/docs/layout) — container nesting
- [Settings recipe](#/docs/recipes) — a full settings screen
