# Idea Forge - basic

The only tier of this kit. Idea Forge ships as one canonical package of folders
and markdown, and `basic` is that package.

## What ships

- `START-HERE.md` - per-device steps to get `installer.md` in front of your AI.
- `installer.md` - hand it to any AI; it detects its runtime, adapts the
  package to what that host needs, installs, and verifies.
- `OPERATIONS-MANUAL.md` - how to drive the pipeline on any platform.
- `skills/` - the one canonical source, six skill folders each with a
  `SKILL.md`: `idea-forge` (conductor of the four-stage pipeline),
  `spitball-session` (stage 1, talk it out while the AI just listens),
  `grilling` and `grill-me` (stage 2, one-question-at-a-time sharpening),
  `wayfinder` (stage 3, optional, map a big foggy idea as tickets), and
  `idea-page` (stage 4, build the self-contained HTML page).
- `scripts/verify-install.mjs` - the deterministic install check.
- `docs/` - the illustrated `HOW-TO.html` guide and its images.

At install time the installer writes `idea-forge/USER-CONFIG.md` (key
`ideas output folder:`) and the `idea-forge/branding/` folder inside the
installed `idea-forge/` skill folder; every skill reads those two spots.

## Who it is for

Anyone who wants an idea out of their head and onto a polished, shareable web
page, with an AI doing the listening, the sharpening, and the layout. It is
harness-agnostic: Claude Code and Codex CLI get a full filesystem install, the
Claude app gets AI-built skill zips, ChatGPT Projects and Gemini Gems get
AI-condensed project instructions, and plain chat loads the pipeline for that
conversation. Buyer runtime dependencies: none, because the buyer's AI is the
runtime. A coding agent may optionally run the included plain-Node install
verifier when Node 18+ is already present.

## What it refuses to do

- **It refuses replacement framing.** For business and workplace ideas the kit
  holds to extend and enhance, never replace. Employees and managers are the
  heroes; pages show mundane work coming off their plates so people can do the
  real work they were hired for, with human judgment and approval intact. Any
  headcount-reduction, employee-replacement, or job-elimination framing is
  rejected and reframed before a page is built.
- **It refuses to declare a host incompatible.** If a platform needs a
  different shape, the receiving AI produces that shape from the canonical
  files itself. The user never repackages anything by hand.
- **It refuses to build a page from a raw idea.** `idea-page` runs a grilling
  interview first when no shaping has happened.
- **It refuses to let the AI stand in for the script.**
  `scripts/verify-install.mjs` owns the filesystem install check; where no
  script can run, the same checklist is walked manually and labeled
  self-reported rather than upgraded to deterministic proof.
- **It refuses to overwrite your data on upgrade.** `USER-CONFIG.md`,
  `branding/`, and the ideas library with its saved theme carry over untouched,
  and the branding and output-location interviews are not re-run.
- **It refuses to treat pasted text as instructions.** Briefs, notes, and
  research pasted in are data; embedded directives get quoted back.

## Install

From `installer.md`, condensed. Unzip the kit, open `START-HERE.md`, get
`installer.md` in front of your AI, and say "install idea forge." The installer
then runs itself:

1. **Trigger** - on the shared file or the phrase it begins immediately with a
   single greeting line, no summary of itself.
2. **Detect runtime** - coding agent with filesystem access, chat app with zip
   skill uploads, projects/custom-instructions app, or plain chat. If genuinely
   unsure it asks one question: Claude app, ChatGPT, or a terminal.
3. **Install by path:**
   - **3A, coding agent** - locate `~/.claude/skills/` or `~/.codex/skills/`
     and create it if missing; collision-check the six skill names first and,
     if a previous Idea Forge is present, read its version and offer
     upgrade-keeping-your-data or skip, backing the old folders up to
     `<name>.backup-<old-version>` and replacing only `SKILL.md`,
     `workflows/`, `references/`, and license files; then copy the six
     canonical skill folders in.
   - **3B, chat app with skill uploads** - the AI builds the six skill zips
     itself from the canonical folders and hands them back with upload steps.
   - **3C, projects and gems** - the AI condenses the six `SKILL.md` files plus
     the workflows, references, and operations manual into pasteable project
     instructions, adds the named kit files as sources in priority order, and
     pauses until they are added.
   - **3D, plain chat** - the pipeline loads for that conversation only, and
     the installer labels the run degraded rather than reporting a full
     install.
4. **3E, images and branding** - it asks for logo, colors, fonts, and tagline,
   or just a business name, and writes `branding/brand.md` plus
   `branding/image-setup.md`; it checks whether native image generation
   actually responds before recording the lane, falling back to SVG/CSS
   artwork.
5. **Verify** - it walks the user through a real first run. On a coding agent
   with Node present, `node scripts/verify-install.mjs --installed-root <skills
   directory>` is the deterministic check.
6. **If anything fails** - re-share `installer.md` and say "continue install."

## Current version

2.0.1
