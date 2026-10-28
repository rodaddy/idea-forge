---
name: wayfinder
description: Plan a huge foggy idea -- more than one session can hold -- as a shared map of investigation tickets, then resolve them one at a time until the way to the destination is clear. USE WHEN the user says "wayfinder", "chart a map", "map this out", or brings a loose idea too big and foggy for one shaping session.
---

# Wayfinder

A loose idea has arrived -- too big for one session, and wrapped in fog: the way from here to the **destination** isn't visible yet. Wayfinding is about finding that way, not charging at the destination. This skill charts the way as a **shared map** of tickets, then works them one at a time until the route is clear.

The destination varies per effort, and naming it is the first act of charting -- it shapes every ticket. It might be a fully-shaped idea to hand off (e.g. into `idea-page`), a decision to lock before shaping starts, or a change made in place. The map is domain-agnostic -- business ideas, course content, engineering work, whatever fits the shape.

## Local wiring

This skill is adapted from `github.com/mattpocock/skills` (MIT, `LICENSE.upstream`) and wired for this package:

- **Tracker operations** default to a **local markdown map** -- see `references/local-map.md`. If the effort lives in a git repo with GitHub issues and the user prefers that, use `references/issue-tracker-github.md` instead (ask once per effort, remember the answer in the map's Notes).
- **Grilling tickets** follow the contract in `references/grilling.md` -- the same facts-vs-decisions interview that gates `idea-page` Create.
- **Prototype tickets** follow `references/prototype.md`.
- **Research tickets** run against primary sources; findings land as a cited markdown file next to the map, linked from the ticket.

## Plan, don't do

Wayfinder is **planning** by default: each ticket resolves a decision, and the map is done when the way is clear -- nothing left to decide before someone goes and does the thing. The pull to just do the work is usually the signal you've reached the edge of the map and it's time to hand off. An effort can override this in its **Notes** -- absent that, produce decisions, not deliverables.

## Refer by name

Every map and ticket has a **name** -- its title. In everything the human reads, refer to it by that name, never by a bare id or number. A wall of `#42, #43, #44` is illegible; names read at a glance. The id rides *inside* the name as its link, never stands in for it.

## The Map

The map is the canonical artifact -- a single document (or issue) whose tickets are its children. The map is an **index**, not a store: it lists the decisions made and points at the tickets that hold their detail; a decision lives in exactly one place -- its ticket -- so the map never restates it, only gists it and links.

### The map body

The whole map at low resolution, loaded once per session. Open tickets are **not** listed here -- they are found by query (see the tracker reference).

```markdown
## Destination

<what reaching the end of this map looks like -- the shaped idea, decision, or change this effort is finding its way to. One or two lines; every session orients to it before choosing a ticket.>

## Notes

<domain; skills every session should consult; standing preferences for this effort; which tracker this map uses>

## Decisions so far

<!-- the index -- one line per closed ticket: enough to judge relevance, then zoom the link for detail -->

- [<closed ticket title>](link) -- <one-line gist of the answer>

## Not yet specified

<!-- see "Fog of war": in-scope fog you can't ticket yet; graduates as the frontier advances -->

## Out of scope

<!-- work ruled beyond the destination; closed, never graduates -->
```

### Tickets

Each ticket is a child of the map. Its body is the question, sized to one focused session:

```markdown
## Question

<the decision or investigation this ticket resolves>
```

Each ticket carries a type -- one of `research`, `prototype`, `grilling`, `task` (see Ticket Types).

A session **claims** a ticket **first**, before any work, so concurrent sessions skip it. Blocking uses the tracker's dependency convention; a ticket is **unblocked** when every ticket blocking it is closed. The **frontier** is the open, unblocked, unclaimed children -- the edge of the known.

The answer isn't part of the body -- it's recorded on resolution. Assets created while resolving a ticket are linked from it, not pasted in.

## Ticket Types

Every ticket is either **HITL** -- human in the loop, worked *with* the human -- or **AFK**, driven by the agent alone. A HITL ticket only resolves through live exchange; the agent never stands in for the human's side (a grilling agent that answers its own questions has broken this).

- **Research** (AFK): Reading documentation, markets, competitors, or the user's own notes. Runs against primary sources; creates a cited markdown summary as a linked asset. Use when knowledge outside the conversation is required.
- **Prototype** (HITL): Raise the fidelity of the discussion with a cheap, rough, concrete artifact to react to -- an outline, a mock landing page, a rough take, per `references/prototype.md`. Use when "how should it look/feel" is the key question.
- **Grilling** (HITL): Conversation per `references/grilling.md`, one question at a time. The default case.
- **Task** (HITL or AFK): Manual work that must happen before a *decision* can be made -- signing up for a service so it can be judged, getting access, gathering data. Resolved when done; the answer records what was done and any resulting facts later tickets depend on. Never record credential values -- only where they live.

## Fog of war

The map is *deliberately* incomplete: don't chart what you can't yet see. Beyond the live tickets lies the **fog of war** -- decisions and investigations you can tell are coming but can't yet pin down. Resolving a ticket clears the fog ahead of it, graduating whatever's now specifiable into fresh tickets -- until the way to the destination is clear and no tickets remain.

**Fog or ticket?** The test is whether you can state the question precisely now -- *not* whether you can answer it now. Ticket when the question is sharp (even if blocked); **Not yet specified** when you can't yet phrase it that sharply. Don't pre-slice the fog into ticket-sized pieces.

## Out of scope

The destination fixes the scope, so work beyond it is **out of scope** -- it isn't fog. It gets the map's **Out of scope** section: work consciously ruled out of *this* effort. It never graduates; it returns only if the destination is redrawn, as a fresh effort. When an existing ticket turns out to sit past the destination, **close it** and leave one line in Out of scope: the gist plus why, linking the closed ticket.

## Invocation

Two modes. Either way, **never resolve more than one ticket per session.**

### Chart the map

User invokes with a loose idea.

1. **Name the destination.** Run a grilling session (per the grilling reference) to pin down what this map is finding its way to. The destination fixes the scope, so it's settled first.
2. **Map the frontier.** Grill again, **breadth-first**: fan out across the whole space rather than deep on any one thread, surfacing the open decisions and the first steps takeable now. **If this surfaces no fog** -- the way is already clear, the whole journey small enough for one session -- you don't need a map. Stop and ask how the user wants to proceed (a straight `idea-page` build is usually the answer).
3. **Create the map**: Destination and Notes filled in, Decisions-so-far empty, the fog sketched into Not yet specified. Ask once which tracker to use (local markdown is the default) and record it in Notes.
4. **Create the tickets you can specify now**, then wire blocking in a second pass. Everything you can't yet specify stays in Not yet specified.
5. Stop -- charting the map is one session's work; do not also resolve tickets.

### Work through the map

User invokes with a map. A ticket is **optional** -- without one, you pick the next decision.

1. Load the **map** -- the low-res view, not every ticket body.
2. Choose the ticket. If the user named one, use it. Otherwise take the first frontier ticket in map order. **Claim it** before any work.
3. Resolve it -- zoom as needed: fetch any related or closed ticket on demand; invoke the skills the map's Notes name. If in doubt, grill.
4. Record the resolution: write the answer on the ticket, **close** it, and **append a context pointer** (gist + link) to the map's Decisions-so-far.
5. Add newly-surfaced tickets; graduate any fog the answer has made specifiable. If the answer reveals a ticket sits beyond the destination, rule it out of scope rather than resolving it. If the decision invalidates other parts of the map, update or delete those tickets.

## Handoff

When the map is done -- no open tickets, nothing left in Not yet specified -- the way is clear. Hand off to `idea-page`, pointing it at the map: Decisions-so-far is the grilled shared understanding, so idea-page's grill gate runs as a short confirmation pass instead of a cold interview.
