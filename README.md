# Karan's Portfolio - File Organization

## 📁 Project Structure

```
Karan's_Portfolio/
├── assets/                    # All asset files organized by type
│   ├── css/                   # Stylesheet files
│   │   └── common.css        # Common design system and base styles
│   ├── js/                    # JavaScript files
│   ├── images/                # Images and photos
│   │   └── profile.jpg       # Profile photo
│   ├── backgrounds/           # Background images (if needed)
│   ├── logos/                 # Logo files (if needed)
│   └── documents/             # Documents like resume PDF
├── index.html                 # Main portfolio page (single-page application)
├── style.css                  # Main stylesheet
├── script.js                  # Main JavaScript file
└── README.md                  # This file
```

## 🎯 Portfolio Sections

All sections are contained in `index.html` as a **single-page application (SPA)**:

### 1. **Home Section** (`#home`)

- Hero section with introduction
- Typing animation with role titles
- Call-to-action buttons
- Social media links
- Located at: Lines 66-164 in `index.html`

### 2. **About Section** (`#about`)

- Personal introduction
- Profile image
- Animated statistics (CGPA, Projects, Skills)
- Located at: Lines 166-216 in `index.html`

### 3. **Education Section** (`#education`)

- Timeline of educational qualifications
- Diploma and Class X details
- Located at: Lines 218-254 in `index.html`

### 4. **Skills Section** (`#skills`)

- Programming languages
- Data analysis & ML tools
- Data visualization tools
- Development tools & systems
- Core computer science concepts
- Located at: Lines 256-359 in `index.html`

### 5. **Projects Section** (`#projects`)

- Featured project showcases
- Self-Driving Toy Car
- Data Analytics Dashboard  
- Machine Learning Model
- Located at: Lines 361-482 in `index.html`

### 6. **Achievements Section** (`#achievements`)

- Key milestones and certifications
- DSA problem solving
- Technical certifications
- Academic excellence
- Located at: Lines 484-534 in `index.html`

### 7. **Contact Section** (`#contact`)

- Multiple contact methods
- Email, Phone, WhatsApp
- GitHub, LinkedIn, X (Twitter), Telegram
- Location information
- Located at: Lines 536-665 in `index.html`

## 📂 Asset Organization

### Images (`assets/images/`)

- `profile.jpg` - Your profile photo used in:
  - Navigation bar logo
  - About section

### Documents (`assets/documents/`)

- Store your resume PDF here
- Add download link in the portfolio as needed

### Backgrounds (`assets/backgrounds/`)

- Store background images or patterns
- Currently using CSS gradients

### Logos (`assets/logos/`)

- Store company/project logos if needed

## 🎨 Styling

The portfolio uses a **Liquid Glass Design System** with:

- Glass morphism effects
- Dark/Light theme toggle
- Smooth animations
- Responsive design
- iOS-26 inspired aesthetics

### CSS Files

- `style.css` - Complete portfolio styles (main file)
- `assets/css/common.css` - Reusable design system and base styles

## 🚀 Running the Portfolio

1. **Local Development:**
   - Simply open `index.html` in a web browser
   - All sections work without a server

2. **With Live Server (VS Code):**
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"
   - Automatic reload on file changes

3. **Deploying:**
   - Upload all files to GitHub Pages, Netlify, or Vercel
   - Configure to serve `index.html` as the entry point

## 🔧 Adding New Content

### Adding a Resume PDF

1. Place your resume PDF in `assets/documents/resume.pdf`
2. Add a download button in the hero section or navigation:

```html
<a href="assets/documents/resume.pdf" download class="btn btn-outline">
    <span>Download Resume</span>
</a>
```

### Adding Project Images

1. Save project screenshots in `assets/images/`
2. Update project cards in `index.html`:

```html
<div class="project-image">
    <img src="assets/images/project-name.png" alt="Project Name">
</div>
```

### Adding a Background Image

1. Save image in `assets/backgrounds/`
2. Update CSS in `style.css`:

```css
.hero-section {
    background-image: url('../assets/backgrounds/hero-bg.jpg');
}
```

## 📱 Responsive Design

The portfolio is fully responsive and works on:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🌓 Theme Support

- **Default:** Dark mode
- **Toggle:** Click the theme toggle button in navigation
- **Persistent:** Theme preference saved in localStorage

## ⚡ Performance

- Optimized animations
- Lazy loading for images (can be added)
- Minimal external dependencies
- Fast load times

## 📞 Contact

For updates or questions about this portfolio:

- **Email:** <karankr9237@gmail.com>
- **GitHub:** [Karan-Kumar-75](https://github.com/Karan-Kumar-75)
- **LinkedIn:** [karankumar75](https://www.linkedin.com/in/karankumar75/)

---

**Built with 💙 using HTML, CSS, and JavaScript**
