# Forms

Building forms in PawUI: fields, two-way binding, validation, and submission.

## Structure

```html
<Window title="Profile" width="400" height="420">
  <Column padding="28" spacing="16">
    <Text size="22" bold>Edit profile</Text>

    <Column spacing="6">
      <Text size="12" color="subtext">Username</Text>
      <Input bind="username" value="{$username}" placeholder="Enter"/>
    </Column>

    <Column spacing="6">
      <Text size="12" color="subtext">Password</Text>
      <Input show="password" bind="password" value="{$password}" placeholder="At least 6 chars"/>
    </Column>

    <If condition="{$has_error}">
      <Text size="12" color="danger">{$error}</Text>
    </If>

    <Row spacing="10">
      <Button on_click="submit" expand="true">Save</Button>
      <Button on_click="reset" bg="surface" fg="text">Reset</Button>
    </Row>
  </Column>
</Window>
```

- `bind` writes input back to state.
- `value="{$key}"` pushes state changes back into the field (with `bind`, that's two-way).
- `show="password"` switches to a password field.

## Validation

Extract validation into a plain function and check it in `submit`:

```python
state.username = ""
state.password = ""
state.error = ""
state.has_error = False

def validate():
    if len(state.username.strip()) < 3:
        return "Username must be at least 3 characters"
    if len(state.password) < 6:
        return "Password must be at least 6 characters"
    return ""

def submit():
    msg = validate()
    if msg:
        state.error = msg
        state.has_error = True
        return
    state.has_error = False
    state.error = "Saved"

def reset():
    state.username = ""
    state.password = ""
    state.error = ""
    state.has_error = False
```

## Selection fields

```html
<Checkbox bind="subscribe">Subscribe</Checkbox>
<Slider bind="volume" min="0" max="100" value="{$volume}"/>
<Text size="12" color="subtext">Volume: {$volume}</Text>
```

| Component | Writes back |
|-----------|-------------|
| Input / TextArea | `str` |
| Checkbox | `bool` |
| Slider | `int` |

## Multi-field forms

With many fields, centralize bindings and validation:

```python
state.form = {"name": "", "email": "", "age": "0"}
```

```html
<Input bind="form.name" value="{$form.name}" placeholder="Name"/>
```

> `bind` supports dotted paths; writes update the corresponding key.

## Live validation

Use `on_change` for instant feedback:

```python
def check_email(text):
    state.email_ok = "@" in (text or "") and "." in text.split("@")[-1]
```

```html
<Input bind="email" value="{$email}" on_change="check_email" placeholder="Email"/>
<If condition="{$email_ok}">
  <Text size="12" color="accent">Looks good</Text>
</If>
```

## Submit on Enter

```html
<Input bind="text" on_enter="submit" placeholder="Type and press Enter"/>
<Button on_click="submit">Submit</Button>
```

Point `on_enter` and the button at the same handler for consistent behavior.

## Clearing after submit

```python
def submit():
    ...
    state.draft = ""      # clears the field
```

Because the field is bound via `value="{$draft}"`, clearing state clears the widget.

## Next

- [Recipes](#/recipes) — copy-paste snippets
- [Data Binding](#/data-binding) — binding details
