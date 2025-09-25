import { Suspense } from "react";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import { notFound } from "next/navigation";
import { EditPostContent } from "./_components/edit-post-content";

interface EditPostPageProps {
  params: Promise<{ post_title: string }>;
}

// Static shell component that renders immediately
function EditPostShell({ post_title }: { post_title: string }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { post_title } = await params;

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<EditPostShell post_title={post_title} />}>
        <EditPostContent post_title={post_title} />
      </Suspense>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: EditPostPageProps) {
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
      title: `Edit: ${post.title}`,
      description: `Edit post: ${post.title}`,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Edit Post",
      description: "Edit a blog post",
    };
  }
}

// Enable dynamic rendering
export const dynamic = 'force-dynamic';