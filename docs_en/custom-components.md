# Custom Components

Package repeated UI into reusable components. Define with `<Component name="...">` and use like a built-in tag.

## Defining a component

```html
<Component name="Card">
  <Column padding="16" bg="surface" radius="12" spacing="8">
    <Text size="16" bold>{$title}</Text>
    <Text size="13" color="subtext">Placeholder content</Text>
  </Column>
</Component>
```

Definitions live at the top level (alongside `<Window>`) and are not rendered directly.

## Using a component

```html
<Window title="Cards">
  <Column padding="20" spacing="12">
    <Card title="First"/>
    <Card title="Second"/>
  </Column>
</Window>
```

The `title` attribute is referenced inside the component via `{$title}`.

## Default properties with `<Prop>`

`<Prop>` declares a default used when the attribute is omitted:

```html
<Component name="Badge">
  <Prop name="text" default="Tag"/>
  <Prop name="color" default="accent"/>
  <Text size="12" bold color="{$color}" bg="surface" radius="999" padding="4 8">
    {$text}
  </Text>
</Component>

<Badge text="New" color="accent"/>
<Badge text="Normal"/>          <!-- default color -->
<Badge/>                         <!-- all defaults -->
```

## Attribute resolution order

When a name is referenced inside a component, it resolves in this order:

1. Attribute passed at the call site (`<Card title="...">`)
2. `<Prop>` `default`
3. Outer scope / state / theme

So components can read external state and be overridden by arguments:

```html
<Component name="Stat">
  <Prop name="value" default="0"/>
  <Column padding="16" bg="surface" radius="12">
    <Text size="28" bold color="accent">{$value}</Text>
    <Text size="12" color="subtext">{$label}</Text>
  </Column>
</Component>
```

```html
<Stat value="{$user_count}" label="Users"/>
<Stat value="{$order_count}" label="Orders"/>
```

## Passing event handlers

`on_*` attributes are special-cased — passed as callables into the component scope:

```html
<Component name="ActionButton">
  <Button on_click="{$on_click}" bg="accent">{$label}</Button>
</Component>
```

```html
<ActionButton label="Save" on_click="save"/>
<ActionButton label="Cancel" on_click="cancel"/>
```

## Visibility

- A component definition takes no layout and renders nothing itself.
- The component's **root element** replaces the call site.
- Components may nest other custom components.

```html
<Component name="Panel">
  <Column padding="16" bg="surface" radius="14" spacing="10">
    <Badge text="{$status}"/>
    <Text size="15" bold>{$heading}</Text>
    {$body}
  </Column>
</Component>
```

## Complete example

```html
<Window title="Components" width="420" height="420" theme="dark">
  <Column padding="24" spacing="16">
    <Text size="22" bold color="accent">User cards</Text>
    <For each="user" in="{$users}">
      <UserCard name="{$user.name}" role="{$user.role}" on_click="pick"/>
    </For>
  </Column>
</Window>

<Component name="UserCard">
  <Prop name="name" default="Anonymous"/>
  <Prop name="role" default="Guest"/>
  <Row padding="14" bg="surface" radius="12" spacing="12">
    <Column spacing="2" expand>
      <Text size="15" bold>{$name}</Text>
      <Text size="12" color="subtext">{$role}</Text>
    </Column>
    <Button on_click="{$on_click}" bg="accent">Pick</Button>
  </Row>
</Component>

<script>
state.users = [
    {"name": "Alice", "role": "Admin"},
    {"name": "Bob", "role": "Editor"},
]

def pick():
    state.selected = "Selected"
</script>
```

## Notes

- Component names are case-sensitive; they must match `<Component name="...">` exactly.
- A component must have a root body element, or you'll get `component <X> has no body`.
- Component attributes are resolved **statically** (once per build). Rebuild the UI (`app.refresh()` or a state binding) to reflect changes.

## Next

- [Syntax](#/syntax) — related grammar
- [State & Scripts](#/state-scripts) — drive components with state
