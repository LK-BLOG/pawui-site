# Accessibility

PawUI maps the `aria-*` attributes you already know onto Qt's accessibility
layer, which is what NVDA, Narrator and VoiceOver read.

```xml
<Button aria_label="Save document" aria_description="Writes changes to disk">Save</Button>
<Text tabindex="-1">Decorative caption</Text>
```

| Prop | Qt | Effect |
| --- | --- | --- |
| `aria_label` | `accessibleName` | What the screen reader announces |
| `aria_description` | `accessibleDescription` | Extra detail on demand |
| `title` | tooltip + description | Hover text |
| `tabindex="0"` | `StrongFocus` | Reachable with Tab |
| `tabindex="-1"` | `NoFocus` | Skipped by Tab |

## Sensible defaults

If you skip `aria_label`, PawUI uses the widget's own text, so `<Text>Total</Text>`
and `<Button>Save</Button>` are announced correctly without any extra work. Only
add `aria_label` when the visual text is not enough, such as an icon-only button:

```xml
<Button aria_label="Close panel">✕</Button>
```

## Keyboard order

Tab order follows the order widgets appear in the tree, top to bottom. Set
`tabindex="-1"` on decorative elements so keyboard users do not get stuck on
them. `pawui inspect` prints the `aria` name it computed for every element, which
makes a missing label obvious.
