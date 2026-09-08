import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export type PostKind = "poem" | "essay";

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  kind: PostKind;
  content: string;
};

export type ProjectStatus = "active" | "in-development" | "scaling-back" | "completed" | "archived";

export type Project = {
  slug: string;
  name: string;
  url?: string;
  github?: string;
  status: ProjectStatus;
  problem: string;
  technologies: string[];
  content: string;
};

export type MarkdownPage = {
  slug: string;
  title: string;
  description?: string;
  content: string;
};

function readMarkdownFiles(directory: string) {
  const fullPath = path.join(contentDirectory, directory);
  if (!fs.existsSync(fullPath)) return [];

  return fs
    .readdirSync(fullPath)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(fullPath, file), "utf8");
      const parsed = matter(raw);
      return { slug, data: parsed.data, content: parsed.content.trim() };
    });
}

function isPostKind(value: unknown): value is PostKind {
  return value === "poem" || value === "essay";
}

function isProjectStatus(value: unknown): value is ProjectStatus {
  return (
    value === "active" ||
    value === "in-development" ||
    value === "scaling-back" ||
    value === "completed" ||
    value === "archived"
  );
}

const projectStatusOrder: Record<ProjectStatus, number> = {
  active: 0,
  "in-development": 1,
  "scaling-back": 2,
  completed: 3,
  archived: 4,
};

export function getAllPosts(): Post[] {
  return readMarkdownFiles("posts")
    .map(({ slug, data, content }) => ({
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? ""),
      excerpt: String(data.excerpt ?? ""),
      kind: isPostKind(data.kind) ? data.kind : "essay",
      content,
    }))
    .sort((left, right) => (left.date > right.date ? -1 : 1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getAllProjects(): Project[] {
  return readMarkdownFiles("projects")
    .map(({ slug, data, content }) => ({
      slug,
      name: String(data.name ?? slug),
      url: data.url ? String(data.url) : undefined,
      github: data.github ? String(data.github) : undefined,
      status: isProjectStatus(data.status) ? data.status : "active",
      problem: String(data.problem ?? ""),
      technologies: Array.isArray(data.technologies)
        ? data.technologies.map((item) => String(item))
        : [],
      content,
    }))
    .sort((left, right) => {
      const byStatus = projectStatusOrder[left.status] - projectStatusOrder[right.status];
      if (byStatus !== 0) return byStatus;
      return left.name.localeCompare(right.name);
    });
}

export function getPage(slug: string): MarkdownPage | undefined {
  return readMarkdownFiles("pages")
    .map(({ slug: pageSlug, data, content }) => ({
      slug: pageSlug,
      title: String(data.title ?? pageSlug),
      description: data.description ? String(data.description) : undefined,
      content,
    }))
    .find((page) => page.slug === slug);
}
