# Form fields: radio, segmented, numbers, dates, files

`<Input>` and `<TextArea>` cover text and `<Checkbox>` covers booleans. These
cover the rest.

## `<RadioGroup>` + `<Radio>`

```xml
<RadioGroup value="{$plan}" bind="plan" on_change="on_plan">
  <Radio value="free">Free</Radio>
  <Radio value="pro">Pro</Radio>
</RadioGroup>
```

`value` selects the initial option and follows state; `bind` writes the picked
value back. Options are exclusive by construction — they share one Qt button
group.

## `<Segmented>`

An iOS-style segmented control — the same job as a `<Select>`, with fewer clicks.

```xml
<Segmented items="[Day, Week, Month]" value="{$range}" bind="range"/>
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

Dates are ISO strings (`yyyy-MM-dd`), times are `HH:mm`. Ranges are enforced by
the Qt widgets, so you never parse user input.

## `<FilePicker>`

```xml
<FilePicker label="Import CSV" mode="open" filter="CSV (*.csv)" on_pick="load"/>
```

`mode` is `open`, `save` or `dir`. The handler receives the chosen path:

```python
def load(path):
    state.set("file", path)
    app.toast("Loaded " + path, "success")
```

## Validation

Fields accept `required`, `min_length` and `error` (the message shown on
failure). Put them in a `<Form>` and submit with `app.submit()`:

```xml
<Form on_submit="save">
  <Input id="name" required="true" error="Name is required"/>
  <Button on_click="submit_it">Save</Button>
</Form>
```

```python
def submit_it():
    app.submit()          # validates, paints errors, calls on_submit when clean
```

Errors are drawn where the problem is: the field gets a red border and an error
line underneath, plus a summary at the top of the form. `app.validate()` only
runs the check and returns a boolean; `app.validation_errors` holds the
messages.
