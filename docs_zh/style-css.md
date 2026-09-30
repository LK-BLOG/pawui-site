# 在 .paw 里直接写 CSS

PawUI 是认真做 CSS3 的：`.paw` 里的 `<Style>` 块会被编译成 QSS，作用到真正渲染出来的控件上。不用额外样式文件，也没有构建步骤 —— 样式和结构在同一个文档里。

```xml
<Style>
  :root { --brand: #ff7a1a; --pad: 14px; }

  Card            { radius: 14; padding: var(--pad); bg: surface; }
  .card.primary   { bg: var(--brand); }
  #save           { font-weight: 600; }
  .card Text      { color: subtext; }
  Row > Button    { grow: 1; }
  Button:hover    { bg: #2b7fff; }
</Style>
```

## 选择器

| 写法 | 命中什么 |
| --- | --- |
| `Button`、`Text`、`Input` | 该组件的每一个实例 |
| `Card`（你自己 `<Component>` 出来的） | 每一个渲染出来的 `Card` |
| `.card` | `class="card"` 的元素 |
| `.card.primary` | 同时有两个 class 的元素 |
| `#save` | `id="save"` 的元素 |
| `[pw-tag="Text"]` | 组件 tag 的原始属性写法 |
| `.card Text` | 后代 |
| `Row > Button` | 直接子元素 |
| `.a, .b` | 逗号分组 |
| `Button:hover` / `:pressed` / `:disabled` | Qt 伪状态 |

Qt 没有自定义 class 选择器，所以 PawUI 把 `class="..."` 存成动态属性、把 `.card` 重写成 `[pw-class~="card"]`。上表就是你写的语法，重写是内部实现。

## 属性

标准 CSS 属性名（`background-color`、`border-radius`、`font-size`、`padding`……）都能用，另有几个简写：

| 简写 | 展开成 |
| --- | --- |
| `bg` | `background-color` |
| `fg` / `color` | `color` |
| `radius` | `border-radius` |

长度属性的裸数字会自动补 `px`，所以 `radius: 12;` 和 `radius: 12px;` 等价；`border: 1 solid #ccc;` 也认。

## 级联顺序

优先级从高到低：

1. 运行时注入（`app.inject_css`、`el.css(...)`）
2. 你 `<Style>` 里的规则
3. 组件默认值（`<Button radius="20">`）
4. 当前主题

你自己的规则之间，越具体越赢：`#id` > `.class` > 标签名，同权重后面写的赢。

## QSS 不认识的文本属性

Qt 样式表没有换行、行高这些概念。PawUI 允许你在 CSS 里写，运行时施加到命中的控件上：

```css
.body { wrap: true; line-height: 1.6; align: center; ellipsis: true; selectable: true; }
```

它们也能直接当组件属性用：`<Text wrap="true" align="center">`。

## 作用域

`class` 和 `id` 就是作用域工具，和 HTML 一样；`id` 要唯一，`#id` 规则才可预测。

```xml
<Card class="plan featured" id="pro">
  <Text class="price">¥99</Text>
</Card>
```

```css
.plan          { radius: 18; padding: 18; }
.plan.featured { border: 2 solid var(--accent); }
#pro .price    { font-size: 28px; font-weight: 600; }
```

## 运行时注入

```python
app.inject_css("Button { radius: 6px; }")      # 全局，压过 <Style>
app.css(".card", "radius: 6; bg: #fff;")        # 按选择器
app.query("#save").css("bg: #22c55e;")          # 单个元素
app.query("#save").add_class("primary")         # 改 class 会立刻重算样式
```

注入的规则追加在 `<Style>` 之后，所以永远赢。同一段注入两次是空操作。

## 调不出效果怎么办

跑 `pawui inspect app.paw`。它会把控件树打出来，并在每个控件下面列出真正命中它的选择器。
