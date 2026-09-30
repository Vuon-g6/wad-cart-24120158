// cartTotal(items, options) -> subtotal + VAT + shipping, rounded to whole dong.
// The rules are in README.md and brief.md.

function isNonNegativeFinite(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
}

function readOptions(options = {}) {
  const { vatRate = 0, shipFee = 0, freeShipFrom = Infinity } = options
  if (!isNonNegativeFinite(vatRate)) throw new RangeError('vatRate must be a non-negative number')
  if (!isNonNegativeFinite(shipFee)) throw new RangeError('shipFee must be a non-negative number')
  if (typeof freeShipFrom !== 'number' || Number.isNaN(freeShipFrom)) {
    throw new RangeError('freeShipFrom must be a number')
  }
  return { vatRate, shipFee, freeShipFrom }
}

export function cartTotal(items, options) {
  if (!Array.isArray(items)) throw new TypeError('items must be an array')

  // Validate everything before computing anything.
  for (const { price, qty } of items) {
    if (!isNonNegativeFinite(price)) throw new RangeError(`bad price: ${price}`)
    if (!Number.isInteger(qty) || qty <= 0) throw new RangeError(`bad qty: ${qty}`)
  }
  const { vatRate, shipFee, freeShipFrom } = readOptions(options)

  if (items.length === 0) return 0

  const subtotal = items.reduce((sum, { price, qty }) => sum + price * qty, 0)
  const vat = subtotal * vatRate
  const shipping = subtotal >= freeShipFrom ? 0 : shipFee

  // Round once, at the end. Math.round returns a number; toFixed would return a string.
  return Math.round(subtotal + vat + shipping)
}
