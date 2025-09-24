"use client";

import { Separator } from "@/components/ui/separator";
import Avatar from "./avatar";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { PostSkeleton } from "./post-skeleton";
import { notFound } from "next/navigation";

// Dynamic content component that streams in
export function PostFooter({ post_title }: { post_title: string }) {
    const post = useQuery(api.posts.getPostBySlug, { slug: post_title });
    const author = useQuery(api.users.getUserById, { id: post?.author as Id<"users"> });
  
    if (post === undefined) {
      // Still loading
      return <PostSkeleton />;
    }
  
    if (post === null) {
      // Post not found
      notFound();
    }
    if (author === null) {
      // Author not found
      return <div className="flex items-center">
        <Avatar name="Unknown Author" picture="" />
      </div>;
    }

  return (
    <>
    <div className="max-w-4xl mx-auto py-8">
        <Separator />
      {/* Posted by section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <span className="text-sm text-muted-foreground">Posted by</span>
          <Avatar name={author?.name ?? "Unknown Author"} picture={author?.avatarUrl ?? ""} />
        </div>
      </div>
    </div>
    </>
  );
}