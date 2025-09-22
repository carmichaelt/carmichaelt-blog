import { mutation, query } 
  from "./_generated/server";
import { v } from "convex/values";

export const createPost = mutation({
  args: {
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    ogImage: v.string(),
    coverImage: v.string(),
    date: v.string(),
    preview: v.optional(v.boolean()),
    content: v.string(),
    author: v.id("authors"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("posts", args);
  },
});

export const getPosts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("posts").collect();
  },
});

export const getPostBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.query("posts").filter((q) => q.eq(q.field("slug"), args.slug)).first();
  },
});