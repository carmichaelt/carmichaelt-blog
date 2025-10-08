import { Suspense } from "react";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import { EditPostContent } from "./_components/edit-post-content";
import { logger } from "@/lib/logger";
import { auth } from "@clerk/nextjs/server";

interface EditPostPageProps {
  params: Promise<{ post_title: string }>;
}

// Static shell component that renders immediately
function EditPostShell() {
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
  const { userId } = await auth();
  if (!userId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Authentication Required
          </h1>
          <p className="text-gray-600">Please sign in to edit a post.</p>
        </div>
      </div>
    );
  }

  try {
    return (
      <div className="min-h-screen bg-background">
        <Suspense fallback={<EditPostShell />}>
          <EditPostContent />
        </Suspense>
      </div>
    );
  } catch (error) {
    logger.error("Error loading edit post page", error as Error, { params });
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Error Loading Post
          </h1>
          <p className="text-gray-600">
            There was an error loading the post for editing.
          </p>
        </div>
      </div>
    );
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: EditPostPageProps) {
  const { post_title } = await params;

  try {
    const post = await fetchQuery(api.posts.getPostBySlug, {
      slug: post_title,
    });

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
    logger.error("Error generating metadata", error as Error, { post_title });
    return {
      title: "Edit Post",
      description: "Edit a blog post",
    };
  }
}

// Enable dynamic rendering
export const dynamic = "force-dynamic";
