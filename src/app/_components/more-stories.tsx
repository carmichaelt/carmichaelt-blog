"use client";

import { PostPreview } from "@/app/_components/post-preview";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "../../../convex/_generated/dataModel";
import { useQueryState } from "nuqs";

export function MoreStories() {

  const [search, setSearch] = useQueryState("search");
  const [sortField, setSortField] = useQueryState("sortField");
  const [sortOrder, setSortOrder] = useQueryState("sortOrder");
  const [preview, setPreview] = useQueryState("preview");
  const [dateFrom, setDateFrom] = useQueryState("dateFrom");
  const [dateTo, setDateTo] = useQueryState("dateTo");
  const [limit, setLimit] = useQueryState("limit");

  const postsResult = useQuery(api.posts.getPosts, {
    search: search ?? undefined,
    sortField: (sortField && ["date", "title", "views"].includes(sortField)) 
      ? (sortField as "date" | "title" | "views") 
      : undefined,
    sortOrder: (sortOrder && ["asc", "desc"].includes(sortOrder))
      ? (sortOrder as "asc" | "desc")
      : undefined,
    paginationOpts: {
      numItems: limit ? parseInt(limit) : 10,
      cursor: null,
    },
    preview: preview === "true" ? true : preview === "false" ? false : undefined,
    dateFrom: dateFrom ?? undefined,
    dateTo: dateTo ?? undefined,
  });

  const posts = postsResult?.page ?? [];



  if (!posts || posts.length === 0) {
    return (
      <section>
        <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
          Posts
        </h2>
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">
            No posts found matching your criteria.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-16 sm:mb-24 lg:mb-32">
        {posts?.map((post) => (
          <PostPreview
            key={post?.slug}
            slug={post?.slug as string}
          />
        )) ?? null}
      </div>
    </section>
  );
}
