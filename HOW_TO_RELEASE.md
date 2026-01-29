# How to Release

This repository uses [standard-version](https://github.com/conventional-changelog/standard-version) to manage versions and generate `CHANGELOG.md`.

1. Run the following command

```bash
# Check if the content of CHANGELOG is expected.
$ yarn release:dry-run

# Generate CHANGELOG, bump up version, generate new tag
$ yarn release

# Push new tag
$ git push --follow-tags
```

2. Create zip files for Chrome and Edge stores (Firefox support is also available).

```bash
# Build and create zip for Chrome/Edge
$ yarn zip

# Build and create zip for Firefox (optional)
$ yarn zip:firefox
```

3. Upload the generated zip files to the respective browser extension stores:
   - Chrome Web Store
   - Microsoft Edge Add-ons
