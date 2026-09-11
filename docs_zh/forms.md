# 表单

用 PawUI 构建表单：字段、双向绑定、校验与提交。

## 基本结构

```html
<Window title="资料" width="400" height="420">
  <Column padding="28" spacing="16">
    <Text size="22" bold>编辑资料</Text>

    <Column spacing="6">
      <Text size="12" color="subtext">用户名</Text>
      <Input bind="username" value="{$username}" placeholder="请输入"/>
    </Column>

    <Column spacing="6">
      <Text size="12" color="subtext">密码</Text>
      <Input show="password" bind="password" value="{$password}" placeholder="至少 6 位"/>
    </Column>

    <If condition="{$has_error}">
      <Text size="12" color="danger">{$error}</Text>
    </If>

    <Row spacing="10">
      <Button on_click="submit" expand="true">保存</Button>
      <Button on_click="reset" bg="surface" fg="text">重置</Button>
    </Row>
  </Column>
</Window>
```

- `bind` 把输入写回 state。
- `value="{$key}"` 让 state 的变化回填输入框（配合 `bind` 即为双向）。
- `show="password"` 切换为密码框。

## 校验

把校验逻辑抽成普通函数，`submit` 里依次检查：

```python
state.username = ""
state.password = ""
state.error = ""
state.has_error = False

def validate():
    if len(state.username.strip()) < 3:
        return "用户名至少 3 个字符"
    if len(state.password) < 6:
        return "密码至少 6 位"
    return ""

def submit():
    msg = validate()
    if msg:
        state.error = msg
        state.has_error = True
        return
    state.has_error = False
    state.error = "已保存"

def reset():
    state.username = ""
    state.password = ""
    state.error = ""
    state.has_error = False
```

## 选择类字段

```html
<Checkbox bind="subscribe">订阅更新</Checkbox>
<Slider bind="volume" min="0" max="100" value="{$volume}"/>
<Text size="12" color="subtext">音量：{$volume}</Text>
```

| 组件 | 写回类型 |
|------|----------|
| Input / TextArea | `str` |
| Checkbox | `bool` |
| Slider | `int` |

## 多字段表单

字段多时，把每个字段的绑定与校验集中管理：

```python
state.form = {"name": "", "email": "", "age": "0"}
```

```html
<Input bind="form.name" value="{$form.name}" placeholder="姓名"/>
```

> `bind` 支持点号路径；写回时会更新对应键。

## 实时校验

用 `on_change` 在输入时即时反馈：

```python
def check_email(text):
    state.email_ok = "@" in (text or "") and "." in text.split("@")[-1]
```

```html
<Input bind="email" value="{$email}" on_change="check_email" placeholder="邮箱"/>
<If condition="{$email_ok}">
  <Text size="12" color="accent">格式正确</Text>
</If>
```

## 回车提交

```html
<Input bind="text" on_enter="submit" placeholder="输入后回车"/>
<Button on_click="submit">提交</Button>
```

`on_enter` 与按钮指向同一处理器，保持一致行为。

## 提交后的清理

```python
def submit():
    ...
    state.draft = ""      # 清空输入框
```

因为输入框通过 `value="{$draft}"` 双向绑定，清空 state 即可清空控件。

## 下一步

- [校验配方](#/docs/recipes) — 可复制片段
- [数据绑定](#/docs/data-binding) — 绑定细节
