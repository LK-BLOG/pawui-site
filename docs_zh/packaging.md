# 打包与分发

把 PawUI 应用打包成可执行文件分发给用户。推荐使用 PyInstaller。

## 准备入口文件

PawUI 需要 Python 解释器来运行 `.paw`。打包前先写一个入口 `main.py`：

```python
from pawui import run

if __name__ == "__main__":
    run("app.paw")
```

把 `app.paw` 和它用到的资源（图片等）放在项目目录：

```
myapp/
├── main.py
├── app.paw
└── assets/
    └── logo.png
```

## 用 PyInstaller 打包

```bash
pip install pyinstaller
pyinstaller --noconsole --name MyApp \
  --add-data "app.paw;." \
  --add-data "assets;assets" \
  main.py
```

- `--noconsole`（Windows）/ `--windowed`（macOS）：不弹出控制台窗口。
- `--add-data "源;目标"`：把数据文件打进包里。Windows 用 `;` 分隔，macOS/Linux 用 `:`。

生成的程序在 `dist/MyApp/`。

## 读取打进包里的资源

打包后，文件路径会变。用 `sys._MEIPASS` 兼容源码运行与打包运行：

```python
import os, sys

def resource(rel):
    base = getattr(sys, "_MEIPASS", os.path.dirname(os.path.abspath(__file__)))
    return os.path.join(base, rel)
```

然后：

```python
from pawui.runtime import Runtime

source = open(resource("app.paw"), encoding="utf-8").read()
Runtime(source, resource("app.paw"), theme="dark").run(block=True)
```

`<Image src="...">` 的路径相对**当前工作目录**，打包后建议在启动时 `os.chdir` 到资源目录，或改成绝对路径。

## 单文件模式

```bash
pyinstaller --onefile --noconsole --add-data "app.paw;." main.py
```

单文件启动稍慢（需要解压），但分发最简单。

## 常见问题

### 缺少 Qt 插件

PyInstaller 的 PySide6 hook 通常能自动收集插件。若报错找不到平台插件，显式添加：

```bash
pyinstaller --noconsole --collect-all PySide6 main.py
```

### 文件太大

PySide6 体积较大（数百 MB）。可以用 `--exclude-module` 排除不用的 Qt 模块（如 `PySide6.QtWebEngineCore` — 除非用了 `<Web>`）。

### 找不到图片

确认 `--add-data` 包含了 `assets`，并在运行时用上面的 `resource()` 解析路径。

## 分发清单

- [ ] 目标平台构建（Windows 构建 Windows，macOS 构建 macOS）
- [ ] 资源文件已 `--add-data`
- [ ] 在干净机器上测试运行
- [ ] 附带 LICENSE / 说明

## 下一步

- [命令行](#/cli) — `pawui` 的所有命令
- [常见问题](#/faq) — 排错
