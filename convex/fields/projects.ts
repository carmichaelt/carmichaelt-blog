import { v } from "convex/values";
import { doc } from "convex-helpers/validators";
import schema from "../schema";

export const projectDocValidator = doc(schema, "projects");
/**
 * Field definitions for projects table
 * These can be reused across different parts of the application
 */
export const projectFields = {
  name: v.string(),
  url: v.optional(v.string()),
  github: v.optional(v.string()),
  problem: v.string(),
  status: v.union(
    v.literal("active"),
    v.literal("completed"),
    v.literal("archived"),
  ),
  author: v.id("users"),
  description: v.optional(v.string()),
  technologies: v.optional(v.array(v.string())),
  updatedAt: v.string(),
} as const;

/**
 * Type-safe field names for projects
 */
export const projectFieldNames = Object.keys(projectFields) as Array<keyof typeof projectFields>;

/**
 * Project status type for type safety
 */
export type ProjectStatus = "active" | "completed" | "archived";

/**
 * Common project field subsets for different use cases
 */
export const projectCoreFields = {
  name: projectFields.name,
  problem: projectFields.problem,
  status: projectFields.status,
  author: projectFields.author,
} as const;

export const projectDetailsFields = {
  description: projectFields.description,
  technologies: projectFields.technologies,
} as const;

export const projectLinksFields = {
  url: projectFields.url,
  github: projectFields.github,
} as const;

export const projectSystemFields = {
  updatedAt: projectFields.updatedAt,
} as const;
