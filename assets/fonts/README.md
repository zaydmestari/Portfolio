/* Custom Fonts Directory */

This folder is for storing custom font files (.ttf, .woff, .woff2, .otf, etc.)

## Adding Custom Fonts

### Step 1: Place font files here
Upload your font files (e.g., MyFont.woff2) to this folder

### Step 2: Define the font in CSS
Add to `assets/css/style.css`:

```css
@font-face {
  font-family: 'My Custom Font';
  src: url('../fonts/MyFont.woff2') format('woff2'),
       url('../fonts/MyFont.woff') format('woff'),
       url('../fonts/MyFont.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
```

### Step 3: Use the font
```css
body {
  font-family: 'My Custom Font', sans-serif;
}
```

## Recommended Font Formats

- `.woff2` - Modern, smallest file size (recommended)
- `.woff` - Good browser support
- `.ttf` - Fallback for older browsers

## Free Font Resources

- Google Fonts: https://fonts.google.com/
- Font Face: https://www.fontface.com/
- DaFont: https://www.dafont.com/
- Adobe Fonts: https://fonts.adobe.com/

## Performance Tips

1. Use `.woff2` format for better compression
2. Load only the font weights you need
3. Use `font-display: swap` for better performance
4. Consider using variable fonts (fewer files needed)

## Current Setup

The portfolio uses Google Fonts (Poppins) via CDN - no local fonts needed yet!

To add custom fonts, place them here and update the CSS accordingly.
