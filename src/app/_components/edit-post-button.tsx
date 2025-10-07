"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface EditPostButtonProps {
  postSlug: string;
}

export function EditPostButton({ postSlug }: EditPostButtonProps) {

  return (
    <Link href={`/posts/${postSlug}/edit`}>
      <Button variant="outline" size="sm">
        <Edit className="w-4 h-4 mr-2" />
        Edit Post
      </Button>
    </Link>
  );
}