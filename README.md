# Future Ready AI — Website Framework

A static, framework-free website for **Future Ready AI**, a K-12 AI literacy and education brand founded by Andrea Davis-Baptiste. Working title: *Future Ready AI*. Tagline: *Learn. Create. Lead.*

Built with semantic HTML5, modern CSS, and vanilla JavaScript only — no React, Vue, Bootstrap, or build tools required. Ready to publish directly through GitHub Pages.

---

## 1. File Structure

```
future-ready-ai/
├── index.html          Home page
├── about.html           Mission, vision, founder, responsible AI approach
├── curriculum.html      Grade bands, pillars, sample lesson, sample request form
├── educators.html       PD offerings, workshop formats, FAQ, PD inquiry form
├── schools.html         Partnership areas, implementation pathway, consultation form
├── resources.html       Filterable resource library (placeholder cards)
├── contact.html         Full contact/inquiry form
├── styles.css           Shared design system (colors, type, components)
├── script.js            Shared interactivity (nav, accordion, filters, forms, video)
├── README.md             This file
└── assets/
    ├── images/          Photos, icons, favicon, social-share image
    └── video/           Hero video and caption files
```

Every page shares the same header, footer, and `styles.css`/`script.js` includes, so edits to those two files apply site-wide.

## 2. Previewing the Site Locally

No build step is required. Two easy options:

**Option A — Open directly**
Double-click `index.html` to open it in your browser. (Some browsers restrict local video/form behavior when opened this way — Option B is more reliable.)

**Option B — Local server (recommended)**
From inside the `future-ready-ai` folder, run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## 3. Adding the Hero Video

1. Add your video file to `assets/video/` (e.g. `assets/video/curriculum-hero.mp4`).
2. In `index.html`, find the `<video data-hero-video>` element and update the `<source src="...">` path to match your filename.
3. Add a captions file (`.vtt`) to the same folder and update the `<track>` element's `src` — captions are required for accessibility.
4. Add a poster image (a still frame shown before playback) and update the `poster="..."` attribute.

## 4. Replacing Images

Search each HTML file for `[ADD ...]` comments and placeholder blocks (dashed borders, e.g. `founder__photo`, `resource-card__thumb`). Replace the placeholder `<div>` with an `<img>` tag pointing to your file in `assets/images/`, and always include descriptive `alt` text.

Example:
```html
<!-- Before -->
<div class="founder__photo" aria-hidden="true">[ADD FOUNDER PHOTOGRAPH]</div>

<!-- After -->
<img class="founder__photo" src="assets/images/andrea-davis-baptiste.jpg" alt="Andrea Davis-Baptiste, founder of Future Ready AI" />
```

## 5. Editing Text and Colors

- **Text:** Edit directly inside each `.html` file. Content is written in plain HTML — no templating syntax to learn.
- **Colors:** All brand colors are defined once, at the top of `styles.css`, inside `:root { ... }`. Change a value there and it updates everywhere that color is used.
- **Fonts:** Loaded via Google Fonts in each page's `<head>`. Swap the `<link>` tags and the `--font-heading` / `--font-body` variables in `styles.css` to change typefaces.

## 6. Publishing Through GitHub Pages

1. Create a new GitHub repository (or use an existing one).
2. Push this folder's contents to the repository's root (or to a `/docs` folder — your choice).
3. In the repository, go to **Settings → Pages**.
4. Under "Build and deployment," choose **Deploy from a branch**, select your branch, and the root or `/docs` folder.
5. Save. GitHub will publish the site at `https://<your-username>.github.io/<repo-name>/` within a few minutes.

## 7. Adding a Custom Domain Later

Once a final brand name and domain are chosen:

1. Purchase the domain through any registrar.
2. In the repository, go to **Settings → Pages → Custom domain** and enter your domain.
3. Add a `CNAME` file (GitHub creates this automatically when you save the custom domain in settings).
4. At your domain registrar, add the DNS records GitHub Pages provides (typically an `A` record set or a `CNAME` record).
5. Enable "Enforce HTTPS" once the certificate is issued.

## 8. Connecting a Form Service Later

All forms on this site currently run in **demonstration mode**: submitting shows a confirmation message but does not send data anywhere. Search `script.js` for `[CONNECT FORM SERVICE]` to find the relevant code.

To connect a real service (e.g. Formspree, Netlify Forms, or a custom backend):

1. Sign up for a form service and get your endpoint URL or form ID.
2. Update each `<form data-demo-form ...>` element's `action` attribute (or update the `fetch()` call in `script.js`, depending on the service's integration method).
3. Remove or adjust the demonstration message logic in `initDemoForms()` inside `script.js`.

## Outstanding Placeholders

Search the codebase for these markers before launch:

- `[ADD FINAL BRAND NAME]`
- `[ADD LOGO]`
- `[ADD VIDEO FILE]`
- `[ADD CURRICULUM SAMPLE]`
- `[ADD CONTACT EMAIL]`
- `[ADD TESTIMONIAL AFTER APPROVAL]`
- `[VERIFY STANDARDS ALIGNMENT]`
- `[CONNECT FORM SERVICE]`
- `[ADD FOUNDER PHOTOGRAPH]`
- `[ADD SOCIAL LINK]`, `[ADD PRIVACY POLICY PAGE]`, `[ADD TERMS PAGE]`

No client names, testimonials, partnerships, statistics, or standards alignments have been invented — all of these are left as clearly labeled placeholders pending real content.
