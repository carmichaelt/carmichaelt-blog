import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BackLink } from "@/components/site/back-link";
import { Container } from "@/components/site/container";
import { Markdown } from "@/components/site/markdown";
import { getPage } from "@/lib/content";

const page = getPage("things-i-believe");

export const metadata: Metadata = {
  title: page?.title ?? "Things I Believe",
  description: page?.description,
};

export default function ThingsIBelievePage() {
  if (!page) notFound();

  return (
    <Container className="py-16">
      <BackLink />
      <h1 className="mb-2 text-3xl font-bold tracking-tight text-emerald-400 sm:text-4xl">
        {page.title}
      </h1>
      <p className="mb-10 text-sm text-zinc-500">By Tom Carmichael</p>
      <Markdown content={page.content} />
    </Container>
  );
}
