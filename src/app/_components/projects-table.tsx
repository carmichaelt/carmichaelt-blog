import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  name: string;
  url: string;
  github: string;
  problem: string;
  status: "active" | "completed" | "archived";
}

const mockProjects: Project[] = [
  {
    name: "Kaiwa - AI Training Platform",
    url: "https://kaiwa.pa.com",
    github: "https://github.com/pa-consulting/kaiwa",
    problem: "Enables enterprises to create conversational AI training experiences for their employees, solving the challenge of engaging and effective corporate learning.",
    status: "active"
  },
  {
    name: "Personal Blog & Portfolio",
    url: "https://carmichaelt.com",
    github: "https://github.com/carmichaelt/personal-blog",
    problem: "A modern, performant blog built with Next.js and Convex, demonstrating PPR (Partial Pre-rendering) and showcasing my thoughts on technology and development.",
    status: "active"
  },
  {
    name: "TaskFlow - Project Management",
    url: "https://taskflow-demo.vercel.app",
    github: "https://github.com/carmichaelt/taskflow",
    problem: "A collaborative project management tool that helps teams organize tasks, track progress, and maintain productivity without the complexity of enterprise solutions.",
    status: "completed"
  },
  {
    name: "WeatherWise - Climate API",
    url: "https://weatherwise-api.herokuapp.com",
    github: "https://github.com/carmichaelt/weatherwise",
    problem: "A RESTful API that provides detailed weather forecasts and climate data, solving the need for reliable weather information in applications and services.",
    status: "completed"
  },
  {
    name: "CodeSnippet Manager",
    url: "https://snippets-demo.netlify.app",
    github: "https://github.com/carmichaelt/snippet-manager",
    problem: "A developer tool for organizing and sharing code snippets with syntax highlighting, search functionality, and team collaboration features.",
    status: "archived"
  },
  {
    name: "AI Content Generator",
    url: "https://ai-content-gen.vercel.app",
    github: "https://github.com/carmichaelt/ai-content-generator",
    problem: "An experimental tool that uses AI to generate blog posts, social media content, and marketing copy, exploring the intersection of AI and content creation.",
    status: "active"
  }
];

const statusColors = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  archived: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
};

export function ProjectsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-4 px-2 font-semibold text-gray-900 dark:text-gray-100">Project</th>
            <th className="text-left py-4 px-2 font-semibold text-gray-900 dark:text-gray-100">Problem Solved</th>
            <th className="text-left py-4 px-2 font-semibold text-gray-900 dark:text-gray-100">Status</th>
            <th className="text-left py-4 px-2 font-semibold text-gray-900 dark:text-gray-100">Links</th>
          </tr>
        </thead>
        <tbody>
          {mockProjects.map((project, index) => (
            <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <td className="py-4 px-2">
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {project.name}
                </div>
              </td>
              <td className="py-4 px-2">
                <div className="text-gray-600 dark:text-gray-400 text-sm max-w-md">
                  {project.problem}
                </div>
              </td>
              <td className="py-4 px-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                  {project.status}
                </span>
              </td>
              <td className="py-4 px-2">
                <div className="flex space-x-3">
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Live
                  </Link>
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                  >
                    <Github className="h-4 w-4 mr-1" />
                    Code
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}