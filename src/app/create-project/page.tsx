import { auth } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import { api } from "../../../convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { CreateProjectForm } from "./_components/create-project-form";

export default async function CreateProjectPage() {
  const { userId } = await auth();
  if (!userId) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please sign in to create a project.</p>
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
    <div className="max-w-4xl mx-auto min-h-screen mt-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Create New Project
        </h1>
        <p className="text-gray-600 mt-2">
          Add a new project to your portfolio
        </p>
      </div>

      <CreateProjectForm authorId={author._id} />
    </div>
  );
}
