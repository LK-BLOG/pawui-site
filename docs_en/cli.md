# CLI Reference

## Commands

```bash
pawui <file.paw>           # Run a .paw file
pawui run <file.paw>       # Explicit run command
pawui watch <file.paw>     # Hot reload: rebuild on file change
pawui check <file.paw>     # Syntax check only (no rendering)
pawui schema               # Print component JSON Schema
pawui render <file.paw>    # Offscreen render self-check
pawui inspect <file.paw>   # Widget tree + matched CSS + state subscriptions
pawui help                 # List doc topics (fetched online)
pawui help <topic>         # Print one doc (e.g. pawui help components)
pawui help --refresh       # Force-refresh the online docs
pawui --version            # Print version
pawui --help               # Show help
```

## Docs come from the site

`pawui help` reads the **live documentation** — the same `static/data.js` the
website renders — so a doc fix reaches you without waiting for a release:

1. fresh cache (`%LOCALAPPDATA%\pawui\docs.json`, 6h TTL) → used as-is;
2. otherwise fetch `https://pawui.pages.dev/static/data.js` and cache it;
3. no network? fall back to the `docs/` bundled with the package.

Each run ends with the source it used, so you always know what you read.

| Environment variable | Effect |
| --- | --- |
| `PAWUI_DOCS_OFFLINE=1` | Never touch the network; cache + bundled docs only |
| `PAWUI_DOCS_LANG=zh\|en` | Force the doc language (default: from the system locale) |

```bash
PAWUI_DOCS_LANG=en pawui help style-css   # read the English page
pawui help --offline theming              # no network at all
```

## Hot Reload

```bash
pawui watch app.paw
```

Polls the file every 400ms. Save the file and the window rebuilds in place;
parse errors are printed instead of crashing. State and script functions are
carried over across reloads.

## Running Files

```bash
# Direct
pawui app.paw

# With path
pawui ./ui/main.paw
pawui /absolute/path/app.paw
```

## Python API

```python
import pawui

# Blocking run
pawui.run("app.paw")

# With context
pawui.run("app.paw", context={"api_key": "secret"}, theme="light")
```

For a non-blocking runtime instance, use `Runtime` directly:

```python
from pawui.runtime import Runtime

rt = Runtime(source, context=context)
rt.run(block=False)   # returns the root QWidget
rt.app.exec()         # start the event loop manually
```

## Runtime Methods

```python
rt = pawui.run("app.paw", block=False)

# Theme switching
rt.set_theme("light")
rt.set_theme(Theme.light())

# Force rebuild
rt.refresh()

# Access state
rt.state.count = 42

# Call handlers
rt.invoke(handler_fn, arg1, arg2)

# Get root widget
window = rt.root
```

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Error (parse, runtime, file not found) |
| 2 | Usage error |
| 130 | Keyboard interrupt (Ctrl+C) |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `QT_QPA_PLATFORM` | Qt platform (e.g., `offscreen` for CI) |
| `QT_AUTO_SCREEN_SCALE_FACTOR` | Enable auto scaling |
| `QT_SCALE_FACTOR` | Manual scale factor |

## Offscreen Rendering (CI)

```bash
QT_QPA_PLATFORM=offscreen pawui app.paw
```

Note: Offscreen has no CJK font - text may show as □□. This is a preview artifact, not a bug.
