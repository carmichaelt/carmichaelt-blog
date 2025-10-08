import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export const CreatePostButton = () => {
  return (
    <Link href="/create-post">
      <Button variant="outline" size="sm" className="flex items-center gap-2">
        <PlusIcon className="w-4 h-4" />
        <span className="hidden sm:inline">Create Post</span>
        <span className="sm:hidden">Post</span>
      </Button>
    </Link>
  );
};
