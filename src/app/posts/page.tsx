import Container from "@/app/_components/container";
import { DynamicHomeContent } from "@/app/_components/dynamic-home-content";
import { SearchAndFilters } from "../_components/search-and-filters";
import { CreatePostButton } from "../_components/create-post-btn";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export const experimental_ppr = true;

export default async function Index() {

  return (
    <>
      <div className="flex-1 mt-16">
        <Container>
          <div className="space-y-6 sm:space-y-8 flex flex-col">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <Link
                href="/"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
                <CreatePostButton />
            </div>
            <Suspense fallback={<div>Loading...</div>}> 
              <SearchAndFilters /> 
            </Suspense>
            {/* Static content that renders immediately */}
            {/* <Intro /> */}

            {/* Dynamic content that streams in */}
              <DynamicHomeContent />
          </div>
        </Container>
      </div>
    </>
  );
}
