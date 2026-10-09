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

## 打包后要闭源？先看许可证

PawUI 是 **LGPL-3.0-or-later**。也就是说，你**可以把用 PawUI 做的程序闭源发布** ——
但要满足两个条件：

1. **给出显著声明**：写明你的程序用了 PawUI，并随程序附上许可证文本。
   实操上就是：About 框 / README 里写一行，并把 `LICENSE`（LGPL-3.0）和
   `COPYING`（GPL-3.0）一起打包出去。
2. **允许用户替换这个库**：PawUI 是普通 Python 包（`import pawui`），只要别把它
   静态焊死进可执行文件、让它作为正常依赖存在，用户就能换成自己编译的版本 ——
   这一条天然满足。

不想承担这些义务，就换一套宽松许可的 UI 库。

> LGPL-3.0 和 PySide6（同为 LGPL-3.0）一致，所以你并没有在 Qt 已有的要求之上
> 增加新的负担。

## 分发清单

- [ ] 目标平台构建（Windows 构建 Windows，macOS 构建 macOS）
- [ ] 资源文件已 `--add-data`
- [ ] 在干净机器上测试运行
- [ ] `LICENSE`（LGPL-3.0）+ `COPYING`（GPL-3.0）一起打包
- [ ] About 框 / README 写明用了 PawUI

## 下一步

- [命令行](#/cli) — `pawui` 的所有命令
- [常见问题](#/faq) — 排错
