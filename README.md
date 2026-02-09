# SnipIt!

SnipIt, make web pages afraid again.

Sick of seeing elements on a web page that are annoying? Whether it's because of enshittification, or bad UI. SnipIt will remove it. Target an element via text and a CSS selector then SnipIt. Save it and never have to see it again.

### Installation

1. clone the repo.
2. install deps - `pnpm i`

### How to run

##### Firefox

1. Open a new tab at `about:debugging#/runtime/this-firefox`
2. Click 'Load Temporary Add-on'
3. Select the `manifest.json` from the [`.output`](.output/firefox-mv2/manifest.json) firefox dir.
4. The plugin will now be available in the plugin dropdown.

### Build

1. run `pnpm build`

##### Firefox

1. run `pnpm build:firefox`
