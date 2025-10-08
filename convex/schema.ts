import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
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
  })
    .index("by_date", ["date"])
    .index("by_author", ["author"])
    .index("by_slug", ["slug"])
    .index("by_preview", ["preview"])
    .index("by_date_preview", ["date", "preview"])
    .index("by_views", ["views"])
    .index("by_tags", ["tags"]),

  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
    avatarUrl: v.optional(v.string()),
    email: v.optional(v.string()),
    fullName: v.optional(v.string()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    username: v.optional(v.string()),
    bio: v.optional(v.string()),
    location: v.optional(v.string()),
    website: v.optional(v.string()),
    socialLinks: v.optional(v.array(v.string())),
    role: v.optional(v.string()),
  }).index("by_token", ["tokenIdentifier"]),

  projects: defineTable({
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
  })
    .index("by_author", ["author"])
    .index("by_status", ["status"]),
});
