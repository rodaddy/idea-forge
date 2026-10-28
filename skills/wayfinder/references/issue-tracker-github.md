# Tracker: GitHub issues (optional)

Adapted from `github.com/mattpocock/skills` `setup-matt-pocock-skills/issue-tracker-github.md` (MIT). Use this tracker only when the effort lives in a git repo with GitHub issues AND the user prefers it over the default local markdown map. Use the `gh` CLI for all operations; infer the repo from `git remote -v`.

## Conventions

- **Create an issue**: `gh issue create --title "..." --body "..."`. Use a heredoc for multi-line bodies.
- **Read an issue**: `gh issue view <number> --comments`, plus labels.
- **List issues**: `gh issue list --state open --json number,title,body,labels,assignees` with `--label` / `--state` filters; parse with `jq`.
- **Comment**: `gh issue comment <number> --body "..."`
- **Labels**: `gh issue edit <number> --add-label "..."` / `--remove-label "..."`
- **Close**: `gh issue close <number> --comment "..."`

GitHub shares one number space across issues and PRs, so a bare `#42` may be either -- resolve with `gh issue view 42` and fall back to `gh pr view 42`.

## Wayfinding operations

The **map** is a single issue with **child** issues as tickets.

- **Map**: a single issue labelled `wayfinder:map`, holding the Destination / Notes / Decisions-so-far / Not-yet-specified / Out-of-scope body. Create the `wayfinder:*` labels on first use (`gh label create`).
- **Child ticket**: an issue linked to the map as a GitHub sub-issue (`gh api` on the sub-issues endpoint). Where sub-issues aren't enabled, add the child to a task list in the map body and put `Part of #<map>` at the top of the child body. Labels: `wayfinder:<type>` (`research`/`prototype`/`grilling`/`task`).
- **Blocking**: GitHub's native issue dependencies. Add an edge with `gh api --method POST repos/<owner>/<repo>/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`, where `<blocker-db-id>` is the blocker's numeric **database id** (`gh api repos/<owner>/<repo>/issues/<n> --jq .id`, NOT the `#number`). Where dependencies aren't available, fall back to a `Blocked by: #<n>` line at the top of the child body. A ticket is unblocked when every blocker is closed.
- **Frontier query**: list the map's open children, drop any with an open blocker or an existing claim; first in map order wins.
- **Claim**: `gh issue edit <n> --add-assignee @me` -- the session's first write.
- **Resolve**: `gh issue comment <n> --body "<answer>"`, then `gh issue close <n>`, then append a context pointer (gist + link) to the map's Decisions-so-far.

## Verify once per repo

Sub-issues and native dependencies may not be enabled on every (private) repo. On a map's first charting in a repo, verify the sub-issue and dependency endpoints respond; if either 404s, use the documented fallbacks and note that in the map's Notes so later sessions don't re-probe.
