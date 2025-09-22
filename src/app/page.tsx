import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
//import { getAllPosts } from "@/lib/api";
//import Image from "next/image";
//import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
//import { Author } from "@/interfaces/author";
import { fetchQuery } from "convex/nextjs";
import { Id } from "../../convex/_generated/dataModel";


export default async function Index() {
    //const allPosts = getAllPosts();
    
    const postsData = await fetchQuery(api.posts.getPosts);
  //const posts = useQuery(api.posts.getPosts);

  // Transform posts to match Post interface
  const posts = await Promise.all(
    postsData?.map(async (post) => {
      const author = await fetchQuery(api.authors.getAuthorById, { id: post.author as Id<"authors"> });
      return {
        slug: post.slug,
        title: post.title,
        date: post.date,
        coverImage: post.coverImage,
        author: {
          name: author?.name ?? "",
          picture: author?.avatar ?? ""
        },
        excerpt: post.excerpt,
        ogImage: {
          url: post.ogImage
        },
        content: post.content,
        preview: post.preview
      };
    }) ?? []
  );

  const heroPost = posts?.[0];
  const morePosts = posts?.slice(1);

  return (
    <main>
      <Container>
        <Intro />
        {heroPost && (
        <HeroPost
          title={heroPost?.title ?? ""}
          coverImage={heroPost?.coverImage ?? ""}
          date={heroPost?.date ?? ""}
          author={heroPost?.author ?? { name: "", picture: "" }}
        slug={heroPost?.slug ?? ""}
          excerpt={heroPost?.excerpt ?? ""}
        />) }
        {morePosts?.length && morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </main>
  );
}