# Update Page

1. Identify the page - From the `USER_PROMPT`, locate the target `index.html` under `IDEAS_HOME` (list the folder and confirm if ambiguous)
2. Scope the change - THINK HARD about exactly what the prompt asks to change, extend, or revise; keep the edit surgical and touch only the affected sections
3. Apply the change - Edit the relevant sections in place, preserving the existing structure and dark styling. If the change adds sources or links, add them to References & Links too
4. Refresh images if warranted - If the change alters what an embedded image conveys, run the Update sub-workflow in `workflows/image-generation.md` for just those slots
5. Update metadata - Append the current ISO timestamp to `modified`; update `status` if the idea moved stage. Never overwrite existing metadata entries — the lists are append-only
6. Record the amendment - Append a new entry to the Amendments section (newest at the bottom) summarizing what changed and why
7. Report - Summarize the change, the amendment recorded, and re-open the page in the browser if the change is visual
