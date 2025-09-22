"use client";
import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
//import { getAllPosts } from "@/lib/api";
//import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Index() {
  //const allPosts = getAllPosts();

  const posts = useQuery(api.posts.getPosts);

  const heroPost = posts?.[0];

  const morePosts = posts?.slice(1);

  return (
    <main>
      <Container>
        <Intro />
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}