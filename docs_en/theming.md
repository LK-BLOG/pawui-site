# Theming

## Built-in Themes

```html
<Window theme="light">   <!-- Default: light + blue accent -->
<Window theme="dark">
```

## Customizing Colors

```html
<Theme extends="dark">
  <Color name="accent" value="#8b5cf6"/>
  <Color name="danger" value="#ef4444"/>
</Theme>
```

### Built-in Color Names

| Name | Dark Default | Light Default | Usage |
|------|--------------|---------------|-------|
| `background` | #1e1e2e | #f5f5f7 | Window background |
| `surface` | #282a36 | #ffffff | Card/input background |
| `text` | #f8f8f2 | #1d1d1f | Primary text |
| `subtext` | #a6adc8 | #6e6e73 | Secondary text |
| `accent` | #7aa2f7 | #0071e3 | Primary actions |
| `border` | #44475a | #d2d2d7 | Borders, dividers |
| `danger` | #f7768e | #ff375f | Errors, destructive |

### Custom Colors

Any other name becomes a custom color:

```html
<Theme extends="dark">
  <Color name="brand" value="#22d3ee"/>
  <Color name="success" value="#22c55e"/>
  <Color name="warning" value="#f59e0b"/>
</Theme>

<!-- Use in components -->
<Text color="brand">Brand text</Text>
<Button bg="success">Success</Button>
<Column bg="warning">Warning panel</Column>
```

## Theme Object API

```python
# In script
app.theme.accent = "#ff0000"
app.theme.custom["brand"] = "#00ff00"

# Or replace entirely
app.set_theme("light")
app.refresh()
```

## Color Resolution Priority

1. Component prop value
2. Theme custom colors
3. Built-in theme colors
4. Fallback

## QSS Generation

The theme generates Qt stylesheet for global styles. Component-specific styles (buttons, inputs) are set inline to avoid conflicts.
