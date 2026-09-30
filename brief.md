# Brief — cartTotal

## What to build
Implement `cartTotal(items, options)` in `src/cart.js` and its tests in
`test/cart.test.js`. Plain JavaScript (ESM), **no dependencies**.

## Files
- May touch: `src/cart.js`, `test/cart.test.js`.
- Must not touch: `package.json`, `package-lock.json`, `.github/`, `scripts/`,
  `CLAUDE.md`, `README.md`. Do not create other source files.
- Must not invent: libraries, extra exports, extra options, new scripts.

## Contract
- `items`: array of `{ name, price, qty }` — `price` is a number in đồng (>= 0),
  `qty` a positive integer.
- `options`: `{ vatRate, freeShipFrom, shipFee }`
  (e.g. `{ vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }`).
- `subtotal` = sum of `price * qty`.
- `vat` = `subtotal * vatRate`.
- `shipping` = `0` when `subtotal >= freeShipFrom` (exactly at the threshold is
  free), otherwise `shipFee`. The threshold is compared with the subtotal
  before VAT.
- Return `subtotal + vat + shipping` as a **number** (never a string), rounded
  once, at the end, to the whole đồng with `Math.round`. Do not use `toFixed`.
- Empty cart (`[]`) returns `0`: no VAT, no shipping, whatever the options.
- Missing options: `options` may be omitted, and each field defaults to
  `vatRate = 0`, `shipFee = 0`, `freeShipFrom = Infinity` (never free).

## Error cases
- `price` negative, `NaN` or not a number -> `RangeError`.
- `qty` not a positive integer (`0`, negative, `1.5`, `'2'`, `NaN`) -> `RangeError`.
- `items` not an array -> `TypeError`.
- `vatRate` or `shipFee` given but negative or not a finite number -> `RangeError`.
- Validate everything before computing. Never swallow an error, never coerce.

## Worked example (must pass)
```js
cartTotal(
  [{ name: 'Áo thun', price: 180000, qty: 2 }, { name: 'Sổ tay', price: 45000, qty: 1 }],
  { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
) // => 467400   (405000 + 32400 + 30000)
```

## How I will know it worked
- `npm test`, `npm run lint`, `npm run format:check` all green.
- Tests cover: the worked example, result is a number, empty cart, threshold
  exactly / one đồng below / above, negative price, `qty` 0 / 1.5 / negative,
  rounding both up and down, omitted options.
- Each test asserts one rule from this brief, in terms of inputs and outputs,
  and can fail for one reason only.
- The diff touches only the two allowed files and adds no dependency.
