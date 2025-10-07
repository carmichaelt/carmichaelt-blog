"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface ProjectCountProps {
  preloadedProjects: Preloaded<typeof api.projects.getAllProjects>;
}

export function ProjectCount({ preloadedProjects }: ProjectCountProps) {
  const projectsCount = usePreloadedQuery(preloadedProjects);
  return (
    <span className="font-bold text-purple-500 hover:text-purple-600 transition-colors">
      {projectsCount.length || 0}
    </span>
  );
}
