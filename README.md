# Satyam Bhagat - Portfolio

A modern, minimalist portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern, minimalist design with black theme
- 📱 Fully responsive
- ⚡ Built with Next.js 16 and TypeScript
- 🎭 Smooth animations with Framer Motion
- 📊 GitHub projects integration
- 🔗 Social links and contact information

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter, Playfair Display

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/satyam2006-cmd/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
Portfolio/
├── app/                    # Next.js app directory
│   ├── about/              # About page
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx            # Home page
├── components/              # React components
│   ├── hero.tsx            # Hero section
│   ├── projects-list.tsx    # Projects display
│   ├── education.tsx        # Education section
│   ├── experience-software.tsx # Experience & tools
│   ├── education-skills.tsx # Skills section
│   ├── footer-new.tsx       # Footer component
│   └── ...                # Other components
├── lib/                    # Utilities
│   └── github.ts           # GitHub API integration
└── public/                 # Static assets
```

## Customization

### Updating GitHub Projects

Edit `lib/github.ts` to:
- Change GitHub username
- Update demo URLs for projects
- Modify project sorting logic

### Personal Information

Update these files to personalize:
- `app/layout.tsx` - Metadata and title
- `app/about/page.tsx` - About page content
- `components/footer-new.tsx` - Footer information

### Styling

- Theme colors are defined in `app/globals.css`
- Component-specific styles in respective component files
- Uses Tailwind CSS utility classes

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect your GitHub repository to Vercel for automatic deployments
```

### Netlify

```bash
# Build the project
npm run build

# Deploy the .next folder to Netlify
```

## Environment Variables

No environment variables required for basic functionality.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

- **Portfolio**: https://your-portfolio-url.com
- **GitHub**: https://github.com/satyam2006-cmd
- **Email**: satyambhagat200623@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/satyam-bhagat2006/

---

Made with ❤️ by Satyam Bhagat
