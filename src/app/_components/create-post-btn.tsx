import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export const CreatePostButton = () => {
  return (
    <Link href="/create-post">
      <Button variant="outline" size="sm" asChild className="hidden sm:flex">
        <PlusIcon className="w-4 h-4" />
        Post
      </Button>
    </Link>
  );
};
