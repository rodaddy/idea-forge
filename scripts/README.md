# scripts

The kit's deterministic checks. Plain Node 18+, no dependencies; the buyer path
needs no runtime at all.

- `verify-install.mjs` - confirms the six skills landed correctly in an
  install. Run it as
  `node scripts/verify-install.mjs --installed-root <skills-directory>`.
  It exits non-zero on failure, and the AI must not substitute a confident
  file-list summary for this check.
