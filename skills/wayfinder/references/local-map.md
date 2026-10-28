# Tracker: local markdown map (default)

The default tracker for this package -- no git repo or GitHub account required. The whole effort lives in one folder of plain markdown files that any editor can read.

## Layout

```
<IDEAS_HOME>/<idea-kebab-name>/map/
  MAP.md            # the map body (Destination / Notes / Decisions so far / Not yet specified / Out of scope)
  tickets/
    001-<kebab-title>.md
    002-<kebab-title>.md
  assets/           # research summaries, prototypes, anything a ticket links to
```

`IDEAS_HOME` is the same home `idea-page` uses: resolve it by reading the `ideas output folder:` line from `idea-forge/USER-CONFIG.md` (the one config file the installer writes, in the installed `idea-forge/` skill folder), falling back to `~/Documents/ideas/` if that file/key is missing. A finished map sits beside the page it eventually produces.

## Ticket file format

```markdown
---
title: <the ticket's name -- refer to it by this>
type: research | prototype | grilling | task
status: open | closed
claimed: <blank, or session/agent slug + date>
blocked-by: [<ticket numbers>]
---

## Question

<the decision or investigation this ticket resolves>

## Answer

<!-- empty until resolved; filled on close -->
```

## Operations

- **Create the map**: make the `map/` folder, write `MAP.md` from the map-body template in SKILL.md.
- **Create a ticket**: next zero-padded number + kebab title in `tickets/`, status `open`.
- **List / frontier query**: read all ticket frontmatter; the frontier is `status: open`, empty `claimed`, and every number in `blocked-by` already `closed` -- first in number order wins.
- **Claim**: set `claimed:` before any work. Clear it if abandoning the ticket.
- **Blocking**: `blocked-by` lists ticket numbers. Wire these in a second pass after creating a batch (tickets need numbers before they can reference each other).
- **Resolve**: write the `## Answer`, set `status: closed`, then append one line to `MAP.md` Decisions-so-far: `- [<title>](tickets/<file>.md) -- <one-line gist>`.
- **Assets**: research summaries and prototypes go in `assets/`, linked from the ticket's Answer by relative path.

## Rules

- Names over numbers in anything the human reads; the number lives in the link.
- Append-only Decisions-so-far -- never rewrite history, add lines.
- One ticket resolved per session, same as every tracker.
