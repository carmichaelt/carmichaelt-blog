import { Suspense } from "react";
import { HeroPost } from "@/app/_components/hero-post";
import { MoreStories } from "@/app/_components/more-stories";
import { HeroPostFallback } from "./hero-post-fallback";

type SearchParams = {
  search?: string;
  sortField?: "date" | "title";
  sortOrder?: "asc" | "desc";
  preview?: string;
  dateFrom?: string;
  dateTo?: string;
  limit?: string;
};

type Props = {
  searchParams: SearchParams;
};

// Dynamic content component that streams in based on search parameters
export function DynamicHomeContent({ searchParams }: Props) {
  // Parse and validate search parameters
  const search = searchParams.search || "";
  const sortField = (searchParams.sortField === "title" ? "title" : "date") as "date" | "title";
  const sortOrder = (searchParams.sortOrder === "asc" ? "asc" : "desc") as "asc" | "desc";
  const preview = searchParams.preview === "false" ? false : searchParams.preview === "true" ? true : undefined;
  const dateFrom = searchParams.dateFrom || undefined;
  const dateTo = searchParams.dateTo || undefined;
  const limit = searchParams.limit ? parseInt(searchParams.limit) : 10;

  return (
    <>
      {/* Hero Post */}
      <Suspense fallback={<HeroPostFallback />}>
        <HeroPost
          search={search}
          sortField={sortField}
          sortOrder={sortOrder}
          preview={preview}
          dateFrom={dateFrom}
          dateTo={dateTo}
        />
      </Suspense>
      
      {/* More Stories */}
      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      }>
        <MoreStories
          search={search}
          sortField={sortField}
          sortOrder={sortOrder}
          limit={limit}
          preview={preview}
          dateFrom={dateFrom}
          dateTo={dateTo}
        />
      </Suspense>
    </>
  );
}