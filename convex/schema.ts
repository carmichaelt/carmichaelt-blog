import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    slug: v.string(),
    title: v.string(),
    content: v.string(),
    author: v.id("authors"),
    excerpt: v.string(),
    ogImage: v.string(),
    coverImage: v.string(),
    date: v.string(),
    preview: v.optional(v.boolean()),
  }),
  authors: defineTable({
    name: v.string(),
    avatar: v.string(),
  }),
});