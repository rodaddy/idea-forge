# How Idea Forge was built

Sources for this page: the kit's `CHANGELOG.md` (whose entries up to 2.0.0
were reconstructed on 2026-08-12 from dated notes in the old README, and say
so), its tests and install verifier, the history of the private business
repository it was developed in (under `pocs/kits/` and later `kits/`), the
pull request for its 2026-08-13 hardening round, and an internal audit of the
kit line from 2026-08-11. This public repository starts from a single snapshot
commit on 2026-10-27.

## The problem and the first version (undated)

The idea: get an idea out of your head while it is still a ramble, shape it
by being questioned, and end with a page you can send someone. Version 1 did
that with an earlier set of the same skills, but shipped them three ways: pre-built skill
folders for the Claude app, a ChatGPT instructions port and an install
script. Each copy was maintained by hand, and when the Claude app started
requiring zips, they had to be rebuilt by hand too. Version 1 is not dated
anywhere in the record, and the changelog says so rather than guessing.

## Timeline

| Date | Version | What happened |
| --- | --- | --- |
| (undated) | 1.0.0 | Three hand-maintained delivery formats. |
| 2026-07-15 | 2.0.0 | One canonical package plus a self-adapting installer; review fixes; clean-room install test. |
| 2026-07-30 | 2.0.0 | First commit of the kit into version control. |
| 2026-08-11 | - | Kit-line audit names Idea Forge one of two kits validated with real users. |
| 2026-08-12 | 2.0.0 | `VERSION` file and reconstructed changelog added. |
| 2026-08-13 | 2.0.1 | Hardening: plain-Node install verifier, own-idea refusal, no CLI shell-out for images, tests. |
| 2026-08-24 | 2.0.1 | Kit moved from `pocs/kits/` to `kits/`. |
| 2026-10-27 | 2.0.1 | Public portfolio snapshot. |

## Version 2: one package, and the AI does the adapting (2026-07-15)

The central decision of version 2 was to stop maintaining a copy per app.
Every parallel delivery tree was deleted. There is one `skills/` source and an
`installer.md` that the receiving AI reads and follows: a coding agent copies
the folders, the Claude app builds the six zips itself, a ChatGPT Project or
Gemini Gem condenses the skill files into instructions, and plain chat loads
the pipeline for one conversation. "Incompatible" became a banned answer.

The same release added a version-aware upgrade (back up, replace only skill
instructions, never touch the user's config, branding or ideas), a
data-not-instructions rule for anything pasted, session persistence to the
idea's folder, and `START-HERE.md` for getting the installer in front of the
AI on any device.

Two review passes fed into it on the same day:

- **A review by an OpenAI model (GPT-5.6).** The ChatGPT/Gemini path now names
  the exact files to add, in priority order so a capped plan still gets the
  core pipeline, and pauses until they are added. Native image generation is
  tested before it is relied on, because business plans can disable it. A
  structured "emit a brief" section was added with field names that match the
  path that reads it back.
- **A kit-test swarm.** The illustrated guide still described version 1's
  artifacts; it was rewritten to the new install model. Two competing config
  files were merged into one (`USER-CONFIG.md`) that every skill reads first,
  and the branding folder was pinned to one stated location.

Clean-room installs passed that day for Claude Code (a real sandbox run) and,
in simulation, for the Claude app zip path and the ChatGPT Project path. The
changelog keeps the distinction: simulated passes are not device proofs.

## The model for the rest of the line (2026-08-11)

When the business's kit line was audited on 2026-08-11, the scoring rubric was
distilled from two kits that real users had validated, and Idea Forge was one
of them. Two of its traits became criteria for every other kit: it refuses
to finish without the user's own idea, and it ends in a branded,
self-contained page the user can send to someone. A later kit, Delegation
Audit, was built the next day as a direct re-skin of this pipeline.

## Hardening (2026-08-13)

The 2026-08-13 pull request, written with Claude, fixed what the line-wide
standards now required:

- Install verification relied on the AI saying the files were in place. A
  dependency-free Node verifier, `scripts/verify-install.mjs`, now checks the
  six skills, their frontmatter names, the config, branding, nested workflows
  and references, and the upstream licence, and fails closed.
- The install could declare success without a real idea. An empty or missing
  idea now stops, shows what was and was not readable, asks one question and
  leaves the install unverified.
- Image generation shelled out from Claude to a second CLI with its own
  login. It now uses an image tool the host already has, or draws SVG/CSS
  artwork, with nothing extra to install.
- Workplace ideas gained a guard: headcount-reduction or job-elimination
  framing is reframed before a page is built.
- A follow-up commit in the same PR corrected a tier claim so the Node
  verifier is described as optional, matching the buyer path.

The PR's receipts include a deliberate damaged install (the upstream licence
removed) that the verifier rejected with exit code 1.

## How AI was used

- The kit is itself a set of instructions for AI assistants, and it was
  tested by running those instructions in a sandboxed coding agent and in
  simulated app installs.
- An OpenAI model reviewed version 2.0 and a parallel set of agent testers
  found the stale guide and config split.
- Claude co-authored the 2026-08-13 hardening and the reconstructed
  changelog.

## How it is tested

- `tests/kit.test.mjs`: 4 `node:test` cases. Version strings agree across
  `VERSION`, the installer and the changelog; the portability, refusal,
  determinism and positioning rules are present; the verifier accepts a
  complete install; and it rejects an install missing a nested licence file.
- `scripts/verify-install.mjs` on a real install, with exit `0` pass, `1`
  missing or invalid files, `3` usage error.

## What did not work

- Version 1's per-app copies. Each app change meant rebuilding by hand, and a
  copy left behind went stale. One package and an adapting installer replaced
  them.
- Trusting the AI to confirm its own install. A script now checks it.
- Requiring a second command-line tool for images. It added a login and an
  install step most users would never complete.

## Current state

Version 2.0.1, active. Tests pass. Still open, and stated in the README: a
real-device check in the Claude app, a live end-to-end first run, and the
Codex, claude.ai web and plain-chat paths.
