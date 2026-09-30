# Examples

## Counter

```html
<Theme extends="dark">
  <Color name="accent" value="#8b5cf6"/>
</Theme>

<Window title="Counter" width="420" height="520" theme="dark">
  <Column padding="24" spacing="12" stagger="50">
    <Text size="24" bold="true" animate="slide-up">Counter</Text>
    <Text size="14" color="brand" animate="slide-up">Count: {$count}</Text>
    <Row spacing="8" animate="slide-up">
      <Button on_click="inc">+1</Button>
      <Button on_click="dec">-1</Button>
      <Button on_click="reset" bg="surface" fg="text">Reset</Button>
    </Row>
  </Column>
</Window>

<script>
state.count = 0

def inc():
    state.count = state.get("count", 0) + 1

def dec():
    state.count = state.get("count", 0) - 1

def reset():
    state.count = 0
</script>
```

## Login Form

```html
<Window title="Login" width="400" height="400" theme="dark">
  <Column padding="32" spacing="16">
    <Text size="28" bold="true">Welcome Back</Text>
    <Text size="14" color="subtext">Sign in to your account</Text>
    
    <Column spacing="12">
      <Input placeholder="Email" value="{$email}" on_change="on_email"/>
      <Input placeholder="Password" show="password" value="{$password}" 
             on_change="on_password" on_enter="login"/>
    </Column>
    
    <Row spacing="12">
      <Button on_click="login" expand="true">Sign In</Button>
      <Button on_click="signup" bg="surface" fg="text" expand="true">Sign Up</Button>
    </Row>
    
    <Text size="13" color="danger">{$error}</Text>
  </Column>
</Window>

<script>
state.email = ""
state.password = ""
state.error = ""

def on_email(v):
    state.email = v

def on_password(v):
    state.password = v

def login():
    if not state.email or not state.password:
        state.error = "Please fill all fields"
        return
    if "@" not in state.email:
        state.error = "Invalid email"
        return
    state.error = ""
    print(f"Logging in: {state.email}")
</script>
```

## Todo List

```html
<Window title="Todos" width="500" height="600" theme="dark">
  <Column padding="24" spacing="16">
    <Text size="24" bold="true">Todos</Text>
    
    <Row spacing="8">
      <Input placeholder="Add todo..." value="{$new_todo}" 
             on_enter="add_todo" expand="true"/>
      <Button on_click="add_todo">Add</Button>
    </Row>
    
    <Column spacing="8">
      <!-- In real app, use <For> when available -->
      <TodoItem text="{$todo1}" on_toggle="toggle1" on_delete="delete1"/>
      <TodoItem text="{$todo2}" on_toggle="toggle2" on_delete="delete2"/>
    </Column>
  </Column>
</Window>

<Component name="TodoItem">
  <Row spacing="8" padding="12" bg="surface" radius="8">
    <Checkbox checked="{$checked}" on_change="{$on_toggle}"/>
    <Text size="14">{$text}</Text>
    <Spacer/>
    <Button on_click="{$on_delete}" bg="danger" fg="background" size="12">Delete</Button>
  </Row>
</Component>

<script>
state.new_todo = ""
state.todo1 = {"text": "Learn PawUI", "done": True}
state.todo2 = {"text": "Build something", "done": False}

def add_todo():
    text = state.new_todo.strip()
    if text:
        # Would add to list with <For>
        state.new_todo = ""
</script>
```

## Theme Toggle

```html
<Window title="Theme Demo" width="400" height="300" theme="dark">
  <Column padding="24" spacing="16">
    <Text size="24" bold="true">Theme: {$current_theme}</Text>
    
    <Row spacing="12">
      <Button on_click="set_dark" bg="{$dark_bg}">Dark</Button>
      <Button on_click="set_light" bg="{$light_bg}">Light</Button>
    </Row>
    
    <Divider/>
    
    <Column spacing="8" bg="surface" padding="16" radius="12">
      <Text color="text">Primary text</Text>
      <Text color="subtext">Secondary text</Text>
      <Button>Accent button</Button>
      <Button bg="surface" fg="text">Surface button</Button>
      <Input placeholder="Input field"/>
    </Column>
  </Column>
</Window>

<script>
state.current_theme = "dark"

def set_dark():
    state.current_theme = "dark"
    app.set_theme("dark")
    app.refresh()

def set_light():
    state.current_theme = "light"
    app.set_theme("light")
    app.refresh()
</script>
```

## Custom Component: Card Grid

```html
<Window title="Dashboard" width="800" height="600" theme="dark">
  <Column padding="24" spacing="20">
    <Text size="28" bold="true">Dashboard</Text>
    
    <Row spacing="16">
      <StatCard label="Users" value="1,234" trend="+12%" color="brand"/>
      <StatCard label="Revenue" value="$45.6k" trend="+8%" color="success"/>
      <StatCard label="Orders" value="892" trend="-3%" color="warning"/>
    </Row>
    
    <Row spacing="16">
      <StatCard label="Active" value="567" trend="+5%" color="accent"/>
      <StatCard label="Pending" value="89" trend="0%" color="subtext"/>
    </Row>
  </Column>
</Window>

<Component name="StatCard">
  <Column padding="20" spacing="8" bg="surface" radius="16">
    <Text size="13" color="subtext">{$label}</Text>
    <Text size="32" bold="true" color="{$color}">{$value}</Text>
    <Text size="12" color="{$color}">{$trend}</Text>
  </Column>
</Component>
```

## Animation Showcase

```html
<Window title="Animations" width="500" height="600" theme="dark">
  <Column padding="24" spacing="16" stagger="80">
    <Text size="24" bold="true" animate="slide-down">Animation Types</Text>
    
    <Button animate="fade" on_click="refresh">Refresh (fade)</Button>
    <Button animate="slide-up" on_click="refresh">Slide Up</Button>
    <Button animate="slide-down" on_click="refresh">Slide Down</Button>
    <Button animate="slide-left" on_click="refresh">Slide Left</Button>
    <Button animate="slide-right" on_click="refresh">Slide Right</Button>
    <Button animate="reveal" on_click="refresh">Reveal</Button>
    
    <Divider animate="fade"/>
    
    <Text animate="slide-up" easing="out-back" duration="600">Bouncy (out-back)</Text>
    <Text animate="slide-up" easing="out-elastic" duration="800">Springy (out-elastic)</Text>
    <Text animate="slide-up" easing="linear" duration="300">Linear</Text>
  </Column>
</Window>

<script>
def refresh():
    app.refresh()
</script>
```