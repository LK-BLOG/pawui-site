# Recipes

Copy-paste snippets for common needs. Each example is complete, runnable PawUI logic.

## Form validation

```html
<Window title="Sign up" width="380" height="360">
  <Column padding="28" spacing="14">
    <Text size="22" bold>Sign up</Text>
    <Input bind="email" value="{$email}" placeholder="Email"/>
    <Input show="password" bind="password" value="{$password}" placeholder="Password"/>
    <If condition="{$has_error}">
      <Text size="12" color="danger">{$error}</Text>
    </If>
    <Button on_click="submit" expand="true">Submit</Button>
  </Column>
</Window>

<script>
state.email = ""
state.password = ""
state.error = ""
state.has_error = False

def submit():
    if "@" not in state.email:
        state.error = "Invalid email"
        state.has_error = True
        return
    if len(state.password) < 6:
        state.error = "Password must be at least 6 characters"
        state.has_error = True
        return
    state.has_error = False
    state.error = "Signed up"
</script>
```

## Filtering a list with search

```html
<Window title="Search" width="420" height="480">
  <Column padding="20" spacing="12">
    <Input bind="query" value="{$query}" placeholder="Search..." on_change="filter" expand="true"/>
    <Scroll spacing="6" expand="true">
      <For each="item" in="{$results}">
        <Text>{$item}</Text>
      </For>
    </Scroll>
    <Text size="12" color="subtext">{$count} results</Text>
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

## Adding and removing list items

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
  <Input bind="draft" placeholder="New task" on_enter="add" expand="true"/>
  <Button on_click="add">Add</Button>
</Row>
<Button on_click="remove_all" bg="surface" fg="subtext">Clear</Button>
```

## Pagination

```python
state.items = [f"Item {i}" for i in range(1, 51)]
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
  <Button on_click="prev_page" bg="surface" fg="text">Prev</Button>
  <Text>{$page} / {$total_pages}</Text>
  <Button on_click="next_page">Next</Button>
</Row>
```

## Theme switching

```html
<Button on_click="toggle_theme">Toggle theme</Button>
```

```python
state.dark = True

def toggle_theme():
    state.dark = not state.dark
    app.set_theme("dark" if state.dark else "light")
```

## Async load with a loading state

```python
import time

def fetch_data():
    time.sleep(2)                 # background thread; don't touch widgets
    return [f"Result {i}" for i in range(1, 11)]

def on_loaded(result, error):
    if error:
        state.status = f"Failed: {error}"
        return
    state.rows = result
    state.status = "Done"

def load():
    state.status = "Loading..."
    app.invoke_async(fetch_data, done=on_loaded)
```

## Scrolling log

```html
<Window title="Log" width="520" height="360">
  <Column padding="16" spacing="10">
    <Scroll spacing="2" expand="true">
      <For each="line" in="{$logs}">
        <Text size="12" color="subtext">{$line}</Text>
      </For>
    </Scroll>
    <Button on_click="add_log">Append log</Button>
  </Column>
</Window>

<script>
state.logs = ["[boot] app loaded"]

def add_log():
    n = len(state.logs) + 1
    state.logs = state.logs + [f"[event] log line {n}"]
</script>
```

## Tabbed app

```html
<Tabs>
  <Tab label="Overview">
    <Column padding="16" spacing="10"><Text>Overview content</Text></Column>
  </Tab>
  <Tab label="Settings">
    <Column padding="16" spacing="10"><Checkbox bind="opt">Enable option</Checkbox></Column>
  </Tab>
</Tabs>
```

## Next

- [Examples](#/examples) — complete apps
- [Performance](#/performance) — keep it smooth
