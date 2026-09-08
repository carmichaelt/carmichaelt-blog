import type { Metadata } from "next";
import Link from "next/link";

import { BackLink } from "@/components/site/back-link";
import { Container } from "@/components/site/container";
import { Markdown } from "@/components/site/markdown";
import { getAllProjects, type ProjectStatus } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of projects built with technologies and ideas that interest me.",
};

function statusLabel(status: ProjectStatus) {
  switch (status) {
    case "active":
      return "Active";
    case "in-development":
      return "In development";
    case "scaling-back":
      return "Scaling back";
    case "completed":
      return "Completed";
    case "archived":
      return "Archived";
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
}

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <Container className="py-16">
      <BackLink />
      <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Projects</h1>
      <p className="mb-12 max-w-2xl text-zinc-400">
        Things I have built to solve a problem or to learn something I could not leave alone.
      </p>
      <ul className="space-y-12">
        {projects.map((project) => (
          <li
            key={project.slug}
            id={project.slug}
            className="scroll-mt-20 border-t border-white/10 pt-8"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
                {project.name}
              </h2>
              <span className="text-xs tracking-[0.16em] text-emerald-400 uppercase">
                {statusLabel(project.status)}
              </span>
            </div>
            {project.problem ? <p className="mt-3 text-zinc-400">{project.problem}</p> : null}
            <div className="mt-4">
              <Markdown content={project.content} />
            </div>
            {project.technologies.length > 0 ? (
              <p className="mt-2 text-sm text-zinc-500">{project.technologies.join(" · ")}</p>
            ) : null}
            <div className="mt-4 flex gap-5 text-sm">
              {project.url ? (
                <Link href={project.url} className="text-emerald-400 hover:text-emerald-300">
                  Site
                </Link>
              ) : null}
              {project.github ? (
                <Link href={project.github} className="text-emerald-400 hover:text-emerald-300">
                  GitHub
                </Link>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
