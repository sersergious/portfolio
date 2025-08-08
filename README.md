# 🚀 Personal Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features an AI-powered chat assistant, MDX-powered content management, and beautiful animations.

![Portfolio Preview](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

### 🎨 **Modern Design**
- Fully responsive design that works on all devices
- Dark/Light mode support with system preference detection
- Smooth animations using Framer Motion
- Beautiful UI components from shadcn/ui
- Consistent design system with rounded corners and glass morphism effects

### 📝 **Content Management**
- **MDX-powered** blog, projects, and research sections
- Frontmatter metadata for SEO and organization
- Syntax highlighting for code blocks
- Reading time estimation
- Tag-based categorization

### 🤖 **AI Chat Assistant**
- Interactive Claude-inspired chat interface
- Powered by OpenAI GPT-4
- Context-aware responses about portfolio content
- Streaming responses for better UX
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

- Node.js 18+
- npm or pnpm package manager
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. **Install dependencies**
```bash
npm install
# or
pnpm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# OpenAI API Key for chat functionality
OPENAI_API_KEY=sk-...

# Resend API Key for contact form
RESEND_API_KEY=re_...

# Optional: Vercel Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=...
```

4. **Run the development server**
```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.


## 🎨 Customization

### Adding Content

#### Blog Posts
Create a new MDX file in `content/blog/`:

```mdx
---
title: "Your Blog Post Title"
description: "A brief description"
date: "2024-01-01"
tags: ["nextjs", "react", "web-dev"]
featured: true
---

Your content here...
```

#### Projects
Create a new MDX file in `content/projects/`:

```mdx
---
title: "Project Name"
description: "Project description"
date: "2024-01-01"
tags: ["typescript", "react", "tailwind"]
github: "https://github.com/..."
demo: "https://..."
featured: true
---

Project details...
```

### Styling

The portfolio uses Tailwind CSS with a custom configuration:

- Edit `tailwind.config.ts` for theme customization
- Modify CSS variables in `globals.css` for colors
- Components use shadcn/ui - customize in `components/ui/`

### Theme Colors

Update CSS variables in `styles/globals.css`:

```css
:root {
  --primary: 220 90% 56%;
  --accent: 160 84% 39%;
  /* ... other variables */
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
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Type check
npm run type-check
```

### Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Content**: [MDX](https://mdxjs.com/)
- **Chat**: [Vercel AI SDK](https://sdk.vercel.ai/)
- **Email**: [Resend](https://resend.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for chat | Yes |
| `RESEND_API_KEY` | Resend API key for emails | Yes |
| `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` | Vercel Analytics | No |

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
- [OpenAI](https://openai.com) for GPT API
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Next.js](https://nextjs.org) team for the amazing framework

## 📧 Contact

Your Name - [your.email@example.com](mailto:your.email@example.com)

Project Link: [https://github.com/yourusername/portfolio](https://github.com/yourusername/portfolio)

---

Built with ❤️ using Next.js and TypeScript
