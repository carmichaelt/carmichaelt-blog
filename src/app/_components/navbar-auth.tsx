"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

// Client component for authentication-related UI
export function NavbarAuth() {
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user) {
    return null;
  } else {
    return (
      <>
        <div className="flex items-center gap-2">
          <Button
            variant="default"
            size="sm"
            asChild
            className="hidden sm:flex bg-purple-500 hover:bg-purple-600"
          >
            <Link href="/create-post">
              <PlusIcon className="w-4 h-4" />
              New Post
            </Link>
          </Button>
          <Button
            variant="default"
            size="sm"
            asChild
            className="hidden sm:flex bg-purple-500 hover:bg-purple-600"
          >
            <Link href="/create-project">
              <PlusIcon className="w-4 h-4" />
              New Project
            </Link>
          </Button>

          <UserButton />
        </div>
      </>
    );
  }
}
