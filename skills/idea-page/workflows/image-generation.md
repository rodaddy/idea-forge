# Image Generation

Fill or update the embedded images in an idea page. Everything here is runtime-neutral EXCEPT the
one image-*generation* mechanic, which branches by runtime (Step 0). Pick the sub-workflow from
the incoming request:

**Before making any artwork, read `idea-forge/branding/brand.md` and `idea-forge/branding/image-setup.md` if they exist** (the installer writes them INSIDE the installed `idea-forge/` skill folder; from `idea-page/workflows/` that resolves as `../../idea-forge/branding/`).
The recorded image lane decides the method, not a hardcoded tool: when the lane is a raster lane
(native gpt-image-2 / nano-banana), use the native image tool already available in the current
harness; never shell out to another vendor CLI and never ask the buyer to install or log in to one.
When the native tool is absent or the lane says **no raster generation, produce designed SVG/CSS
artwork instead — never claim a generated photo.** Put the brand palette hex values (not just the
default dark slate) into every image/artwork so it matches the page.

| Sub-workflow | When to call it |
| --- | --- |
| Create | Generating the page's images from scratch (empty `{{...IMAGE` slots) |
| Update | Changing, refining, or replacing images that already exist in the page |

## Step 0: Identify runtime (before generating any image)

The mechanic that turns a prompt into a PNG differs per runtime. Detect which agent you are:

- **A native raster image tool is available in this harness** — use that tool directly and save
  the PNG. No shell-out, API key, package install, or second CLI.
- **Claude or any harness without native raster generation** — create designed SVG/CSS artwork
  directly. SVG is the deterministic full-quality path, not an error fallback.

If detection is ambiguous, inspect the tools already available. Ask the user only whether they
want raster art made later in another app; do not turn that optional lane into an install step.

## Shared rules for every image (all runtimes)

- **wide 16:9**, high quality
- convey the one or two core ideas of that section for a smart reader with zero prior context
- match the page's synced visual identity: read the ACTUAL `:root` values from the page being illustrated (background tone + accent hues) and put those hex values in the prompt — the sample prompts below show the default dark slate theme, substitute the user's theme when it differs
- keep total words shown in the image under 10
- save the final PNG to `IMAGES_DIR` (create it if missing)

## How to run the slots

Run guidance by harness tier. Pick the highest tier your harness actually
supports, and say which one you used — never imply concurrency you cannot
deliver.

> **T1 (full):** run the slots as **subagents running workflows** — one
> subagent per image slot, each given exactly one slot's prompt and target
> path, each returning only the saved path. At most seven per wave.
> **T2 (shell-only):** run the slots **sequentially in separate fresh
> contexts**. Same result, more wall clock. Say so plainly when reporting
> back.
> **T3 (chat-only):** run the slots **one at a time, by hand, from the prompts
> above**, saving each image before starting the next. This is a degraded run
> and is labeled degraded.

## Create

1. **Identify runtime** (Step 0).
2. Find slots - Grep the page for `{{...IMAGE` placeholders (hero + per-section). Each comment names the intended subject.
3. Write prompts - For each slot, write an image prompt following the shared rules (dark identity, <10 words, one/two ideas).
4. Generate - Using your runtime's generator, produce one PNG per slot, following "How to run the slots" for your tier (T1 subagents running workflows / T2 sequential fresh contexts / T3 one at a time by hand).
5. Place - Ensure each PNG lands in `IMAGES_DIR` as `<slot>.png`.
6. Embed - Replace each `<!-- {{...IMAGE: ...}} -->` placeholder with `<img src="images/<slot>.png" alt="...">`, keeping the existing `<figure>`/`<figcaption>`.
7. **Favicon** - Generate one small, distinctive per-idea favicon so multiple open tabs are tellable apart:
   - A simple, iconic square mark for this idea on the page's dark identity — one bold glyph/shape, no text.
   - Convert the PNG to a base64 data URI and replace `{{FAVICON_DATA_URI}}` in `<head>` with `data:image/png;base64,<...>`. Save the source PNG as `IMAGES_DIR/favicon.png` for later re-edits.
   - If image generation is unavailable, fall back to a tiny inline SVG data URI: a solid `--violet` rounded square with one distinct letter — the tab still gets a unique mark.
8. Report - List the images generated, the slots filled, and confirm the favicon was set.

## Update

1. **Identify runtime** (Step 0).
2. Identify targets - From the request, determine which embedded `<img>` images to change.
3. Write instruction - Describe the new/revised image following the shared rules.
4. Generate - Produce the revised PNG with your runtime's generator.
5. Place - Keep a `.bak` of the original, then `cp` the new PNG over the existing file in `IMAGES_DIR`.
6. Verify embed - Confirm the `<img>` still points at the updated file; update `alt`/`<figcaption>` if warranted.
7. Report - List the images updated and what changed.
