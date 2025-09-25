"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { PostSkeleton } from "@/app/_components/post-skeleton";
import { notFound } from "next/navigation";
import { PostHeader } from "@/app/_components/post-header";
import { PostBody } from "@/app/_components/post-body";
import { DynamicPostAuthor } from "./dynamic-post-author";

// Dynamic content component that streams in
export function PostContent({ post_title }: { post_title: string }) {
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
  
    // Use author data if available, otherwise fallback
    const authorData = author ? {
      name: author.name ?? "Unknown Author",
      picture: author.avatarUrl ?? ""
    } : {
      name: "Loading...",
      picture: ""
    };
  
  return (
    <>
      <PostHeader
        title={post.title}
        coverImage={post.coverImage}
        date={post.date}
        author={authorData}
        postId={post._id}
        postSlug={post.slug}
      />
      <PostBody content={post.content} richContent={post.richContent} />
    </>
  );
  }