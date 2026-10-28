#!/usr/bin/env node

import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";

const args = process.argv.slice(2);
const rootIndex = args.indexOf("--installed-root");
if (rootIndex === -1 || !args[rootIndex + 1]) {
  console.error("FAIL: usage: node scripts/verify-install.mjs --installed-root <skills-directory>");
  process.exit(3);
}

const root = resolve(args[rootIndex + 1]);
const skills = [
  "idea-forge",
  "spitball-session",
  "grilling",
  "grill-me",
  "wayfinder",
  "idea-page",
];
const required = [
  "idea-forge/OPERATIONS-MANUAL.md",
  "idea-forge/USER-CONFIG.md",
  "idea-forge/branding/brand.md",
  "idea-forge/branding/image-setup.md",
  "idea-page/workflows/create-page.md",
  "idea-page/workflows/image-generation.md",
  "idea-page/workflows/update-page.md",
  "wayfinder/references/grilling.md",
  "wayfinder/references/issue-tracker-github.md",
  "wayfinder/references/local-map.md",
  "wayfinder/references/prototype.md",
  "wayfinder/LICENSE.upstream",
];

const failures = [];

async function requireFile(relativePath) {
  const path = resolve(root, relativePath);
  try {
    if (!(await stat(path)).isFile()) failures.push(relativePath);
  } catch {
    failures.push(relativePath);
  }
}

for (const skill of skills) {
  const relativePath = `${skill}/SKILL.md`;
  await requireFile(relativePath);
  try {
    const source = await readFile(resolve(root, relativePath), "utf8");
    const match = source.match(/^---\s*\n[\s\S]*?^name:\s*([^\n]+)$/m);
    if (!match || match[1].trim() !== skill) {
      failures.push(`${relativePath} (frontmatter name must be ${skill})`);
    }
  } catch {
    // Missing files are already reported by requireFile.
  }
}

for (const path of required) await requireFile(path);

if (failures.length > 0) {
  for (const failure of [...new Set(failures)]) console.error(`FAIL: missing or invalid ${failure}`);
  process.exit(1);
}

console.log(`PASS: verified Idea Forge install at ${root}`);
