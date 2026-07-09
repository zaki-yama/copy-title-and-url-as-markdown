// Generates a release-notes template for the product site
// (site/src/content/releases/v<version>.md) from the current
// package.json version. Runs automatically after `pnpm release`.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { version } = JSON.parse(
  fs.readFileSync(path.join(root, "package.json"), "utf8"),
);
const file = path.join(root, "site", "src", "content", "releases", `v${version}.md`);

if (fs.existsSync(file)) {
  console.log(`[scaffold-release-notes] skip: ${path.relative(root, file)} already exists`);
  process.exit(0);
}

// Local date as YYYY-MM-DD (toISOString would shift to UTC)
const date = new Date().toLocaleDateString("sv-SE");

const template = `---
version: "${version}"
date: ${date}
---

### Features

- TODO

### Bug Fixes

- TODO
`;

fs.writeFileSync(file, template);
console.log(`[scaffold-release-notes] created: ${path.relative(root, file)}`);
console.log(
  "[scaffold-release-notes] Write the user-facing notes (drop unused sections), then commit the file.",
);
