# Prototype (reference)

Adapted from `github.com/mattpocock/skills` `engineering/prototype` (MIT). Used by wayfinder prototype tickets.

A prototype is **a throwaway artifact that answers a question**. The question decides the shape:

- **"Does this flow / model feel right?"** -> build a tiny interactive mock (terminal script or single HTML page) that walks the cases that are hard to reason about on paper.
- **"What should this look like?"** -> generate several radically different variations of the page, pitch, or layout, side by side, to react to.
- **"How would we say it?"** -> draft the landing-page copy, the one-pager, or the pitch email as a rough take.

If the question is ambiguous and the user isn't reachable, default to whichever shape matches the ticket's wording and state the assumption at the top of the prototype.

## Rules

1. **Throwaway from day one, clearly marked.** Save it under the map's `assets/` folder, named so a casual reader sees it's a sketch, not the product.
2. **One step to view** -- open the HTML, run the one command, read the file.
3. **Skip the polish.** No error handling, no abstractions, no pixel-perfection beyond what the question needs.
4. **Surface the whole state.** Show the full relevant picture after every action or variant switch.
5. **Delete or absorb when done.** The *answer* is the only thing worth keeping -- record it on the wayfinder ticket, then delete the prototype or fold the validated decision into the idea page.
