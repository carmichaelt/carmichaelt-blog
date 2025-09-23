import { Suspense } from "react";
import { PostSkeleton } from "@/app/_components/post-skeleton";
import { PostContent } from "./_components/page-content";

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

// Generate static params for popular posts to enable static pre-rendering
export async function generateStaticParams() {
  // This would typically fetch the most popular posts
  // For now, we'll return an empty array to enable dynamic rendering
  // In production, you might want to pre-render your most popular posts
  
  try {
    // You could fetch recent posts here and return their slugs
    // const posts = await fetch('/api/popular-posts').then(res => res.json());
    // return posts.map((post: Post) => ({ post_title: post.slug }));
    
    return [];
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Enable dynamic rendering for all other posts
export const dynamic = 'force-dynamic';
