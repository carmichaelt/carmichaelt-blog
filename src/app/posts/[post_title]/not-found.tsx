import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-md w-full mx-auto text-center px-6">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            404
          </h1>
          <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Post Not Found
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            The post you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="w-full">
            <Link href="/posts">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Browse Posts
            </Link>
          </Button>
        </div>
        
        <div className="mt-8 text-sm text-slate-500 dark:text-slate-500">
          <p>If you believe this is an error, please contact support.</p>
        </div>
      </div>
    </div>
  );
}
