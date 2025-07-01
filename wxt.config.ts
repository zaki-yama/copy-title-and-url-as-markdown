import { defineConfig } from 'wxt';

export default defineConfig({
  manifest: {
    name: "__MSG_appName__",
    description: "__MSG_appDesc__",
    default_locale: "en",
    icons: {
      "128": "icon128.png"
    },
    commands: {
      "_execute_action": {
        "suggested_key": {
          "default": "Ctrl+Shift+C",
          "mac": "MacCtrl+Shift+C"
        }
      },
      "copy_as_format_1": {
        "suggested_key": {
          "default": "Ctrl+Shift+1",
          "mac": "MacCtrl+Shift+1"
        },
        "description": "Copy as optional format #1"
      },
      "copy_as_format_2": {
        "suggested_key": {
          "default": "Ctrl+Shift+2",
          "mac": "MacCtrl+Shift+2"
        },
        "description": "Copy as optional format #2"
      }
    },
    permissions: [
      "activeTab",
      "clipboardWrite",
      "scripting",
      "storage"
    ],
    host_permissions: [
      "https://*/*",
      "http://*/*"
    ]
  },
  entrypointsDir: 'entrypoints',
  publicDir: 'public'
});