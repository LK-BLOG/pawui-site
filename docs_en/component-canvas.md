# Canvas: draw anything

`<Canvas>` hands you a QPainter and gets out of the way. Charts, sparklines,
gauges, custom indicators — anything a widget cannot express.

```xml
<Canvas width="320" height="180" on_draw="paint" on_press="click_at"/>
```

```python
def paint(p):
    w, h = p.size()
    p.clear("#ffffff")
    p.rect(10, 10, w - 20, h - 20, radius=12, fill="#f5f5f7", stroke="#d2d2d7")
    for i, value in enumerate([12, 30, 18, 44, 26]):
        p.rect(20 + i * 50, h - 20 - value * 3, 30, value * 3,
               radius=4, fill="#0071e3")
    p.text(16, 12, "Weekly", size=13, color="#1d1d1f", bold=True)

def click_at(x, y):
    print("clicked", x, y)
```

## The painter API

| Call | Does |
| --- | --- |
| `p.size()` | `(width, height)` |
| `p.clear(color)` | Fill the whole surface |
| `p.line(x1, y1, x2, y2, color, width)` | Line |
| `p.rect(x, y, w, h, radius, fill, stroke, width)` | Rectangle / rounded rect |
| `p.circle(cx, cy, r, fill, stroke, width)` | Circle |
| `p.arc(cx, cy, r, start, span, color, width)` | Arc, degrees |
| `p.polygon([(x, y), …], fill, stroke)` | Polygon |
| `p.text(x, y, text, size, color, bold)` | Text |
| `p.image(path, x, y, w, h)` | Image |
| `p.pen(color, width, dashed)` / `p.brush(color)` | Low-level control |

Colours are anything Qt understands (`#rrggbb`, rgba, named colours). `fill=None`
draws an outline only.

## Redrawing

`on_draw` runs on every repaint. To force one after data changes:

```python
app.query("#chart").widget.update()
```

An exception inside `on_draw` is reported to stderr and skipped — it will not
take the window down.
