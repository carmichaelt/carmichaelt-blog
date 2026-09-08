import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BackLink } from "@/components/site/back-link";
import { Container } from "@/components/site/container";
import { Markdown } from "@/components/site/markdown";
import { TechUsage } from "@/components/site/tech-usage";
import { getAllProjects, getPage } from "@/lib/content";

const page = getPage("tech-stack");

export const metadata: Metadata = {
  title: page?.title ?? "Tech Stack",
  description: page?.description,
};

export default function TechStackPage() {
  if (!page) notFound();

  const projects = getAllProjects();

  return (
    <Container className="py-16">
      <BackLink />
      <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{page.title}</h1>
      {page.description ? <p className="mb-10 text-zinc-400">{page.description}</p> : null}
      <Markdown content={page.content} />
      <TechUsage projects={projects} />
    </Container>
  );
}
