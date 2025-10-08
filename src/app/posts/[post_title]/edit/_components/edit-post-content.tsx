"use client";

import { notFound } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { EditPostForm } from "./edit-post-form";
import { useParams } from "next/navigation";

export function EditPostContent() {
  const params = useParams();
  const postSlug = params?.post_title as string;

  // Use real-time query for live updates
  const post = useQuery(api.posts.getPostBySlug, { slug: postSlug });

  if (post === undefined) {
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

  if (post === null) {
    // Post not found
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>
        <p className="text-gray-600 mt-2">Update your blog post</p>
      </div>

      <EditPostForm post={post} />
    </div>
  );
}
