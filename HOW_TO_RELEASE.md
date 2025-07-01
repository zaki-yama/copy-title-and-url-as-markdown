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

3. create zip file and upload to Chrome marketplace and Edge store.

```bash
$ yarn zip
```

The zip file will be created in `.output/copy-title-and-url-as-markdown-{version}-chrome.zip`.
