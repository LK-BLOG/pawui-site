# Tooltip 与 Web

两个特殊组件：悬停提示包裹层，以及内嵌网页。

## Tooltip — 悬停提示

包裹一个子元素，鼠标悬停时显示提示文字。

| 属性 | 类型 | 说明 |
|------|------|------|
| `text` | str | 提示文字（也可写在标签内容里） |

```html
<Tooltip text="保存当前文件">
  <Button on_click="save">保存</Button>
</Tooltip>
```

内容里也可写提示：

```html
<Tooltip>删除这一项
  <Button on_click="remove" bg="surface" fg="danger">删除</Button>
</Tooltip>
```

`Tooltip` 是容器，包裹的组件保持原有布局；提示挂在被包裹的控件上。

## Web — 内嵌网页

嵌入网页视图，需要额外安装：

```bash
pip install PySide6-Addons
```

| 属性 | 类型 | 说明 |
|------|------|------|
| `src` | str | 网页 URL |
| `html` | str | 直接注入 HTML（`src` 为空时使用） |
| `bg` | str | 背景色 |

```html
<Web src="https://example.com"/>
```

或注入本地 HTML：

```html
<Web html="<h1>Hello Web</h1><p>来自内联 HTML</p>" expand="true"/>
```

未安装 `PySide6-Addons` 时会报：

```
PawUI error: Web component requires PySide6-Addons
```

## 组合示例：帮助按钮

```html
<Tooltip text="打开帮助文档">
  <Button on_click="open_help" bg="surface" fg="text">?</Button>
</Tooltip>
```

## 组合示例：内嵌文档

```html
<Window title="文档" width="820" height="600">
  <Column padding="12" spacing="10" expand="true">
    <Row spacing="8">
      <Input bind="url" value="{$url}" placeholder="https://..." expand="true"/>
      <Button on_click="go">前往</Button>
    </Row>
    <Web src="{$url}" expand="true"/>
  </Column>
</Window>

<script>
state.url = "https://pypi.org/project/pawui/"

def go():
    pass   # url 已通过 value 绑定回填
</script>
```

> `src` 支持模板；但 Web 视图在构建时创建，改变 `url` 后可能需要重建 UI 才能加载新地址。

## 注意事项

- `Web` 会显著增大打包体积（QtWebEngine），不需要时用 `--exclude-module` 排除。
- `Tooltip` 的提示在被包裹控件的悬停区域上触发。

## 下一步

- [组件总览](#/docs/components) — 全部组件
- [打包与分发](#/docs/packaging) — 排除 Web 模块
