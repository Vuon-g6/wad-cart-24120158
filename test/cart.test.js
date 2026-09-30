import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cartTotal } from '../src/cart.js'

const options = { vatRate: 0.08, freeShipFrom: 500000, shipFee: 30000 }
const item = (price, qty = 1) => ({ name: 'x', price, qty })

test('the example from the slides', () => {
  const items = [
    { name: 'Áo thun', price: 180000, qty: 2 },
    { name: 'Sổ tay', price: 45000, qty: 1 },
  ]
  assert.equal(cartTotal(items, options), 467400)
})

test('the result is a number, not a string', () => {
  assert.equal(typeof cartTotal([item(180000)], options), 'number')
})

test('an empty cart costs nothing: no VAT, no shipping', () => {
  assert.equal(cartTotal([], options), 0)
})

test('shipping is free when the subtotal is exactly the threshold', () => {
  // 500000 + 8% VAT = 540000, no shipping
  assert.equal(cartTotal([item(500000)], options), 540000)
})

test('shipping is charged one dong below the threshold', () => {
  // 499999 * 1.08 = 539998.92 -> 539999, plus 30000
  assert.equal(cartTotal([item(499999)], options), 569999)
})

test('shipping is free above the threshold', () => {
  // 600000 * 1.08 = 648000
  assert.equal(cartTotal([item(300000, 2)], options), 648000)
})

test('a negative price throws RangeError', () => {
  assert.throws(() => cartTotal([item(-1)], options), RangeError)
})

test('a fractional quantity throws RangeError', () => {
  assert.throws(() => cartTotal([item(1000, 1.5)], options), RangeError)
})

test('a zero quantity throws RangeError', () => {
  assert.throws(() => cartTotal([item(1000, 0)], options), RangeError)
})

test('a negative quantity throws RangeError', () => {
  assert.throws(() => cartTotal([item(1000, -2)], options), RangeError)
})

test('a bad item is rejected even when other items are fine', () => {
  assert.throws(() => cartTotal([item(1000), item(-5)], options), RangeError)
})

test('the total is rounded down to the whole dong', () => {
  // 1004 * 1.1 = 1104.4 -> 1104 (freeShipFrom 0: no shipping)
  const result = cartTotal([item(1004)], { vatRate: 0.1, freeShipFrom: 0, shipFee: 30000 })
  assert.equal(result, 1104)
})

test('the total is rounded up to the whole dong', () => {
  // 1006 * 1.1 = 1106.6 -> 1107
  const result = cartTotal([item(1006)], { vatRate: 0.1, freeShipFrom: 0, shipFee: 30000 })
  assert.equal(result, 1107)
})

test('a free item (price 0) is allowed', () => {
  assert.equal(cartTotal([item(0), item(100000)], { vatRate: 0, freeShipFrom: 500000, shipFee: 30000 }), 130000)
})

test('omitted options mean no VAT, no shipping', () => {
  assert.equal(cartTotal([item(1000, 3)]), 3000)
})
