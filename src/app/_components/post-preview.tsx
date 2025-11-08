"use client";

import Link from "next/link";
import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import DateFormatter from "@/app/_components/date-formatter";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

type Props = {
  slug: string;
};

export function PostPreview({
  slug,
}: Props) {
  const post = useQuery(api.posts.getPostBySlug, {
    slug: slug,
  });
  const authorData = useQuery(api.users.getUserById, {
    id: post?.authorId as Id<"users">,
  });
  const coverImage = post?.coverImage;
  const title = post?.title ?? "";
  const date = post?.date;
  const excerpt = post?.excerpt;
  const author = {
    name: authorData?.name ?? "",
    picture: authorData?.avatarUrl ?? "",
  };
  return (
    <Link href={`/posts/${slug}`}>
      <div className="border border-gray-100 rounded-lg sm:rounded-none p-4 sm:p-6 lg:p-12 hover:bg-purple-50 hover:border-purple-300 hover:shadow-lg transition-shadow duration-200 hover:text-purple-500">
        <div className="mb-4 sm:mb-5 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0 mb-12 sm:mb-20">
          {coverImage && (
            <div className="flex-1">
              <CoverImage slug={slug} title={title} src={coverImage} />
            </div>
          )}
          {date && (
            <div className="flex justify-end sm:justify-start">
              <DateFormatter dateString={date} />
            </div>
          )}
        </div>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 leading-snug text-center sm:text-left">
          <span className="hover:text-purple-600 transition-colors">
            {title}
          </span>
        </h1>
        <p className="text-sm sm:text-base lg:text-lg  mb-4 text-black text-center sm:text-left">
          {excerpt}
        </p>
        <div className="flex justify-center sm:justify-start">
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </Link>
  );
}
