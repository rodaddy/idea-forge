# Idea Forge — Installer

> You are reading the Idea Forge installer.

**Version:** 2.0.1
**Created by:** Rico Rojas / rTech Digital Consulting
**Package contents:** `START-HERE.md`, this file, `skills/` (six skill
folders, each with a `SKILL.md`), `OPERATIONS-MANUAL.md`, `scripts/`, `docs/`

---

## What This File Does

You are an AI assistant (Claude, ChatGPT, Gemini, Codex, or any LLM reading
this). This file tells you how to:

1. Detect what runtime you are and what your host platform requires
2. **Transform this package into whatever your host needs** — never declare
   it incompatible
3. Install the six Idea Forge skills so the user can run the pipeline
4. Verify the install by walking the user through a real first run

**Do not summarize this file. Do not explain what you are about to do. Begin
with Section 1 now.**

---

## Section 1: Installation Trigger

When the user shares this file or says "install idea forge," begin
immediately. Greet them with one line: "Let's set up Idea Forge — I'll handle
the setup and ask you at most one or two questions along the way. Takes about
five minutes." Then proceed to Section 2.

---

## Section 2: Detect Your Runtime

Determine which of these you are. Do not ask the user technical questions you
can answer yourself by testing your own capabilities.

| You are… | Signs | Go to |
| --- | --- | --- |
| **A coding agent with filesystem access** (Claude Code, Codex CLI, or similar) | you can run shell commands and write files to the user's disk | 3A |
| **A chat app that supports uploaded skills** (Claude app: web, desktop, or mobile) | you cannot touch the user's filesystem, but your platform has a Skills feature that accepts **zip uploads** | 3B |
| **A chat app with projects/custom instructions but no skills feature** (ChatGPT Projects, Gemini Gems, or similar) | no filesystem, no skill uploads, but persistent instructions exist | 3C |
| **A plain chat session** — none of the above | no filesystem, no skills, no persistent instructions | 3D |

If you are genuinely unsure between two rows, ask the user ONE question:
"Are we talking in the Claude app, ChatGPT, or a terminal?" and map their
answer to the closest row.

**The rule that governs everything below: this package is ONE canonical set
of folders and markdown files. If your host needs a different shape — zips,
pasted instructions, anything — YOU produce that shape from the canonical
files, right now, yourself. "This package doesn't work here" is never the
answer. Adapt the package to the host.**

---

## Section 3A: Coding agent with filesystem access

1. Locate your skills directory: `~/.claude/skills/` (Claude Code),
   `~/.codex/skills/` (Codex CLI), or your platform's equivalent. Create it
   if missing.
2. **Collision check first — and if it's THIS kit, offer an upgrade.** Before
   copying anything, check whether any of the six skill names already exist in
   the skills directory.
   - **Same kit already installed (an upgrade).** If the existing folders are a
     previous Idea Forge (an `idea-forge/` folder with this skill's shape),
     read the installed copy's version — from the `**Version:**` line of any
     `installer.md`/manual copied in beside it, or the README changelog if
     present; **if you can't determine it, treat the installed copy as older.**
     Then ask ONE question: *"You have v<old>; this is v<new> — upgrade keeping
     all your data, or skip?"* (If you couldn't read a version, say *"You have
     an earlier Idea Forge; this is v2.0 — upgrade keeping all your data, or
     skip?"*)
     - **On upgrade:** first back up the old skill folders — rename each of the
       six existing folders to `<name>.backup-<old-version>` (e.g.
       `idea-forge.backup-1.0`; if the version is unknown, use
       `<name>.backup-<YYYYMMDD>`). Then replace ONLY the skill instruction
       files that ship in this package: each `SKILL.md`, everything under
       `workflows/` and `references/`, and license files. **NEVER overwrite the
       user's own data.** The protected files/folders that carry over untouched
       are: `idea-forge/USER-CONFIG.md`, the entire `idea-forge/branding/`
       folder (brand.md, image-setup.md, logo files), and — outside the skill
       folder — the user's ideas library and its saved theme
       (`IDEAS_HOME/.idea-forge-theme.md` and every idea folder under
       `IDEAS_HOME`). Do NOT re-run the branding or output-location interviews:
       an upgrade keeps every answer the user already gave.
     - **On skip:** leave the installed kit exactly as-is and stop.
   - **A different, unrelated skill happens to share one of these names.** Do
     NOT silently overwrite: tell the user which name collides and ask
     "replace, keep yours, or back yours up first?" For "back up," rename the
     existing folder to `<name>.backup-<YYYYMMDD>` before copying.
3. Copy each of the six folders inside this package's `skills/` into it
   **recursively — the ENTIRE folder, every nested file and subfolder**
   (`idea-page/workflows/`, `wayfinder/references/`, license files, all of
   it), not just each `SKILL.md`: `idea-forge`, `spitball-session`,
   `grilling`, `grill-me`, `wayfinder`, `idea-page`.
4. Copy `OPERATIONS-MANUAL.md` into the installed `idea-forge/` skill folder
   so the manual survives after the user deletes the unzipped package.
5. Ask the user where finished idea pages should live (default:
   `~/Documents/ideas/`). Create the folder. **Record the choice — always, even
   the default** — into the installed `idea-forge/USER-CONFIG.md`, which is the
   ONE config file every skill reads first. Write it with the fully-spelled-out
   key on its own line:

   ```
   ideas output folder: <the path they chose, e.g. ~/Documents/ideas/>
   ```

   Every skill that needs the ideas location (`idea-forge/SKILL.md`,
   `idea-page/SKILL.md`, `idea-page/workflows/create-page.md`,
   `wayfinder/references/local-map.md`) reads `idea-forge/USER-CONFIG.md`'s
   `ideas output folder:` line first and uses that path. Do not create a second
   config file anywhere.
6. Assert the install before demoing. If plain Node is available, run the
   package-owned mechanical check from the unzipped kit root:
   `node scripts/verify-install.mjs --installed-root <skills-directory>`.
   The script, not the AI, decides whether the six folders, matching
   frontmatter, manual, config, branding, workflows, references, and license
   files are present. If Node is unavailable, walk that same list manually and
   label the result self-reported. Then go to Section 3E (Images & Branding),
   then Section 4 (Verify).

## Section 3B: Chat app with skill uploads (zips required)

Your platform accepts skills only as zip archives. The zips are not in this
package — **you create them**:

1. Using your code-execution / file-creation capability, create one zip per
   skill folder in `skills/` — **six zips total**. Exact layout, per zip:
   - the FIRST path entry in the archive must be `<skill-name>/` — nothing
     above it. NOT `skills/<skill-name>/`, NOT a wrapping package folder,
     and NOT a bare `SKILL.md` at the archive root.
   - include the skill folder's ENTIRE contents recursively:
     `idea-page/workflows/`, `wayfinder/references/`, license files —
     everything, not just `SKILL.md`. A zip missing its subfolders installs
     as a silently broken skill.
   - exclude OS junk: no `__MACOSX/`, no `.DS_Store`.
   - sanity-check each archive's listing against these rules before handing
     it over.
2. Give the user all six zips as downloadable files. If you built the zips
   but your platform cannot attach/deliver files to the user, fall through
   to Section 3C — do not stop.
3. Tell the user the upload steps. Current Claude app labels: "Settings →
   Capabilities → turn ON Code execution and file creation (one-time), then
   Settings → Customize → Skills → upload these six zips → toggle each one
   on." Add: menu labels change between app versions and platforms — if
   these don't match, look for the Skills and Capabilities sections in
   Settings. Code execution must stay ON after install too (the page
   builder uses it).
4. If you cannot create zip files on this platform at all, fall through to
   Section 3C and install the condensed form instead — do not stop.
5. **PAUSE here.** The user must leave the chat, upload, and toggle — that
   happens outside this conversation. Say: "Tell me when they're uploaded
   and toggled on, and we'll set up your branding and test it." Only when the
   user confirms, go to Section 3E (Images & Branding), then Section 4
   (Verify).

## Section 3C: Projects / custom instructions, no skills feature

Your platform can hold persistent instructions but not skill files. Condense
the package yourself:

1. **Get the source files in front of you FIRST — you cannot condense what you
   cannot see.** The user handed you only `installer.md`, so the rest of the
   kit is not yet visible to you. Before reading or condensing anything, tell
   the user in plain language exactly which files from the unzipped kit folder
   to add to the Project/Gem as sources, then STOP and wait for them to confirm
   the files are added. Name them fully, spelled out from the kit root, in this
   priority order (a capped plan still gets the core pipeline from the top of
   the list):
   1. `skills/idea-forge/SKILL.md` (the conductor)
   2. `skills/spitball-session/SKILL.md`
   3. `skills/grilling/SKILL.md`
   4. `skills/idea-page/SKILL.md`
   5. `skills/idea-page/workflows/create-page.md`
   6. `skills/grill-me/SKILL.md`
   7. `skills/wayfinder/SKILL.md` and every file under
      `skills/wayfinder/references/`
   8. `OPERATIONS-MANUAL.md` (carries the "give me the brief" cross-device
      bridge — the single most valuable feature on a platform like yours)
   Say: "Add those files to this Project/Gem as sources, then tell me when
   they're in and I'll read them and build your condensed instructions."
   **Fallback if the platform caps Project files** (free plans often cap around
   five): instead of adding files, ask the user to paste the contents of the
   listed files into the chat one at a time, in the SAME priority order above —
   same read-set, different transport. On a hard cap, prioritize items 1–5 as
   the core pipeline and bring `grill-me` and `wayfinder` (items 6–7) in by
   paste. "I can't see those files" is never a dead end — you always have the
   add-as-sources path or the paste path.
2. Only once the sources are in front of you (added or pasted), read the WHOLE
   package, not just the top-level skill files: all six `SKILL.md` files in
   `skills/`, every file under `idea-page/workflows/` and
   `wayfinder/references/`, and `OPERATIONS-MANUAL.md` (the "give me the brief"
   cross-device bridge lives there and in the conductor skill — it is the
   single most valuable feature on a platform like yours, do not lose it).
3. Write a single instruction document (~1–2 pages) that preserves, in
   priority order:
   1. the 4-stage pipeline (Spitball → Shape → Map → Build) with each
      stage's trigger phrases;
   2. the **"give me the brief" / IDEA BRIEF resume mechanic** — one
      structured markdown message that lets any other session pick up where
      this one left off;
   3. the listening rules of `spitball-session` (no tools, no plans, no
      interruptions until the user changes modes; apparent readiness is not
      permission);
   4. the one-question-at-a-time rule of `grilling` ("grill me" is a
      shortcut for the same behavior — one line covers it);
   5. the `idea-page` output contract: one self-contained HTML file
      (inline CSS, no external dependencies), its section skeleton,
      tags/references as first-class items;
   6. a compressed `wayfinder` (destination first, one ticket per session,
      map as index) so its trigger phrase actually works;
   7. **apply the user's branding and image lane to every page** — carry the
      `branding/brand.md` fields (business name, colors, fonts, tagline,
      voice) and the recorded image lane into the instructions so every page
      the AI builds comes out in the user's colors, logo, and the right
      artwork method.
   State plainly at the bottom which filesystem behaviors don't exist on
   this platform (saved idea library, cross-page links, persistent theme)
   and that pages arrive as downloads/attachments in the chat instead.
4. Deliver the document the way your platform actually allows: paste the
   FULL text inline in the chat for the user to copy if you cannot attach
   files. If the platform's instruction field is too small for it, put the
   pipeline + triggers + brief mechanic in the instruction field and tell
   the user to post the remainder as the first message in the Project.
5. Run the branding interview from Section 3E now and bake the answers into
   the instruction document as a "Branding" block (the `brand.md` fields and
   the image lane), so every page the Project/Gem builds comes out in the
   user's colors and logo. On ChatGPT/Gemini the image lane is native
   generation; note it plainly.
6. Tell the user where it goes, by platform: ChatGPT → new Project →
   Instructions field, name it "Idea Forge." Gemini → new Gem →
   Instructions. Similar platforms → the closest persistent-instructions
   slot.
7. **PAUSE here.** The paste-and-save happens outside this conversation.
   Say: "Once it's saved, start a NEW chat inside the Project/Gem, tell me
   any half-formed idea, and say 'spitball session'." Give them that as the
   verify step to carry with them — Section 4 runs in that new chat, not
   this one. In THIS chat, offer to demo the pipeline in-conversation while
   they decide.

## Section 3D: Plain chat session

No persistence exists here, so install into the conversation:

1. Read the six `SKILL.md` files (ask the user to paste any you cannot see).
2. Say: "I've loaded the Idea Forge pipeline for this conversation. For a
   permanent install, open this same file with [the Claude app / a Claude
   Code or Codex terminal / a ChatGPT Project] and I'll install it there."
3. Go to Section 3E (Images & Branding), then Section 4 (Verify) — run both
   in-conversation.

---

## Section 3E: Images & Branding (all paths, before Verify)

Every page Idea Forge builds should come out in the user's colors and logo,
with artwork made the best way this AI actually can. Set that up once here.
Create the `branding/` folder **INSIDE the installed `idea-forge/` skill
folder** (i.e. `idea-forge/branding/`, right beside that skill's `SKILL.md`) —
the same folder the skills read from, so `branding/brand.md` resolves
skill-relative and is correct by construction. Where there's no filesystem
(app/project installs), capture the same answers in the persistent
instructions / this conversation instead.

### A. Pick the image lane — then record it in `idea-forge/branding/image-setup.md`

First check your OWN capabilities; do not ask the user what you can answer
yourself:

| If you are… | Image lane |
| --- | --- |
| **ChatGPT / Codex** | native image generation (`gpt-image-2`, "image-gen2") — use it for hero art, section artwork, icons, logos |
| **Gemini** | native image generation (nano-banana) — same uses |
| **Claude (app or Code)** | **NO native raster image generation. Do not pretend you can.** Default to **designed SVG/CSS artwork** — crisp, on-brand, deterministic, and often sharper for business branding than raster gen. |
| **Unknown / none** | designed SVG/CSS artwork only — say so plainly |

One optional question, and only if it's genuinely worth asking (mainly on
Claude): "Do you also use ChatGPT or Gemini anywhere?" If yes, note that as a
second, raster lane the user can hand art to.

**Verify the tool actually works before recording native generation — do not
trust the brand name.** Even on ChatGPT or Gemini, a Business/Enterprise/Edu
workspace can disable image generation; before recording a native lane, confirm
the tool actually responds (attempt a small generation or introspect your
available tools), and if native generation is unavailable regardless of brand,
record designed SVG/CSS artwork as the active lane and say so plainly.

Write the result to
`idea-forge/branding/image-setup.md`: the primary lane, whether a raster lane exists, and
the one rule — **on Claude, artwork is SVG/CSS; never claim a generated
photo.**

### B. Branding interview — then create `idea-forge/branding/brand.md`

Ask, in plain language:

> "Do you have a logo or any branding — colors, fonts, a tagline? Share your
> logo files now, or just tell me your business name and I'll set up something
> clean you can replace later."

Then create `idea-forge/branding/brand.md` with these fields, fully spelled
out (no shorthand keys):

```
business name:
tagline:
primary color:      (hex)
accent color:       (hex)
font preferences:
voice notes:        (formal / friendly, any do's and don'ts)
image lane:         (from image-setup.md)
```

- Save any logo files the user shares into `branding/` and reference them in
  `brand.md` by filename.
- If the user has NOTHING: fill sensible defaults, then generate a tasteful
  placeholder mark via the recorded image lane — an SVG wordmark on Claude, a
  generated logo on ChatGPT/Gemini — save it in `branding/`, and tell the user
  it's a placeholder they can swap any time by replacing the file or saying
  "update my branding."

**The one rule that makes outputs look owned, not AI-generic:** every page
Idea Forge builds reads `idea-forge/branding/brand.md` and
`idea-forge/branding/image-setup.md` first and applies them — their colors, their logo, their fonts, artwork made
the right way. The brand palette overrides the default dark theme unless the
user asks to keep dark.

---

## Section 4: Verify (all paths)

Never end the install by listing what you did. Prove it works. (Coming from
3B: only run this after the user confirms the skills are uploaded and
toggled on.)

1. Say: "Let's test it. Tell me any half-formed real idea of yours — one
   sentence is plenty — and say 'spitball session.'"
2. **Named own-data refusal — missing or empty real idea → STOP.** This is a
   mechanical check: after trimming whitespace, the user's idea must contain at
   least one word written by them. If it does not, say exactly: "I could read
   your install request, but I could not read a real idea from you. What is one
   idea you actually want to explore?" Ask that one question only. Do not invent
   an idea, do not use shipped example data, and leave the install **unverified**
   until they answer.
3. Run the spitball-session behavior on their answer (listen, don't touch tools).
4. After a couple of exchanges, confirm: "That's stage 1 of 4 working. Say
   'grill me' when you want it sharpened, and 'build the page' when it's
   ready to become a web page."
5. Point them to `OPERATIONS-MANUAL.md` (or offer to walk through it) for
   the full flow, restyling, and the cross-device "give me the brief" trick.

## Section 5: If Anything Fails

Diagnose and adapt — do not bounce the problem to the user or to the vendor.
State what the host rejected, produce the alternative shape from the
canonical files, and continue. Only if you have exhausted every path in
Section 3 may you tell the user the one concrete step you need from them
(e.g., "enable code execution in Settings → Capabilities, then say
'continue install'").
