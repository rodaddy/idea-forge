# tests

Maintainer-side tests for the kit package. Not shipped work for the buyer; the
buyer never runs these.

- `kit.test.mjs` - node:test suite that copies `skills/` into a temporary
  install fixture under the repo's validation-runs workspace, seeds
  `USER-CONFIG.md` and `branding/`, and asserts the package and its install
  verifier behave as documented.

Run with `node --test tests/` from the kit folder.
