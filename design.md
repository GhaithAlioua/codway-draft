# Design System - Codway IT Landing Page

## Design Philosophy

### Visual Language
Inspired by Lugano Living Lab's sophisticated, editorial-style design with:
- Clean, minimal aesthetic with purposeful white space
- High-contrast typography for excellent readability
- Subtle animations that enhance rather than distract
- Professional color palette reflecting tech innovation

### Color Palette
- **Primary**: Deep Blue (#1a365d) - Trust, technology, professionalism
- **Secondary**: Purple (#553c9a) - Innovation, creativity, forward-thinking  
- **Accent**: Light Blue (#3182ce) - Links, interactive elements
- **Neutral**: Gray (#718096) - Supporting text, borders
- **Background**: White (#ffffff) - Clean, professional base
- **Text**: Dark Gray (#2d3748) - High contrast, readable

### Typography
- **Display Font**: "Inter" - Modern, geometric sans-serif for headings
- **Body Font**: "Inter" - Consistent family for all text content
- **Hierarchy**: 
  - H1: 3.5rem (56px) - Hero headlines
  - H2: 2.5rem (40px) - Section headers
  - H3: 1.875rem (30px) - Subsections
  - Body: 1rem (16px) - Regular text
  - Small: 0.875rem (14px) - Captions, metadata

## Visual Effects & Styling

### Animation Library
- **GSAP**: Primary animation engine for smooth, performant animations
- **ScrollTrigger**: For scroll-based animations and reveals
- **SplitText**: For advanced text animation effects
- **Flip**: For layout transition animations

### Key Visual Effects
1. **Text Reveal Animations**: Staggered character/line reveals
2. **Parallax Scrolling**: Subtle background movement on scroll
3. **Hover Transformations**: 3D tilts, scale effects, color transitions
4. **Loading Animations**: Smooth preloader with progress indicators
5. **Scroll-triggered Counters**: Animated number counting
6. **Image Carousels**: Infinite scroll with smooth transitions

### Layout System
- **Grid-based**: 12-column responsive grid system
- **Breakpoints**: 
  - Mobile: 320px - 767px
  - Tablet: 768px - 1023px  
  - Desktop: 1024px+
- **Spacing**: 8px base unit system (8px, 16px, 24px, 32px, etc.)
- **Container**: Max-width 1200px with responsive padding

### Component Styling
- **Cards**: Subtle shadows, rounded corners (8px), hover elevations
- **Buttons**: Solid backgrounds with hover state animations
- **Forms**: Clean inputs with focus states and validation
- **Navigation**: Fixed header with backdrop blur effect

## Responsive Design

### Mobile-First Approach
- Base styles for mobile devices
- Progressive enhancement for larger screens
- Touch-friendly interactive elements (44px minimum)
- Optimized animations for mobile performance

### Breakpoint Strategy
- **Mobile**: Single column layout, stacked elements
- **Tablet**: Two-column layout, adapted navigation
- **Desktop**: Full multi-column layout with all features

### Performance Considerations
- Optimized images with WebP format
- Lazy loading for below-fold content
- Reduced motion for users with vestibular disorders
- Efficient CSS with minimal repaints

## Accessibility Standards

### WCAG 2.1 AA Compliance
- **Color Contrast**: Minimum 4.5:1 ratio for normal text
- **Focus Management**: Visible focus indicators for keyboard navigation
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Motion Sensitivity**: Respect prefers-reduced-motion settings

### Inclusive Design
- Keyboard navigation for all interactive elements
- Alternative text for all images
- Clear, descriptive link text
- Consistent navigation patterns

## Brand Integration

### Codway IT Branding
- Professional, trustworthy aesthetic
- Technology-forward visual language
- French market considerations (accents, cultural preferences)
- Corporate yet approachable tone

### Visual Consistency
- Consistent spacing and sizing throughout
- Unified animation timing and easing
- Cohesive color application
- Professional photography and iconography