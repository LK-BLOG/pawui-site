# 颜色令牌

PawUI 用一套「颜色令牌」把组件样式和主题解耦。改主题时，所有引用令牌的地方都会跟着变。

## 内置令牌

| 令牌 | dark | light | 用途 |
|------|------|-------|------|
| `background` | `#1e1e2e` | `#f5f5f7` | 窗口背景 |
| `surface` | `#282a36` | `#ffffff` | 卡片、输入框 |
| `text` | `#f8f8f2` | `#1d1d1f` | 正文 |
| `subtext` | `#a6adc8` | `#6e6e73` | 次要文字 |
| `accent` | `#7aa2f7` | `#0071e3` | 强调色 |
| `border` | `#44475a` | `#d2d2d7` | 边框、分割线 |
| `danger` | `#f7768e` | `#ff375f` | 危险/错误 |

## 在组件里使用

```html
<Text color="text">正文</Text>
<Text color="subtext">说明</Text>
<Button bg="accent" fg="background">主按钮</Button>
<Button bg="surface" fg="text">次按钮</Button>
<Text color="danger">错误</Text>
<Divider color="border"/>
```

也可以直接写十六进制：

```html
<Text color="#ff6b6b">自定义红</Text>
```

## 解析规则（重要）

任何字符串属性或文本内容，如果它的值**正好等于**一个令牌名，就会被替换成对应颜色：

```html
<Button bg="accent">      <!-- accent → #7aa2f7 -->
<Text color="surface"/>   <!-- surface → 对应色值 -->
```

连文本内容也适用：

```html
<Text>accent</Text>       <!-- 显示的是颜色值，不是 "accent" -->
```

要显示这些词本身，用插值：

```html
<Text>{"accent"}</Text>
```

## 自定义颜色

在顶层 `<Theme>` 里用 `<Color>` 定义具名颜色：

```html
<Theme extends="dark">
  <Color name="brand" value="#ff5c8a"/>
  <Color name="success" value="#3ddc97"/>
</Theme>
```

之后就能像内置令牌一样使用：

```html
<Text color="brand">品牌色</Text>
<Button bg="success" fg="background">成功</Button>
```

若 `name` 命中内置令牌（如 `accent`），则覆盖该令牌而非新建。

## 覆盖内置令牌

```html
<Theme extends="light">
  <Color name="accent" value="#7c3aed"/>
  <Color name="background" value="#fafafa"/>
</Theme>
```

## 用 Python 修改

```python
from pawui.theme import Theme

t = Theme.dark()
t.accent = "#ff6b6b"
t.apply({"brand": "#4ecdc4"})
app.set_theme(t)
```

## 为什么用令牌

```html
<!-- 好：跟随主题 -->
<Text color="subtext">说明</Text>

<!-- 避免：切主题时不变 -->
<Text color="#9aa0a6">说明</Text>
```

硬编码颜色会在深/浅主题下失去对比度。始终优先令牌。

## 下一步

- [主题](#/docs/theming) — 主题与切换
- [排版](#/docs/typography) — 字体与字号
