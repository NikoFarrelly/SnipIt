import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    commands: {
      _execute_browser_action: {
        description: "Opens the SnipIt extension.",
        suggested_key: {
          default: "Command+Alt+S",
        },
      },
    },
    permissions: ["storage", "tabs", "scripting"],
  },
});
