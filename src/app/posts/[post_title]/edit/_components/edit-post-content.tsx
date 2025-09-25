"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { notFound } from "next/navigation";
import { EditPostForm } from "./edit-post-form";
import { useUser } from '@clerk/nextjs';

interface EditPostContentProps {
  post_title: string;
}

export function EditPostContent({ post_title }: EditPostContentProps) {
  const { user, isLoaded } = useUser();
  const post = useQuery(api.posts.getPostBySlug, { slug: post_title });
  
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

  // Check if user is the author of the post
  if (post.author !== user.id) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>
        <p className="text-gray-600 mt-2">
          Update your blog post
        </p>
      </div>
      
      <EditPostForm post={post} authorId={user.id} />
    </div>
  );
}