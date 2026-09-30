# Project rules — cart (CSC13008 IA#1)

Stack: plain JavaScript (ESM, `"type": "module"`), Node 22+. Nothing else.
Tests use the built-in `node:test` and `node:assert/strict`. No frameworks.

Commands (run all three before saying "done"):
- `npm test`              behaviour, must be green
- `npm run lint`          syntax check of every .js file (`node --check`)
- `npm run format:check`  2-space indent, no tabs, no trailing spaces, final newline

Files: the code lives in `src/cart.js`, its tests in `test/cart.test.js`.
Style: 2-space indent, no semicolons, single quotes, named exports only.
Spec: `README.md` is the source of truth for what `cartTotal` does. Tests
assert the spec (inputs -> outputs), never the internal steps of the code.

Never:
- add a dependency or devDependency, or touch `package-lock.json` / `node_modules/`
- edit `package.json`, `.github/`, or this file unless the brief says so
- use `toFixed` for money: it returns a string, and `=== 467400` then fails
- swallow an error (`catch {}`) or silently coerce bad input; throw `RangeError`
- commit `.env` or any secret; paste secrets or real user data into prompts

When a gate catches a mistake, add one line here so it cannot happen twice.
