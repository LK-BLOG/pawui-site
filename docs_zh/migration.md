# 迁移指南

如果你来自 Tkinter、PyQt/PySide 或其他声明式 UI，这一节帮你建立概念映射。

## 从 Tkinter / PyQt 而来

| 传统做法 | PawUI 对应 |
|----------|------------|
| `QWidget` / `tk.Frame` | `<Column>` / `<Row>` 容器 |
| `QLabel` | `<Text>` |
| `QPushButton` | `<Button>` |
| `QLineEdit` | `<Input>` |
| `QPlainTextEdit` | `<TextArea>` |
| `QCheckBox`（iOS 风格用 `QAbstractButton`） | `<Checkbox>` |
| `QSlider` | `<Slider>` |
| `QProgressBar` | `<Progress>` |
| `QScrollArea` | `<Scroll>` |
| `QTabWidget` | `<Tabs>` / `<Tab>` |
| 布局 `QVBoxLayout` / `QHBoxLayout` | `<Column>` / `<Row>` |
| `signal.connect(handler)` | `on_click="handler"` |
| 手动 `setText` 刷新 | `state` + `{$var}` 自动刷新 |
| `.setStyleSheet(...)` | 主题令牌 / `bg` / `fg` |

## 关键思维转变

### 命令式 → 声明式

传统：

```python
def on_click():
    count += 1
    label.setText(str(count))   # 手动更新
```

PawUI：

```python
def on_click():
    state.count += 1            # 界面自动刷新
```

```html
<Text>{$count}</Text>
```

不要在处理器里找控件、设文本——只改状态。

### 布局 → 容器嵌套

不需要计算坐标或手动 pack。用 `<Column>`/`<Row>` 嵌套表达结构，用 `padding`/`spacing`/`expand` 控制间距与弹性。

### 信号 → 命名处理器

不连接信号，而是给组件一个处理器**名字**，运行时在脚本里查找同名函数：

```html
<Button on_click="save">保存</Button>
```

### 样式 → 令牌

不写 QSS，而是用颜色令牌（`accent`/`surface`/`subtext`…）。换主题时自动适配，无需重写样式。

## 一次性迁移清单

- [ ] 把窗口尺寸/标题搬进 `<Window>` 属性。
- [ ] 把控件树改写为容器 + 组件标签。
- [ ] 把可变数据集中到 `state`。
- [ ] 把 `signal` 处理器改写成 `<script>` 顶层函数，并在组件上用 `on_*` 引用。
- [ ] 把硬编码颜色换成主题令牌。
- [ ] 用 `pawui check` 逐段验证。

## 与其他声明式框架

| 概念 | 其他框架 | PawUI |
|------|----------|-------|
| 状态 | `useState` / signal | `state.key` |
| 插值 | `{value}` | `{$value}` |
| 条件 | `v-if` / `if` | `<If condition="{$flag}">` |
| 循环 | `v-for` / `ForEach` | `<For each="i" in="{$list}">` |
| 双向绑定 | `v-model` | `bind="key"` |
| 组件 | `.vue` / function | `<Component name="...">` |
| 样式 | CSS / Tailwind | 主题令牌 |

## 一个完整对照

计数器，两种写法：

```python
# PyQt 风格（示意）
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
<Window title="计数器" width="380" height="280">
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

## 下一步

- [快速上手](#/getting-started) — 从零开始
- [数据绑定](#/data-binding) — 响应式细节
