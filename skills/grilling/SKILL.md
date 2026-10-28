---
name: grilling
description: Grill the user relentlessly about an idea, plan, or design to sharpen it into shared understanding. Use when the user wants to stress-test or shape an idea before building it out, or uses any 'grill' / 'shape this' trigger phrases.
---

<!-- Adapted from github.com/mattpocock/skills productivity/grilling (MIT — see ../wayfinder/LICENSE.upstream) -->

Interview the user relentlessly about every aspect of this idea, plan, or design until you reach a shared understanding. Walk down each branch of the decision tree, resolving dependencies between decisions one by one. For each question, provide your recommended answer.

Ask the questions **one at a time**, waiting for feedback on each question before continuing. Asking multiple questions at once is bewildering.

If a *fact* can be found by researching the web or reading the user's existing notes and files, look it up rather than asking. The *decisions*, though, are the user's — put each one to them and wait for the answer. Never answer your own questions: a grilling session where the agent supplies both sides has failed.

Do not act on the idea until the user confirms a shared understanding has been reached. When they do, summarize the shared understanding in full — that summary is what downstream skills (like `idea-page`) build from.

**Save as you go.** If you can write files, keep
`IDEAS_HOME/<idea-kebab-name>/notes.md` current during the grilling: set
`Stage: shaped` once shared understanding is confirmed (until then it stays
`spitballed`), and append each settled decision to a `Decisions made:` list
as it is answered — the user's answer in their own words, one line each,
plus any references that come up. Do this silently between questions; never
let it slow the interview. The point: if the session dies mid-grilling, a
fresh session reads the folder and resumes from the last answered question
instead of re-interviewing from zero. If you cannot write files (chat app),
remind the user at any natural break: `Say "give me the brief" so you don't
lose this.`
