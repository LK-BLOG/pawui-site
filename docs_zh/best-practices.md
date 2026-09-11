# 最佳实践

把 PawUI 项目组织得清晰、可维护的一些建议。

## 项目结构

小工具一个文件就够；稍大的应用按职责拆分：

```
myapp/
├── main.py              # 入口：from pawui import run; run("app.paw")
├── app.paw              # 界面 + 事件绑定
├── components/          # 可复用组件（.paw 片段，手动粘贴或按需拆分）
├── assets/              # 图片、字体
└── docs/                # 说明
```

PawUI 目前一个文件对应一个应用，复杂逻辑尽量放进 `<script>` 的函数里，而不是堆在界面标记中。

## 状态设计

- 用**扁平、语义化**的键名：`user_name`、`cart_total`，而不是 `a`、`x1`。
- 集合类状态存放为**列表/字典**，更新时赋新对象。
- 派生值用函数并挂到 state，界面里直接 `{$total}`。

```python
state.items = []
state.filter = ""

def visible():
    f = state.filter.strip().lower()
    return [x for x in state.items if f in x.lower()] if f else state.items

def count():
    return len(visible())

state.visible = visible
state.count = count
```

```html
<For each="item" in="{$visible}">
  <Text>{$item}</Text>
</For>
<Text size="12" color="subtext">{$count} 项</Text>
```

## 复用 UI：自定义组件

重复出现的界面块抽成 `<Component>`：

```html
<Component name="StatCard">
  <Prop name="label" default="指标"/>
  <Prop name="value" default="0"/>
  <Column padding="16" bg="surface" radius="12" expand="true">
    <Text size="28" bold color="accent">{$value}</Text>
    <Text size="12" color="subtext">{$label}</Text>
  </Column>
</Component>
```

## 用主题令牌，别硬编码颜色

```html
<!-- 好：跟随主题 -->
<Text color="subtext">说明</Text>

<!-- 避免：切主题时不变 -->
<Text color="#9aa0a6">说明</Text>
```

需要品牌色时，在 `<Theme>` 里定义一次，全局复用：

```html
<Theme extends="dark">
  <Color name="brand" value="#ff5c8a"/>
</Theme>
```

## 事件处理器保持短小

处理器只做「读取状态 → 计算 → 写回状态」。复杂逻辑抽成普通函数：

```python
def validate_email(text):
    return "@" in text and "." in text.split("@")[-1]

def submit():
    if not validate_email(state.email):
        state.error = "邮箱格式不正确"
        return
    state.error = ""
```

## 命名约定

| 对象 | 约定 | 示例 |
|------|------|------|
| state 键 | 小写下划线 | `user_name` |
| 处理器 | 动词开头 | `submit`, `toggle_theme` |
| 组件 | 大驼峰 | `UserCard` |
| 主题色 | 语义化 | `brand`, `danger` |

## 错误处理

- 用 `pawui check app.paw` 在开发时尽早发现语法问题。
- 异步任务的错误通过 `done(result, error)` 的 `error` 暴露，务必处理。
- 显示错误时给用户可读信息，而非堆栈：

```python
def on_loaded(result, error):
    if error:
        state.status = "加载失败，请稍后重试"
        return
    state.data = result
```

## 开发循环

```bash
pawui watch app.paw   # 保存即重建，状态保留
pawui check app.paw   # 语法检查
```

## 下一步

- [性能](#/docs/performance) — 保持流畅
- [打包与分发](#/docs/packaging) — 发布给用户
- [自定义组件](#/docs/custom-components) — 组件化
