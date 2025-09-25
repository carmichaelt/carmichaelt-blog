"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { PostSkeleton } from "@/app/_components/post-skeleton";
import { notFound } from "next/navigation";
import { PostHeader } from "@/app/_components/post-header";
import { PostBody } from "@/app/_components/post-body";

// Dynamic content component that streams in
export function PostContent({ post_title }: { post_title: string }) {
    const post = useQuery(api.posts.getPostBySlug, { slug: post_title });
  
    if (post === undefined) {
      // Still loading
      return <PostSkeleton />;
    }
  
    if (post === null) {
      // Post not found
      notFound();
    }
  
  return (
    <>
      <PostHeader
        title={post.title}
        coverImage={post.coverImage}
        date={post.date}
        postId={post._id}
        postSlug={post.slug}
      />
      <PostBody content={post.content} richContent={post.richContent} />
    </>
  );
  }