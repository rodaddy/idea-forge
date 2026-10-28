---
name: spitball-session
description: Use when the user says spit, spitball session, spitball'n, spitball, brainstorm, thinking out loud, let me get this out of my head, just listen, or wants to talk an idea through without researching, planning, or executing. Activates explicit listen-first discussion mode and holds all action until the user clearly changes modes.
---

# Spitball Session

Listen-first idea development. The user is getting thoughts out of their head; detail, excitement, specificity, or apparent readiness are NOT authorization to research, plan, or act.

## Activation

Reply briefly: `Spitball session active. I'm listening.` Then remain conversational. Do not announce a workflow, plan, model, tool, or execution scope.

## While Active

- Listen, discuss, reflect, challenge, or clarify in the natural back-and-forth.
- Keep replies proportionate. Do not turn a first thought into a process dump.
- Preserve the user's wording and unresolved branches without forcing structure.
- Answer questions from conversation context when possible.
- If a factual answer requires lookup, offer to check it; do not look it up without an explicit request.
- Ask one natural clarification only when invited or when the current meaning genuinely cannot be understood. Do not begin a requirements interview.

## Action Hold

Until the user explicitly changes modes, do not:

- call tools, browse, inspect files, query live systems, or start subagents;
- invoke planning, todo, review, or implementation workflows;
- create or edit files, issues, plans, tasks, or external state;
- speed-run questions, propose a complete spec, or treat apparent readiness as permission.

**The one exception — saving the session itself.** If you can write files,
quietly keep `IDEAS_HOME/<idea-kebab-name>/notes.md` current as the
conversation goes: the idea name, `Stage: spitballed`, the live threads in
the user's own wording, and every reference they mention. Update it at
natural pauses — do not announce it, do not let it interrupt listening.
This is a save, not an action on the idea; it exists so a dropped session
never loses the thinking (a fresh session finds the folder and resumes —
see the conductor skill's "Picking up where it left off"). If you cannot
write files (chat app), this exception does not apply — instead, when the
session winds down, remind the user once: `Say "give me the brief" so you
don't lose this.`

## Mode Transitions

Explicit action language changes modes. Examples:

- `go ahead`, `start`, `execute`, or `build it`;
- `research this` or `look this up`;
- `shape this` / `grill me` (hand off to the `grilling` skill);
- `map this out` (hand off to the `wayfinder` skill);
- `build the page` (hand off to the `idea-page` skill).

An interrogative idea such as `could we make...` or `can we...` remains discussion unless the surrounding wording clearly commands action.

If the idea seems mature, say something like: `This seems solid. Want to shape it further, or build the page?` Then wait. Do not perform preparatory reads while waiting.

Treat `I'm done` as the end of the thought stream, not automatic execution. Reflect the current understanding and ask whether the user wants to proceed.

## Output Posture

Normal conversational prose. Avoid headings, long checklists, formal plans, and multi-question dumps unless explicitly asked. Acknowledge corrections directly and discard premature work instead of making the user review it.

## Exit

Exit only on the user's explicit transition. Load the newly requested skill at that point and follow its own rules.
