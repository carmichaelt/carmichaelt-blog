import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAuthorById = query({
  args: { id: v.id("authors") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getAuthors = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("authors").collect();
  },
});

export const createAuthor = mutation({
  args: {
    name: v.string(),
    avatar: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("authors", args);
  },
});

export const updateAuthor = mutation({
  args: {
    id: v.id("authors"),
    name: v.string(),
    avatar: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, args);
  },
});

export const deleteAuthor = mutation({
  args: { id: v.id("authors") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

export const getAuthorByName = query({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.query("authors").filter((q) => q.eq(q.field("name"), args.name)).first();
  },
});