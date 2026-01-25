# Tidslinje

**A minimalist, high-performance Ghost theme featuring a timeline-based post layout.**

Tidslinje is a focused blogging theme optimized for speed, readability, and a unique chronological user experience.

## Key Features

- **Extreme Performance**: Zero external dependencies, zero JavaScript (default), and optimized for Google Core Web Vitals.
- **Timeline View**: A chronological axis-based post list that emphasizes your content over time.
- **Minimalist Design**: A clean, "rustic" aesthetic that stays out of the way of your words.
- **Privacy First**: No tracking, no analytics, no third-party bloat.

---

## Setup & Customization

### 1. Installation
Compress the theme folder into a `.zip` file and upload it via **Ghost Admin > Settings > Design > Change theme**.

### 2. Primary Configuration
- **Featured Posts**: To keep featured posts pinned to the top, upload the provided `routes.yaml` in **Settings > Labs**.
- **Search**: Enable the portal search by adding a primary navigation item with the label `Search` and URL `#/search`.
- **Comments**: Supports native Ghost comments via **Settings > Membership > Commenting**.

### 3. Customization Options
- **Typography**: Toggle between Serif, Sans-Serif, and Monospaced system fonts in the Design settings.
- **Dark Mode**: Automatically respects system preferences. To force dark mode, edit the media queries in `assets/css/main.css`.
- **Welcome Mat**: Enable a full-screen landing page for new visitors by adding a pitch in the **Welcome mat optin CTA** design field.

### 4. Technical Overrides
Override theme variables using **Code Injection**:
```html
<style>
  :root {
    --container-width: 1000px;
    --accent-color: #6cb6ff;
    --font-stack: "Inter", sans-serif;
  }
</style>
```

## Extensions
Functionality can be extended via these snippets:
- [Navigation Hamburger](https://gist.github.com/curiositry/02332a1b6d5da73ea85c14d623e6b29f)
- [Tag Lists](https://gist.github.com/curiositry/02b9c36234d05a06c574691f2c6ff0e0)

## Maintenance
Maintained by **[Alex](https://github.com/klppl)**. Open an issue on GitHub for support.
