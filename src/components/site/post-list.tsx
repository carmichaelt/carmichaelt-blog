import Link from "next/link";

import { DateFormatter } from "@/components/site/date-formatter";
import type { Post } from "@/lib/content";

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return <p className="text-zinc-500">No writing yet.</p>;
  }

  return (
    <ul className="divide-y divide-white/10">
      {posts.map((post) => (
        <li key={post.slug} className="py-6 first:pt-0">
          <Link href={`/posts/${post.slug}`} className="group block">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
              <h2 className="text-xl font-semibold tracking-tight text-zinc-100 transition-colors group-hover:text-emerald-300">
                {post.title}
              </h2>
              <DateFormatter date={post.date} />
            </div>
            <p className="mt-2 max-w-2xl text-zinc-400">{post.excerpt}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
