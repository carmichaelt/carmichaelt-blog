# Carmichaelt Blog

A modern personal blog built with **Partial Pre-Rendering (PPR)** using Next.js 15, featuring real-time content management and a rich text editing experience.

## 🚀 Key Features

- **Partial Pre-Rendering (PPR)** - Leverages Next.js 15's experimental PPR for optimal performance
- **Real-time Database** - Powered by Convex for instant data synchronization
- **Rich Text Editor** - TipTap-based editor with comprehensive formatting options
- **Authentication** - Secure user management with Clerk
- **Modern UI** - Built with Radix UI primitives and Tailwind CSS
- **TypeScript** - Full type safety throughout the application
- **Responsive Design** - Mobile-first approach with modern UX patterns

## 🛠 Tech Stack

### Core Framework
- **Next.js 15** - React framework with App Router
![image]({https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white})
- **React 19** - Latest React features and concurrent rendering
- **TypeScript** - Type-safe development

### Database & Backend
- **Convex** - Real-time backend-as-a-service
- **Clerk** - Authentication and user management

### UI & Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Modern icon library
- **Shadcn/ui** - Pre-built component library

### Content Management
- **TipTap** - Extensible rich text editor

### Development Tools
- **Turbopack** - Next-generation bundler
- **ESLint** - Code linting and formatting
- **pnpm** - Fast, disk space efficient package manager

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── _components/             # Shared components
│   │   ├── navbar.tsx          # Navigation component
│   │   ├── footer.tsx          # Site footer
│   │   ├── post-preview.tsx    # Post preview cards
│   │   ├── rich-text-renderer.tsx # Content rendering
│   │   └── ...
│   ├── create-post/            # Post creation interface
│   │   ├── _components/
│   │   │   ├── create-post-form.tsx
│   │   │   └── rich-text-editor.tsx
│   │   └── page.tsx
│   ├── posts/[post_title]/     # Dynamic post pages
│   │   ├── _components/
│   │   │   └── page-content.tsx
│   │   ├── loading.tsx         # Loading UI
│   │   ├── error.tsx           # Error boundary
│   │   └── page.tsx
│   └── layout.tsx              # Root layout
├── components/
│   ├── providers/              # Context providers
│   │   └── convex-provider-with-clerk.tsx
│   └── ui/                     # Reusable UI components
├── interfaces/                 # TypeScript type definitions
│   ├── post.ts
│   └── rich-text.ts
├── lib/                        # Utility functions
│   ├── api.ts                 # API helpers
│   ├── constants.ts           # App constants
│   ├── markdownToHtml.ts     # Markdown processing
│   └── utils.ts              # General utilities
└── middleware.ts              # Next.js middleware
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/carmichaelt-blog.git
cd carmichaelt-blog
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Configure the following environment variables:
- `NEXT_PUBLIC_CONVEX_DEPLOYMENT` - Your Convex deployment URL
- `CONVEX_DEPLOY_KEY` - Convex deployment key
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `CLERK_SECRET_KEY` - Clerk secret key

4. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔧 Configuration

### Partial Pre-Rendering (PPR)
The application uses Next.js 15's experimental PPR feature configured in `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  experimental: {
    ppr: 'incremental',
  },
};
```

This enables incremental static regeneration with dynamic content, providing the benefits of static generation while maintaining real-time capabilities.

### Database Schema
The Convex schema defines two main tables:
- **posts** - Blog posts with rich content, metadata, and author relationships
- **users** - User profiles with authentication and social information

## 📝 Content Management

### Rich Text Editor
The blog features a comprehensive TipTap-based editor with:
- Text formatting (bold, italic, headings)
- Lists and blockquotes
- Image and link insertion
- Undo/redo functionality
- Real-time preview

### Post Creation
1. Navigate to `/create-post`
2. Fill in post metadata (title, excerpt, cover image)
3. Use the rich text editor for content creation
4. Preview and publish your post

## 🚀 Deployment

The application is optimized for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in the Vercel dashboard
3. Deploy automatically on every push to main

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

For questions or suggestions, please open an issue or contact [tom_carmichael@outlook.com](mailto:tom_carmichael@outlook.com).

Find me on [LinkedIn](https://www.linkedin.com/in/tomcarmichael/)