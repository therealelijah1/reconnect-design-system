# Using the Reconnect design system

## Token groups

| File | What it holds |
| --- | --- |
| `tokens/color.json` | Neutral scale, brand colors, feedback colors |
| `tokens/typography.json` | Font families, type scale, weights, line heights |
| `tokens/spacing.json` | 4px spacing scale, corner radius, elevation |

## In code

```bash
node scripts/build-tokens.js > dist/tokens.css
```

```css
.button {
  padding: var(--space-3) var(--space-5);
  border-radius: var(--radius-md);
  background: var(--color-brand-primary);
  font: var(--font-weight-semibold) var(--font-size-md)/1 var(--font-family-body);
}
```

## In Figma and Framer

Mirror each token as a Figma variable using the same name (for example `color/brand/primary`).
In Framer, add the brand and neutral colors as color styles so names match the CSS output.

## Rules

- Use the 4px spacing scale; no one-off margins.
- Body text never goes below `font-size-sm`.
- Feedback colors are for status only, never decoration.
