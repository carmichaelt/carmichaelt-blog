import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BackLink } from "@/components/site/back-link";
import { Container } from "@/components/site/container";
import { DateFormatter } from "@/components/site/date-formatter";
import { Markdown } from "@/components/site/markdown";
import { PostReactions } from "@/components/site/post-reactions";
import { getAllPosts, getPostBySlug } from "@/lib/content";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Container className="py-16">
      <article>
        <BackLink href="/posts" label="Writing" />
        <header className="mb-12">
          <p className="text-sm tracking-[0.2em] text-emerald-400 uppercase">
            {post.kind === "poem" ? "Poem" : "Essay"}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{post.title}</h1>
          <div className="mt-4">
            <DateFormatter date={post.date} />
          </div>
        </header>
        {post.kind === "poem" ? (
          <div className="max-w-xl whitespace-pre-line text-lg leading-8 text-zinc-200 sm:text-xl sm:leading-9">
            {post.content}
          </div>
        ) : (
          <Markdown content={post.content} />
        )}
        <PostReactions slug={post.slug} />
      </article>
    </Container>
  );
}
