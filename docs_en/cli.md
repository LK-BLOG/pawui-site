# CLI

Installing PawUI provides a `pawui` command.

```bash
pawui <file.paw>            # run directly
pawui run <file.paw>        # explicit run
pawui watch <file.paw>      # hot reload
pawui check <file.paw>      # syntax check
pawui schema                # component schema (JSON)
pawui render <file.paw>     # offscreen render
pawui help [topic]          # bundled docs
pawui --version
pawui --help
```

## run

```bash
pawui app.paw
pawui run app.paw
```

Run a `.paw` file, blocking until the window closes. A missing file is an error.

## watch

```bash
pawui watch app.paw
```

Polls the file's modification time every 400ms. On change it re-parses and rebuilds the window, **preserving State and script functions**:

```
  ↻ app.paw changed, rebuilding…
  ✓ reloaded
```

Syntax errors are printed while the old window stays up; it recovers when fixed.

## check

```bash
pawui check app.paw
```

Parse only, no run. On success:

```
✓ app.paw: syntax OK
  Elements: 1
  Script: yes
  Component: UserCard
```

On failure, a positioned error:

```
PawUI error: mismatched closing tag: expected </Column> got </Row>  (at line 12:3)
```

Exit codes: `0` success, `1` failure, `2` bad arguments.

## schema

```bash
pawui schema
```

Prints a JSON schema of all components, props, animations, and theme — useful for editor completion or tooling:

```json
{
  "components": {
    "Button": {
      "props": {
        "on_click": {"type": "string"},
        "bg": {"type": "string", "default": "accent"}
      }
    }
  }
}
```

## render

```bash
pawui render app.paw
```

Renders offscreen (`QT_QPA_PLATFORM=offscreen`) and prints info — good for CI:

```
✓ app.paw: render OK
  Window: Counter
  Size: 400x300
```

## help

```bash
pawui help              # list topics
pawui help components   # print a topic
```

Reads Markdown from the bundled `docs/` directory and prints it. Available topics depend on the installation (e.g. `components`, `syntax`, `theming`).

## Version and help

```bash
pawui --version    # PawUI 0.1.1
pawui -h
pawui --help
```

## Calling from Python

```python
from pawui import main

code = main(["check", "app.paw"])   # returns the exit code
```

## Exit codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Run / parse error |
| 2 | Usage error |
| 130 | Interrupted (Ctrl+C) |

## Next

- [API Reference](#/docs/api) — Python interfaces
- [FAQ](#/docs/faq) — troubleshooting
