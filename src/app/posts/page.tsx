"use client";

import Container from "@/app/_components/container";
import { DynamicHomeContent } from "@/app/_components/dynamic-home-content";
import { SearchAndFilters } from "../_components/search-and-filters";
import { ArrowLeft, Filter } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

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

function Filters({ showFilters, onToggleFilters }: { showFilters: boolean; onToggleFilters: () => void }) {
  return <SearchAndFilters showFilters={showFilters} onToggleFilters={onToggleFilters} />;
}

export default function Index({ searchParams }: Props) {
  const [showFilters, setShowFilters] = useState(false);
  
  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  // Handle async searchParams
  const [resolvedParams, setResolvedParams] = useState<any>(null);
  
  useEffect(() => {
    searchParams.then(setResolvedParams);
  }, [searchParams]);

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
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleFilters}
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group mt-4 sm:mt-0"
              >
                <Filter className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>
            {/* Static content that renders immediately */}
            {/* <Intro /> */}

            {/* Dynamic content that streams in */}
            <Filters showFilters={showFilters} onToggleFilters={handleToggleFilters} />
            {resolvedParams && <DynamicHomeContent searchParams={resolvedParams} />}
          </div>
        </Container>
      </div>
    </>
  );
}
