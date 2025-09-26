"use client";

import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { CreatePostForm } from './create-post-form';
import { useUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { logger } from '@/lib/logger';

// Client component for dynamic content
export function CreatePostContent() {
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

  logger.debug("User data loaded", { userId: user.id, email: user.emailAddresses[0]?.emailAddress });
  const currentUser = users?.find((user) => user.tokenIdentifier === user?.tokenIdentifier);
  logger.debug("Current user found", { currentUserId: currentUser?._id, tokenIdentifier: currentUser?.tokenIdentifier });

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

  return <CreatePostForm authorId={currentUser._id} />;
}