# Examples

Every example below is a complete app you can save as a `.paw` file and run.

## Counter

The most basic example: `state`, events, and templates.

```html
<Window title="Counter" width="380" height="300" theme="dark">
  <Column padding="32" spacing="16">
    <Text size="28" bold color="accent">Counter</Text>
    <Text size="48" bold>{$count}</Text>
    <Row spacing="12">
      <Button on_click="dec" bg="surface" fg="text">-1</Button>
      <Button on_click="inc">+1</Button>
      <Button on_click="reset" bg="surface" fg="subtext">Reset</Button>
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

## Todo list

Shows `<For>`, `bind`, and list add/remove.

```html
<Window title="Todo" width="440" height="560" theme="dark">
  <Column padding="24" spacing="16">
    <Text size="22" bold color="accent">Todo List</Text>

    <Row spacing="8">
      <Input bind="draft" placeholder="Add a task..." on_enter="add" expand/>
      <Button on_click="add">Add</Button>
    </Row>

    <Divider/>

    <Scroll padding="0" spacing="8" expand>
      <For each="task" in="{$tasks}">
        <Row spacing="12" padding="10" bg="surface" radius="10">
          <Checkbox bind="task.done">Done</Checkbox>
          <Text size="14" expand>{$task.title}</Text>
          <Button on_click="clear_done" bg="surface" fg="subtext" size="12">Clear</Button>
        </Row>
      </For>
    </Scroll>

    <Progress value="{$done}" max="{$total}" text/>
  </Column>
</Window>

<script>
state.tasks = [{"title": "Learn PawUI", "done": True}]
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

## Login form

Shows validation, `<If>` rendering, and error messages.

```html
<Window title="Sign in" width="380" height="380" theme="dark">
  <Column padding="32" spacing="16">
    <Text size="24" bold>Welcome back</Text>
    <Text size="13" color="subtext">Sign in to your account</Text>

    <Input bind="username" value="{$username}" placeholder="Username"/>
    <Input show="password" bind="password" value="{$password}" placeholder="Password"/>

    <If condition="{$has_error}">
      <Text size="12" color="danger">{$error}</Text>
    </If>

    <Button on_click="login" expand>Sign in</Button>
  </Column>
</Window>

<script>
state.username = ""
state.password = ""
state.error = ""
state.has_error = False

def login():
    if not state.username.strip():
        state.error = "Please enter a username"
        state.has_error = True
        return
    if len(state.password) < 6:
        state.error = "Password must be at least 6 characters"
        state.has_error = True
        return
    state.has_error = False
    state.error = "Signed in (demo)"
</script>
```

## Settings panel

Shows `Slider`, `Checkbox`, `Tabs`, and theme switching.

```html
<Window title="Settings" width="440" height="480" theme="dark">
  <Column padding="20" spacing="16">
    <Text size="22" bold>Settings</Text>

    <Tabs>
      <Tab label="General">
        <Column padding="16" spacing="14">
          <Checkbox bind="auto_save" checked>Auto save</Checkbox>
          <Checkbox bind="notifications">Desktop notifications</Checkbox>
        </Column>
      </Tab>
      <Tab label="Appearance">
        <Column padding="16" spacing="14">
          <Text size="13" color="subtext">Theme</Text>
          <Button on_click="toggle_theme" bg="surface" fg="text">Toggle dark / light</Button>
        </Column>
      </Tab>
      <Tab label="Sound">
        <Column padding="16" spacing="14">
          <Text size="13" color="subtext">Volume: {$volume}</Text>
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

## Sidebar navigation

Shows `<For>`-rendered nav items and a selection.

```html
<Window title="Nav" width="720" height="460" theme="dark">
  <Row spacing="0" expand>
    <Column padding="16" spacing="6" bg="surface" radius="0">
      <Text size="16" bold color="accent">Menu</Text>
      <Divider/>
      <For each="item" in="{$nav}">
        <Button on_click="{$select}" bg="surface" fg="text">{$item}</Button>
      </For>
    </Column>

    <Column padding="28" spacing="12" expand>
      <Text size="24" bold>{$current}</Text>
      <Text color="subtext">Current page content</Text>
    </Column>
  </Row>
</Window>

<script>
state.nav = ["Home", "Projects", "Team", "Settings"]
state.current = "Home"

def select():
    state.current = "Selected"
</script>
```

> Note: passing an index/item inside a loop needs more elaborate binding; `on_click` currently calls zero-arg handlers. Track the "current item" in state and handle it uniformly.

## Loading data (async)

Shows `app.invoke_async` to keep the UI responsive.

```html
<Window title="Loading" width="400" height="320" theme="dark">
  <Column padding="24" spacing="14">
    <Text size="20" bold>Data loading</Text>
    <Button on_click="start">Start loading</Button>
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

state.status = "Idle"
state.rows = []

def work():
    time.sleep(1.5)          # simulate work (background thread)
    return [f"Row {i}" for i in range(1, 21)]

def on_done(result, error):
    if error:
        state.status = f"Failed: {error}"
        return
    state.rows = result
    state.status = "Done"

def start():
    state.status = "Loading..."
    app.invoke_async(work, done=on_done)
</script>
```

## Animated dashboard

Shows `stagger` and multiple animations.

```html
<Window title="Dashboard" width="560" height="340" theme="dark">
  <Column padding="24" spacing="16" stagger="70">
    <Text size="24" bold color="accent" animate="slide-down">Overview</Text>

    <Row spacing="12" animate="slide-up">
      <Column padding="16" bg="surface" radius="14" expand>
        <Text size="30" bold color="accent">{$users}</Text>
        <Text size="12" color="subtext">Users</Text>
      </Column>
      <Column padding="16" bg="surface" radius="14" expand>
        <Text size="30" bold color="accent">{$orders}</Text>
        <Text size="12" color="subtext">Orders</Text>
      </Column>
      <Column padding="16" bg="surface" radius="14" expand>
        <Text size="30" bold color="danger">{$errors}</Text>
        <Text size="12" color="subtext">Errors</Text>
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

## Running these

Save any snippet as `demo.paw` and run:

```bash
pawui demo.paw
```

## Next

- [Components](#/docs/components) — component attribute reference
- [FAQ](#/docs/faq) — when something goes wrong
