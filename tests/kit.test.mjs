import assert from "node:assert/strict";
import { cp, mkdtemp, mkdir, readFile, unlink, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import test from "node:test";

const kit = dirname(dirname(fileURLToPath(import.meta.url)));
const read = (path) => readFile(join(kit, path), "utf8");

const validationRoot = process.env.IDEA_FORGE_VALIDATION_ROOT ?? tmpdir();

async function installFixture() {
  const base = await mkdtemp(join(validationRoot, "idea-forge-test-"));
  const installed = join(base, "skills");
  await mkdir(installed);
  await cp(join(kit, "skills"), installed, { recursive: true });
  await cp(join(kit, "OPERATIONS-MANUAL.md"), join(installed, "idea-forge", "OPERATIONS-MANUAL.md"));
  await writeFile(join(installed, "idea-forge", "USER-CONFIG.md"), "ideas output folder: /buyer/ideas\n");
  await mkdir(join(installed, "idea-forge", "branding"));
  await writeFile(join(installed, "idea-forge", "branding", "brand.md"), "business name: Harbor Desk Services\n");
  await writeFile(join(installed, "idea-forge", "branding", "image-setup.md"), "primary image lane: designed SVG/CSS artwork\n");
  return { base, installed };
}

function verify(installed) {
  return spawnSync(process.execPath, [join(kit, "scripts", "verify-install.mjs"), "--installed-root", installed], {
    encoding: "utf8",
  });
}

test("version surfaces stay synchronized", async () => {
  assert.equal((await read("VERSION")).trim(), "2.0.1");
  assert.match(await read("installer.md"), /^\*\*Version:\*\* 2\.0\.1$/m);
  assert.match(await read("CHANGELOG.md"), /^## \[2\.0\.1\] - 2026-08-13$/m);
});

test("portability, refusal, determinism, and positioning rules are explicit", async () => {
  const files = await Promise.all([
    read("README.md"),
    read("installer.md"),
    read("OPERATIONS-MANUAL.md"),
    read("skills/idea-forge/SKILL.md"),
    read("skills/idea-page/SKILL.md"),
    read("skills/idea-page/workflows/image-generation.md"),
  ]);
  const text = files.join("\n");
  for (const forbidden of ["b" + "un run", "b" + "un test", "b" + "un install", "B" + "un.", "b" + "un:test", "cod" + "ex exec", "cod" + "ex login", "clau" + "de -p"]) {
    assert.equal(text.toLowerCase().includes(forbidden.toLowerCase()), false, `forbidden buyer command: ${forbidden}`);
  }
  assert.match(text, /missing or empty real idea/i);
  assert.match(text, /leave (?:the install|the run|the page).*unverified/is);
  assert.match(text, /determinism-first/i);
  assert.match(text, /script owns mechanical/i);
  assert.match(text, /extend and enhance, never replace/i);
  assert.match(text, /headcount-reduction/i);
});

test("plain-Node verifier accepts a complete recursive install", async () => {
  const fixture = await installFixture();
  try {
    const result = verify(fixture.installed);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.match(result.stdout, /PASS: verified Idea Forge install/);
  } finally {
    // Validation artifacts remain in the shared validation workspace for inspection.
  }
});

test("plain-Node verifier rejects a missing nested license", async () => {
  const fixture = await installFixture();
  try {
    await unlink(join(fixture.installed, "wayfinder", "LICENSE.upstream"));
    const result = verify(fixture.installed);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /wayfinder\/LICENSE\.upstream/);
  } finally {
    // Validation artifacts remain in the shared validation workspace for inspection.
  }
});
