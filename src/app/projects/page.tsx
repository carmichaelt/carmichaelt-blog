import Container from "@/app/_components/container";
import { ProjectsTable } from "@/app/_components/projects-table";
import { CreateProjectButton } from "@/app/_components/create-project-button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const experimental_ppr = true;

export default async function Projects() {
  return (
    <>
      <div className="flex flex-1 mt-16">
        <Container>
          <div className="flex min-w-[400px] max-w-[800px] mx-auto flex-col">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between">
              <Link
                href="/"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </div>
            <div className="space-y-8 w-full">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">
                  My Projects
                </h1>
                <CreateProjectButton />
              </div>
              <p className="text-gray-600">
                A collection of projects I&apos;ve built using technologies and
                concepts that interest me. Each project solves a specific
                problem or explores new ideas in web development, AI, and
                technology.
              </p>
              <ProjectsTable />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
