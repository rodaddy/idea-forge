# Create Page

1. Confirm the home and the look - First resolve `IDEAS_HOME` by reading the `ideas output folder:` line from `idea-forge/USER-CONFIG.md` (the one config file the installer writes, in the installed `idea-forge/` skill folder). If that file/key exists, reuse it silently. Only if it is missing (e.g. an app/plain-chat install that never ran the installer's path step) ask the two setup questions:
   - Where should finished idea pages live? (recommend `~/Documents/ideas/`) — record the answer to `idea-forge/USER-CONFIG.md` as `ideas output folder: <path>` (never a second config file)
   - What should the pages look like? Offer: the default dark slate; a warmer dark; a clean light/editorial look; or "describe it and I'll build it". Save the resulting `:root` token values plus a one-line image-style description to `IDEAS_HOME/.idea-forge-theme.md` (the theme travels beside the pages)
2. Absorb the idea - THINK HARD and parse the `USER_PROMPT` plus any shaping conversation already in context. If notes files or a wayfinder map are referenced, read them fully
3. Grill if raw - **Hard gate when the idea arrives unshaped.** If no shaping happened (no grilling session, no wayfinder map, no substantial notes), run a grilling interview before designing anything:
   - Ask questions **one at a time**, waiting for the answer before the next
   - Provide your **recommended answer** with every question
   - **Facts vs decisions:** if a *fact* can be found by web research or reading the user's notes, look it up yourself — never ask. The *decisions* are the user's — put each one to them and wait. Never answer your own questions
   - End by summarizing the shared understanding and getting **explicit confirmation** before drafting
   - *Escape hatch:* skip only when the idea was already shaped this session or the user explicitly waives it — then decide conservatively and surface every decision you made in Open Questions
   - *Pasted IDEA BRIEF with `Stage: shaped`:* the grilling already happened on the phone — run a short confirmation pass over the brief's Decisions-made list instead of a cold interview, then proceed
4. Gather the receipts - Collect every URL, source, competitor, and inspiration mentioned while shaping. If the landscape section is thin, offer a quick web-research pass to fill in existing players and links (offer, don't force)
5. Author the HTML - Fill the `## Page Template` from SKILL.md, replacing every `{{PLACEHOLDER}}` and repeating `<!-- repeat -->` blocks as needed. Write for a reader with zero context. Pick 3-8 tags. Omit Open Questions if nothing is genuinely unresolved
6. Generate images - Run the Create sub-workflow in `workflows/image-generation.md` to fill the `{{...IMAGE` slots and the favicon. Run the slots per that workflow's "How to run the slots" tier guidance — subagents running workflows at T1, sequential fresh contexts at T2, one at a time at T3
7. Name and save - Create `PAGE_DIR` from a descriptive kebab-case idea name, save the page as `PAGE_DIR/index.html` with images in `PAGE_DIR/images/`
8. Cross-link - If `IDEAS_HOME` holds related idea pages, add back/forward references both ways (relative links) and note the change in each touched page's Amendments
9. Open in browser - `open PAGE_FILE`, then summarize: page path, tags, images generated, references captured, anything left open
