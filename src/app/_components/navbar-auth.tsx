"use client";

import { UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

// Client component for authentication-related UI
export function NavbarAuth() {
  return (
    <>
      <Authenticated>
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
          <UserButton />
        </div>
      </Authenticated>
      <Unauthenticated>
        <>
        {/*<Button variant="outline" size="sm" asChild>
          <SignInButton mode="modal" />
        </Button>*/}
        </>
      </Unauthenticated>
    </>
  );
}