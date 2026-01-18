# Glid Landing Page

Marketing landing page for Glid - a "Tinder for Sports" platform.

## Tech Stack

- Pure HTML/CSS (no build tools)
- GitHub Pages hosting
- GitHub Actions for CI/CD

## Local Development

```bash
# Simple HTTP server
python -m http.server 8000

# Or use any static server
npx serve
```

Then open http://localhost:8000

## Deployment

Automatically deploys to GitHub Pages on push to `main` branch.

### Manual Setup

1. Go to repository Settings > Pages
2. Source: "GitHub Actions"
3. Push to main branch

## Structure

```
├── index.html      # Main landing page
├── styles.css      # Styling
├── favicon.svg     # Site icon
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Pages deployment
```

## Customization

- **Colors**: Edit CSS variables in `:root` at top of `styles.css`
- **Content**: Edit `index.html`
- **Stats**: Update the hero stats numbers
- **App Store Links**: Replace `#` with actual store links

## License

Proprietary - All rights reserved
