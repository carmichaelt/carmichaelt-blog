import Container from "@/app/_components/container";
import { ProjectsTable } from "@/app/_components/projects-table";

export const experimental_ppr = true;

export default async function Projects() {
  return (
    <>
      <div className="flex flex-1 mt-16">
        <Container>
          <div className="flex min-w-[400px] max-w-[800px] mx-auto">
            <div className="space-y-8 w-full">
              <h1 className="text-3xl font-bold tracking-tight">My Projects</h1>
              <p className="text-gray-600">
                A collection of projects I've built using technologies and concepts that interest me. 
                Each project solves a specific problem or explores new ideas in web development, AI, and technology.
              </p>
              <ProjectsTable />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}