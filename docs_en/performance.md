# Performance

PawUI suits small to medium desktop tools. Follow these points to keep the UI responsive.

## Don't block the main thread

Handlers run on the Qt main thread; anything slow (network, disk, sleep) freezes the UI. Use `app.invoke_async`:

```python
def heavy():
    # background thread: compute only, never touch widgets
    return expensive_computation()

def on_done(result, error):
    # main thread: safe to update state
    if error:
        state.status = f"Failed: {error}"
    else:
        state.data = result
        state.status = "Done"

def start():
    state.status = "Working..."
    app.invoke_async(heavy, done=on_done)
```

Rule: `handler` runs in the background, `done` runs on the main thread.

## Assign new objects to state

Listeners fire on **assignment**. Mutating collections in place neither refreshes the UI nor updates dependent logic reliably:

```python
state.items.append(x)             # bad: no refresh
state.items = state.items + [x]   # good: assign a new list
```

## Long lists: use `<VirtualList>`

`<For>` builds a real widget per item — 1000 rows means ~3000 QWidgets and a heavy
window. `<VirtualList>` builds only the rows inside the viewport and swaps them as
you scroll, so cost stops depending on how much data you have:

| Rows | `<For>` build | `<VirtualList>` build |
| --- | --- | --- |
| 100 | 45 ms | 57 ms |
| 1 000 | 1 300 ms | 87 ms |
| 2 000 | 3 200 ms | 88 ms |
| 100 000 | — | 139 ms |

```html
<VirtualList rows="{$rows}" row_height="34" height="420">
  <Row><Text>{$item.name}</Text></Row>
</VirtualList>
```

Use `<For>` for a handful of rows and `<Table>` for a few hundred; reach for
`<VirtualList>` past that. If you must paginate instead, keep slices small:

```python
state.page = 1
def page_items():
    start = (state.page - 1) * 50
    return state.all_items[start:start + 50]
state.page_items = page_items
```

## Styles stay cheap

Rules are parsed once when your document loads; matching a widget is a lookup, and
re-applying an unchanged stylesheet is skipped. Still, avoid `inject_css` in a
tight loop — inject once with a class selector and toggle `.add_class(...)`.

## Avoid full refreshes

`app.refresh()` destroys and rebuilds the whole widget tree — expensive. Use it only when the structure really changes; value changes are handled by state binding.

## Don't upscale images

Load images near their display size. `<Image>` scales by `width`/`height`, but an oversized source still costs memory:

```html
<Image src="avatar.png" width="64" height="64"/>
```

## Keep animations reasonable

Entrance animations play once, but large `stagger` or long `duration` makes content feel slow to appear:

```html
<Column stagger="40">   <!-- +40ms per item; don't go large -->
```

## Lots of text

Use `<TextArea readonly="true">` (a native text box; efficient scrolling) rather than putting tens of thousands of characters in a `<Text>`.

## Checklist

- Any `time.sleep` / synchronous network calls on the main thread?
- Are lists mutated in place instead of reassigned?
- Are you calling `app.refresh()` frequently?
- Are long lists using `<VirtualList>` instead of `<For>`?
- Is `inject_css` called once per style change rather than inside a loop?

## Next

- [State & Scripts](#/state-scripts) — how updates fire
- [Events](#/events) — `invoke_async` in depth
