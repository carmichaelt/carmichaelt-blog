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
    <div className="border border-gray-100 rounded-none p-12 hover:bg-purple-50 hover:border-purple-300 hover:shadow-lg transition-shadow duration-200 hover:text-purple-500">
      <div className="mb-5 flex justify-between mb-20">
        <div className="flex">
        <CoverImage slug={slug} title={title} src={coverImage} />
        </div>
        <div>
        <DateFormatter dateString={date} />
        </div>
      </div>
      <h1 className="text-3xl font-bold mb-3 leading-snug text-center">
        <Link href={`/posts/${slug}`}>
          {title}
        </Link>
      </h1>
      <p className="text-lg leading-relaxed mb-4 text-black">{excerpt}</p>
      <Avatar name={author.name} picture={author.picture} />
    </div>
  );
}