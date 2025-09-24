import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { SearchAndFilters } from "./_components/search-and-filters";
import { DynamicHomeContent } from "./_components/dynamic-home-content";

export const experimental_ppr = true;

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
  searchParams: Promise<SearchParams>;
};

export default async function Index({ searchParams }: Props) {
  const params = await searchParams;
  
  // Parse and validate search parameters
  const search = params.search || "";
  const sortField = (params.sortField === "title" ? "title" : "date") as "date" | "title";
  const sortOrder = (params.sortOrder === "asc" ? "asc" : "desc") as "asc" | "desc";
  const preview = params.preview === "false" ? false : params.preview === "true" ? true : undefined;
  const dateFrom = params.dateFrom || undefined;
  const dateTo = params.dateTo || undefined;
  const limit = params.limit ? parseInt(params.limit) : 10;

  return (
    <main>
      <Container>
        {/* Static content that renders immediately */}
        <Intro />
        
        {/* Search and Filters UI */}
        <SearchAndFilters 
          currentSearch={search}
          currentSortField={sortField}
          currentSortOrder={sortOrder}
          currentPreview={preview}
          currentDateFrom={dateFrom}
          currentDateTo={dateTo}
          currentLimit={limit}
        />
        
        {/* Dynamic content that streams in */}
        <DynamicHomeContent searchParams={params} />
      </Container>
    </main>
  );
}