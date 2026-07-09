# How to Release

This repository uses [release-please](https://github.com/googleapis/release-please) (via GitHub Actions) to manage versions, generate `CHANGELOG.md`, and create GitHub Releases.

1. Trigger the release PR.

   Run the **release-please** workflow manually from the GitHub Actions tab
   (it is configured with `workflow_dispatch`). release-please opens or updates
   a release PR that bumps `package.json` and updates `CHANGELOG.md` based on
   the conventional commits merged to `main`.

2. Review and merge the release PR.

   Merging it makes release-please create the `v<version>` tag and the GitHub Release.

3. Write the user-facing release notes for the product site.

```bash
$ git switch main && git pull

# Generates site/src/content/releases/v<version>.md with TODO placeholders
$ pnpm scaffold:release-notes
```

   Fill it in (user-facing wording; skip internal changes like deps bumps or
   tooling migrations, drop unused sections), then open a PR:

```bash
$ git switch -c release-notes-v<version>
$ git add site/src/content/releases/
$ git commit -m "docs(site): add release notes for v<version>"
$ gh pr create
```

   Merging it to `main` automatically deploys the site (the deploy workflow
   triggers on `site/**` changes).

4. Create zip files for Chrome and Edge stores (Firefox support is also available).

```bash
# Build and create zip for Chrome/Edge
$ pnpm zip

# Build and create zip for Firefox (optional)
$ pnpm zip:firefox
```

5. Upload the generated zip files to the respective browser extension stores:
   - Chrome Web Store
   - Microsoft Edge Add-ons
