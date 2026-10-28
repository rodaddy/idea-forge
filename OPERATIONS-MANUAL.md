# Idea Forge — Operations Manual

Get an idea out of your head and onto a polished, shareable web page — with
an AI doing the listening, the sharpening, and the layout.

## The pipeline

| Stage | Say | What happens |
| --- | --- | --- |
| 1. **Spit** | "spitball session" / "I have an idea" | You talk the idea out. The AI listens and won't touch a tool until you say so. |
| 2. **Shape** | "grill me" | A relentless one-question-at-a-time interview until the idea is sharp and you both agree what it is. |
| 3. **Map** (optional) | "wayfinder" | Only for BIG foggy ideas that won't fit one sitting: chart the open questions as tickets, resolve them across sessions. |
| 4. **Build** | "build the page" / "idea page" | The shaped idea becomes a single self-contained HTML page — artwork, references, links, tags — opens in any browser, shareable as one file. |

"idea forge" runs the whole flow with the AI conducting; every stage also
works standalone. Nothing is mandatory ceremony — jump in wherever the idea
actually is.

## Your branding, on every page

Your pages come out in YOUR colors, with YOUR logo — not a generic AI look.
Set it once at install: the AI asks for your logo, colors, fonts, and
tagline, or just your business name if you don't have branding yet, and makes
you a clean placeholder you can swap later. Change it anytime by telling the
AI "update my branding." Every page it builds after that uses it automatically.

## Your style, not ours

The dark theme is only the default. The first build asks what you want your
pages to look like; say "restyle my pages — <description>" any time. Artwork
follows your palette.

## People stay the heroes

For workplace ideas, Idea Forge follows one rule: **extend and enhance, never
replace**. The page should show how employees or managers get mundane work off
their plates so they can do the real work they were hired for. It will reject
and reframe headcount-reduction, employee-replacement, or job-elimination copy;
human judgment and final approval stay with people.

## Moving between devices and apps

Say **"give me the brief"** in any session — you get one structured markdown
message. Paste it into any other session (phone, car, another app, a
terminal) and it picks up exactly where you left off. The brief is the
bridge.

Car mode: "spitball session" to talk an idea out hands-free, "grill me" to shape
it, "give me the brief" before you get out.

## Where pages live

- **Coding-agent installs** (Claude Code / Codex): real files, default
  `~/Documents/ideas/<your-idea>/index.html` — a growing, cross-linked idea
  library on your machine.
- **App installs**: pages download straight from the chat as a single HTML
  file.

## Reinstalling / moving platforms

Hand `installer.md` to the AI on the new platform and say "install idea
forge." The installer adapts the package to whatever that platform needs —
you never repackage anything yourself.

## Uninstall

Coding agents: delete the six skill folders from `~/.claude/skills/` and/or
`~/.codex/skills/`. Apps: remove the six skills in Settings → Skills (or
delete the Project). Your idea pages are yours and stay put.

## Credits

`grilling`, `grill-me`, and `wayfinder` are adapted from Matt Pocock's
skills (MIT — see `skills/wayfinder/LICENSE.upstream`). The rest was forged
in Rico's lab at rTech Digital Consulting.
