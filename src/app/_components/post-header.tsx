"use client";

import CoverImage from "@/app/_components/cover-image";
import DateFormatter from "@/app/_components/date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EditPostButton } from "./edit-post-button";

type Props = {
  title: string;
  coverImage?: string | null;
  date: string;
  postSlug?: string;
};

export function PostHeader({ title, coverImage, date, postSlug }: Props) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back to Blog Link and Edit Button */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between">
        <Link
          href="/posts"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Posts
        </Link>
        {postSlug && <EditPostButton postSlug={postSlug} />}
      </div>

      {/* Date */}
      <div className="mb-6">
        <DateFormatter dateString={date} />
      </div>

      {/* Title */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between">
        <PostTitle>{title}</PostTitle>
        {/* Cover Image */}
        {coverImage && coverImage.trim() !== "" && (
          <div className="mb-8 -mx-4 sm:-mx-6 lg:-mx-8">
            <CoverImage title={title} src={coverImage} />
          </div>
        )}
      </div>

      {/* Separator */}
      <div className="border-t border-border"></div>
    </div>
  );
}
