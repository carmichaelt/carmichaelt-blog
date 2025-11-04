"use client";

import { notFound } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { CreatePostLayout } from "@/app/create-post/_components/create-post-layout";
import { useParams } from "next/navigation";
import Container from "@/app/_components/container";
import { Id } from "../../../../../../convex/_generated/dataModel";

export function EditPostContent() {
  const params = useParams();
  const postSlug = params?.post_title as string;

  // Use real-time query for live updates
  const post = useQuery(api.posts.getPostBySlug, { slug: postSlug });
  const author = useQuery(api.users.getUserById, {
    id: post?.authorId as Id<"users">,
  });

  if (post === undefined || author === undefined) {
    // Still loading
    return (
      <Container>
        <div className="py-8">
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
      </Container>
    );
  }

  if (post === null || author === null) {
    // Post or author not found
    notFound();
  }

  return (
    <Container>
      <div className="py-8 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>
          <p className="text-gray-600 mt-2">
            Update your blog post with AI assistance
          </p>
        </div>
        <CreatePostLayout 
          authorId={author._id} 
          post={post}
          mode="edit"
        />
      </div>
    </Container>
  );
}
