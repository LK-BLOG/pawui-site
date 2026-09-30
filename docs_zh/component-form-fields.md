# 表单控件：单选、分段、数字、日期、文件

`<Input>` / `<TextArea>` 管文本，`<Checkbox>` 管布尔，剩下这些补齐。

## `<RadioGroup>` + `<Radio>`

```xml
<RadioGroup value="{$plan}" bind="plan" on_change="on_plan">
  <Radio value="free">免费版</Radio>
  <Radio value="pro">专业版</Radio>
</RadioGroup>
```

`value` 决定初始选中项并跟随状态，`bind` 把选中的值写回 state。互斥是结构保证的 —— 它们共用同一个 Qt 按钮组。

## `<Segmented>`

iOS 那种分段控件，干的是 `<Select>` 的活，但少点一次：

```xml
<Segmented items="[日, 周, 月]" value="{$range}" bind="range"/>
```

## `<NumberInput>`

```xml
<NumberInput min="1" max="64" step="2" value="{$threads}" bind="threads"/>
```

## `<DatePicker>` / `<TimePicker>`

```xml
<DatePicker value="2026-09-27" on_change="on_date"/>
<TimePicker value="13:45" format="HH:mm" on_change="on_time"/>
```

日期是 ISO 字符串（`yyyy-MM-dd`），时间是 `HH:mm`。范围由 Qt 控件自己保证，你不需要解析用户输入。

## `<FilePicker>`

```xml
<FilePicker label="导入 CSV" mode="open" filter="CSV (*.csv)" on_pick="load"/>
```

`mode` 取 `open` / `save` / `dir`。回调直接拿到路径：

```python
def load(path):
    state.set("file", path)
    app.toast("已载入 " + path, "success")
```

## 校验

字段支持 `required`、`min_length` 和 `error`（失败时显示的文字）。放进 `<Form>`，用 `app.submit()` 提交：

```xml
<Form on_submit="save">
  <Input id="name" required="true" error="名字不能空"/>
  <Button on_click="submit_it">保存</Button>
</Form>
```

```python
def submit_it():
    app.submit()      # 校验 → 画错误 → 全部通过才调 on_submit
```

错误画在出错的地方：字段描红 + 下方一行错误文字，表单顶部还有一条汇总。`app.validate()` 只跑校验返回布尔值，错误信息在 `app.validation_errors` 里。
