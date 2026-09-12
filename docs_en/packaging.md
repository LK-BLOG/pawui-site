# Packaging & Distribution

Ship a PawUI app as an executable. PyInstaller is recommended.

## Create an entry point

PawUI needs a Python interpreter to run a `.paw` file. Before packaging, write `main.py`:

```python
from pawui import run

if __name__ == "__main__":
    run("app.paw")
```

Keep `app.paw` and its assets (images, etc.) in the project directory:

```
myapp/
├── main.py
├── app.paw
└── assets/
    └── logo.png
```

## Build with PyInstaller

```bash
pip install pyinstaller
pyinstaller --noconsole --name MyApp \
  --add-data "app.paw;." \
  --add-data "assets;assets" \
  main.py
```

- `--noconsole` (Windows) / `--windowed` (macOS): no console window.
- `--add-data "src;dest"`: bundle data files. Use `;` on Windows, `:` on macOS/Linux.

The output is in `dist/MyApp/`.

## Reading bundled resources

After packaging, file paths change. Use `sys._MEIPASS` to work both from source and from a bundle:

```python
import os, sys

def resource(rel):
    base = getattr(sys, "_MEIPASS", os.path.dirname(os.path.abspath(__file__)))
    return os.path.join(base, rel)
```

Then:

```python
from pawui.runtime import Runtime

source = open(resource("app.paw"), encoding="utf-8").read()
Runtime(source, resource("app.paw"), theme="dark").run(block=True)
```

`<Image src="...">` resolves relative to the **current working directory**; after packaging, `os.chdir` to the resource directory at startup, or use absolute paths.

## One-file mode

```bash
pyinstaller --onefile --noconsole --add-data "app.paw;." main.py
```

One-file builds start a bit slower (they unpack) but are the easiest to distribute.

## Troubleshooting

### Missing Qt plugins

PyInstaller's PySide6 hook usually collects plugins automatically. If it complains about a missing platform plugin, add:

```bash
pyinstaller --noconsole --collect-all PySide6 main.py
```

### Bundle too large

PySide6 is large (hundreds of MB). Exclude unused Qt modules with `--exclude-module` (e.g. `PySide6.QtWebEngineCore` unless you use `<Web>`).

### Images not found

Make sure `--add-data` includes `assets`, and resolve paths at runtime with the `resource()` helper above.

## Distribution checklist

- [ ] Build on the target platform (Windows for Windows, macOS for macOS)
- [ ] Assets included via `--add-data`
- [ ] Tested on a clean machine
- [ ] Bundle a LICENSE / README

## Next

- [CLI](#/cli) — all `pawui` commands
- [FAQ](#/faq) — troubleshooting
