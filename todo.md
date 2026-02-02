# Tidslinje Theme — Todo

## Critical Bugs

- [x] **Subscribe widget only shows to logged-in members** — `partials/subscribe-widget.hbs:2-4`. The `{{#if @member}}` block wraps both the "thanks" message and the subscribe form. Non-members (the target audience) see nothing. Needs an `{{else}}` before the form so logged-out visitors can subscribe.

- [x] **Font settings have no CSS effect** — `default.hbs:22` applies body classes `has-serif-font`, `has-sans-font`, `has-mono-font`, but no CSS rules in `main.css` target these classes. The Serif/Sans/Mono setting in Ghost Admin does nothing. Need CSS rules that swap `--font-body` and `--font-heading` per class.

- [x] **`prefers-color-scheme: dark` conflicts with base dark theme** — `main.css:931-946`. The base theme is already dark (`#1e1e1e`), but this media query overrides to `#333` background and `lightblue` links, bypassing the CSS variable system. Either remove the block or rework it to use the existing variables.

- [x] **Broken HTML in `author-info.hbs`** — `partials/author-info.hbs:11-37`. The `<p>` and `<span class="author-info__meta">` elements are mis-nested. The `</span>` on line 37 sits outside the `</p>` on line 35, producing invalid HTML.

- [x] **Stray `</span>` in `tag.hbs`** — `tag.hbs:23`. An orphan closing `</span>` that doesn't match any opening tag.

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

## Someday

- [ ] **Tag Icon Filter Bar** — Blocked: Ghost's `{{#get "tags"}}` helper cannot fetch internal tags (visibility filter is ignored). Would need a JavaScript/Content API approach similar to related-posts, or a future Ghost update that supports `visibility:internal` in the get helper.

- [x] **Timeline Entry Animations** — Add subtle fade-in effects for timeline items as they enter the viewport.

- [x] **Theme Expansion** — Shipped: Default, Dracula, Catppuccin (Mocha), Nordic Forest, Warm Earth, Cyberpunk.
