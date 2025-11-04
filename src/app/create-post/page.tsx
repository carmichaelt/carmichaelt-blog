import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { CreatePostLayout } from "./_components/create-post-layout";

// Server component for static page structure
export default async function CreatePostPage() {
  const { userId } = await auth();
  if (!userId) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please sign in to create a post.</p>
        <SignInButton mode="modal" />
      </div>
    );
  }

  const author = await fetchQuery(api.users.getUserByClerkId, {
    clerkId: userId,
  });  
  if (!author) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">
          Unable to find your account. Please try refreshing the page.
        </p>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create New Post</h1>
        <p className="text-gray-600 mt-2">
          Write and publish your next blog post
        </p>
      </div>
      <CreatePostLayout authorId={author._id} />
    </div>
  );
}
