import { Suspense } from "react";
//import { HeroPost } from "@/app/_components/hero-post";
import { MoreStories } from "@/app/_components/more-stories";
//import { HeroPostFallback } from "./hero-post-fallback";

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
      {/* Hero Post 
      <Suspense fallback={<HeroPostFallback />}>
        <HeroPost
          search={search}
          sortField={sortField}
          sortOrder={sortOrder}
          preview={preview}
          dateFrom={dateFrom}
          dateTo={dateTo}
        />
      </Suspense>*/}
      
      {/* More Stories */}
      <Suspense fallback={
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-16 sm:mb-24 lg:mb-32">
          {Array.from({ length: 6 }).map((_, i) => (
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