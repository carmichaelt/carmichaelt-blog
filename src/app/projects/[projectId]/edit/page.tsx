import { Suspense } from "react";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import { EditProjectContent } from "./_components/edit-project-content";
import { Id } from "../../../../../convex/_generated/dataModel";
import { logger } from '@/lib/logger';

interface EditProjectPageProps {
  params: Promise<{ projectId: string }>;
}

// Static shell component that renders immediately
function EditProjectShell() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
    </div>
  );
}

export async function generateStaticParams() {
  const projects = await fetchQuery(api.projects.getAllProjects);
  return projects.map((project) => ({ projectId: project._id }));
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { projectId } = await params;

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<EditProjectShell />}>
        <EditProjectContent projectId={projectId} />
      </Suspense>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: EditProjectPageProps) {
  const { projectId } = await params;
  
  try {
    const project = await fetchQuery(api.projects.getProjectById, { projectId: projectId as Id<"projects"> });
    
    if (!project) {
      return {
        title: "Project Not Found",
        description: "The requested project could not be found.",
      };
    }

    return {
      title: `Edit: ${project.name}`,
      description: `Edit project: ${project.name}`,
    };
  } catch (error) {
    logger.error("Error generating metadata", error as Error, { projectId });
    return {
      title: "Edit Project",
      description: "Edit a project",
    };
  }
}

// Enable dynamic rendering
export const dynamic = 'force-dynamic';