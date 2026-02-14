# SnipIt!

##### v0.1.0

### SnipIt, make web pages afraid again.

Sick of seeing elements on a web page that are annoying? Whether it's because of enshittification, or bad UI. SnipIt
will remove it. Target an element via text and a CSS selector then SnipIt. Save it and never have to see it again.

This is a hobby project - feel free to submit ideas, issues, or PRs.

As noted below, Firefox is my daily driver for browsing the web. However, this plugin will also be released for chrome users too.

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

For all output targets (Firefox, Chrome).

- run `pnpm build`

##### Firefox
- run `pnpm build:firefox`

### Architecture & tech used

This project is as vanilla HTML/CSS/TS as possible. As a result there are no dependencies, only dev dependencies. Over the course of my career I've always used a framework. That
framework has generally been React. Ditching frameworks and going barebones was part of the fun making this!

As a result, I've learnt what must've been the frustrations of early web dev. Imperatively updating DOM elements across
a UI is not for the weak.

##### [WXT](https://github.com/wxt-dev/wxt)

WXT is a framework for building plugins/extensions for web browsers. I couldn't recommend it enough, it's super flexible and easy to use.

##### CSS

I've used BEM (block-element-modifier) as a naming scheme for classes.

File names just follow the UI file name including the element suffix.

Having used both Tailwind and Tachyons (or regular RN stylesheets) going back to BEM was a blast from the past. I haven't had to think about the name of a class for yonks.

##### HTML/TS

To make imperative UI changes easier on myself I've employed a pattern where each UI file is responsible for also providers updaters. That way there is a separation between the responsibilities of that UI file and others. Allowing any UI file update any other UI file is just asking for unexpected scenarios and bugs (as I found out).

Each UI file is suffixed with 'element' and prefixed with 'add', as they are responsible for adding themselves to the [html](entrypoints/popup/index.html). Their updaters within all have verbs describing the action they complete. Such as update (i.e increment number), remove (from HTML), reset (their values), or an HTML element specific action such as open/close for accordion elements. 
