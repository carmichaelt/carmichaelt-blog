"use client";

import { SignInButton } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { CreatePostButton } from "./create-post-btn";

// Client component for authentication-related UI
export function NavbarAuth() {
  return (
    <>
      <Authenticated>
        <div className="flex items-center gap-2">
          <CreatePostButton />
          <UserButton />
        </div>
      </Authenticated>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
    </>
  );
}