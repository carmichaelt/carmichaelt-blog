import Container from "@/app/_components/container";
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


  return (
    <>
      
      
      <div className="flex-1">
        <Container>
          <div className="space-y-8">
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