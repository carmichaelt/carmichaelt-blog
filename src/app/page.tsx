import Container from "@/app/_components/container";
import { AboutHomeContent } from "@/app/_components/about-home-content";

export const experimental_ppr = true;

export default async function Index() {
  return (
    <>
      <div className="flex flex-1 mt-16">
        <Container>
          <div className="flex min-w-[400px] max-w-[600px] mx-auto">
            <AboutHomeContent />
          </div>
        </Container>
      </div>
    </>
  );
}