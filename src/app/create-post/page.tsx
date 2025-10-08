import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { CreatePostForm } from "./_components/create-post-form";

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
          The clerk user is not set up as an author in the database.
        </p>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create New Post</h1>
        <p className="text-gray-600 mt-2">
          Write and publish your next blog post
        </p>
      </div>
      <CreatePostForm authorId={author._id} />
    </div>
  );
}
