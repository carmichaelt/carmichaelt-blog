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
    preview: v.optional(v.boolean()),
  })
    .index("by_date", ["date"])
    .index("by_author", ["author"])
    .index("by_slug", ["slug"])
    .index("by_preview", ["preview"])
    .index("by_date_preview", ["date", "preview"]),
  
  
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
});