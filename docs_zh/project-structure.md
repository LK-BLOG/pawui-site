# 项目结构

怎么组织一个 PawUI 项目，从几十行的脚本到多文件的应用。

## 最小项目

一个 `.paw` 文件就是一个应用：

```
hello/
└── app.paw
```

```bash
pawui app.paw
```

## 推荐结构

稍大的应用建议这样组织：

```
myapp/
├── main.py            # 入口：from pawui import run; run("app.paw")
├── app.paw            # 界面 + 事件绑定
├── assets/            # 图片、图标
│   └── logo.png
├── README.md
└── requirements.txt
```

`main.py`：

```python
from pawui import run

if __name__ == "__main__":
    run("app.paw")
```

这样既能 `python main.py`，也方便后续用 PyInstaller 打包（见[打包与分发](#/docs/packaging)）。

## 资源路径

`<Image src="...">` 与脚本中的文件路径都相对**当前工作目录**解析，而不是 `.paw` 文件所在目录。因此：

```bash
# 在项目根目录运行
cd myapp
pawui app.paw
```

或者在启动时切换目录：

```python
import os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
from pawui import run
run("app.paw")
```

## 用自定义组件拆分界面

界面变大时，把重复或独立的界面块抽成 `<Component>`。它们和 `<script>` 一起放在 `.paw` 文件顶层：

```html
<Component name="Sidebar">
  <Column padding="16" spacing="6" bg="surface">
    <For each="item" in="{$nav}">
      <Button on_click="{$select}" bg="surface" fg="text">{$item}</Button>
    </For>
  </Column>
</Component>

<Window title="应用" width="800" height="520">
  <Row spacing="0" expand="true">
    <Sidebar/>
    <Column padding="24" spacing="12" expand="true">
      <Text size="22" bold>{$title}</Text>
    </Column>
  </Row>
</Window>
```

## 组织脚本逻辑

`<script>` 里的顶层函数会进入运行时命名空间，可被 `on_click` 按名引用。把逻辑按职责分成小函数：

```python
def load_items():
    ...

def save_items():
    ...

def add_item():
    ...
```

需要外部依赖时，用 `context` 注入而不是在脚本里硬编码（见[脚本](#/docs/scripts)）。

## 依赖与版本

```
# requirements.txt
pawui>=0.1.1
```

Python ≥ 3.10，`PySide6` 会随 `pawui` 自动安装。

## 版本控制

`.paw`、`main.py`、`assets/` 都纳入版本控制。忽略打包产物：

```gitignore
build/
dist/
__pycache__/
*.pyc
```

## 开发循环

```bash
pawui watch app.paw   # 保存即重建，状态保留
pawui check app.paw   # 语法检查
```

## 下一步

- [脚本](#/docs/scripts) — 逻辑组织与依赖注入
- [打包与分发](#/docs/packaging) — 发布应用
