# CSS variables and design tokens

Qt has no `var()`. PawUI implements it at compile time: every `var(--name)` in
your stylesheet is replaced with the real value before the sheet reaches Qt, so
you write modern CSS and Qt still gets a plain QSS string.

```xml
<Style>
  :root {
    --brand:   #ff7a1a;
    --pad:     14px;
    --radius:  14px;
  }

  Card     { radius: var(--radius); padding: var(--pad); }
  Button   { bg: var(--brand); }
  Divider  { color: var(--border); }        /* theme token */
  Text     { color: var(--missing, #333); } /* fallback */
</Style>
```

## Theme tokens are available for free

Every field of the active theme is exposed as a variable, so switching themes
switches your custom CSS with it:

| Variable | Comes from |
| --- | --- |
| `--background`, `--bg` | `Theme.background` |
| `--surface` | `Theme.surface` |
| `--text`, `--fg` | `Theme.text` |
| `--subtext` | `Theme.subtext` |
| `--accent` | `Theme.accent` |
| `--border`, `--danger` | `Theme.border`, `Theme.danger` |
| `--radius`, `--padding`, `--spacing` | layout tokens |
| `--font_family`, `--font_size` | typography tokens |
| `--<name>` | any `<Color name="..."/>` you declared |

```xml
<Theme extends="dark">
  <Color name="brand" value="#22d3ee"/>
</Theme>
```

`--brand` is now usable anywhere in your CSS, and it survives theme switches.

## Fallbacks and missing variables

`var(--x, fallback)` uses the fallback when `--x` is undefined. If a variable is
missing and has no fallback, PawUI records it and reports it — instead of
silently dropping the whole declaration like raw QSS would.

## Why this matters

Variables make a design system cheap: define the tokens once in `:root`, use
them everywhere, and let one `<Theme>`/`<Color>` change restyle the whole app
without touching a single component.
