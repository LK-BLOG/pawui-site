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

## Keep list rendering bounded

`<For>` builds a real widget per item. A few hundred is fine; beyond that, paginate or render only what's visible:

```python
state.page = 1
def page_items():
    start = (state.page - 1) * 50
    return state.all_items[start:start + 50]
state.page_items = page_items
```

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
- Are large lists paginated?

## Next

- [State & Scripts](#/docs/state-scripts) — how updates fire
- [Events](#/docs/events) — `invoke_async` in depth
