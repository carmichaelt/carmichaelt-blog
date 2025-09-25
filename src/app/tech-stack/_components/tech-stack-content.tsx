"use client";

import { TechItem } from "./tech-item";

interface TechItem {
  name: string;
  icon: string;
  url: string;
  category: 'frontend' | 'backend' | 'database' | 'tools' | 'deployment' | 'design';
  size: 'small' | 'medium' | 'large' | 'xlarge';
}

const techStack: TechItem[] = [
  // Frontend
  { name: 'React', icon: '⚛️', url: 'https://reactjs.org', category: 'frontend', size: 'xlarge' },
  { name: 'Next.js', icon: '▲', url: 'https://nextjs.org', category: 'frontend', size: 'xlarge' },
  { name: 'TypeScript', icon: '🔷', url: 'https://www.typescriptlang.org', category: 'frontend', size: 'large' },
  { name: 'Tailwind CSS', icon: '🎨', url: 'https://tailwindcss.com', category: 'frontend', size: 'large' },
  { name: 'JavaScript', icon: '🟨', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', category: 'frontend', size: 'large' },
  { name: 'HTML5', icon: '🌐', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', category: 'frontend', size: 'medium' },
  { name: 'CSS3', icon: '💎', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS', category: 'frontend', size: 'medium' },
  { name: 'Sass', icon: '💄', url: 'https://sass-lang.com', category: 'frontend', size: 'small' },
  { name: 'Vue.js', icon: '💚', url: 'https://vuejs.org', category: 'frontend', size: 'medium' },
  { name: 'Svelte', icon: '🧡', url: 'https://svelte.dev', category: 'frontend', size: 'small' },

  // Backend
  { name: 'Node.js', icon: '🟢', url: 'https://nodejs.org', category: 'backend', size: 'xlarge' },
  { name: 'Python', icon: '🐍', url: 'https://www.python.org', category: 'backend', size: 'large' },
  { name: 'Express.js', icon: '🚀', url: 'https://expressjs.com', category: 'backend', size: 'large' },
  { name: 'FastAPI', icon: '⚡', url: 'https://fastapi.tiangolo.com', category: 'backend', size: 'medium' },
  { name: 'Django', icon: '🎯', url: 'https://www.djangoproject.com', category: 'backend', size: 'medium' },
  { name: 'Flask', icon: '🌶️', url: 'https://flask.palletsprojects.com', category: 'backend', size: 'small' },
  { name: 'GraphQL', icon: '🔺', url: 'https://graphql.org', category: 'backend', size: 'medium' },
  { name: 'REST API', icon: '🔗', url: 'https://restfulapi.net', category: 'backend', size: 'large' },

  // Database
  { name: 'PostgreSQL', icon: '🐘', url: 'https://www.postgresql.org', category: 'database', size: 'large' },
  { name: 'MongoDB', icon: '🍃', url: 'https://www.mongodb.com', category: 'database', size: 'large' },
  { name: 'Redis', icon: '🔴', url: 'https://redis.io', category: 'database', size: 'medium' },
  { name: 'SQLite', icon: '🗃️', url: 'https://www.sqlite.org', category: 'database', size: 'small' },
  { name: 'Prisma', icon: '⚡', url: 'https://www.prisma.io', category: 'database', size: 'medium' },
  { name: 'Convex', icon: '🔷', url: 'https://convex.dev', category: 'database', size: 'medium' },

  // Tools
  { name: 'Git', icon: '📦', url: 'https://git-scm.com', category: 'tools', size: 'xlarge' },
  { name: 'Docker', icon: '🐳', url: 'https://www.docker.com', category: 'tools', size: 'large' },
  { name: 'VS Code', icon: '💻', url: 'https://code.visualstudio.com', category: 'tools', size: 'large' },
  { name: 'Webpack', icon: '📦', url: 'https://webpack.js.org', category: 'tools', size: 'medium' },
  { name: 'Vite', icon: '⚡', url: 'https://vitejs.dev', category: 'tools', size: 'medium' },
  { name: 'ESLint', icon: '🔍', url: 'https://eslint.org', category: 'tools', size: 'small' },
  { name: 'Prettier', icon: '✨', url: 'https://prettier.io', category: 'tools', size: 'small' },
  { name: 'Jest', icon: '🧪', url: 'https://jestjs.io', category: 'tools', size: 'medium' },
  { name: 'Cypress', icon: '🌲', url: 'https://www.cypress.io', category: 'tools', size: 'small' },

  // Deployment
  { name: 'Vercel', icon: '▲', url: 'https://vercel.com', category: 'deployment', size: 'large' },
  { name: 'AWS', icon: '☁️', url: 'https://aws.amazon.com', category: 'deployment', size: 'large' },
  { name: 'Netlify', icon: '🌐', url: 'https://www.netlify.com', category: 'deployment', size: 'medium' },
  { name: 'Heroku', icon: '🟣', url: 'https://www.heroku.com', category: 'deployment', size: 'medium' },
  { name: 'Railway', icon: '🚂', url: 'https://railway.app', category: 'deployment', size: 'small' },
  { name: 'DigitalOcean', icon: '🌊', url: 'https://www.digitalocean.com', category: 'deployment', size: 'small' },

  // Design
  { name: 'Figma', icon: '🎨', url: 'https://www.figma.com', category: 'design', size: 'large' },
  { name: 'Adobe XD', icon: '🎯', url: 'https://www.adobe.com/products/xd.html', category: 'design', size: 'medium' },
  { name: 'Sketch', icon: '✏️', url: 'https://www.sketch.com', category: 'design', size: 'small' },
  { name: 'Framer', icon: '🎬', url: 'https://www.framer.com', category: 'design', size: 'small' },
];

const categoryColors = {
  frontend: 'from-blue-500 to-cyan-500',
  backend: 'from-green-500 to-emerald-500',
  database: 'from-purple-500 to-violet-500',
  tools: 'from-orange-500 to-amber-500',
  deployment: 'from-pink-500 to-rose-500',
  design: 'from-indigo-500 to-blue-500',
};



export function TechStackContent() {
  return (
    <div className="relative">
      {/* Word Cloud Container */}
      <div className="relative w-full h-[600px] overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {techStack.map((tech, index) => {
              // Calculate position for word cloud effect
              const angle = (index * 137.5) % 360; // Golden angle for natural distribution
              const radius = Math.sqrt(index) * 15; // Increasing radius
              const x = Math.cos(angle * Math.PI / 180) * radius;
              const y = Math.sin(angle * Math.PI / 180) * radius;
              
              return (
                <TechItem
                  key={tech.name}
                  tech={tech}
                  style={{
                    position: 'absolute',
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: techStack.length - index,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Category Legend */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(categoryColors).map(([category, colorClass]) => (
          <div key={category} className="flex items-center space-x-2">
            <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${colorClass}`}></div>
            <span className="text-sm font-medium capitalize text-gray-700 dark:text-gray-300">
              {category}
            </span>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {techStack.length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Technologies</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {Object.keys(categoryColors).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {techStack.filter(t => t.category === 'frontend').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Frontend</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {techStack.filter(t => t.category === 'backend').length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Backend</div>
        </div>
      </div>
    </div>
  );
}