# Tidslinje Theme — Todo

## Critical Bugs

- [x] **Subscribe widget only shows to logged-in members** — `partials/subscribe-widget.hbs:2-4`. The `{{#if @member}}` block wraps both the "thanks" message and the subscribe form. Non-members (the target audience) see nothing. Needs an `{{else}}` before the form so logged-out visitors can subscribe.

- [x] **Font settings have no CSS effect** — `default.hbs:22` applies body classes `has-serif-font`, `has-sans-font`, `has-mono-font`, but no CSS rules in `main.css` target these classes. The Serif/Sans/Mono setting in Ghost Admin does nothing. Need CSS rules that swap `--font-body` and `--font-heading` per class.

- [x] **`prefers-color-scheme: dark` conflicts with base dark theme** — `main.css:931-946`. The base theme is already dark (`#1e1e1e`), but this media query overrides to `#333` background and `lightblue` links, bypassing the CSS variable system. Either remove the block or rework it to use the existing variables.

- [x] **Broken HTML in `author-info.hbs`** — `partials/author-info.hbs:11-37`. The `<p>` and `<span class="author-info__meta">` elements are mis-nested. The `</span>` on line 37 sits outside the `</p>` on line 35, producing invalid HTML.

- [x] **Stray `</span>` in `tag.hbs`** — `tag.hbs:23`. An orphan closing `</span>` that doesn't match any opening tag.

- [x] **Broken closing tag in `tags.hbs`** — `partials/tags.hbs:12`. The closing `</ul>` is written as `<ul>` (opening instead of closing), producing an unclosed list and invalid HTML.

- [x] **Translation key mismatch from leading spaces** — `partials/welcome-mat.hbs:16` and `partials/subscribe-widget.hbs:22` both use `{{t " Your email address"}}` with a leading space in the key. The locale files define `"Your email address"` (no leading space), so the translation never matches and the raw key (with the space) is shown as placeholder text.

- [x] **`--tertiary-color` undefined — welcome mat has no background** — `main.css:996`. The `.membership-widget--welcome-mat` background uses `var(--tertiary-color)` which is never defined in `:root` or any palette. The welcome mat renders with a transparent background, making its content unreadable against page content behind it.

- [x] **Stray space in `navigation.hbs` URL helper** — `partials/navigation.hbs:4`. `{{url absolute=" true"}}` has a space before `true`. Ghost may not parse this correctly, potentially preventing absolute URL generation for navigation links.

## Bugs

- [x] **Related posts broken** — API key was empty. The JS regex that parsed `script.textContent` for `key: 'abc...'` broke because Cloudflare Rocket Loader rewrites script tags. Fixed by using Ghost's `{{content_api_key}}` Handlebars helper instead. Requires Ghost 5.x+ (which the theme already does).

- [x] **XSS risk in `related-posts.js`** — `assets/js/related-posts.js:86-103`. Post titles and excerpts are injected via template literals into `innerHTML` without escaping. Sanitize or use `textContent`.

- [x] **Missing parameters in fallback `getRecentPosts` call** — `assets/js/related-posts.js:24`. When tags fetch returns empty, `headingText` and `showExcerpt` are not passed, rendering `undefined` as the heading text.

- [x] **Hardcoded Content API key** — `partials/related-posts.hbs:10`. The key `8106af3afb7842a530c500e633` is baked in. Breaks for anyone else installing the theme. Document that users must replace it, or extract it from the meta tag Ghost injects via `ghost_head`.

- [x] **Feature image `srcset` has stray spaces** — `post.hbs:36,38`. `size=" s"` and `size=" xl"` have leading spaces. Should be `size="s"` and `size="xl"`.

- [x] **Duplicate CSS property** — `main.css:319-320`. `font-size: 0.85rem` is declared twice on `.timeline-read-more`.

- [x] **`page.hbs` never renders feature images** — `page.hbs:11-20`. The `@page.show_title_and_feature_image` conditional only outputs the title. The feature image is missing despite the flag name.

- [x] **`icon-position-right` doesn't adjust timeline line** — `main.css:280-283`. The `icon-position-left` variant repositions the `::before` line to `left: 20px`, but `icon-position-right` leaves the line at the default 140px even though the icon has moved.

- [x] **Typography Audit** — Optimize line-heights and letter-spacing for all font options (serif, sans-serif, monospace) to ensure maximum readability.

- [x] **Undefined CSS utility classes used across templates** — `.center-text` (used in `tag.hbs`, `author.hbs`, `footer.hbs`, `subscribe-widget.hbs`), `.container` (used in `post.hbs`, `page.hbs`, `error.hbs`, `main-header.hbs`), `.inline-block` (used in `author.hbs`), `.mt0` / `.mb0` (used in `page.hbs`, `author-info.hbs`), and `.btn` / `.btn--cta` (used in `welcome-mat.hbs`) have no CSS definitions. These classes do nothing.

- [x] **Hardcoded colors ignore palette system**

- [x] **File card (attachment) ignores dark theme** — Ghost's default `.kg-file-card` styles use light colors that clash with the dark theme. Excluded Ghost's default file card CSS via `package.json` and added full custom layout and color styles using the palette system (`--card-bg`, `--border-color`, `--heading-color`, `--text-muted`, `--accent-color`). — `main.css`. `.notification-area` uses `#82ea02`, `.message-error` uses `red`, `.message-success` uses `green`. These ignore the CSS variable palette system and clash with most color schemes. Should use variables like `--accent-color` or new semantic color variables.

- [x] **`content-cta.hbs` inline styles use light colors on dark theme** — `partials/content-cta.hbs:4`. The paid-content upgrade CTA has `background: #eee` inline, which produces a jarring white block against the dark theme. Should use `var(--card-bg)` and `var(--text-color)`.

- [x] **Locale case mismatch breaks pagination translations** — `locales/en.json` defines `"Older posts"` / `"Newer posts"` (lowercase p) but `partials/pagination.hbs` calls `{{t "Older Posts"}}` / `{{t "Newer Posts"}}` (uppercase P). Ghost's `{{t}}` is case-sensitive, so the translations never match.

- [x] **`related-posts.js` has no fetch error handling** — `assets/js/related-posts.js`. Neither fetch call checks `response.ok` before calling `.json()`. A 401, 404, or 500 from the Content API will attempt to parse an error page as JSON and throw a confusing error silently.

- [x] **Icon links point to internal tag pages that 404** — `partials/post-icon.hbs:9`. The `<a>` wrapping each timeline icon links to the internal tag's URL (e.g., `/tag/hash-micro/`). Internal tag pages typically return 404 in Ghost unless custom routes are configured.

- [x] **Title tag missing space before separator** — `default.hbs:13`. The title outputs `{{meta_title}}{{#is "post, page"}}— {{@site.title}}{{/is}}` which produces `My Post Title— My Site` with no space before the em-dash. Should be ` — ` with spaces on both sides.

- [x] **Bookmark card layout breaks on mobile** — `main.css`. The `.kg-bookmark-container` is `display: flex` (horizontal) with no responsive media query to stack vertically. On narrow screens the thumbnail and content are squished side by side.

- [x] **`post.hbs` passes unused hash params to related-posts** — `post.hbs:61`. The `{{> related-posts reltags=post.tags exclude=post.id}}` partial call passes `reltags` and `exclude` but the partial never reads these — it extracts tags and ID from its own Handlebars context. Dead parameters that are confusing to maintain.

## Nice to Have

- [x] **Add `error.hbs` / `404.hbs` templates** — Without these, Ghost falls back to a plain default error page that doesn't match the theme.

- [x] **Replace `<br>` tags with CSS spacing** — `loop.hbs:3,8,64`, `main-header.hbs:38`, `tag.hbs:9,25`, `author.hbs:54,62`, `footer.hbs:28` all use `<br>` for layout spacing. Use margin/padding instead.

- [x] **Move inline styles to `main.css`** — `subscribe-widget.hbs:5,17,25` uses `style="color: grey"` and `style="margin-bottom: 0.5rem"` inline.

- [x] **Related posts makes sequential API calls** — `related-posts.js:32-55` fetches posts one tag at a time. With 5+ tags that's 5+ round-trips. Consider a combined filter in one request.

- [x] **Add `"license": "GPL-3.0"` to `package.json`** — The LICENSE file exists but the field is missing from package.json. Ghost and npm tooling use it.

- [x] **Improve timeline icon accessibility** — `partials/post-icon.hbs`. Emoji icons lack meaningful screen reader context. Add `aria-hidden="true"` on decorative icons or `aria-label` on the links.

- [x] **Mobile `icon-position-left` alignment** — The mobile breakpoint forces the timeline line to `left: 20px`, which coincidentally matches the `icon-position-left` desktop value, but the interaction between the two hasn't been fully accounted for when `.timeline-left` is hidden and the marker is reordered.

- [x] **Document bookmark card CSS dependency** — `package.json` excludes Ghost's bookmark card assets and the theme provides custom CSS. If Ghost changes bookmark markup, the custom styles may break. A comment noting this would help future maintenance.

- [x] **Sticky Navigation** — Nav sticks to top on scroll with `position: sticky`, using `--bg-color` background so content scrolls behind it.

- [ ] **Scroll Progress** — Implement a discrete reading progress bar at the top of the page.

- [ ] **Add keyboard focus styles** — No `:focus` or `:focus-visible` rules exist anywhere in `main.css`. Keyboard navigation is completely invisible, which is a WCAG 2.4.7 failure. Add visible focus indicators for links, buttons, and form inputs.

- [ ] **Add skip-to-content link** — `default.hbs` has no skip link. Screen reader and keyboard users must tab through the entire navigation before reaching `<main id="content">`. Add a visually hidden skip link as the first focusable element.

- [ ] **Add `<label>` elements to subscribe forms** — `partials/subscribe-widget.hbs:22` and `partials/welcome-mat.hbs:16`. The email inputs have no `<label>`, only `placeholder` text. Screen readers need a proper `<label>` for WCAG 1.3.1 / 3.3.2 compliance. Use a visually hidden label.

- [x] **Add `box-sizing: border-box` global reset** — `main.css` has no box-sizing reset. Padding on elements with explicit widths (like `.timeline-left`) computes differently across browsers. Add `*, *::before, *::after { box-sizing: border-box; }`.

- [x] **Site title heading hierarchy** — `partials/main-header.hbs:13` renders the site title as `<h1>` on every page. On post, page, tag, and author templates, the content title is also an `<h1>`, producing two `<h1>` elements per page. The site title should be `<h1>` only on the home page and `<p>` or `<span>` elsewhere.

- [ ] **Style Ghost content cards for dark theme** — `main.css` has no styles for Ghost's gallery (`.kg-gallery-*`), callout (`.kg-callout-*`), toggle (`.kg-toggle-*`), audio (`.kg-audio-*`), video (`.kg-video-*`), file (`.kg-file-*`), header (`.kg-header-*`), signup (`.kg-signup-*`), or product (`.kg-product-*`) cards. Ghost's default light-mode card CSS will clash with the dark theme.

- [ ] **Tag feature image has no responsive srcset** — `tag.hbs:6`. Uses `{{tag.feature_image}}` directly, delivering the full-size image regardless of viewport. Should use `{{img_url tag.feature_image size="l"}}` with `srcset` for responsive loading.

- [ ] **Featured star needs `aria-hidden`** — `loop.hbs:42`. The `⭐` character in the featured indicator `<span>` has no `aria-hidden="true"`, so screen readers announce the unicode character. Should be marked as decorative.

- [x] **Generic "Read more" link text** — `loop.hbs:49`. Every timeline entry's read-more link says `{{t "Read more"}}` with no post-specific context. Screen readers hear a list of identical "Read more" links. Add `aria-label="{{t 'Read more'}}: {{title}}"` for context.

- [x] **Remove redundant "Läs Mer" (Read More) links** — The repeated `LÄS MER →` on every timeline entry creates visual noise and breaks the minimalist aesthetic. Removed the visible read-more link, moved the full-card click overlay (`::after`) to the title link, and kept the title hover color change as the interactivity hint.

- [x] **Improve typography and visual hierarchy** — Text weight too uniform across timeline entries. Titles, excerpts, and dates lack clear differentiation. Bumped title from `1.25rem`/`600` to `1.5rem`/`700`, reduced excerpt from `0.95rem` to `0.9rem` with `font-weight: 300` to create a clearer headline-to-summary distinction.

- [x] **Make timeline line more prominent** — The vertical timeline spine was too thin (`1px`) and used flat grey (`#444`) that paled against the dark background. Widened to `2px` and changed color to `color-mix(in srgb, var(--accent-color) 25%, transparent)` so it picks up a subtle tint from each palette's accent color automatically. Removed redundant per-palette `--timeline-line-color` overrides.

- [x] **Micro posts render untruncated HTML in timeline** — `loop.hbs:34`. Micro posts (`#has tag="#micro"`) render their full `{{{content}}}` inline. If a micro post contains images, embeds, or long text, it breaks the timeline layout. Consider truncating or limiting the rendered output.

- [x] **Micro posts (status updates) lack visual weight** — Titleless micro posts float visually in the timeline because they have no bold heading to anchor them. Consider bumping `.timeline-content--micro` font size slightly (e.g. `1.2rem`) or giving them a subtle `background` / left-border tint using `var(--card-bg)` to differentiate "thoughts" from "articles."

- [x] **Make timeline entries fully clickable** — Currently only the "Läs mer" text link is clickable. Per Fitts's Law, the entire `.timeline-right` content block should be a click target for the post. Keep the visible "Read more" text for affordance, but wrap the block in an `<a>` or use a CSS `::after` overlay on the existing link to expand the hit area.

- [x] **Standardize timeline icon style** — The timeline icons are a mix of flat vector icons, gradient-shaded emoji, and simple outlines depending on what the author puts in the internal tag description. This inconsistency clashes with the minimalist aesthetic. Document a recommendation (or enforce via CSS) for a uniform monoline style — e.g. outline-only emoji, or a consistent icon set like Feather/Heroicons rendered in `var(--accent-color)` or `var(--text-muted)`.

- [ ] **Human-readable `navigation_size` labels** — `package.json`. The navigation size options display raw CSS values (`"0.75rem"`, `"1.25rem"`, etc.) in Ghost Admin. Non-technical users won't understand these. Replace with labels like "Extra Small", "Small", "Medium", "Large", etc.

- [x] **Add `"Read more"` key to `en.json`** — `locales/en.json` is missing the `"Read more"` key used in `loop.hbs`. It works by coincidence in English (Ghost falls back to the key itself), but it will break for any locale that does not define its own override.

- [x] **Remove obsolete meta tags** — `default.hbs:8,10`. `<meta name="HandheldFriendly">` (old BlackBerry/Palm) and `<meta http-equiv="X-UA-Compatible">` (IE) are dead weight in modern browsers.

- [x] **Remove dead `post-teaser.hbs` partial** — `partials/post-teaser.hbs` is never referenced by any template, has no corresponding CSS, and contains broken HTML (unclosed `<span>`). It appears to be leftover from a previous card-based layout.

- [ ] **Add reading time to posts** — `post.hbs` does not display `{{reading_time}}`. This is a common expectation for blog themes and Ghost provides the helper natively.

- [ ] **Add previous/next post navigation** — `post.hbs` has no prev/next links at the bottom. Ghost provides `{{prev_post}}` and `{{next_post}}` block helpers for this.

- [x] **Update README** — `README.md` claims "No JavaScript" and "Zero JS by default" but the theme now has `related-posts.js` and an inline IntersectionObserver script. The color palette table only lists 2 palettes but 6 are shipped.

## Someday

- [ ] **Tag Icon Filter Bar** — Blocked: Ghost's `{{#get "tags"}}` helper cannot fetch internal tags (visibility filter is ignored). Would need a JavaScript/Content API approach similar to related-posts, or a future Ghost update that supports `visibility:internal` in the get helper.

- [x] **Timeline Entry Animations** — Add subtle fade-in effects for timeline items as they enter the viewport.

- [x] **Theme Expansion** — Shipped: Default, Dracula, Catppuccin (Mocha), Nordic Forest, Warm Earth, Cyberpunk.

- [ ] **Light mode support** — The theme is dark-only with no `prefers-color-scheme: light` handling. Users who prefer light mode get a dark theme regardless. Consider a light palette or a toggle, or at minimum a single light palette option in Ghost Admin.

- [x] **Custom page templates** — Implemented 6 custom page templates selectable per-page in the Ghost editor: `custom-full-width.hbs` (immersive reader for visual/code-heavy content), `custom-no-feature-image.hbs` (essayist for pure text), `custom-subscribe.hbs` (distraction-free newsletter signup landing page), `custom-project-case.hbs` (portfolio/case study with structured metadata), `custom-video.hbs` (theater mode with cinema-style video breakout), `custom-curated-list.hbs` (grid layout for bookmark cards and resource lists). All registered in `package.json` and styled in `main.css`.

- [x] **Search result styling** — Ghost's Sodo search renders in an isolated iframe with hardcoded light styles. Added a MutationObserver script in `default.hbs` that detects the search iframe, reads the active palette CSS variables (`--bg-color`, `--card-bg`, `--text-color`, etc.), and injects a dark-themed stylesheet into the iframe. Overrides backgrounds, text colors, input fields, highlights, scrollbars, and hover states to match whichever color palette is active. CSS variables also stored on `#sodo-search-root` in `main.css` for reference.

- [x] **Localization improvements** — `tag.hbs:13-14` splits translatable sentences into fragments (`"Subscribe to this tag's"`, `"RSS feed"`), making correct translation into non-English languages impossible. Combine into single `{{t}}` calls with placeholders. Also add missing keys to `sv.json`.

- [ ] **Print stylesheet** — `main.css` has only a single `text-indent` print rule. A proper `@media print` block should hide nav/footer, use light backgrounds, and ensure readable typography for printed pages.

- [x] **Loosen `engines.ghost` version** — `package.json` pins to `>=5.104.2`. This specific minor version prevents installation on earlier 5.x releases that are fully compatible. Consider `>=5.0.0` for broader compatibility.

- [ ] **Fix `.gitignore` zip conflict** — `.gitignore` has conflicting rules: line 13 `*.zip`, line 14 `!tidslinje.zip`, line 16 `*.zip`. The second `*.zip` overrides the exception. Also, the committed `tidslinje.zip` build artifact should ideally not live in the repo — use GitHub Releases instead.
