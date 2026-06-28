"use client";

import { TechItem } from "./tech-item";

interface TechItem {
  name: string;
  icon: string;
  url: string;
  category:
    | "frontend"
    | "backend"
    | "database"
    | "tools"
    | "deployment"
    | "design";
  size: "small" | "medium" | "large" | "xlarge";
}

const techStack: TechItem[] = [
  // Frontend
  {
    name: "React",
    icon: "⚛️",
    url: "https://reactjs.org",
    category: "frontend",
    size: "small",
  },
  {
    name: "Next.js 16",
    icon: "▲",
    url: "https://nextjs.org",
    category: "frontend",
    size: "small",
  },
  {
    name: "TypeScript",
    icon: "🔷",
    url: "https://www.typescriptlang.org",
    category: "frontend",
    size: "small",
  },
  {
    name: "Tailwind CSS",
    icon: "🎨",
    url: "https://tailwindcss.com",
    category: "frontend",
    size: "small",
  },
  {
    name: "HTML5",
    icon: "🌐",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    category: "frontend",
    size: "small",
  },

  // Backend
  {
    name: "Node.js",
    icon: "🟢",
    url: "https://nodejs.org",
    category: "backend",
    size: "small",
  },
  {
    name: "REST API",
    icon: "🔗",
    url: "https://restfulapi.net",
    category: "backend",
    size: "small",
  },

  // Database
  {
    name: "PostgreSQL",
    icon: "🐘",
    url: "https://www.postgresql.org",
    category: "database",
    size: "small",
  },
  {
    name: "Redis",
    icon: "🔴",
    url: "https://redis.io",
    category: "database",
    size: "small",
  },
  {
    name: "Prisma",
    icon: "⚡",
    url: "https://www.prisma.io",
    category: "database",
    size: "small",
  },
  {
    name: "Convex",
    icon: "🔷",
    url: "https://convex.dev",
    category: "database",
    size: "small",
  },

  // Tools
  {
    name: "Git",
    icon: "📦",
    url: "https://git-scm.com",
    category: "tools",
    size: "small",
  },
  {
    name: "Docker",
    icon: "🐳",
    url: "https://www.docker.com",
    category: "tools",
    size: "small",
  },
  {
    name: "VS Code",
    icon: "💻",
    url: "https://code.visualstudio.com",
    category: "tools",
    size: "small",
  },
  {
    name: "Webpack",
    icon: "📦",
    url: "https://webpack.js.org",
    category: "tools",
    size: "small",
  },
  {
    name: "Vite",
    icon: "⚡",
    url: "https://vitejs.dev",
    category: "tools",
    size: "small",
  },
  {
    name: "ESLint",
    icon: "🔍",
    url: "https://eslint.org",
    category: "tools",
    size: "small",
  },
  {
    name: "Prettier",
    icon: "✨",
    url: "https://prettier.io",
    category: "tools",
    size: "small",
  },
  {
    name: "Jest",
    icon: "🧪",
    url: "https://jestjs.io",
    category: "tools",
    size: "small",
  },

  // Deployment
  {
    name: "Vercel",
    icon: "▲",
    url: "https://vercel.com",
    category: "deployment",
    size: "small",
  },
  {
    name: "AWS",
    icon: "☁️",
    url: "https://aws.amazon.com",
    category: "deployment",
    size: "small",
  },
  {
    name: "Netlify",
    icon: "🌐",
    url: "https://www.netlify.com",
    category: "deployment",
    size: "small",
  },

  // Design
  {
    name: "Figma",
    icon: "🎨",
    url: "https://www.figma.com",
    category: "design",
    size: "small",
  },
  {
    name: "Framer",
    icon: "🎬",
    url: "https://www.framer.com",
    category: "design",
    size: "small",
  },
];

const categoryColors = {
  frontend: "from-blue-500 to-cyan-500",
  backend: "from-green-500 to-emerald-500",
  database: "from-purple-500 to-violet-500",
  tools: "from-orange-500 to-amber-500",
  deployment: "from-pink-500 to-rose-500",
  design: "from-indigo-500 to-blue-500",
};

export function TechStackContent() {
  // Group tech items by category
  const groupedTech = techStack.reduce(
    (acc, tech) => {
      if (!acc[tech.category]) {
        acc[tech.category] = [];
      }
      acc[tech.category].push(tech);
      return acc;
    },
    {} as Record<string, TechItem[]>,
  );

  return (
    <div className="space-y-8">
      {/* Tech Stack Grid by Category */}
      {Object.entries(groupedTech).map(([category, items]) => (
        <div key={category} className="space-y-4">
          <div className="flex items-center space-x-3">
            <div
              className={`w-6 h-6 rounded-full bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]}`}
            ></div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
              {category}
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({items.length} technologies)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-2 sm:gap-3">
            {items
              .sort((a, b) => {
                // Sort by size (xlarge first) then alphabetically
                const sizeOrder = { xlarge: 0, large: 1, medium: 2, small: 3 };
                if (sizeOrder[a.size] !== sizeOrder[b.size]) {
                  return sizeOrder[a.size] - sizeOrder[b.size];
                }
                return a.name.localeCompare(b.name);
              })
              .map((tech) => (
                <TechItem
                  key={tech.name}
                  tech={tech}
                  className="w-full justify-center"
                />
              ))}
          </div>
        </div>
      ))}

      {/* Category Legend */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {Object.entries(categoryColors).map(([category, colorClass]) => (
          <div key={category} className="flex items-center space-x-2">
            <div
              className={`w-4 h-4 rounded-full bg-gradient-to-r ${colorClass}`}
            ></div>
            <span className="text-sm font-medium capitalize text-gray-700 dark:text-gray-300">
              {category}
            </span>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {techStack.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Technologies
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {Object.keys(categoryColors).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Categories
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {techStack.filter((t) => t.category === "frontend").length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Frontend
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {techStack.filter((t) => t.category === "backend").length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Backend
          </div>
        </div>
      </div>
    </div>
  );
}
