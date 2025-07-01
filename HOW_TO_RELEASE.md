# How to Release

This repository uses [WXT](https://wxt.dev/) for building web extensions and [standard-version](https://github.com/conventional-changelog/standard-version) to manage versions and generate `CHANGELOG.md`.

1. The manifest version is automatically managed by WXT
2. Run the following command

```bash
# Check if the content of CHANGELOG is expected.
$ yarn release:dry-run

# Generate CHANGELOG, bump up version, generate new tag
$ yarn release

# Push new tag
$ git push --follow-tags
```

3. Publish the extension to browser marketplaces.

### Automated Publishing (Recommended)

If you have set up marketplace credentials (see [README.md](./README.md#publishing-to-browser-marketplaces) for setup instructions):

```bash
# Publish to all configured marketplaces
$ yarn submit
```

### Manual Publishing

Alternatively, create zip files for manual upload:

```bash
$ yarn zip
```

This creates platform-specific zip files in the `.output/` directory:
- `.output/copy-title-and-url-as-markdown-{version}-chrome.zip` (Chrome Web Store)
- `.output/copy-title-and-url-as-markdown-{version}-firefox.zip` (Firefox Add-ons)

Then manually upload these files to the respective browser marketplaces.
