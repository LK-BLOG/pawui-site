# Debugging with `pawui inspect`

`pawui inspect app.paw` renders the file off-screen and prints three things:
the widget tree, the CSS selectors that matched each widget, and the state keys
something is listening to.

```
# app.paw
<Window> 470x860
<Column> 470x535
  <Text> 422x24 "Welcome"
      ← .title
      ← #hero
      aria: Welcome
  <Row> 422x58
    <Button> 96x34 "Run"
        aria: Run

state subscriptions: count(2), name(1)
```

## What to look for

**Rule not applying?** The `←` lines are the selectors that actually matched.
If your selector is missing, the rewrite or the class is wrong — not Qt.

**Wrong colour?** Compare the matched list; the last one wins inside the same
weight class, and `#id` beats `.class` beats a tag.

**Nothing reacting to state?** The subscription list at the bottom shows which
keys have listeners. An empty list means no widget is bound to that key, which
usually means a missing `{$key}`.

**Zero-size widget?** The `WxH` column shows why it is invisible.

## Programmatic use

```python
rt = Runtime(source)
rt.run(block=False)
print(rt.inspect_tree())
```

The same method backs the CLI, so you can snapshot a tree in tests.
