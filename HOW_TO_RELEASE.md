# How to Release

This repository uses [standard-version](https://github.com/conventional-changelog/standard-version) to manage versions and generate `CHANGELOG.md`.

1. Update manifest.json's version
2. Run the following command

```bash
# Check if the content of CHANGELOG is expected.
$ yarn release:dry-run

# Generate CHANGELOG, bump up version, generate new tag
$ yarn release

# Push new tag
$ git push --follow-tags
```

3. create zip file and upload to Chrome marketplace.

```bash
$ yarn zip
```
