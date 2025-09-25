import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

export const createProject = mutation({
  args: {
    name: v.string(),
    url: v.optional(v.string()),
    github: v.optional(v.string()),
    problem: v.string(),
    status: v.union(v.literal("active"), v.literal("completed"), v.literal("archived")),
    author: v.id("users"),
    description: v.optional(v.string()),
    technologies: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();

    if (!args.url) {
      args.url = '';
    }
    if (!args.github) {
      args.github = '';
    }

    return await ctx.db.insert("projects", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateProject = mutation({
  args: {
    projectId: v.id("projects"),
    name: v.string(),
    url: v.optional(v.string()),
    github: v.optional(v.string()),
    problem: v.string(),
    status: v.union(v.literal("active"), v.literal("completed"), v.literal("archived")),
    description: v.optional(v.string()),
    technologies: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { projectId, ...updateData } = args;

    if (!args.url) {
      args.url = '';
    }
    if (!args.github) {
      args.github = '';
    }

    // Check if project exists
    const project = await ctx.db.get(projectId);
    if (!project) {
      throw new Error("Project not found");
    }
    
    return await ctx.db.patch(projectId, {
      ...updateData,
      updatedAt: new Date().toISOString(),
    });
  },
});

export const deleteProject = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    // Check if project exists
    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project not found");
    }
    
    return await ctx.db.delete(args.projectId);
  },
});

export const getProjects = query({
  args: {
    paginationOpts: paginationOptsValidator,
    status: v.optional(v.union(v.literal("active"), v.literal("completed"), v.literal("archived"))),
    author: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const { paginationOpts, status, author } = args;
    
    let query;
    
    if (status) {
      query = ctx.db.query("projects").withIndex("by_status", (q) => q.eq("status", status));
    } else if (author) {
      query = ctx.db.query("projects").withIndex("by_author", (q) => q.eq("author", author));
    } else {
      query = ctx.db.query("projects").withIndex("by_created_at");
    }
    
    return await query.order("desc").paginate(paginationOpts);
  },
});

export const getProjectById = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.projectId);
  },
});

export const getProjectsByAuthor = query({
  args: {
    authorId: v.id("users"),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const { authorId, paginationOpts } = args;
    
    return await ctx.db.query("projects")
      .withIndex("by_author", (q) => q.eq("author", authorId))
      .order("desc")
      .paginate(paginationOpts);
  },
});

export const getAllProjects = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("projects")
      .withIndex("by_created_at")
      .order("desc")
      .collect();
  },
});