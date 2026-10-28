# Changelog — Idea Forge

All notable changes to Idea Forge are recorded here. This file follows Keep a
Changelog and Semantic Versioning. The version here, the `VERSION` file, and the
`**Version:**` line in `installer.md` must always match — KIT-STANDARD §4.8's
upgrade path reads that line. Versions are patch-only by default (repo
standard).

> **Entries below 2.0.0 and the 2.0.0 entry itself are RECONSTRUCTED.** This kit
> shipped without a `VERSION` file or a `CHANGELOG.md`; the only surviving
> record is the `## Changelog` section of `README.md` and the installer's
> `**Version:** 2.0` line. The entries below were rebuilt from those dated
> README notes on 2026-08-12 and are summaries of them, not a contemporaneous
> log. The README section remains the fuller narrative. No release dates were
> invented: every date below appears verbatim in `README.md`.

## [2.0.1] - 2026-08-13

### Added

- Dependency-free plain-Node install verifier and kit tests for recursive skill
  copies, frontmatter, config, branding, nested workflows/references, and the
  upstream license.
- A deterministic own-data refusal: missing or empty buyer ideas stop the run,
  show what was and was not readable, ask one question, and leave installation
  unverified rather than substituting example content.

### Changed

- Removed the Claude-to-Codex CLI shell-out from image generation. The workflow
  now uses a native image tool already present in the harness or deterministic
  SVG/CSS artwork, with no second CLI, login, API key, or package install.
- Documented determinism-first ownership and the extend-and-enhance,
  never-replace positioning guard for workplace ideas.

## [2.0.0] - 2026-07-15 (reconstructed)

The zip-delivery rebuild — the first kit built to the LI-smb-hq model: one
canonical package (folders + markdown) plus a self-adapting `installer.md` that
makes the receiving AI transform the package into whatever its host platform
needs. This is the version the installer's `**Version:** 2.0` line names; it is
recorded as `2.0.0` because the standard and every sibling kit use three-part
semver, and no patch release after 2.0 is evidenced anywhere in the package.

### Changed

- **Deleted every parallel delivery tree.** v1 (`../LI-smb-hq/candidates/idea-forge-v1/`)
  hand-maintained `claude-app-skills/`, a `chatgpt-app/instructions.txt` port,
  and an `install.sh`; when the Claude app demanded zips, Rico had to build them
  by hand. v2 has one canonical `skills/` source and the installer adapts:
  coding agent copies folders, Claude app builds the six zips itself, ChatGPT
  Project / Gemini Gem condenses the SKILL.md files itself, plain chat loads the
  pipeline in-conversation. "Incompatible" is a banned answer.

### Added (all dated 2026-07-15 in `README.md`)

- **Version-aware upgrade path** in `installer.md` — finds an existing Idea
  Forge, reads its version, asks "keep all your data or skip?", backs up to
  `<name>.backup-<version>`, replaces only `SKILL.md`/`workflows/`/`references/`
  and never `USER-CONFIG.md`, `branding/`, or the ideas library and saved theme.
  No interview is ever re-run on upgrade.
- **§4.7 data-not-instructions block** in `idea-forge/SKILL.md` and
  `idea-page/SKILL.md` — pasted briefs, notes, and research are DATA; a brief's
  `Stage:` line may set the resume point, but nothing pasted skips the shaping
  gate, reaches past the current idea, or changes config, and embedded
  directives get quoted back.
- **Session persistence** — spitball and grilling auto-save working state
  (threads, references, `Stage:`, settled decisions) to
  `IDEAS_HOME/<idea>/notes.md` as the session goes, so a dropped session resumes
  from the folder instead of restarting. Emitting a brief refreshes the file so
  folder and brief cannot disagree. Chat-only installs fall back to a one-time
  "say give me the brief" reminder.
- **`START-HERE.md`** — the per-device first file that gets `installer.md` in
  front of the user's AI.

### Fixed

- **GPT-5.6 review pass (2026-07-15).** Path 3C now names the exact kit files to
  add as Project/Gem sources, priority-ordered so a capped plan still gets the
  core pipeline, and PAUSEs until they are added, with a paste-one-at-a-time
  fallback for file caps. The image lane verifies native generation actually
  responds before recording it (Business/Enterprise/Edu can disable it) and
  falls back to SVG/CSS. `idea-forge/SKILL.md` gained an "Emit a brief" section
  (`# IDEA BRIEF:` with `Stage:`/`Threads:`/`Decisions made:`/`References:`/
  `Next step:`) whose field names match the consume path.
- **Kit-test swarm findings (2026-07-15).** `docs/HOW-TO.html` rewritten to the
  v2 self-adapting model (install is one instruction; recovery is "re-share
  `installer.md` and say 'continue install'"); every dead v1 artifact reference
  removed (`claude-app-skills/`, `chatgpt-app/instructions.txt`, `install.sh`,
  `INSTALL.md`, the five-zips step, and the `zsh`/`ls ~/.claude/skills` recovery
  lines); `idea-forge/USER-CONFIG.md` (`ideas output folder:`) made the ONE
  config every skill reads first, killing the `.idea-forge-config.md`
  split-brain (theme now lives beside the pages in `.idea-forge-theme.md`);
  `branding/` pinned INSIDE the installed `idea-forge/` skill folder with that
  location stated in every reference.

### Verification state

Clean-room installs PASSED 2026-07-15 for Claude Code (real sandbox run) and, by
simulation, for the Claude app zip path and the ChatGPT Project condensation
path, plus both branding-interview lanes, path acceptance, and a first run of
the core job. **Still open** in `README.md`: a real-device spot check in the
actual Claude app, and a live first-run verify (spitball → grill → page) on at
least one platform. Simulated passes are not device proofs.

## [1.0.0] - (undated, reconstructed)

The original Idea Forge, preserved at
`../LI-smb-hq/candidates/idea-forge-v1/` (formerly `~/Desktop/idea-forge`).
Three hand-maintained delivery formats, no self-adapting installer. Recorded
here only so the 2.0.0 lineage has a floor; **no release date is known** — the
README describes v1 but never dates it.
