"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import Avatar from "@/app/_components/avatar";

// Dynamic component for author information that streams in
export function DynamicPostAuthor({ authorId }: { authorId: Id<"users"> }) {
  const author = useQuery(api.users.getUserById, { id: authorId });

  if (author === undefined) {
    // Still loading - show skeleton
    return (
      <div className="flex items-center animate-pulse">
        <div className="w-12 h-12 bg-gray-200 rounded-full mr-4"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </div>
    );
  }

  if (author === null) {
    // Author not found - show fallback
    return (
      <div className="flex items-center">
        <Avatar name="Unknown Author" picture="" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Avatar 
        name={author.name ?? "Unknown Author"} 
        picture={author.avatarUrl ?? ""} 
      />
    </div>
  );
}