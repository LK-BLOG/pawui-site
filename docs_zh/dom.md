# 用 Python 操作页面

`<script>` 里的 `app` 就是一套迷你 DOM：查元素、读写文字、加 class、注入 CSS、插入/删除标记、绑事件。

| 浏览器 | PawUI |
| --- | --- |
| `document.querySelector` | `app.query(".card")` |
| `document.querySelectorAll` | `app.query_all(".card")` |
| `el.addEventListener` | `app.on("#save", "click", fn)` |
| `el.classList.add` | `el.add_class("primary")` |
| `el.style.color = …` | `el.css("color: red;")` |
| `document.createElement` | `app.append("#list", "<Text>hi</Text>")` |
| `el.remove()` | `app.remove("#old")` |

## 查询

选择器语法和 `<Style>` 完全一致 —— `#id`、`.class`、组件标签、属性选择器、后代与子代组合器。

```python
app.query("#save")            # 命中的第一个，找不到是 None
app.query_all(".plan")        # 列表
app.query(".card Text")       # 后代
```

命中的结果是一个 `Element`：

```python
el = app.query("#title")
el.text                       # 读
el.text = "新标题"             # 写
el.id, el.tag, el.classes
el.attr("pw-state", "busy")
```

## 生命周期：用 `ready()`

`<script>` 在控件建出来**之前**执行，所以直接查是查不到的。把操作页面的代码包进 `ready(fn)`，它在控件树建好之后立刻跑：

```python
def wire():
    app.query("#title").text = "loaded"
    app.on(".card", "click", lambda e: print(e.target.id))

ready(wire)
```

## 事件

```python
app.on("#save", "click", on_save)      # 所有命中的元素
app.query("#save").on("hover", fn)     # 单个元素
```

支持的类型：`click`、`change`、`input`、`enter`、`hover`、`leave`、`focus`、`blur`。

回调收到一个 `Event`：

```python
def on_save(e):
    print(e.type, e.target.tag, e.value, e.checked)
```

事件会冒泡：点卡片里的文字，绑在卡片上的处理函数照样收到。按钮、输入框这类自己吃掉鼠标事件的子控件，会通过 `clicked` 信号往上冒，所以 `app.on(".card", "click", fn)` 不管卡片里放了什么都能用。

## 增删标记

```python
app.append("#list", "<Text class='row'>新行</Text>")
app.query("#list").prepend("<Text>最前面</Text>")
app.query("#list").clear()
app.remove("#old")
```

插入的片段按正常 `.paw` 解析：能用自定义组件、`{$state}` 模板和 `on_click`。追加的位置在尾部弹簧之前，所以视觉顺序和调用顺序一致。

## 从 Python 改样式

```python
app.inject_css("Button { radius: 6px; }")
app.css(".card", "radius: 6; bg: #fff;")
app.query("#alert").css("bg: #ff375f;")
app.query("#alert").add_class("danger")    # 会立刻重算样式
```

## Toast

```python
app.toast("已保存", "success")   # info / success / warning / error
```

Toast 浮在根窗口上方，多条往上叠，淡入淡出，到点自己销毁。
