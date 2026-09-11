# State, In Depth

`state` is more than a key-value store. This page covers subscriptions, snapshots, resets, and lifecycle.

## Watching changes

`watch` subscribes to a key (or all keys):

```python
def on_count(value):
    print("count is now", value)

unsub = state.watch("count", on_count)   # returns an unsubscribe function

# watch all keys
state.watch("*", lambda v: print("something changed"))
```

Call the returned function to unsubscribe:

```python
unsub()
```

## Iteration and snapshots

```python
state.keys()        # list of key names
state.snapshot()    # plain dict copy (safe to iterate/serialize)
state.has("count")  # key membership
```

`snapshot()` is handy for passing state to external functions or logging without reading live values.

## Conditional initialization

Hot reload **re-runs the script** but keeps State. A plain `state.count = 0` overwrites the existing value. Initialize once:

```python
if not state.has("count"):
    state.count = 0
```

This initializes on first run without resetting user data on reload.

## Resetting

Provide an explicit reset function rather than reassigning every key:

```python
def reset():
    state.count = 0
    state.query = ""
    state.items = []
```

## Avoiding feedback loops

Writing the same key inside its watcher causes a loop. Be careful:

```python
# dangerous: may recurse forever
state.watch("a", lambda v: state.set("a", v + 1))
```

Prefer read-only derived functions instead of writing back (below).

## Derived values vs. duplicated state

Prefer derived functions on state over redundant keys:

```python
def total():
    return sum(float(x) for x in state.prices)

state.total = total
```

```html
<Text>Total {$total}</Text>
```

This avoids the "primary data changed but the duplicate key didn't" bug.

## Functions in the namespace

Top-level functions from `<script>` work both as event handlers and derived values:

```python
def greeting():
    return f"Hello, {state.name or 'guest'}"

state.greeting = greeting
```

## Next

- [State & Scripts](#/docs/state-scripts) — basics
- [Forms](#/docs/forms) — state-driven forms
