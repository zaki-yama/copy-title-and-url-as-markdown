# Chrome Extension: Copy Title & Url as Markdown Style

Quickly copy the title & url of current tab as Markdown style (`[title](url)`).

![screenshot](./images/screenshot.png)

## Installation & Usage

Chrome Web Store: https://chrome.google.com/webstore/detail/copy-title-and-url-as-mar/fpmbiocnfbjpajgeaicmnjnnokmkehil

日本語の説明はこちら。  
[ページのタイトルと URL を Markdown 形式でコピーする Chrome 拡張作った - dackdive's blog](http://dackdive.hateblo.jp/entry/2015/12/27/000000)

## Publishing to Browser Marketplaces

This extension uses [WXT](https://wxt.dev/) which provides built-in support for publishing to multiple browser marketplaces.

### Setup Credentials

Before publishing, you need to set up credentials for each marketplace:

```bash
# Initialize publishing credentials (run once)
npm run submit -- init
```

This will guide you through setting up API keys for:

#### Chrome Web Store
1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard)
2. Create a new developer account (requires $5 one-time fee)
3. Generate API credentials:
   - Go to Google Cloud Console
   - Enable Chrome Web Store API
   - Create service account and download JSON key
   - Add the service account email to your Chrome Web Store developer account

#### Firefox Add-ons Store
1. Go to [Firefox Add-on Developer Hub](https://addons.mozilla.org/developers/)
2. Create a developer account (free)
3. Generate API credentials:
   - Go to Account Settings → API Key Management
   - Generate new credentials (JWT issuer and secret)

#### Microsoft Edge Add-ons
1. Go to [Microsoft Edge Add-ons Developer Portal](https://partner.microsoft.com/dashboard/microsoftedge/public/login)
2. Create a developer account (free)
3. Generate API credentials:
   - Go to Account Settings → API Keys
   - Create new API key

### Publishing

Once credentials are set up, you can publish to all marketplaces:

```bash
# Build the extension
npm run build

# Publish to all configured marketplaces
npm run submit
```

Or publish to specific marketplaces:

```bash
# Chrome Web Store only
npm run submit -- --chrome

# Firefox Add-ons only  
npm run submit -- --firefox

# Microsoft Edge Add-ons only
npm run submit -- --edge
```

### Manual Publishing

If you prefer manual publishing, you can create distribution packages:

```bash
# Create zip files for manual upload
npm run zip
```

This creates platform-specific zip files in `.output/` directory that you can manually upload to each marketplace.

## Contributing

Thank you for taking an interest in this repository.  
Since the source code also serves as my programming learning purpose, **I generally do not accept Pull Requests**.  
However, I welcome issues related to feature requests and bug reports.
