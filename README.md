# Estate Planning Decision Helper

A polished, mobile-first static website that helps U.S. adults and families understand whether a will, a trust, both, or an estate-planning attorney consultation may be a useful educational starting point.

> **Important:** This project provides general educational information only. It is not legal advice, does not create an attorney-client relationship, does not replace counsel from a licensed attorney, and estate-planning laws vary by state.

## Project overview

This site is a client-side decision-support experience for estate-planning education. It asks one question at a time, explains the logic in plain English, and generates a print-friendly and downloadable PDF summary users can bring to an attorney.

The site uses:

- Plain HTML
- Plain CSS
- Vanilla JavaScript
- No backend
- No database
- No tracking
- No personal data storage
- Client-side quiz and PDF generation only

## File structure

```text
estate-planning-decision-helper/
├── index.html      # Main static page and semantic content sections
├── styles.css      # Visual system, responsive layout, accessibility states, print styles
├── script.js       # Dynamic quiz rendering, scoring, result generation, PDF export, and interactions
├── README.md       # Setup, deployment, and customization instructions
└── .nojekyll       # Keeps GitHub Pages from running Jekyll processing
```

## How to run locally

No build step is required.

1. Download or clone this repository.
2. Open `index.html` directly in a browser.
3. Complete the quiz and verify the result summary and PDF download.

For a local server, you can also run:

```bash
python3 -m http.server 8000
```

Then visit:

```text
http://localhost:8000
```

## How to deploy to GitHub Pages

1. Push the repository to GitHub.
2. Go to the repository on GitHub.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/root` folder.
6. Save the settings.
7. Visit the GitHub Pages URL shown by GitHub after deployment.

The site is static and GitHub Pages-ready because it does not require a server, package manager, framework, or build pipeline.

## How to customize

### Branding

Edit these areas in `index.html`:

- `<title>`
- Header brand text
- Hero headline and subheadline
- Footer business name
- Consultation CTA link

The placeholder consultation link is currently:

```html
<a class="btn btn-gold" href="mailto:hello@example.com?subject=Estate%20Planning%20Consultation%20Request">Book a consultation</a>
```

Replace it with a scheduling link, contact page, or firm email address.

### Colors and visual system

Edit CSS variables at the top of `styles.css`:

```css
:root {
  --color-navy-950: #071626;
  --color-gold-500: #b99148;
  --color-green-600: #3f705f;
  --color-ivory-50: #fffaf0;
}
```

You can also adjust spacing, border radii, shadows, and typography from the same variable block.

### Questions

Questions are defined in `script.js` inside the `questions` array. Each question has:

- `id`
- `text`
- `hint`
- scoring weights for `yes`, `no`, and `unsure`

Example:

```js
{
  id: "realEstate",
  text: "Do you own a home or other real estate?",
  hint: "Real estate is one of the most common reasons people explore trust-based planning or probate-avoidance strategies.",
  yes: { trust: 3, both: 1 },
  no: { simple: 1 },
  unsure: { trust: 1, attorney: 1 }
}
```

### Result logic

The scoring logic lives in `calculateOutcome()` in `script.js`.

The site maps answers to four educational outcomes:

- **Outcome A:** A will may be a good starting point
- **Outcome B:** You may want to consider a trust
- **Outcome C:** You may need both a will and a trust
- **Outcome D:** Talk with an estate-planning attorney

You can adjust thresholds, direct attorney-review triggers, and compound complexity rules inside that function.

### Result copy

Result explanations are defined in `outcomeContent` in `script.js`. Each outcome includes:

- Recommendation headline
- Confidence label
- Summary
- What this usually means
- Questions to ask an attorney
- Next steps

### PDF summary

The **Download PDF summary** button generates a high-quality vector/text PDF directly in the browser using vanilla JavaScript. It does not send answers to a server and does not require a PDF library or CDN.

To customize PDF text or layout, edit these functions in `script.js`:

- `downloadPdfSummary()`
- `createSummaryPdf()`
- `createPdfWriter()`

### CTA links

The consultation CTA is rendered in `renderResult()` in `script.js`.

Search for:

```js
Book a consultation
```

Then update the `href` value to your preferred destination.

## Legal disclaimer reminder

Keep the legal disclaimer visible and conservative. This project should not claim to provide legal advice or tell users exactly what they need.

Recommended language to preserve:

- “Educational only”
- “Not legal advice”
- “No attorney-client relationship”
- “Does not replace legal counsel”
- “Laws vary by state”
- “Based on your answers, this may be a useful starting point”

## Suggested future improvements

- Add state-specific educational pages reviewed by licensed counsel.
- Add optional firm branding to the browser-generated PDF summary.
- Add a firm-branded consultation form link.
- Add Spanish-language content.
- Add more detailed educational content about powers of attorney, health care directives, beneficiary designations, and trust funding.
- Add automated accessibility testing in CI.
- Add unit tests for scoring thresholds if the project grows.

## Definition-of-done checklist

- Opens locally with `index.html`
- Quiz works end-to-end
- Back, next, restart, validation, and PDF download actions work
- All four result types are reachable through different answer paths
- Responsive layout is designed for mobile, tablet, and desktop
- No backend, database, tracking, or data storage
- GitHub Pages deployment instructions are included
