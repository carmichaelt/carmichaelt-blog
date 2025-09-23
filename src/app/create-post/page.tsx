'use client';

import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { CreatePostForm } from './_components/create-post-form';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function CreatePostPage() {
  const { user, isLoaded } = useUser();
  const users = useQuery(api.users.getUsers);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    redirect('/');
  }

  console.log("user", user);
  const currentUser = users?.find((user) => user.tokenIdentifier === user?.tokenIdentifier);
  console.log("currentUser", currentUser);


  if (!currentUser) {
    return (
      <div className="text-center py-8">
        <h1 className="text-2xl font-bold mb-4">Author Setup Required</h1>
        <p className="text-gray-600 mb-4">
          You need to be set up as an author before you can create posts.
        </p>
        <p className="text-sm text-gray-500">
          Please contact the administrator to set up your author profile.
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
      
      <CreatePostForm authorId={currentUser._id} />
    </div>
  );
}
