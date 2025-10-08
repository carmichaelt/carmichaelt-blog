import { Skeleton } from "@/components/ui/skeleton";

export function PostSkeleton() {
  return (
    <article className="mb-32">
      {/* Title skeleton */}
      <div className="mb-8">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2" />
      </div>

      {/* Author skeleton */}
      <div className="hidden md:block md:mb-12">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>

      {/* Cover image skeleton */}
      <div className="mb-8 md:mb-16 sm:mx-0">
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>

      {/* Mobile author skeleton */}
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <div className="flex items-center space-x-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>

        {/* Date skeleton */}
        <div className="mb-6">
          <Skeleton className="h-6 w-32" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-2xl mx-auto">
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </article>
  );
}
