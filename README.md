# Tidslinje

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](LICENSE)
[![Vibe Coded](https://img.shields.io/badge/✨-vibe_coded-blueviolet)](https://github.com/klppl/tidslinje)

A dark, minimal Ghost theme built around a timeline layout. No external dependencies, no tracking.

<img src="screenshot.png" width="500">

> [!CAUTION]
> **Vibe Disclaimer**: This theme was 100% vibe-coded in collaboration between a human architect and an agentic AI.
> Expect high-entropy logic, aesthetic-first architecture, and code that technically shouldn't work as well as it does. By using this, you accept that reality is subjective and that "it works on my machine" is a valid deployment strategy.

## Features

- Timeline-based post listing with configurable density and icon positions
- Multiple color palettes (Default, Dracula, Catppuccin, Nordic Forest, Warm Earth, Cyberpunk)
- Six navigation styles (Pill, Underline, Minimal, Brackets, Block, Cursor)
- Three font families (Serif, Sans-serif, Monospaced) with adjustable size
- Micro posts for short-form content
- Minimal JS (related posts, scroll animations), no third-party requests
- Swedish localization

## Setup

### Installation

Package and upload:

```bash
npm run zip
```

Upload `tidslinje.zip` via **Ghost Admin > Settings > Design > Change theme**.

### Configuration

- **Featured posts**: Upload the included `routes.yaml` in **Settings > Labs** to pin featured posts.
- **Search**: Add a nav item with label `Search` and URL `#/search`.
- **Comments**: Enable via **Settings > Membership > Commenting**.

### Theme Settings

All of these are in **Ghost Admin > Design**:

| Setting | Options |
|---|---|
| Color palette | Default, Dracula, Catppuccin, Nordic Forest, Warm Earth, Cyberpunk |
| Font | Serif, Sans-serif, Monospaced |
| Body font size | Small, Default, Large |
| Container width | Narrow, Normal, Wide |
| Icon framing | Round, Squircle, Rounded, Sharp |
| Navigation style | Pill, Underline, Minimal, Brackets, Block, Cursor |
| Navigation size | 0.75rem – 1.75rem |
| Timeline density | Compact, Comfortable, Spacious |
| Timeline icon position | Standard, Left, Right, None |

Post display toggles (author, date, tags, related posts, excerpts) and a Welcome Mat opt-in CTA are also available.

For a complete guide to all settings, custom page templates, and features, see **[docs.md](docs.md)**.

### Timeline Icons

Put an emoji in the **Description** field of an **Internal Tag** (the ones starting with `#`). The first internal tag with a description is used as that post's timeline icon. Falls back to `✍️`.

### Micro Posts

Tag a post with `#micro` to turn it into a short-form entry — no title, no "Read more" link, just the content inline on the timeline with a small `#` permalink.

### Localization

Set your Ghost publication language (`Settings > General > Publication Language`). Swedish translations are in `locales/sv.json`.

## CSS Overrides

Override any theme variable via **Code Injection**:

```html
<style>
  :root {
    --bg-color: #1e1e1e;
    --card-bg: #252525;
    --text-color: #e0e0e0;
    --text-muted: #a0a0a0;
    --accent-color: #6cb6ff;
    --heading-color: #fff;
    --border-color: #333;
    --timeline-line-color: #444;
    --code-bg: #111;
  }
</style>
```

## License

[GPL-3.0](LICENSE)
