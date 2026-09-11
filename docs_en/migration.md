# Migration Guide

If you come from Tkinter, PyQt/PySide, or another declarative UI, this page maps the concepts.

## From Tkinter / PyQt

| Traditional | PawUI equivalent |
|-------------|------------------|
| `QWidget` / `tk.Frame` | `<Column>` / `<Row>` containers |
| `QLabel` | `<Text>` |
| `QPushButton` | `<Button>` |
| `QLineEdit` | `<Input>` |
| `QPlainTextEdit` | `<TextArea>` |
| `QCheckBox` (iOS-style via `QAbstractButton`) | `<Checkbox>` |
| `QSlider` | `<Slider>` |
| `QProgressBar` | `<Progress>` |
| `QScrollArea` | `<Scroll>` |
| `QTabWidget` | `<Tabs>` / `<Tab>` |
| `QVBoxLayout` / `QHBoxLayout` | `<Column>` / `<Row>` |
| `signal.connect(handler)` | `on_click="handler"` |
| Manual `setText` refresh | `state` + `{$var}` auto-refresh |
| `.setStyleSheet(...)` | Theme tokens / `bg` / `fg` |

## Key mindset shifts

### Imperative → declarative

Traditional:

```python
def on_click():
    count += 1
    label.setText(str(count))   # manual update
```

PawUI:

```python
def on_click():
    state.count += 1            # UI refreshes itself
```

```html
<Text>{$count}</Text>
```

Don't find widgets and set text in handlers — only change state.

### Layout → nested containers

No coordinates or manual packing. Express structure with nested `<Column>`/`<Row>`, and control spacing/flex with `padding`/`spacing`/`expand`.

### Signals → named handlers

No signal connections; give a component a handler **name**, and the runtime looks up a function of that name in the script:

```html
<Button on_click="save">Save</Button>
```

### Styling → tokens

No QSS; use color tokens (`accent`/`surface`/`subtext`…). Themes adapt automatically without rewriting styles.

## One-time migration checklist

- [ ] Move window size/title into `<Window>` attributes.
- [ ] Rewrite the widget tree as containers + component tags.
- [ ] Centralize mutable data in `state`.
- [ ] Convert signal handlers into `<script>` top-level functions, referenced via `on_*`.
- [ ] Replace hardcoded colors with theme tokens.
- [ ] Verify piece by piece with `pawui check`.

## Versus other declarative frameworks

| Concept | Other frameworks | PawUI |
|---------|------------------|-------|
| State | `useState` / signal | `state.key` |
| Interpolation | `{value}` | `{$value}` |
| Condition | `v-if` / `if` | `<If condition="{$flag}">` |
| Loop | `v-for` / `ForEach` | `<For each="i" in="{$list}">` |
| Two-way binding | `v-model` | `bind="key"` |
| Components | `.vue` / function | `<Component name="...">` |
| Styling | CSS / Tailwind | Theme tokens |

## A side-by-side

A counter, two ways:

```python
# PyQt-style (illustrative)
class App(QWidget):
    def __init__(self):
        super().__init__()
        self.count = 0
        self.label = QLabel("0")
        btn = QPushButton("+1")
        btn.clicked.connect(self.inc)
        ...
    def inc(self):
        self.count += 1
        self.label.setText(str(self.count))
```

```html
<!-- PawUI -->
<Window title="Counter" width="380" height="280">
  <Column padding="32" spacing="16">
    <Text size="48" bold>{$count}</Text>
    <Button on_click="inc">+1</Button>
  </Column>
</Window>

<script>
state.count = 0
def inc():
    state.count += 1
</script>
```

## Next

- [Getting Started](#/docs/getting-started) — from zero
- [Data Binding](#/docs/data-binding) — reactivity details
