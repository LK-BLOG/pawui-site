# Error Reference

All PawUI errors carry position information, formatted uniformly:

```
PawUI error: <message>  (at line N:C)
```

## Error types

| Type | When it's raised |
|------|------------------|
| `PyxError` | Base class; the rest inherit from it |
| `LexerError` | Lexing stage (rare) |
| `ParseError` | Tag/attribute/structure parsing |
| `ComponentError` | Component definition issues (e.g. missing name) |
| `RenderError` | Render stage (unknown component, missing image) |
| `ScriptError` | `<script>` compile or execution failure |

All provide `e.message`, `e.pos` (with line/column), and `e.formatted()`.

```python
from pawui.errors import PyxError

try:
    ...
except PyxError as e:
    print(e.formatted())
```

## Parse errors (ParseError)

| Message | Cause |
|---------|-------|
| `mismatched closing tag: expected </A> got </B>` | Unpaired tags |
| `unclosed tag <A>` | Missing closing tag |
| `unterminated tag <A>` | Missing `>` in a tag |
| `unterminated comment` | `<!--` without `-->` |
| `malformed attribute` | Bad attribute syntax |
| `<Component> requires a name attribute` | `<Component>` missing `name` |

## Component errors (ComponentError)

| Message | Cause |
|---------|-------|
| `component is missing a name` | Custom component definition lacks a name |

## Render errors (RenderError)

| Message | Cause |
|---------|-------|
| `unknown component <X>` | Misspelled or nonexistent tag |
| `no UI elements found in the file` | Nothing renderable in the file |
| `only one root <Window> is allowed` | Multiple `<Window>`s |
| `top-level elements must live inside <Window>` | UI elements outside `<Window>` |
| `component <X> has no body` | Custom component has no root element |
| `image not found: <src>` | Bad image path (relative to CWD) |
| `Web component requires PySide6-Addons` | Add-on not installed |

## Script errors (ScriptError)

| Message | Cause |
|---------|-------|
| `script block has invalid Python syntax: ...` | Python syntax error in `<script>` |
| `script block failed at runtime: ...` | Script raised at execution |

`ScriptError` includes the underlying exception for quick diagnosis.

## Tips

1. Copy the `line:col` from the message and jump to that line in the `.paw`.
2. `pawui check app.paw` catches most parse errors before running.
3. On `image not found`, check the working directory (`pwd`) and fix the relative/absolute path.

## Exit codes (CLI)

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Run / parse error |
| 2 | Usage error |
| 130 | Interrupted (Ctrl+C) |

## Next

- [Debugging](#/docs/debugging) — diagnosis flow
- [CLI](#/docs/cli) — `check` and `render`
