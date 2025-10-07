"use client";

import { PostSkeleton } from "@/app/_components/post-skeleton";
import { notFound } from "next/navigation";
import { PostHeader } from "@/app/_components/post-header";
import { PostBody } from "@/app/_components/post-body";
import { Doc } from "../../../../../convex/_generated/dataModel";

// Dynamic content component that streams in
interface PostContentProps {
  post: Doc<"posts">;
}

export function PostContent({ post }: PostContentProps) {
    if (post === undefined) {
      // Still loading
      console.log("Post still loading");
      return <PostSkeleton />;
    }
  
    if (post === null) {
      // Post not found
      console.log("Post not found");
      notFound();
    }
  
  return (
    <>
      <PostHeader
        title={post.title}
        coverImage={post.coverImage}
        date={post.date}
        postSlug={post.slug}
      />
      <PostBody content={post.content} richContent={post.richContent} />
    </>
  );
  }