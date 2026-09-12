# 排版

字号、字重与层级。PawUI 没有富文本，但用基础属性也能建立清晰的视觉层次。

## 字号

用 `size`（px）控制文字大小。默认跟随主题字号（12）：

```html
<Text size="26" bold>页面标题</Text>
<Text size="17" bold>小节标题</Text>
<Text size="14">正文</Text>
<Text size="12" color="subtext">说明</Text>
```

## 字重与样式

```html
<Text bold>粗体强调</Text>
<Text italic color="subtext">斜体补充</Text>
<Text bold italic>两者兼有</Text>
```

字重只有常规和粗体两档（bold 会用 600 权重）。

## 建立层级

标题用「更大 + 更粗 + 强调色」，说明用「更小 + 次要色」：

```html
<Column spacing="6">
  <Text size="22" bold color="accent">仪表盘</Text>
  <Text size="12" color="subtext">最近 7 天数据</Text>
</Column>
```

常见层级参考：

| 角色 | 字号 | 属性 |
|------|------|------|
| 页面标题 | 24–28 | `bold color="accent"` |
| 区域标题 | 16–18 | `bold` |
| 正文 | 14 | — |
| 次要说明 | 12 | `color="subtext"` |
| 数字指标 | 28–48 | `bold color="accent"` |

## 主题中的字体设置

主题携带字体相关字段（可在 Python 侧调整）：

| 字段 | 默认 | 说明 |
|------|------|------|
| `font_family` | `Segoe UI` | 字体族 |
| `font_size` | 12 | 默认字号 |
| `title_size` | 18 | 标题字号 |

```python
from pawui.theme import Theme

t = Theme.dark()
t.font_family = "Inter"
t.font_size = 13
app.set_theme(t)
```

> 组件显式设置的 `size` 会覆盖主题默认值。

## 数字与对齐

PawUI 目前没有文本对齐属性，`Text` 默认左对齐并垂直居中。数字指标靠字号与颜色突出：

```html
<Column padding="16" bg="surface" radius="12" expand="true">
  <Text size="30" bold color="accent">{$users}</Text>
  <Text size="12" color="subtext">用户</Text>
</Column>
```

## 中文显示

PawUI 在 Qt 上原生渲染，中文（及 IME 输入）由系统字体处理，无需额外配置。选择支持中文的字体族即可（Windows 上默认包含微软雅黑等回退）。

## 下一步

- [颜色令牌](#/color-tokens) — 用颜色强化层级
- [主题](#/theming) — 主题参数
