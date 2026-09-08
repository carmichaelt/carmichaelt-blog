import type { Metadata } from "next";

import { BackLink } from "@/components/site/back-link";
import { Container } from "@/components/site/container";
import { PostList } from "@/components/site/post-list";
import { getAllPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Poems, notes, and essays by Tom Carmichael.",
};

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <Container className="py-16">
      <BackLink />
      <h1 className="mb-10 text-3xl font-bold tracking-tight sm:text-4xl">Writing</h1>
      <PostList posts={posts} />
    </Container>
  );
}
