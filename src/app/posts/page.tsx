import Container from "@/app/_components/container";
import { DynamicHomeContent } from "@/app/_components/dynamic-home-content";
import { SearchAndFilters } from "../_components/search-and-filters";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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

function Filters() {
  return <SearchAndFilters />;
}

export default async function Index({ searchParams }: Props) {
  const params = await searchParams;

  return (
    <>
      <div className="flex-1 mt-16">
        <Container>
          <div className="space-y-6 sm:space-y-8 flex flex-col">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between">
              <Link
                href="/"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </div>
            <Filters />
            {/* Static content that renders immediately */}
            {/* <Intro /> */}

            {/* Dynamic content that streams in */}
            <DynamicHomeContent searchParams={params} />
          </div>
        </Container>
      </div>
    </>
  );
}
