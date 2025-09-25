"use client";

import { useUser } from '@clerk/nextjs';
import { CreateProjectForm } from './create-project-form';

export function CreateProjectContent() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please sign in to create a project.</p>
      </div>
    );
  }

  return <CreateProjectForm authorId={user.id} />;
}