# 🚀 Personal Portfolio Website

A modern, responsive portfolio website built with Next.js 15.4.5, React 19, TypeScript 5, and Tailwind CSS 4. Features an AI-powered chat assistant using Groq/LLaMA models, MDX-powered content management, beautiful animations with Framer Motion, and a custom Gruvbox-inspired theme system.

![Portfolio Preview](https://img.shields.io/badge/Next.js-15.4.5-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-38B2AC?style=for-the-badge&logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-24.2.0-339933?style=for-the-badge&logo=node.js)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

### 🎨 **Modern Design**

- Fully responsive design that works on all devices
- Dark/Light mode support with system preference detection and custom Gruvbox color palette
- Smooth animations using Framer Motion 12.23.11
- Beautiful UI components from shadcn/ui (New York style)
- Consistent design system with custom Gruvbox-inspired theme
- Tailwind CSS 4.x with @theme inline configuration

### 📝 **Content Management**

- **MDX-powered** blog, projects, and research sections
- Frontmatter metadata for SEO and organization
- Syntax highlighting for code blocks
- Reading time estimation
- Tag-based categorization

### 🤖 **AI Chat Assistant**

- Interactive chat interface with intelligent model selection
- Powered by Groq with multiple LLaMA models:
  - LLaMA 3.1 8B Instant for simple queries
  - LLaMA 3.3 70B Versatile for technical questions
  - LLaMA Guard 4 12B for general interactions
- Context-aware responses about portfolio content
- Streaming responses for better UX with Vercel AI SDK
- Clean, modern chat UI with message history

### 🎯 **Key Sections**

- **Home**: Hero section with animated text and preview of featured content
- **Projects**: Showcase of development work with live demos and GitHub links
- **Research**: Academic papers and publications with PDF links
- **Blog**: Technical articles and tutorials
- **About**: Professional background and skills
- **Contact**: Beautiful contact form with email integration
- **Chat**: AI assistant for portfolio navigation

### 🛠️ **Technical Features**

- Static Site Generation (SSG) for optimal performance
- Image optimization with Next.js Image component
- SEO optimized with meta tags and Open Graph
- Type-safe development with TypeScript
- API routes for contact form and chat functionality
- Responsive navigation with mobile menu

## 🚀 Quick Start

### Prerequisites

- **Node.js 24.2.0+** (latest LTS recommended)
- **pnpm 10.14.0+** (primary package manager)
- **Git**

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/sersergious-website.git
cd sersergious-website
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Groq API Key for AI chat functionality
GROQ_API_KEY=gsk_...

# Resend API Key for contact form emails
RESEND_API_KEY=re_...

# Optional: Vercel Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=...
```

4. **Run the development server**

```bash
pnpm dev
```

The development server uses Turbopack for faster builds and hot reloading.

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

## 🎨 Customization

### Adding Content

#### Blog Posts

Create a new MDX file in `content/blog/`:

```mdx
---
title: 'Your Blog Post Title'
description: 'A brief description'
date: '2024-01-01'
tags: ['nextjs', 'react', 'web-dev']
featured: true
---

Your content here...
```

#### Projects

Create a new MDX file in `content/projects/`:

```mdx
---
title: 'Project Name'
description: 'Project description'
date: '2024-01-01'
tags: ['typescript', 'react', 'tailwind']
github: 'https://github.com/...'
demo: 'https://...'
featured: true
---

Project details...
```

### Styling

The portfolio uses Tailwind CSS 4.x with a custom Gruvbox-inspired theme:

- Custom Gruvbox color palette with light/dark mode support
- Tailwind CSS 4.x with `@theme inline` configuration in `src/styles/globals.css`
- shadcn/ui components (New York style) - customize in `components/ui/`
- Math rendering with KaTeX and code highlighting with highlight.js

### Theme Colors

The theme uses a complete Gruvbox color system defined in `src/styles/globals.css`:

```css
:root {
  /* Gruvbox Color Palette */
  --gb-dark: #282828;
  --gb-light: #fbf1c7;
  --gb-blue: #83a598;
  --gb-aqua: #8ec07c;
  --gb-red: #fb4934;
  --gb-green: #b8bb26;
  /* ... complete Gruvbox palette */
}
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Other Platforms

- **Netlify**: Connect GitHub repo and add build settings
- **Railway**: Use Railway CLI or GitHub integration
- **Cloudflare Pages**: Connect GitHub and configure build

## 🔧 Development

### Available Scripts

```bash
# Development server (with Turbopack)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

### Tech Stack

- **Framework**: [Next.js 15.4.5](https://nextjs.org/) with App Router and Turbopack
- **Runtime**: [React 19.1.0](https://react.dev/) with Server Components
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4.1.11](https://tailwindcss.com/) with custom Gruvbox theme
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (New York style)
- **Animations**: [Framer Motion 12.23.11](https://www.framer.com/motion/)
- **Content**: [MDX](https://mdxjs.com/) with [next-mdx-remote](https://github.com/hashicorp/next-mdx-remote)
- **AI Chat**: [Vercel AI SDK](https://sdk.vercel.ai/) with [Groq](https://groq.com/)
- **Email**: [Resend](https://resend.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Math**: [KaTeX](https://katex.org/) for LaTeX rendering
- **Code Highlighting**: [highlight.js](https://highlightjs.org/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 📝 Environment Variables

| Variable                          | Description               | Required |
| --------------------------------- | ------------------------- | -------- |
| `GROQ_API_KEY`                    | Groq API key for AI chat  | Yes      |
| `RESEND_API_KEY`                  | Resend API key for emails | Yes      |
| `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` | Vercel Analytics          | No       |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Vercel](https://vercel.com) for hosting and deployment
- [Groq](https://groq.com) for fast AI inference
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Next.js](https://nextjs.org) team for the amazing framework
- [Gruvbox](https://github.com/morhetz/gruvbox) for the inspiring color palette

## 📧 Contact

Serhii Kuzmin - [sergeykuzmin495@gmail.com](mailto:sergeykuzmin495@gmail.com)

Project Link: [https://github.com/yourusername/sersergious-website](https://github.com/yourusername/sersergious-website)

---

Built with ❤️ using Next.js and TypeScript
