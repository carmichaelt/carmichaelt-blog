"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface PostCountProps {
  preloadedPosts: Preloaded<typeof api.posts.getAllPosts>;
}

export function PostCount({ preloadedPosts }: PostCountProps) {
  const postsCount = usePreloadedQuery(preloadedPosts);
  return (
    <span className="font-bold text-purple-500 hover:text-purple-600 transition-colors">
      {postsCount.length}
    </span>
  );
}
