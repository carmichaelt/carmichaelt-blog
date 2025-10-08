"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { logger } from "@/lib/logger";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    logger.error("Post page error", error as Error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20">
      <div className="max-w-md w-full mx-auto text-center px-6">
        <div className="mb-8">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Something went wrong
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-2">
            We encountered an error while loading this post.
          </p>
          {error.digest && (
            <p className="text-xs text-slate-500 dark:text-slate-500 font-mono">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <Button onClick={reset} className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>

          <Button variant="outline" asChild className="w-full">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </Button>
        </div>

        <div className="mt-8 text-sm text-slate-500 dark:text-slate-500">
          <p>If the problem persists, please contact support.</p>
        </div>
      </div>
    </div>
  );
}
