"use client";

import { useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface EditPostButtonProps {
  postId: string;
  postSlug: string;
}

export function EditPostButton({ postId, postSlug }: EditPostButtonProps) {
  const { user, isLoaded } = useUser();
  const post = useQuery(api.posts.getPostById, { postId: postId as Id<"posts"> });

  if (!isLoaded || !user) {
    return null;
  }

  if (post === undefined) {
    return null;
  }

  // Only show edit button if user is the author
  if (post?.author !== user.id) {
    return null;
  }

  return (
    <Link href={`/posts/${postSlug}/edit`}>
      <Button variant="outline" size="sm">
        <Edit className="w-4 h-4 mr-2" />
        Edit Post
      </Button>
    </Link>
  );
}