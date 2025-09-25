import Link from "next/link";
import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import DateFormatter from "@/app/_components/date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: {
    name: string;
    picture: string;
  };
  slug: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <div className="border border-gray-100 rounded-lg sm:rounded-none p-4 sm:p-6 lg:p-12 hover:bg-purple-50 hover:border-purple-300 hover:shadow-lg transition-shadow duration-200 hover:text-purple-500">
      <div className="mb-4 sm:mb-5 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0 mb-12 sm:mb-20">
        <div className="flex-1">
          <CoverImage slug={slug} title={title} src={coverImage} />
        </div>
        <div className="flex justify-end sm:justify-start">
          <DateFormatter dateString={date} />
        </div>
      </div>
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 leading-snug text-center sm:text-left">
        <Link href={`/posts/${slug}`} className="hover:text-purple-600 transition-colors">
          {title}
        </Link>
      </h1>
      <p className="text-sm sm:text-base lg:text-lg leading-relaxed mb-4 text-black text-center sm:text-left">{excerpt}</p>
      <div className="flex justify-center sm:justify-start">
        <Avatar name={author.name} picture={author.picture} />
      </div>
    </div>
  );
}