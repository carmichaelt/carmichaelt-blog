import Container from "@/app/_components/container";
import { AboutHomeContent } from "@/app/_components/about-home-content";

export const experimental_ppr = true;

export default async function Index() {
  return (
    <>
      <div className="flex flex-1 mt-16">
        <Container>
          <div className="flex w-full max-w-4xl mx-auto">
            <AboutHomeContent />
          </div>
        </Container>
      </div>
    </>
  );
}
