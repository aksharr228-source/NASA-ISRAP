# ISRAP — Research Project Website

A single-page static website for **ISRAP**, a NASA-affiliated research project at
The University of Texas at San Antonio (UTSA) that mounts air-quality sensors on
transit buses to map urban pollution.

Built with plain **HTML, CSS, and vanilla JavaScript** — no build tools, no
frameworks. It can be hosted on GitHub Pages or any static host by uploading the
files as-is.

---

## File structure

```
NASA ISRAP/
├── index.html          # All page content (each section clearly commented)
├── styles.css          # All styling (design tokens at the top)
├── script.js           # Nav toggle, scroll-reveal, lightbox, footer year
├── README.md           # This file
└── assets/
    └── images/         # Drop your real images here (see below)
```

The page currently uses remote placeholder images from `https://placehold.co`
so it works before you have any real assets. Swap them for local files whenever
you're ready.

---

## Previewing locally

Because everything is static, you can just **double-click `index.html`** to open
it in a browser.

For a more production-like preview (recommended, so relative paths behave), run a
tiny local server from this folder:

```bash
# Python 3
python -m http.server 8000
```

Then visit <http://localhost:8000> in your browser. Any other static server
(e.g. the VS Code "Live Server" extension) works too.

---

## How to replace the placeholder IMAGES

Every `<img>` currently points at a `https://placehold.co/...` URL. To use your
own images:

1. Put your image files in `assets/images/` (e.g. `hero.jpg`, `team-1.jpg`,
   `event-1.jpg`, `logo-org-one.png`).
2. In `index.html`, find the `<img>` you want to change and replace its `src`
   with the local path, e.g.:

   ```html
   <!-- before -->
   <img src="https://placehold.co/200x200/0C2340/FFFFFF?text=Photo" alt="Portrait of team member one" />

   <!-- after -->
   <img src="assets/images/team-1.jpg" alt="Dr. Jane Doe, Principal Investigator" />
   ```
3. Update the `alt` text to describe the real image (important for accessibility).

Tip: keep image dimensions close to the placeholder dimensions in the URL
(e.g. `200x200`, `600x450`) so the layout stays balanced.

---

## How to replace the TEXT

All copy is currently **lorem ipsum**, except structural labels (nav links,
section headings, button text, "LinkedIn", and the NASA/UTSA badges), which are
real.

Content is grouped by section in `index.html`, each marked with a banner comment:

```html
<!-- ============================================================
     5. TEAM MEMBERS  (#team)
     ============================================================ -->
```

To edit, open `index.html`, find the section, and replace the lorem ipsum text
in place. Common things to update:

- **Hero** (`#home`): tagline and intro paragraph.
- **Team** (`#team`): each card's name, role, bio, and the LinkedIn `href="#"`
  (replace `#` with the member's real LinkedIn URL).
- **Collaborations** (`#collaborations`): organization names and logos.
- **Events** (`#events`): image captions.

---

## Customizing colors / fonts

Open `styles.css` and edit the **design tokens** at the very top (the `:root`
block). For example, change `--orange` to adjust the accent color everywhere at
once. Fonts are loaded from Google Fonts in the `<head>` of `index.html`.

---

## Sections (in order)

1. **Hero / Landing** (`#home`)
2. **Student Highlights** (`#student-highlights`)
3. **Research Goals & Outcomes** (`#research`) — Hardware + Software cards
4. **Events & Activities** (`#events`) — gallery with lightbox
5. **Team Members** (`#team`) — 6 cards
6. **Collaborations** (`#collaborations`)

---

## Accessibility notes

- Keyboard-navigable nav and gallery (Tab / Enter / Esc).
- Visible focus outlines, alt text on every image, sufficient color contrast.
- Respects `prefers-reduced-motion` (animations are disabled for users who ask
  their OS to reduce motion).

© ISRAP · UTSA — in affiliation with NASA.
