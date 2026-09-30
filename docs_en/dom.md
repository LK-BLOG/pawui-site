# Manipulating the page from Python

`<script>` gets an `app` object that behaves like a tiny DOM: query elements,
read and write text, add classes, inject CSS, append or remove markup, and bind
events.

| Browser | PawUI |
| --- | --- |
| `document.querySelector` | `app.query(".card")` |
| `document.querySelectorAll` | `app.query_all(".card")` |
| `el.addEventListener` | `app.on("#save", "click", fn)` |
| `el.classList.add` | `el.add_class("primary")` |
| `el.style.color = …` | `el.css("color: red;")` |
| `document.createElement` | `app.append("#list", "<Text>hi</Text>")` |
| `el.remove()` | `app.remove("#old")` |

## Querying

Selectors are the same ones `<Style>` accepts — `#id`, `.class`, component tags,
attribute selectors, descendant and child combinators.

```python
app.query("#save")            # first match or None
app.query_all(".plan")        # list
app.query(".card Text")       # descendant
```

Each hit is an `Element`:

```python
el = app.query("#title")
el.text                       # read
el.text = "new title"         # write
el.id, el.tag, el.classes
el.attr("pw-state", "busy")
```

## Lifecycle: use `ready()`

`<script>` runs **before** the widgets exist, so querying at import time finds
nothing. Wrap page work in `ready(fn)` — it runs right after the tree is built:

```python
def wire():
    app.query("#title").text = "loaded"
    app.on(".card", "click", lambda e: print(e.target.id))

ready(wire)
```

## Events

```python
app.on("#save", "click", on_save)      # every matching element
app.query("#save").on("hover", fn)     # one element
```

Supported kinds: `click`, `change`, `input`, `enter`, `hover`, `leave`, `focus`,
`blur`.

The handler receives an `Event`:

```python
def on_save(e):
    print(e.type, e.target.tag, e.value, e.checked)
```

Events bubble: a click on a label inside a card still reaches a handler bound on
the card. Clicks on interactive children (buttons, inputs) bubble through the
`clicked` signal, so `app.on(".card", "click", fn)` works no matter what is
inside the card.

## Adding and removing markup

```python
app.append("#list", "<Text class='row'>new item</Text>")
app.query("#list").prepend("<Text>first</Text>")
app.query("#list").clear()
app.remove("#old")
```

Appended fragments are parsed like any `.paw` document: they can use components,
`{$state}` templates and `on_click` handlers. Appends land *before* the trailing
spacer, so the visual order matches the call order.

## Styling from Python

```python
app.inject_css("Button { radius: 6px; }")
app.css(".card", "radius: 6; bg: #fff;")
app.query("#alert").css("bg: #ff375f;")
app.query("#alert").add_class("danger")    # triggers a restyle
```

## Toasts

```python
app.toast("Saved", "success")   # info / success / warning / error
```

Toasts float above the root window, stack upward, fade in and out, and clean
themselves up.
