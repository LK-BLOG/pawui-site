# 示例

下面都是可以直接保存为 `.paw` 文件运行的完整应用。

## 计数器

最基础的例子，演示 `state`、事件与模板。

```html
<Window title="计数器" width="380" height="300" theme="dark">
  <Column padding="32" spacing="16">
    <Text size="28" bold color="accent">计数器</Text>
    <Text size="48" bold>{$count}</Text>
    <Row spacing="12">
      <Button on_click="dec" bg="surface" fg="text">-1</Button>
      <Button on_click="inc">+1</Button>
      <Button on_click="reset" bg="surface" fg="subtext">重置</Button>
    </Row>
  </Column>
</Window>

<script>
state.count = 0

def inc():
    state.count = state.count + 1

def dec():
    state.count = max(0, state.count - 1)

def reset():
    state.count = 0
</script>
```

## 待办清单

演示 `<For>`、`bind`、列表增删。

```html
<Window title="待办清单" width="440" height="560" theme="dark">
  <Column padding="24" spacing="16">
    <Text size="22" bold color="accent">待办清单</Text>

    <Row spacing="8">
      <Input bind="draft" placeholder="添加任务..." on_enter="add" expand/>
      <Button on_click="add">添加</Button>
    </Row>

    <Divider/>

    <Scroll padding="0" spacing="8" expand>
      <For each="task" in="{$tasks}">
        <Row spacing="12" padding="10" bg="surface" radius="10">
          <Checkbox bind="task.done">完成</Checkbox>
          <Text size="14" expand>{$task.title}</Text>
          <Button on_click="clear_done" bg="surface" fg="subtext" size="12">清理</Button>
        </Row>
      </For>
    </Scroll>

    <Progress value="{$done}" max="{$total}" text/>
  </Column>
</Window>

<script>
state.tasks = [{"title": "学习 PawUI", "done": True}]
state.draft = ""

def add():
    title = state.draft.strip()
    if not title:
        return
    state.tasks = state.tasks + [{"title": title, "done": False}]
    state.draft = ""

def done():
    return sum(1 for t in state.tasks if t.get("done"))

def total():
    return max(1, len(state.tasks))

def clear_done():
    state.tasks = [t for t in state.tasks if not t.get("done")]

state.done = done
state.total = total
</script>
```

## 登录表单

演示表单校验、`<If>` 条件渲染与错误提示。

```html
<Window title="登录" width="380" height="380" theme="dark">
  <Column padding="32" spacing="16">
    <Text size="24" bold>欢迎回来</Text>
    <Text size="13" color="subtext">请登录你的账户</Text>

    <Input bind="username" value="{$username}" placeholder="用户名"/>
    <Input show="password" bind="password" value="{$password}" placeholder="密码"/>

    <If condition="{$has_error}">
      <Text size="12" color="danger">{$error}</Text>
    </If>

    <Button on_click="login" expand>登录</Button>
  </Column>
</Window>

<script>
state.username = ""
state.password = ""
state.error = ""
state.has_error = False

def login():
    if not state.username.strip():
        state.error = "请输入用户名"
        state.has_error = True
        return
    if len(state.password) < 6:
        state.error = "密码至少 6 位"
        state.has_error = True
        return
    state.has_error = False
    state.error = "登录成功（演示）"
</script>
```

## 设置面板

演示 `Slider`、`Checkbox`、`Tabs` 与主题切换。

```html
<Window title="设置" width="440" height="480" theme="dark">
  <Column padding="20" spacing="16">
    <Text size="22" bold>设置</Text>

    <Tabs>
      <Tab label="常规">
        <Column padding="16" spacing="14">
          <Checkbox bind="auto_save" checked>自动保存</Checkbox>
          <Checkbox bind="notifications">桌面通知</Checkbox>
        </Column>
      </Tab>
      <Tab label="外观">
        <Column padding="16" spacing="14">
          <Text size="13" color="subtext">主题</Text>
          <Button on_click="toggle_theme" bg="surface" fg="text">切换深色 / 浅色</Button>
        </Column>
      </Tab>
      <Tab label="声音">
        <Column padding="16" spacing="14">
          <Text size="13" color="subtext">音量：{$volume}</Text>
          <Slider min="0" max="100" value="{$volume}" bind="volume"/>
        </Column>
      </Tab>
    </Tabs>
  </Column>
</Window>

<script>
state.auto_save = True
state.notifications = False
state.volume = 60
state.dark = True

def toggle_theme():
    state.dark = not state.dark
    app.set_theme("dark" if state.dark else "light")
</script>
```

## 侧边导航

演示 `<For>` 渲染导航项与选中态。

```html
<Window title="导航" width="720" height="460" theme="dark">
  <Row spacing="0" expand>
    <Column padding="16" spacing="6" bg="surface" radius="0" width="180">
      <Text size="16" bold color="accent">菜单</Text>
      <Divider/>
      <For each="item" in="{$nav}">
        <Button on_click="{$select}" bg="surface" fg="text">{$item}</Button>
      </For>
    </Column>

    <Column padding="28" spacing="12" expand>
      <Text size="24" bold>{$current}</Text>
      <Text color="subtext">当前页面内容</Text>
    </Column>
  </Row>
</Window>

<script>
state.nav = ["首页", "项目", "团队", "设置"]
state.current = "首页"

def select():
    state.current = "已选择"
</script>
```

> 提示：循环内传递索引/项参数需要更复杂的绑定，当前 `on_click` 只调用无参处理器。可结合 state 保存「当前选中项」再统一处理。

## 加载数据（异步）

演示 `app.invoke_async` 避免界面卡死。

```html
<Window title="加载" width="400" height="320" theme="dark">
  <Column padding="24" spacing="14">
    <Text size="20" bold>数据加载</Text>
    <Button on_click="start">开始加载</Button>
    <Text color="subtext">{$status}</Text>
    <Scroll spacing="6" expand>
      <For each="row" in="{$rows}">
        <Text>{$row}</Text>
      </For>
    </Scroll>
  </Column>
</Window>

<script>
import time

state.status = "空闲"
state.rows = []

def work():
    time.sleep(1.5)          # 模拟耗时（后台线程）
    return [f"数据行 {i}" for i in range(1, 21)]

def on_done(result, error):
    if error:
        state.status = f"失败：{error}"
        return
    state.rows = result
    state.status = "加载完成"

def start():
    state.status = "加载中..."
    app.invoke_async(work, done=on_done)
</script>
```

## 带入场动画的仪表盘

演示 `stagger` 与多种动画。

```html
<Window title="仪表盘" width="560" height="340" theme="dark">
  <Column padding="24" spacing="16" stagger="70">
    <Text size="24" bold color="accent" animate="slide-down">概览</Text>

    <Row spacing="12" animate="slide-up">
      <Column padding="16" bg="surface" radius="14" expand>
        <Text size="30" bold color="accent">{$users}</Text>
        <Text size="12" color="subtext">用户</Text>
      </Column>
      <Column padding="16" bg="surface" radius="14" expand>
        <Text size="30" bold color="accent">{$orders}</Text>
        <Text size="12" color="subtext">订单</Text>
      </Column>
      <Column padding="16" bg="surface" radius="14" expand>
        <Text size="30" bold color="danger">{$errors}</Text>
        <Text size="12" color="subtext">错误</Text>
      </Column>
    </Row>

    <Progress value="{$load}" max="100" text animate="fade"/>
  </Column>
</Window>

<script>
state.users = 1284
state.orders = 342
state.errors = 3
state.load = 78
</script>
```

## 运行这些示例

把任意一段保存成 `demo.paw`，然后：

```bash
pawui demo.paw
```

## 下一步

- [组件](#/components) — 组件属性速查
- [常见问题](#/faq) — 遇到问题怎么办
