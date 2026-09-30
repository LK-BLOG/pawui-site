# Syntax Reference

## File Structure

```html
<!-- Comments are supported -->
<Theme extends="dark">
  <Color name="accent" value="#8b5cf6"/>
</Theme>

<Component name="MyComponent">
  <!-- Component template -->
</Component>

<Window title="App" width="800" height="600" theme="dark">
  <!-- UI content -->
</Window>

<script>
# Python code here
def handler():
    pass
</script>
```

## Value Interpolation

Three equivalent syntaxes:

```html
<Text>{$count}</Text>
<Text>{count}</Text>
<Text>$count</Text>
```

Rules:
- Names (plus attribute / index paths): `{$user.name}`, `{$items[0]}`, `{$row[0].label}`
- Resolves from: component props → state → script namespace → theme colors
- Computed values go in `<script>`

## Control Flow

```html
<If condition="{$logged_in}">...</If>
<For each="item" in="{$items}">...</For>
<Select items="{$options}" bind="selected"/>
```

See [State & Scripts](state-scripts.md#control-flow).

## Events

```html
<Button on_click="handle_click">Click</Button>
<Input on_change="on_text_change" on_enter="on_submit"/>
<Checkbox on_change="on_toggle"/>
```

- `on_click` - no arguments
- `on_change` on Input - receives string
- `on_change` on Checkbox - receives boolean
- `on_enter` on Input - receives current text

## Attributes

```html
<!-- Quoted -->
<Window title="My App" width="800"/>

<!-- Unquoted (simple values) -->
<Window title=App width=800/>

<!-- Boolean -->
<Button disabled/>
<Checkbox checked/>

<!-- Self-closing -->
<Input/>
<Divider/>
<Spacer height="20"/>
```

## Layout

```html
<!-- Vertical stack -->
<Column padding="20" spacing="10">
  <Text>First</Text>
  <Text>Second</Text>
</Column>

<!-- Horizontal stack -->
<Row spacing="10">
  <Button>One</Button>
  <Button>Two</Button>
</Row>

<!-- Nested -->
<Column>
  <Row>
    <Text>Left</Text>
    <Text>Right</Text>
  </Row>
</Column>
```

## Stagger Animation

```html
<Column stagger="50">
  <Text animate="slide-up">Item 1</Text>
  <Text animate="slide-up">Item 2</Text>
  <Text animate="slide-up">Item 3</Text>
</Column>
```

Each child gets `delay + index * stagger` ms delay.