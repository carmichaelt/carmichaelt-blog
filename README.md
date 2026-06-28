# Carmichaelt Blog

A modern personal blog built with **Partial Pre-Rendering (PPR)** using Next.js 16, featuring real-time content management and a rich text editing experience.

## 🚀 Key Features

- **Partial Pre-Rendering (PPR)** - Leverages Next.js 16's PPR for optimal performance
- **Real-time Database** - Powered by Convex for instant data synchronization
- **Rich Text Editor** - TipTap-based editor with comprehensive formatting options
- **AI Content Generation** - Generate blog content from prompts using OpenAI via Vercel AI SDK
- **Authentication** - Secure user management with Clerk
- **Modern UI** - Built with Radix UI primitives and Tailwind CSS
- **TypeScript** - Full type safety throughout the application
- **Responsive Design** - Mobile-first approach with modern UX patterns

## 🛠 Tech Stack

### Core Framework

- **Next.js 16** - React framework with App Router and Turbopack
- **React 19** - Latest React features and concurrent rendering
- **TypeScript** - Type-safe development

### Database & Backend

- **Convex** - Real-time backend-as-a-service
- **Clerk** - Authentication and user management
- **Vercel AI SDK** - AI-powered content generation
- **OpenAI** - GPT-4 integration for blog suggestions

### UI & Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Modern icon library
- **Shadcn/ui** - Pre-built component library

### Content Management

- **TipTap** - Extensible rich text editor

### Development Tools

- **Turbopack** - Default bundler in Next.js 16 (used in dev and build scripts)
- **ESLint** - Code linting and formatting
- **Bun** - Fast JavaScript runtime and package manager

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
└── proxy.ts                   # Next.js proxy (network boundary)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Bun (recommended) or pnpm/npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/carmichaelt-blog.git
cd carmichaelt-blog
```

2. Install dependencies:

```bash
bun install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Configure the following environment variables:

**Convex:**
- `NEXT_PUBLIC_CONVEX_URL` - Your Convex deployment URL
- `CONVEX_DEPLOY_KEY` - Convex deployment key

**Clerk Authentication:**
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `CLERK_SECRET_KEY` - Clerk secret key
- `CLERK_WEBHOOK_SECRET` - Clerk webhook secret for user sync

**OpenAI (for AI Content Generation):**
- `OPENAI_API_KEY` - Your OpenAI API key (get one at https://platform.openai.com/api-keys)

4. Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔧 Configuration

### Partial Pre-Rendering (PPR)

The application enables PPR on individual routes by exporting `experimental_ppr` from page files:

```typescript
export const experimental_ppr = true;
```

This pre-renders a static shell for each route while streaming dynamic content through Suspense boundaries, combining fast initial loads with real-time Convex data.

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
- **AI Content Generation** - Generate blog content from short prompts

### AI-Powered Content Generation

The editor includes an AI assistant that can:

1. **Generate Full Blog Posts** - Provide a topic or prompt, and the AI will create complete blog content
2. **Customize Tone** - Choose from professional, casual, technical, or conversational tones
3. **Adjust Length** - Select short (~300 words), medium (~800 words), or long (~1500 words) posts
4. **Instant Integration** - Generated content is automatically formatted and inserted into the editor

To use the AI feature:
1. Click the "AI Suggest" button in the editor toolbar
2. Enter your topic or prompt
3. Select tone and length preferences
4. Click "Generate Content"

The AI uses OpenAI's GPT-4 model via Convex actions for secure, server-side processing.

### Post Creation

1. Navigate to `/create-post`
2. Sign in with Clerk authentication
3. Fill in post metadata (title, excerpt, cover image)
4. Use the rich text editor for content creation or click "AI Suggest" to generate content
5. Preview and publish your post

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

For questions or suggestions, please find me on [LinkedIn](https://www.linkedin.com/in/tomcarmichael/)
