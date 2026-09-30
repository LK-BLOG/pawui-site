# Custom Components

## Defining Components

```html
<Component name="Card">
  <Column padding="16" spacing="8" bg="surface" radius="12">
    <Text size="12" color="subtext">{$label}</Text>
    <Text size="20" bold="true">{$value}</Text>
  </Column>
</Component>
```

## Using Components

```html
<Card label="Users" value="{$user_count}"/>
<Card label="Revenue" value="{$revenue}"/>
```

### Props

- Passed as attributes: `<Card label="x" value="y"/>`
- Accessed inside as `{$propName}`
- All props are strings (interpolated if template)

## Component Scope

Each component instance gets its own scope with:
- Passed props
- Parent scope (inherited)
- Can reference state and theme colors

```html
<Component name="UserCard">
  <Column padding="12" bg="surface" radius="8">
    <Row spacing="8">
      <Text size="16" bold="true">{$name}</Text>
      <Badge color="{$role_color}">{$role}</Badge>
    </Row>
    <Text size="13" color="subtext">{$email}</Text>
  </Column>
</Component>

<!-- Usage -->
<UserCard name="Alice" role="Admin" role_color="danger" email="alice@example.com"/>
```

## Nested Components

```html
<Component name="Page">
  <Column spacing="20">
    <Header title="{$title}"/>
    <Content>{$content}</Content>
    <Footer/>
  </Column>
</Component>

<Component name="Header">
  <Row spacing="16">
    <Text size="24" bold="true">{$title}</Text>
    <Spacer/>
    <Button on_click="go_back">Back</Button>
  </Row>
</Component>
```

## Default Props Pattern

Since there's no native default props yet, handle in script:

```html
<Component name="Button">
  <script>
  # In parent script or component script
  # state.button_variant = state.get("variant", "primary")
  </script>
  <Button bg="{$variant}" on_click="{$on_click}">{$label}</Button>
</Component>
```

## Dynamic Components

Components can be conditionally rendered using state:

```html
<Window>
  <Column>
    <Header/>
    <If condition="{$show_content}">
      <Content/>
    </If>
    <Footer/>
  </Column>
</Window>
```

Note: `<If>` and `<For>` are planned features (see roadmap).

## Best Practices

1. **Single responsibility** - One component, one purpose
2. **Props as interface** - Don't reach into parent state directly
3. **Use semantic names** - `UserCard` not `Div1`
4. **Keep templates simple** - Complex logic in script
5. **Reuse built-ins** - Compose from Column, Row, Text, etc.