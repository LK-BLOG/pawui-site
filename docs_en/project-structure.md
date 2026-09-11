# Project Structure

How to organize a PawUI project, from a tiny script to a multi-file app.

## Minimal project

A single `.paw` file is an app:

```
hello/
└── app.paw
```

```bash
pawui app.paw
```

## Recommended layout

Larger apps are better organized like this:

```
myapp/
├── main.py            # entry: from pawui import run; run("app.paw")
├── app.paw            # UI + event bindings
├── assets/            # images, icons
│   └── logo.png
├── README.md
└── requirements.txt
```

`main.py`:

```python
from pawui import run

if __name__ == "__main__":
    run("app.paw")
```

This supports both `python main.py` and later PyInstaller packaging (see [Packaging](#/docs/packaging)).

## Resource paths

`<Image src="...">` and script file paths resolve relative to the **current working directory**, not the `.paw` file. So:

```bash
# run from the project root
cd myapp
pawui app.paw
```

Or change directory at startup:

```python
import os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
from pawui import run
run("app.paw")
```

## Split UI with custom components

As the UI grows, extract repeated or self-contained blocks into `<Component>`, placed at the top level alongside `<script>`:

```html
<Component name="Sidebar">
  <Column padding="16" spacing="6" bg="surface">
    <For each="item" in="{$nav}">
      <Button on_click="{$select}" bg="surface" fg="text">{$item}</Button>
    </For>
  </Column>
</Component>

<Window title="App" width="800" height="520">
  <Row spacing="0" expand="true">
    <Sidebar/>
    <Column padding="24" spacing="12" expand="true">
      <Text size="22" bold>{$title}</Text>
    </Column>
  </Row>
</Window>
```

## Organizing script logic

Top-level functions in `<script>` enter the runtime namespace and can be referenced by name from `on_click`. Keep logic in small, focused functions:

```python
def load_items():
    ...

def save_items():
    ...

def add_item():
    ...
```

For external dependencies, use `context` injection instead of hardcoding (see [Scripts](#/docs/scripts)).

## Dependencies and versions

```
# requirements.txt
pawui>=0.1.1
```

Python ≥ 3.10; `PySide6` is installed automatically with `pawui`.

## Version control

Track `.paw`, `main.py`, and `assets/`. Ignore build output:

```gitignore
build/
dist/
__pycache__/
*.pyc
```

## Dev loop

```bash
pawui watch app.paw   # rebuild on save, state preserved
pawui check app.paw   # syntax check
```

## Next

- [Scripts](#/docs/scripts) — logic organization and injection
- [Packaging](#/docs/packaging) — ship the app
