# 常见问题

## 安装与运行

### `pawui` 命令找不到

确认安装成功且脚本目录在 PATH 中：

```bash
pip show pawui
python -m pawui --version
```

可以直接用模块方式运行：`python -m pawui app.paw`。

### 缺少 Qt 依赖

```
ModuleNotFoundError: No module named 'PySide6'
```

```bash
pip install "PySide6>=6.5"
```

### 窗口闪一下就没 / 无显示

在无头环境（CI、远程）用离屏模式：

```bash
pawui render app.paw
```

或设置 `QT_QPA_PLATFORM=offscreen`。

## 常见报错

### `PawUI error: unknown component <X>`

标签名拼错，或用了不存在的组件。用 `pawui schema` 查看全部可用组件。注意大小写。

### `mismatched closing tag`

开闭标签不匹配。检查是否漏写 `</Column>` 或错配成 `</Row>`。错误信息会给出行列号。

### `top-level elements must live inside <Window>`

`<Window>` 之外出现了 UI 元素。只允许一个 `<Window>`（或一组元素自动包裹），其余顶层只能有 `<script>` / `<Component>` / `<Theme>`。

### `script block has invalid Python syntax`

`<script>` 里是原始 Python。常见原因：

- 缩进混用 Tab 与空格
- 忘记冒号
- 把 HTML 语法混进 Python

### `image not found: <src>`

`<Image src="...">` 的路径相对**当前工作目录**解析（不是 `.paw` 文件所在目录）。用绝对路径或先切换到项目目录再运行。

### `Web component requires PySide6-Addons`

```bash
pip install PySide6-Addons
```

## 状态与界面

### 改了 state，界面没更新

- 确认模板里用的是 `{$key}` / `{key}`，拼写与 state 键一致。
- 直接赋值 `state.count = x` 会触发；**原地修改列表/字典不会**：

```python
state.items.append(x)          # 不会自动刷新
state.items = state.items + [x]  # 正确
```

写入一个新对象让监听器被触发。

### 输入框的值没有同步回 state

给交互组件加 `bind`：

```html
<Input bind="username"/>
```

需要反向同步时再加 `value="{$username}"`。

### 数值运算报 `TypeError`

未设置的键返回 `""`。用 `state.get("count", 0)`：

```python
state.count = state.get("count", 0) + 1
```

### `<If condition="{$a and $b}">` 不生效

`condition` 只接受**单个布尔值或状态引用**，不做表达式求值。先在脚本里算好：

```python
def refresh():
    state.visible = bool(state.a and state.b)
```

```html
<If condition="{$visible}">...</If>
```

### 取反条件怎么写

同样避免表达式。维护一个布尔状态，或用函数：

```python
state.empty = True

def update():
    state.empty = len(state.items) == 0
```

```html
<If condition="{$empty}"><Text>暂无数据</Text></If>
```

## 布局

### 内容没有居中

PawUI **没有** `align` / `justify` 属性。容器默认从左上开始排列。需要居中时：

- 用 `expand` 让元素占满空间，配合控件自身对齐；
- 用两侧 `Spacer` 推开内容；
- 或调整 `padding` 手工定位。

### 控件没有填满宽度

给需要拉伸的控件加 `expand`：

```html
<Row spacing="8">
  <Input bind="q" expand/>
  <Button on_click="search">搜索</Button>
</Row>
```

### 内容超出窗口被截断

把内容放进 `<Scroll>`：

```html
<Scroll expand>
  ...
</Scroll>
```

## 热重载

### `pawui watch` 没有反应

- 确认保存的是被监视的那个文件。
- 某些编辑器采用原子替换，轮询间隔 400ms，稍等即可。
- 语法错误时保留旧窗口并打印错误，修好后自动重建。

### 热重载后 state 被重置了

热重载会**保留 State**，但会重新执行脚本。如果脚本里是 `state.count = 0`，它会覆盖当前值。改成条件初始化：

```python
if not state.has("count"):
    state.count = 0
```

## 性能

### 界面卡顿

- 不要在处理器里做耗时操作，改用 `app.invoke_async`。
- 列表很大时避免一次性渲染过多项。

## 还是没解决？

用 `pawui check app.paw` 看解析结果，再用最小化代码逐步排除。大部分问题出在标签匹配、state 键名拼写和条件表达式三处。
