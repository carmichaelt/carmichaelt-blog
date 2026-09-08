import Link from "next/link";

import type { Project } from "@/lib/content";

type TechGroup = {
  tech: string;
  projects: Project[];
};

function groupTechnologies(projects: Project[]): TechGroup[] {
  const byTech = new Map<string, Project[]>();

  for (const project of projects) {
    for (const tech of project.technologies) {
      const existing = byTech.get(tech);
      if (existing) {
        existing.push(project);
      } else {
        byTech.set(tech, [project]);
      }
    }
  }

  return [...byTech.entries()]
    .map(([tech, grouped]) => ({ tech, projects: grouped }))
    .filter((group) => group.projects.length < projects.length)
    .sort((left, right) => {
      const byCount = right.projects.length - left.projects.length;
      if (byCount !== 0) return byCount;
      return left.tech.localeCompare(right.tech);
    });
}

export function TechUsage({ projects }: { projects: Project[] }) {
  const groups = groupTechnologies(projects);

  if (groups.length === 0) return null;

  return (
    <section className="mt-16 border-t border-white/10 pt-12">
      <h2 className="mb-2 text-2xl font-semibold tracking-tight">Across the products</h2>
      <p className="mb-8 text-zinc-400">
        Distinctive choices from the project writeups — not every shared default.
      </p>
      <ul className="divide-y divide-white/10">
        {groups.map((group) => (
          <li
            key={group.tech}
            className="flex flex-col gap-2 py-4 sm:flex-row sm:items-baseline sm:justify-between"
          >
            <p className="font-medium text-zinc-100">{group.tech}</p>
            <p className="text-sm text-zinc-500">
              {group.projects.map((project, index) => (
                <span key={project.slug}>
                  {index > 0 ? " · " : null}
                  <Link
                    href={`/projects#${project.slug}`}
                    className="text-zinc-400 transition-colors hover:text-emerald-300"
                  >
                    {project.name}
                  </Link>
                </span>
              ))}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
