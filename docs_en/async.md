# Async & Long Tasks

The UI runs on the Qt main thread. Any slow operation (network, disk, sleep, heavy compute) placed directly in a handler will **freeze the UI**. Use `app.invoke_async`.

## Basic usage

```python
import time

def work():
    # runs on a background thread: compute only, never touch widgets or state
    time.sleep(2)
    return ["Result 1", "Result 2", "Result 3"]

def on_done(result, error):
    # runs on the main thread: safe to update state
    if error:
        state.status = f"Failed: {error}"
        return
    state.items = result
    state.status = "Done"

def start():
    state.status = "Loading..."
    app.invoke_async(work, done=on_done)
```

```html
<Button on_click="start">Start</Button>
<Text color="subtext">{$status}</Text>
<For each="row" in="{$items}">
  <Text>{$row}</Text>
</For>
```

## Two hard rules

1. **`handler` runs on a background thread** — do not access widgets or call `state` inside it.
2. **`done(result, error)` runs on the main thread** — update `state` here.

Violating the first causes random crashes or deadlocks.

## Error handling

`done` receives an `error` argument. Non-empty means the background task raised:

```python
def on_done(result, error):
    if error:
        state.status = "Load failed, please retry"
        state.detail = str(error)
        return
    state.data = result
```

Always handle it, or the UI stays stuck on "Loading...".

## Passing arguments

`invoke_async` forwards arguments to the background function:

```python
def fetch(url):
    ...
    return data

def load(url):
    app.invoke_async(fetch, url, done=on_done)
```

> Note: handlers currently receive the widget's value from the event; to pass distinct values, store the target in state and read it inside the handler.

## Progress feedback

Background code can't write state, but `done` can update stages. For fine-grained progress, have the background task return intermediate results:

```python
def work():
    results = []
    for i in range(1, 6):
        results.append(i * 10)
    return results
```

## Common cases

| Case | Approach |
|------|----------|
| Network request | Background `requests`/`urllib`, assign in `done` |
| Reading a large file | Read in background, parse/display in `done` |
| Batch compute | Compute in background, write state in `done` |
| Periodic refresh | Background task + callback; don't `sleep` in a handler |

## Versus `refresh`

- `app.invoke_async`: run **logic** in the background, return to the main thread.
- `app.refresh()`: rebuild the whole widget tree (expensive), for structural changes only.

## Next

- [Events](#/events) — handler resolution
- [Performance](#/performance) — keep it smooth
