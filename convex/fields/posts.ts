import { v } from "convex/values";
import { doc } from "convex-helpers/validators";
import schema from "../schema";

export const postDocValidator = doc(schema, "posts");


/**
 * Field definitions for posts table
 * These can be reused across different parts of the application
 */
export const postFields = {
  slug: v.string(),
  title: v.string(),
  content: v.string(), // Keep as string for backward compatibility
  richContent: v.optional(v.any()), // Rich text content as JSON
  author: v.id("users"),
  excerpt: v.string(),
  ogImage: v.string(),
  coverImage: v.string(),
  date: v.string(),
  updatedAt: v.optional(v.string()), // Last update timestamp
  preview: v.optional(v.boolean()),
  tags: v.optional(v.array(v.string())), // Array of tag strings
  views: v.optional(v.number()), // View count for popularity tracking
} as const;

/**
 * Type-safe field names for posts
 */
export const postFieldNames = Object.keys(postFields) as Array<keyof typeof postFields>;

/**
 * Common post field subsets for different use cases
 */
export const postCoreFields = {
  slug: postFields.slug,
  title: postFields.title,
  excerpt: postFields.excerpt,
  date: postFields.date,
  author: postFields.author,
} as const;

export const postContentFields = {
  content: postFields.content,
  richContent: postFields.richContent,
} as const;

export const postMetadataFields = {
  ogImage: postFields.ogImage,
  coverImage: postFields.coverImage,
  tags: postFields.tags,
  views: postFields.views,
} as const;
