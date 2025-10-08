import { Skeleton } from "@/components/ui/skeleton";

export function HeroPostFallback() {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        {/* Cover Image Skeleton */}
        <Skeleton className="aspect-video w-full rounded-lg" />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          {/* Title Skeleton */}
          <div className="mb-4">
            <Skeleton className="h-12 w-full mb-2" />
            <Skeleton className="h-12 w-3/4" />
          </div>
          {/* Date Skeleton */}
          <div className="mb-4 md:mb-0">
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
        <div>
          {/* Excerpt Skeleton */}
          <div className="mb-4">
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-2/3" />
          </div>
          {/* Avatar Skeleton */}
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-5 w-24" />
          </div>
        </div>
      </div>
    </section>
  );
}
