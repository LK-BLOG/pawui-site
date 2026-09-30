# Canvas：想画什么画什么

`<Canvas>` 把 QPainter 交给你就不管了。图表、迷你走势、仪表盘、自定义指示器 —— 控件表达不了的都归它。

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
    p.text(16, 12, "本周", size=13, color="#1d1d1f", bold=True)

def click_at(x, y):
    print("点击", x, y)
```

## 画笔 API

| 调用 | 作用 |
| --- | --- |
| `p.size()` | `(宽, 高)` |
| `p.clear(color)` | 填满整块画布 |
| `p.line(x1, y1, x2, y2, color, width)` | 直线 |
| `p.rect(x, y, w, h, radius, fill, stroke, width)` | 矩形 / 圆角矩形 |
| `p.circle(cx, cy, r, fill, stroke, width)` | 圆 |
| `p.arc(cx, cy, r, start, span, color, width)` | 圆弧，单位是度 |
| `p.polygon([(x, y), …], fill, stroke)` | 多边形 |
| `p.text(x, y, text, size, color, bold)` | 文字 |
| `p.image(path, x, y, w, h)` | 图片 |
| `p.pen(color, width, dashed)` / `p.brush(color)` | 底层控制 |

颜色是 Qt 认的任意写法（`#rrggbb`、rgba、颜色名）。`fill=None` 只描边。

## 重画

`on_draw` 每次重绘都会跑。数据变了要强制重画：

```python
app.query("#chart").widget.update()
```

`on_draw` 里抛异常会打到 stderr 然后跳过，不会把窗口带崩。
