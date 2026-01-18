# MathLab Landing Page

A stunning, modern landing page for **MathLab** - an interactive mathematics platform. This page serves as a hub for multiple mathematical tools.

## Features

### Visual Design
- **Dark Theme**: Deep blue/purple gradient background with glowing aesthetics
- **Matrix Rain Animation**: Animated canvas background with falling mathematical symbols
- **Glassmorphism Cards**: Modern frosted glass effect on tool cards
- **Floating Math Symbols**: Animated mathematical symbols (Σ, ∫, λ, π, etc.) floating in the background
- **Smooth Animations**: Fade-in, hover effects, and scroll-triggered animations

### Interactive Elements
- **Hero Section**: Large title with gradient text and prominent CTA button
- **Tools Grid**: Showcase of available and coming-soon mathematical tools
- **Smooth Scrolling**: Anchor links with smooth scroll behavior
- **Parallax Effects**: Subtle parallax on hero section
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop

## Structure

```
landing/
├── index.html      # Main HTML structure
├── style.css       # Dark theme, glassmorphism, animations
├── script.js       # Matrix rain, scroll effects, interactions
└── README.md       # This file
```

## Usage

### Standalone Usage
Simply open `index.html` in a browser for a standalone page.

### Integration with Flask App
To integrate with your Flask LDU app:

1. **Option 1: Add route in Flask**
   ```python
   @app.route('/')
   def landing():
       return render_template('landing/index.html')
   ```

2. **Option 2: Serve static HTML**
   - Place files in Flask's `static` folder
   - Access via `/static/landing/index.html`

3. **LDU Tool Link**
   The "Open LDU Decomposition Tool" button links to `/ldu` - ensure this route exists in your Flask app.

## Design Highlights

### Color Palette
- **Primary**: `#7c3aed` (Purple)
- **Secondary**: `#06b6d4` (Cyan)
- **Accent**: `#ec4899` (Pink)
- **Background**: `#0a0e27` (Dark blue)

### Typography
- Modern sans-serif stack (Segoe UI, SF Pro, system fonts)
- Responsive font sizes using `clamp()`
- Gradient text effects on titles

### Animations
- Matrix rain using HTML5 Canvas
- Floating math symbols with CSS animations
- Card hover effects with transform and glow
- Scroll-triggered fade-in animations

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox support required
- Canvas API for matrix rain effect

## Performance

- Pure CSS/Canvas animations (no heavy libraries)
- Optimized for 60fps animations
- Respects `prefers-reduced-motion` for accessibility
- Lazy loading for scroll animations

## Customization

### Adding New Tools
To add a new tool card, copy the structure from an existing `.tool-card` and update:
- `data-tool` attribute
- Icon SVG
- Title and description
- Link/status

### Changing Colors
Update CSS variables in `:root` selector in `style.css`:
```css
:root {
    --primary: #7c3aed;
    --secondary: #06b6d4;
    /* ... */
}
```

## Accessibility

- Semantic HTML structure
- Keyboard navigation support
- Respects `prefers-reduced-motion`
- High contrast text

## License

This landing page is part of the MathLab project and follows the same license terms.
