import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: ({ manifestVersion }) => ({
    commands:
      manifestVersion === 2
        ? {
          _execute_browser_action: {
            description: "Opens the SnipIt extension.",
            suggested_key: {
              default: "Ctrl+Period",
              mac: "Command+Period"
            }
          }
        }
        : {
          open_snipit: {
            description: "Opens the SnipIt extension.",
            suggested_key: {
              default: "Ctrl+Period",
              mac: "Command+Period"
            }
          }
        },
    permissions: ["storage", "tabs"],
    browser_specific_settings: {
      gecko: {
        data_collection_permissions: {
          required: ["none"]
        }
      }
    }
  })
});
