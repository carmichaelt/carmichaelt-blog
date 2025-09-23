"use client";

import { SignInButton } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { CreatePostButton } from "./create-post-btn";


const Navbar = () => {
  return (
    <>
      <div className="flex justify-between items-center p-4">
        <div>
          <Link href="/">
            <Image src="/tc-logo.png" alt="logo" width={100} height={100} />
          </Link>
        </div>
        <Authenticated>
            <div className="flex items-center gap-2">
                <CreatePostButton />
                <UserButton />
            </div>
        </Authenticated>
        <Unauthenticated>
          <SignInButton />
        </Unauthenticated>
      </div>
      <Separator />
    </>
  );
};

export default Navbar;
