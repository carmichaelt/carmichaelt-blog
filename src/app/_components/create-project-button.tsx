"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function CreateProjectButton() {
  const { user, isLoaded } = useUser();

  if (!isLoaded || !user) {
    return null;
  }

  return (
    <Link href="/create-project">
      <Button>
        <Plus className="w-4 h-4 mr-2" />
        Create Project
      </Button>
    </Link>
  );
}
