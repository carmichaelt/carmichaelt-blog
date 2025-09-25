"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { notFound } from "next/navigation";
import { EditProjectForm } from "./edit-project-form";
import { useUser } from '@clerk/nextjs';

interface EditProjectContentProps {
  projectId: string;
}

export function EditProjectContent({ projectId }: EditProjectContentProps) {
  const { user, isLoaded } = useUser();
  const project = useQuery(api.projects.getProjectById, { projectId: projectId as Id<"projects"> });
  
  if (!isLoaded) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    notFound();
  }

  if (project === undefined) {
    // Still loading
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (project === null) {
    // Project not found
    notFound();
  }

  // Check if user is the author of the project
  if (project.author !== user.id) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
        <p className="text-gray-600 mt-2">
          Update your project details
        </p>
      </div>
      
      <EditProjectForm project={project} authorId={user.id} />
    </div>
  );
}