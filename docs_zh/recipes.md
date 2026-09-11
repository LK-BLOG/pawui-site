# 实用配方

常见需求的可直接复制片段。所有示例都是完整 `.paw` 逻辑，可直接运行。

## 表单校验

```html
<Window title="注册" width="380" height="360">
  <Column padding="28" spacing="14">
    <Text size="22" bold>注册</Text>
    <Input bind="email" value="{$email}" placeholder="邮箱"/>
    <Input show="password" bind="password" value="{$password}" placeholder="密码"/>
    <If condition="{$has_error}">
      <Text size="12" color="danger">{$error}</Text>
    </If>
    <Button on_click="submit" expand="true">提交</Button>
  </Column>
</Window>

<script>
state.email = ""
state.password = ""
state.error = ""
state.has_error = False

def submit():
    if "@" not in state.email:
        state.error = "邮箱格式不正确"
        state.has_error = True
        return
    if len(state.password) < 6:
        state.error = "密码至少 6 位"
        state.has_error = True
        return
    state.has_error = False
    state.error = "注册成功"
</script>
```

## 搜索过滤列表

```html
<Window title="搜索" width="420" height="480">
  <Column padding="20" spacing="12">
    <Input bind="query" value="{$query}" placeholder="搜索..." on_change="filter" expand="true"/>
    <Scroll spacing="6" expand="true">
      <For each="item" in="{$results}">
        <Text>{$item}</Text>
      </For>
    </Scroll>
    <Text size="12" color="subtext">{$count} 条结果</Text>
  </Column>
</Window>

<script>
state.all = ["Python", "PawUI", "PySide6", "Qt", "PyPI"]
state.query = ""
state.results = state.all
state.count = len(state.all)

def filter(text):
    q = (text or "").strip().lower()
    hits = [x for x in state.all if q in x.lower()] if q else state.all
    state.results = hits
    state.count = len(hits)
</script>
```

## 列表增删

```python
state.todos = []
state.draft = ""

def add():
    text = state.draft.strip()
    if text:
        state.todos = state.todos + [text]
        state.draft = ""

def remove_all():
    state.todos = []
```

```html
<Row spacing="8">
  <Input bind="draft" placeholder="新任务" on_enter="add" expand="true"/>
  <Button on_click="add">添加</Button>
</Row>
<Button on_click="remove_all" bg="surface" fg="subtext">清空</Button>
```

## 分页

```python
state.items = [f"条目 {i}" for i in range(1, 51)]
state.page = 1
state.per_page = 10

def page_items():
    start = (state.page - 1) * state.per_page
    return state.items[start:start + state.per_page]

def total_pages():
    return max(1, (len(state.items) + state.per_page - 1) // state.per_page)

def next_page():
    state.page = min(state.page + 1, total_pages())

def prev_page():
    state.page = max(state.page - 1, 1)

state.page_items = page_items
state.total_pages = total_pages
```

```html
<For each="row" in="{$page_items}">
  <Text>{$row}</Text>
</For>
<Row spacing="8">
  <Button on_click="prev_page" bg="surface" fg="text">上一页</Button>
  <Text>{$page} / {$total_pages}</Text>
  <Button on_click="next_page">下一页</Button>
</Row>
```

## 主题切换

```html
<Button on_click="toggle_theme">切换主题</Button>
```

```python
state.dark = True

def toggle_theme():
    state.dark = not state.dark
    app.set_theme("dark" if state.dark else "light")
```

## 异步加载 + 加载态

```python
import time

def fetch_data():
    time.sleep(2)                 # 后台线程，别碰控件
    return [f"结果 {i}" for i in range(1, 11)]

def on_loaded(result, error):
    if error:
        state.status = f"失败：{error}"
        return
    state.rows = result
    state.status = "加载完成"

def load():
    state.status = "加载中..."
    app.invoke_async(fetch_data, done=on_loaded)
```

## 可滚动日志

```html
<Window title="日志" width="520" height="360">
  <Column padding="16" spacing="10">
    <Scroll spacing="2" expand="true">
      <For each="line" in="{$logs}">
        <Text size="12" color="subtext">{$line}</Text>
      </For>
    </Scroll>
    <Button on_click="add_log">追加日志</Button>
  </Column>
</Window>

<script>
state.logs = ["[启动] 应用已加载"]

def add_log():
    n = len(state.logs) + 1
    state.logs = state.logs + [f"[事件] 第 {n} 条日志"]
</script>
```

## 多标签页应用

```html
<Tabs>
  <Tab label="概览">
    <Column padding="16" spacing="10"><Text>概览内容</Text></Column>
  </Tab>
  <Tab label="设置">
    <Column padding="16" spacing="10"><Checkbox bind="opt">启用选项</Checkbox></Column>
  </Tab>
</Tabs>
```

## 下一步

- [示例](#/docs/examples) — 完整应用
- [性能](#/docs/performance) — 让它跑得更顺
