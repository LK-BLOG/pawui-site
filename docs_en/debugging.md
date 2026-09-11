# Debugging

PawUI aims to make errors readable at a glance. This page covers fast diagnosis.

## Start with a syntax check

```bash
pawui check app.paw
```

Parses without running — results in milliseconds:

```
✓ app.paw: syntax OK
  Elements: 1
  Script: yes
  Component: Sidebar
```

On failure it reports the **line and column**:

```
PawUI error: mismatched closing tag: expected </Column> got </Row>  (at line 12:3)
```

Most problems (mismatched tags, bad attributes, Python indentation) surface at `check`.

## Runtime errors

Runtime exceptions also carry positions:

```
PawUI error: unknown component <Buton>  (at line 5:5)
PawUI error: component <Card> has no body
PawUI error: image not found: assets/logo.png
```

Catch and format them in Python:

```python
from pawui.errors import PyxError
from pawui import run

try:
    run("app.paw")
except PyxError as e:
    print(e.formatted())     # friendly message with position
```

## Offscreen render check

Verify the app builds in a headless environment (CI, remote):

```bash
pawui render app.paw
```

Prints the window title and size without showing a window.

## Debug with hot reload

```bash
pawui watch app.paw
```

Rebuilds on save. **A syntax error won't close the old window** — the error prints to the terminal and it recovers once fixed. Ideal for rapid iteration.

## Common errors and causes

| Symptom | Likely cause |
|---------|--------------|
| `unknown component <X>` | Misspelled/incorrect-case tag |
| `mismatched closing tag` | Unpaired open/close tags |
| `unclosed tag` | Missing a closing tag |
| `has no body` | Custom component has no root element |
| `image not found` | Path resolves from CWD, not the `.paw` directory |
| `script block has invalid Python syntax` | Indentation/colon issue |
| UI doesn't update | In-place mutation, or a misspelled template key |
| `TypeError` on numbers | Unset keys return `""`; use `state.get(k, 0)` |

## Minimal reproduction

For tricky issues, reduce the `.paw` to the minimum:

1. Remove all non-essential components, keep only around the failing line.
2. Remove unrelated script functions.
3. Re-verify with `pawui check`.

Most issues cluster in three places: **tag matching, state key spelling, and condition expressions**.

## Print debugging

Use standard `print` in the script; output goes to the terminal:

```python
def submit():
    print("submit called, email =", state.email)
    ...
```

(Prints from `app.invoke_async` background threads also reach the terminal.)

## Next

- [Error Reference](#/docs/error-reference) — error type catalog
- [FAQ](#/docs/faq) — troubleshooting
