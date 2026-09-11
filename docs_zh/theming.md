# 主题

PawUI 内置 `dark` / `light` 两套主题，并通过**颜色令牌**统一组件样式。你可以覆盖令牌或添加自定义颜色。

## 选择主题

在 `<Window>` 上指定：

```html
<Window theme="dark"> ... </Window>
<Window theme="light"> ... </Window>
```

默认是 `dark`。

## 颜色令牌

| 令牌 | dark 默认 | light 默认 | 用途 |
|------|-----------|------------|------|
| `background` | `#1e1e2e` | `#f5f5f7` | 窗口背景 |
| `surface` | `#282a36` | `#ffffff` | 卡片、输入框 |
| `text` | `#f8f8f2` | `#1d1d1f` | 正文 |
| `subtext` | `#a6adc8` | `#6e6e73` | 次要文字 |
| `accent` | `#7aa2f7` | `#0071e3` | 强调色 |
| `border` | `#44475a` | `#d2d2d7` | 边框、分割线 |
| `danger` | `#f7768e` | `#ff375f` | 危险 / 错误 |

在组件里直接用令牌名：

```html
<Text color="text">正文</Text>
<Text color="subtext">说明</Text>
<Text color="accent">强调</Text>
<Text color="danger">错误</Text>
<Button bg="surface" fg="text">次要按钮</Button>
```

也可以直接写 hex：

```html
<Text color="#ff6b6b">自定义红</Text>
```

## 自定义主题

用顶层 `<Theme>` 元素覆盖颜色。`extends` 指定基础主题，`<Color>` 覆盖单个令牌或定义新颜色：

```html
<Theme extends="dark">
  <Color name="accent" value="#ff6b6b"/>
  <Color name="background" value="#0d0d12"/>
</Theme>

<Window title="我的应用">
  <Text color="accent">使用自定义强调色</Text>
</Window>
```

- 若 `name` 是内置令牌（`background` 等），则覆盖该令牌。
- 否则作为**自定义命名颜色**，同样可以在组件里按名使用：

```html
<Theme extends="dark">
  <Color name="brand" value="#4ecdc4"/>
</Theme>

<Window>
  <Text color="brand">品牌色文字</Text>
  <Button bg="brand" fg="background">品牌按钮</Button>
</Window>
```

## 主题继承与优先级

解析顺序（后者覆盖前者）：

1. 默认 `dark`
2. `<Window theme="...">` 指定的基础主题
3. `<Theme extends="...">` 指定的基础主题
4. `</Theme>` 内所有 `<Color>` 覆盖

## 运行时切换主题

```python
def toggle():
    app.set_theme("light" if state.dark else "dark")
    state.dark = not state.dark
```

```html
<Button on_click="toggle">切换主题</Button>
```

切换时会伴随一次窗口淡入过渡。

## 其他主题参数

除颜色外，主题还包含间距与字体（可在 Python 侧构造 `Theme` 对象微调）：

| 字段 | 默认 | 说明 |
|------|------|------|
| `spacing` | 8 | 容器默认间距 |
| `padding` | 12 | 容器默认内边距 |
| `radius` | 24 | 默认圆角 |
| `font_family` | `Segoe UI` | 字体族 |
| `font_size` | 12 | 默认字号 |
| `title_size` | 18 | 标题字号 |

```python
from pawui.theme import Theme

theme = Theme.dark()
theme.accent = "#ff6b6b"
theme.radius = 12
app.set_theme(theme)
```

## 下一步

- [组件](#/docs/components) — 各组件支持的颜色属性
- [API 参考](#/docs/api) — `Theme` 类与 `set_theme`
