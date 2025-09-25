import Container from "@/app/_components/container";
import { TechStackContent } from "./_components/tech-stack-content";

export const experimental_ppr = true;

export default async function TechStack() {
  return (
    <>
      <div className="flex flex-1 mt-16 mb-16">
        <Container>
          <div className="flex min-w-[400px] max-w-[1200px] mx-auto">
            <div className="space-y-8 w-full">
              <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight">Tech Stack</h1>
                <p className="text-gray-600 mt-2">
                  Technologies and tools I use to build modern web applications
                </p>
              </div>
              <TechStackContent />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}