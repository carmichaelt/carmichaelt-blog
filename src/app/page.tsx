import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { SearchAndFilters } from "./_components/search-and-filters";
import { Suspense } from "react";
import { HeroPostFallback } from "./_components/hero-post-fallback";

export const experimental_ppr = true;

type SearchParams = {
  search?: string;
  sortField?: "date" | "title";
  sortOrder?: "asc" | "desc";
  author?: string;
  preview?: string;
  dateFrom?: string;
  dateTo?: string;
  limit?: string;
};

type Props = {
  searchParams: Promise<SearchParams>;
};

export default async function Index({ searchParams }: Props) {
  const params = await searchParams;
  
  // Parse and validate search parameters
  const search = params.search || "";
  const sortField = (params.sortField === "title" ? "title" : "date") as "date" | "title";
  const sortOrder = (params.sortOrder === "asc" ? "asc" : "desc") as "asc" | "desc";
  const author = params.author as any; // Will be validated in components
  const preview = params.preview === "false" ? false : params.preview === "true" ? true : undefined;
  const dateFrom = params.dateFrom || undefined;
  const dateTo = params.dateTo || undefined;
  const limit = params.limit ? parseInt(params.limit) : 10;

  return (
    <main>
      <Container>
        <Intro />
        
        {/* Search and Filters UI */}
        <SearchAndFilters 
          currentSearch={search}
          currentSortField={sortField}
          currentSortOrder={sortOrder}
          currentAuthor={author}
          currentPreview={preview}
          currentDateFrom={dateFrom}
          currentDateTo={dateTo}
          currentLimit={limit}
        />
        
        {/* Hero Post */}
        <Suspense fallback={<HeroPostFallback />}>
          <HeroPost
            search={search}
            sortField={sortField}
            sortOrder={sortOrder}
            author={author}
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
            author={author}
            preview={preview}
            dateFrom={dateFrom}
            dateTo={dateTo}
          />
        </Suspense>
      </Container>
    </main>
  );
}