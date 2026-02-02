# Tidslinje Theme Documentation

Tidslinje is a dark, timeline-based Ghost theme built for bloggers who want a clean, chronological layout. Every post appears on a vertical timeline with dates, icons, and excerpts.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Color Palettes](#color-palettes)
- [Typography](#typography)
- [Layout](#layout)
- [Navigation](#navigation)
- [Timeline](#timeline)
- [Timeline Icons](#timeline-icons)
- [Post Types](#post-types)
- [Post Display Options](#post-display-options)
- [Custom Page Templates](#custom-page-templates)
- [Membership & Subscribe](#membership--subscribe)
- [Welcome Mat](#welcome-mat)
- [Related Posts](#related-posts)
- [Localization](#localization)
- [Mobile Behavior](#mobile-behavior)

---

## Getting Started

Upload `tidslinje.zip` via **Ghost Admin > Settings > Design > Change theme**. All settings below are found in **Ghost Admin > Design > Site design**.

**Requirements**: Ghost >= 5.0.0

---

## Color Palettes

Six dark color palettes are available. Each palette sets backgrounds, text colors, accents, and the timeline line color.

| Palette | Background | Accent | Vibe |
|---------|-----------|--------|------|
| **Default** | `#1e1e1e` | `#6cb6ff` (blue) | Neutral dark |
| **Dracula** | `#282a36` | `#bd93f9` (purple) | Popular IDE theme |
| **Catppuccin** | `#1e1e2e` | `#cba6f7` (lavender) | Soft pastel dark |
| **Nordic Forest** | `#1a2421` | `#8fb573` (green) | Earthy, natural |
| **Warm Earth** | `#231c17` | `#c67a4a` (orange) | Warm, grounded |
| **Cyberpunk** | `#0d0d12` | `#ff2a6d` (pink) | Neon, high contrast |

The timeline line automatically tints to 25% of the active palette's accent color.

**Setting**: Design > Color Palette

---

## Typography

### Font Family

Three font options are available. The chosen font applies to both body text and headings.

| Option | Fonts | Best for |
|--------|-------|----------|
| **Sans-serif** | Inter, system sans-serif | Clean, modern reading |
| **Serif** | Georgia, Times New Roman | Traditional, literary |
| **Monospaced** | Source Code Pro, Consolas | Technical, developer blogs |

Each font has optimized letter-spacing and line-height values.

**Setting**: Design > Font

### Body Font Size

Controls the base font size for the entire site.

| Option | Size |
|--------|------|
| Small | 14px |
| Default | 16px |
| Large | 18px |

**Setting**: Design > Body font size

---

## Layout

### Container Width

Controls the maximum width of the site content area.

| Option | Width |
|--------|-------|
| Narrow | 740px |
| Normal | 960px |
| Wide | 1200px |

**Setting**: Design > Container width

### Header Alignment

Controls horizontal alignment of the site title and description.

- **Center** (default) - Title and description centered
- **Left** - Title and description left-aligned

**Setting**: Design > Header alignment

### Site Icon Framing

Controls the border radius of the site icon in the header.

| Option | Shape |
|--------|-------|
| Round | Circle (50% radius) |
| Squircle | Rounded square (22% radius) |
| Rounded | Soft rectangle (12px radius) |
| Sharp | Square (no radius) |

**Setting**: Design > Icon framing

---

## Navigation

### Navigation Style

Six visual styles for the main navigation links.

| Style | Description |
|-------|-------------|
| **Pill** | Rounded background highlight on hover |
| **Underline** | Animated underline slides in from right |
| **Minimal** | Subtle opacity change with text shadow glow |
| **Brackets** | Animated `[ ]` brackets appear around links |
| **Block** | Inverted background/text colors on hover |
| **Cursor** | Terminal-style `>` cursor appears on the left |

**Setting**: Design > Navigation style

### Navigation Size

Controls the font size of navigation links. Options range from `0.75rem` to `1.75rem` in increments.

**Setting**: Design > Navigation size

### Sticky Navigation

When enabled, the navigation bar sticks to the top of the viewport when scrolling.

- **On** (default) - Nav stays visible
- **Off** - Nav scrolls with page

**Setting**: Design > Sticky navigation

---

## Timeline

### Timeline Density

Controls vertical spacing between timeline entries.

| Option | Spacing |
|--------|---------|
| Compact | 1.5rem |
| Comfortable | 3rem (default) |
| Spacious | 5rem |

**Setting**: Design > Timeline density

### Timeline Icon Position

Controls where timeline icons appear relative to the content.

| Option | Behavior |
|--------|----------|
| **Standard** | Icons centered between dates and post content |
| **Left** | Icons on the far left, dates shift inward |
| **Right** | Icons on the far right of the timeline |
| **None** | Icons and the vertical timeline line are both hidden |

**Setting**: Design > Timeline icon position

### Timeline Icon Style

Controls the visual treatment of timeline icons.

| Option | Effect |
|--------|--------|
| **Default** | Full-color emoji as authored |
| **Monochrome** | Grayscale filter at 70% opacity |
| **Contrast** | Grayscale with high brightness at 90% opacity |

**Setting**: Design > Timeline icon style

---

## Timeline Icons

Icons are set using Ghost's **internal tags**. Internal tags are not visible to readers.

### How to set an icon for a post

1. In Ghost Admin, go to **Tags** and create a new tag
2. Set the tag name starting with `#` (e.g., `#code`) — this makes it internal
3. In the **Description** field, enter an emoji (e.g., `💻`)
4. Save the tag
5. Assign the internal tag to any post — the emoji appears as the timeline icon

### Examples

| Internal Tag | Description | Icon shown |
|-------------|-------------|------------|
| `#code` | 💻 | 💻 |
| `#design` | 🎨 | 🎨 |
| `#video` | 🎬 | 🎬 |
| `#podcast` | 🎙️ | 🎙️ |
| `#photo` | 📸 | 📸 |
| `#music` | 🎵 | 🎵 |

If a post has no internal tag, the fallback icon is ✍️.

A post's **first** internal tag (by sort order) determines the icon. You can assign multiple internal tags, but only the first one's description is used.

---

## Post Types

### Regular Posts

Standard posts display in the timeline with:
- Title (clickable, links to full post)
- 30-word excerpt
- Date on the left (desktop) or above the title (mobile)
- Timeline icon

The entire post card is clickable via the title.

### Micro Posts

Short-form posts (status updates, quick thoughts) without titles. To create a micro post:

1. Create a post and write your content
2. Assign the internal tag `#micro` to the post

Micro posts display differently in the timeline:
- No title — content is shown inline (50-word excerpt)
- Permalink `#` symbol for direct linking
- Slightly larger font size (1.2rem) for visual weight

### Featured Posts

Mark any post as "Featured" in Ghost's post settings. Featured posts show a ★ star next to their title in the timeline. They appear in normal chronological order (no special sorting or section).

---

## Post Display Options

These toggles control what metadata appears on individual post pages.

### Post Header

| Setting | Default | Controls |
|---------|---------|----------|
| Show author | On | Author name below title |
| Show date | On | Publication date below title |
| Show tags | On | Tag list below title |

### Post Footer

| Setting | Default | Controls |
|---------|---------|----------|
| Show author | On | Author bio section at end of post |
| Show related | On | Related posts section at end of post |

**Settings**: Design > Post header / Post footer options

---

## Custom Page Templates

Six custom templates are available when creating a **Page** in Ghost. Select the template from the page settings sidebar under "Template".

### Full Width

Best for photo essays, code-heavy articles, or visual content. Feature images span the full viewport width. Content breaks free from the normal reading column.

### No Feature Image

A clean, text-first layout. Skips the feature image entirely and puts the title front and center. Ideal for essays, announcements, or text-heavy pages.

### Subscribe

A distraction-free newsletter signup landing page. Shows a centered card with the site icon, title, your page excerpt as the pitch, and an email signup form. No navigation or footer — focused entirely on conversion.

### Project Case Study

Structured layout for portfolio pieces and case studies. Displays tags as role/client context, publication date, and author in a metadata header. Wide content area for screenshots and visuals.

### Video

Cinema mode for video-focused posts. Video embeds break out of the reading column into a full-width dark area. Post body (transcript, notes) flows below in the normal reading column.

### Curated List

Grid layout optimized for bookmark cards and resource collections. Bookmark cards display two-up on desktop, stacked on mobile. Section headings act as grid dividers. Ideal for "best of" lists, toolkits, or reading recommendations.

---

## Membership & Subscribe

If Ghost Members is enabled (`Settings > Membership`), a subscribe widget appears at the bottom of each post.

**For logged-out visitors**: Shows an email input form with a subscribe button and an RSS feed link.

**For logged-in members**: Shows a "Thanks for being a subscriber" message with a sign-out link.

The subscribe form uses Ghost's built-in member system — no additional configuration needed.

---

## Welcome Mat

An optional full-screen signup prompt shown on the homepage.

### How to enable

1. Go to **Design > Site design**
2. Find the **Welcome Mat Optin CTA** text field
3. Enter your call-to-action text (e.g., "Join the community. New posts delivered weekly.")
4. Save

The welcome mat appears:
- Only on the homepage (first page, not paginated pages)
- Only for logged-out visitors (members never see it)
- As a full-screen centered card with the site title, description, your CTA text, and an email signup form

To disable, clear the text field.

**Setting**: Design > Welcome mat optin CTA

---

## Related Posts

When enabled, related posts appear at the bottom of each post page. The system:

1. Reads the current post's tags
2. Fetches other posts with matching tags via Ghost's Content API
3. Displays up to 3 related posts in a responsive grid

Each related post card shows the title, date, feature image, and optionally an excerpt.

### Settings

| Setting | Default | Controls |
|---------|---------|----------|
| Show related posts | On | Whether the section appears at all |
| Show excerpt | On | Whether excerpts appear on related post cards |

---

## Localization

The theme ships with two languages:

- **English** (`en.json`) — default
- **Swedish** (`sv.json`)

The active language is determined by your Ghost site's language setting (`Settings > General > Publication language`). Set it to `sv` for Swedish.

All user-facing strings (navigation labels, form text, error messages, metadata labels) are translated. If a translation key is missing, Ghost falls back to the English key text.

---

## Mobile Behavior

At screen widths below 768px:

- **Date column** hides — dates move above post titles
- **Timeline icons** appear to the left of content, aligned with the title
- **Excerpts** are hidden on the timeline to save space
- **Titles** reduce to 1.3rem
- **Navigation** stacks or wraps as needed
- **Bookmark cards** display single-column
- **Subscribe form** stacks vertically (email input above button)
- **Timeline line** repositions to the left edge

All timeline settings (icon position, density, icon style) continue to work on mobile, with positions adapting to the narrower layout.
