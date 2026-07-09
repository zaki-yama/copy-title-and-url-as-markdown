# How to Release

This repository uses [standard-version](https://github.com/conventional-changelog/standard-version) to manage versions and generate `CHANGELOG.md`.

1. Run the following command

```bash
# Check if the content of CHANGELOG is expected.
$ pnpm release:dry-run

# Generate CHANGELOG, bump up version, generate new tag.
# Also scaffolds site/src/content/releases/v<version>.md for the product site.
$ pnpm release
```

2. Write the user-facing release notes for the product site.

   `pnpm release` generates `site/src/content/releases/v<version>.md` with TODO placeholders.
   Fill it in (user-facing wording; skip internal changes like deps bumps, drop unused sections)
   and commit it:

```bash
$ git add site/src/content/releases/
$ git commit -m "docs(site): add release notes for v<version>"

# Push the release commit, the notes commit, and the new tag
$ git push --follow-tags
```

3. Create zip files for Chrome and Edge stores (Firefox support is also available).

```bash
# Build and create zip for Chrome/Edge
$ pnpm zip

# Build and create zip for Firefox (optional)
$ pnpm zip:firefox
```

4. Upload the generated zip files to the respective browser extension stores:
   - Chrome Web Store
   - Microsoft Edge Add-ons
