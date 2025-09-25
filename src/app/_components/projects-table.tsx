"use client";

import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { EditProjectButton } from "./edit-project-button";
import { useUser } from "@clerk/nextjs";

const statusColors = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  archived: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
};

export function ProjectsTable() {
  const { user, isLoaded } = useUser();
  const projects = useQuery(api.projects.getAllProjects);
  
  if (!isLoaded) {
    return null;
  }

  if (projects === undefined) {
    return (
      <div className="overflow-x-auto">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No projects found, I must be busy or working on the database!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-700">
            <th className="text-left py-4 px-2 font-semibold text-gray-900 dark:text-gray-100">Project</th>
            <th className="text-left py-4 px-2 font-semibold text-gray-900 dark:text-gray-100">Problem Solved</th>
            <th className="text-left py-4 px-2 font-semibold text-gray-900 dark:text-gray-100">Status</th>
            <th className="text-left py-4 px-2 font-semibold text-gray-900 dark:text-gray-100">Links</th>
            {user && (
            <th className="text-left py-4 px-2 font-semibold text-gray-900 dark:text-gray-100">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <td className="py-4 px-2">
                <div className="font-medium text-gray-900 dark:text-gray-100">
                  {project.name}
                </div>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="text-xs text-gray-500 mt-1">
                    {project.technologies.join(', ')}
                  </div>
                )}
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
                <div className="flex flex-col space-x-3">
                  {project.url && (
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-gray-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                      Live
                    </Link>
                  )}
                  {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-gray-600 hover:text-purple-500 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                  >
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </Link>
                  )}
                </div>
              </td>
              {user && (
              <td className="py-4 px-2">
                <EditProjectButton projectId={project._id} />
              </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}