import { Suspense } from "react";
import { PostSkeleton } from "@/app/_components/post-skeleton";
import { PostContent } from "./_components/page-content";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import type { Metadata } from "next";

interface PostPageProps {
  params: Promise<{ post_title: string }>;
}

// Static shell component that renders immediately
function PostShell({ post_title }: { post_title: string }) {
  return (
    <article className="mb-32">
      <PostSkeleton />
    </article>
  );
}



export default async function PostPage({ params }: PostPageProps) {
  const { post_title } = await params;

  return (
    <Suspense fallback={<PostShell post_title={post_title} />}>
      <PostContent post_title={post_title} />
    </Suspense>
  );
}

// Generate static params for recent posts to enable static pre-rendering
export async function generateStaticParams() {
  try {
    // Fetch recent posts for static generation
    const { fetchQuery } = await import("convex/nextjs");
    const { api } = await import("../../../../convex/_generated/api");
    
    const posts = await fetchQuery(api.posts.getAllPostSlugs, {});
    
    // Return the most recent 10 posts for static generation
    return posts.slice(0, 10).map((post: { slug: string }) => ({ 
      post_title: post.slug 
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { post_title } = await params;
  
  try {
    const post = await fetchQuery(api.posts.getPostBySlug, { slug: post_title });
    
    if (!post) {
      return {
        title: "Post Not Found",
        description: "The requested post could not be found.",
      };
    }

    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: post.coverImage ? [post.coverImage] : [],
        type: "article",
        publishedTime: post.date,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
        images: post.coverImage ? [post.coverImage] : [],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Post",
      description: "A blog post",
    };
  }
}

// Enable dynamic rendering for all other posts
export const dynamic = 'force-dynamic';
