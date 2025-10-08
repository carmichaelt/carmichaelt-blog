"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface EditProjectButtonProps {
  projectId: string;
}

export function EditProjectButton({ projectId }: EditProjectButtonProps) {
  const { user, isLoaded } = useUser();
  const project = useQuery(api.projects.getProjectById, {
    projectId: projectId as Id<"projects">,
  });
  const author = useQuery(api.users.getUserByClerkId, {
    clerkId: user?.id as string,
  });

  if (!isLoaded || !user) {
    return null;
  }

  if (project === undefined) {
    return null;
  }

  // Only show edit button if user is the author
  if (author?._id !== project?.author) {
    return null;
  }

  return (
    <Link href={`/projects/${projectId}/edit`}>
      <Button variant="outline" size="sm">
        <Edit className="w-4 h-4 mr-2" />
        Edit
      </Button>
    </Link>
  );
}
