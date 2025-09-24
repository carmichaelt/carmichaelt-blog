import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import DateFormatter from "@/app/_components/date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: {
    name: string;
    picture: string;
  };
};

export function PostHeader({ title, coverImage, date, author }: Props) {
  return (
    <div className="max-w-4xl min-w-full mx-auto px-24 py-8">
      {/* Back to Blog Link */}
      <div className="mb-6">
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>
      </div>

      {/* Date */}
      <div className="mb-4">
        <DateFormatter dateString={date} />
      </div>

      {/* Title */}
      <div className="mb-4">
        <PostTitle>{title}</PostTitle>
      </div>

      {/* Posted by section */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Posted by</span>
          <div className="flex items-center gap-3">
            <Avatar name={author.name} picture={author.picture} />
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {coverImage && (
        <div className="mb-8">
          <CoverImage title={title} src={coverImage} />
        </div>
      )}

      {/* Separator */}
      <div className="border-t border-border mb-8"></div>
    </div>
  );
}