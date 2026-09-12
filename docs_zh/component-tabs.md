# Tabs — 标签页

把内容分到多个可切换的页面。

## 结构

```html
<Tabs>
  <Tab label="常规">
    <Column padding="16" spacing="10">
      <Text>常规设置</Text>
    </Column>
  </Tab>
  <Tab label="高级">
    <Column padding="16" spacing="10">
      <Text>高级设置</Text>
    </Column>
  </Tab>
</Tabs>
```

- `<Tabs>` 是容器，内部每个 `<Tab>` 是一页。
- `label` 是标签文字，支持模板。
- 每个 `<Tab>` 内部可放任意布局。

## 属性

| 标签 | 属性 | 类型 | 默认 | 说明 |
|------|------|------|------|------|
| `Tabs` | `bg` | str | `background` | 选中页的背景色 |
| `Tab` | `label` | str | `"Tab"` | 标签文字 |

```html
<Tabs bg="surface">
  <Tab label="首页"><Text>首页</Text></Tab>
  <Tab label="设置"><Text>设置</Text></Tab>
</Tabs>
```

## 动态标签

标签名支持插值：

```html
<Tab label="{$tab_name}">
  <Text>内容</Text>
</Tab>
```

## 直接子元素

不是 `<Tab>` 的直接子元素会被当作单独一页，标签名为默认值。建议始终显式使用 `<Tab label="...">`。

## 常见模式：设置面板

```html
<Window title="设置" width="460" height="420" theme="dark">
  <Column padding="20" spacing="16">
    <Text size="22" bold>偏好设置</Text>
    <Tabs>
      <Tab label="常规">
        <Column padding="16" spacing="14">
          <Checkbox bind="auto_save" checked="true">自动保存</Checkbox>
          <Checkbox bind="notifications">桌面通知</Checkbox>
        </Column>
      </Tab>
      <Tab label="外观">
        <Column padding="16" spacing="14">
          <Text size="13" color="subtext">主题</Text>
          <Button on_click="toggle_theme" bg="surface" fg="text">切换深色 / 浅色</Button>
        </Column>
      </Tab>
      <Tab label="声音">
        <Column padding="16" spacing="14">
          <Text size="13" color="subtext">音量：{$volume}</Text>
          <Slider min="0" max="100" value="{$volume}" bind="volume"/>
        </Column>
      </Tab>
    </Tabs>
  </Column>
</Window>
```

```python
state.auto_save = True
state.notifications = False
state.volume = 60
state.dark = True

def toggle_theme():
    state.dark = not state.dark
    app.set_theme("dark" if state.dark else "light")
```

## 当前选中页

PawUI 不暴露当前标签索引；如需根据标签做逻辑，通常为每个功能区块使用独立组件与方法。

## 下一步

- [布局](#/layout) — 容器嵌套
- [设置配方](#/recipes) — 完整设置界面
