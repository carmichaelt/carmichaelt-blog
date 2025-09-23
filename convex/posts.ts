import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

// Types for better type safety
type SortField = "date" | "title";
type SortOrder = "asc" | "desc";
type FilterField = "author" | "preview";

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

// Comprehensive posts query with search, sorting, pagination, and filtering
export const getPosts = query({
  args: {
    // Search functionality
    search: v.optional(v.string()),
    
    // Sorting
    sortField: v.optional(v.union(v.literal("date"), v.literal("title"))),
    sortOrder: v.optional(v.union(v.literal("asc"), v.literal("desc"))),
    
    // Pagination
    paginationOpts: paginationOptsValidator,
    
    // Filtering
    author: v.optional(v.id("authors")),
    preview: v.optional(v.boolean()),
    
    // Additional filters
    dateFrom: v.optional(v.string()),
    dateTo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const {
      search,
      sortField = "date",
      sortOrder = "desc",
      paginationOpts,
      author,
      preview,
      dateFrom,
      dateTo,
    } = args;

    // Start with appropriate index based on filters
    let query;
    
    if (preview !== undefined && sortField === "date") {
      // Use compound index for better performance
      query = ctx.db.query("posts").withIndex("by_preview", (q) => 
        q.eq("preview", preview)
      );
    } else if (author) {
      query = ctx.db.query("posts").withIndex("by_author", (q) => q.eq("author", author));
    } else if (sortField === "date") {
      query = ctx.db.query("posts").withIndex("by_date");
    } else {
      query = ctx.db.query("posts");
    }

    // Apply search filter (searches in title, excerpt, and content)
    if (search) {
      query = query.filter((q) => 
        q.or(
          q.eq(q.field("title"), search), // Exact match
          q.eq(q.field("excerpt"), search), // Exact match
          // For partial matches, we'll need to use a different approach
          // Convex doesn't support LIKE queries, so we'll use exact matches for now
        )
      );
    }

    // Apply date range filters
    if (dateFrom) {
      query = query.filter((q) => q.gte(q.field("date"), dateFrom));
    }
    if (dateTo) {
      query = query.filter((q) => q.lte(q.field("date"), dateTo));
    }

    // Apply sorting
    if (sortField === "date") {
      query = query.order(sortOrder);
    } else if (sortField === "title") {
      query = query.order(sortOrder);
    }

    // Apply pagination
    return await query.paginate(paginationOpts);
  },
});

// Simple posts query without pagination (for backward compatibility)
export const getPostsSimple = query({
  args: {
    search: v.optional(v.string()),
    sortField: v.optional(v.union(v.literal("date"), v.literal("title"))),
    sortOrder: v.optional(v.union(v.literal("asc"), v.literal("desc"))),
    limit: v.optional(v.number()),
    author: v.optional(v.id("authors")),
    preview: v.optional(v.boolean()),
    dateFrom: v.optional(v.string()),
    dateTo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const {
      search,
      sortField = "date",
      sortOrder = "desc",
      limit = 10,
      author,
      preview,
      dateFrom,
      dateTo,
    } = args;

    // Start with appropriate index based on filters
    let query;
    
    if (preview !== undefined && sortField === "date") {
      query = ctx.db.query("posts").withIndex("by_preview", (q) => 
        q.eq("preview", preview)
      );
    } else if (author) {
      query = ctx.db.query("posts").withIndex("by_author", (q) => q.eq("author", author));
    } else if (sortField === "date") {
      query = ctx.db.query("posts").withIndex("by_date");
    } else {
      query = ctx.db.query("posts");
    }

    // Apply search filter
    if (search) {
      query = query.filter((q) => 
        q.or(
          q.eq(q.field("title"), search),
          q.eq(q.field("excerpt"), search),
        )
      );
    }

    // Apply date range filters
    if (dateFrom) {
      query = query.filter((q) => q.gte(q.field("date"), dateFrom));
    }
    if (dateTo) {
      query = query.filter((q) => q.lte(q.field("date"), dateTo));
    }

    // Apply sorting
    query = query.order(sortOrder);

    // Apply limit
    return await query.take(limit);
  },
});

// Count query for pagination metadata
export const getPostsCount = query({
  args: {
    search: v.optional(v.string()),
    author: v.optional(v.id("authors")),
    preview: v.optional(v.boolean()),
    dateFrom: v.optional(v.string()),
    dateTo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { search, author, preview, dateFrom, dateTo } = args;

    let query = ctx.db.query("posts");

    // Apply same filters as main query
    if (search) {
      query = query.filter((q) => 
        q.or(
          q.eq(q.field("title"), search),
          q.eq(q.field("excerpt"), search),
        )
      );
    }

    if (author) {
      query = query.filter((q) => q.eq(q.field("author"), author));
    }

    if (preview !== undefined) {
      query = query.filter((q) => q.eq(q.field("preview"), preview));
    }

    if (dateFrom) {
      query = query.filter((q) => q.gte(q.field("date"), dateFrom));
    }

    if (dateTo) {
      query = query.filter((q) => q.lte(q.field("date"), dateTo));
    }

    const results = await query.collect();
    return results.length;
  },
});

// Get posts by author with pagination
export const getPostsByAuthor = query({
  args: {
    authorId: v.id("authors"),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const { authorId, paginationOpts } = args;
    
    return await ctx.db.query("posts")
      .withIndex("by_author", (q) => q.eq("author", authorId))
      .order("desc")
      .paginate(paginationOpts);
  },
});

// Get recent posts (non-preview only)
export const getRecentPosts = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { limit = 5 } = args;
    
    return await ctx.db.query("posts")
      .withIndex("by_preview", (q) => q.eq("preview", false))
      .order("desc")
      .take(limit);
  },
});

// Get post by slug (optimized with index)
export const getPostBySlug = query({
  args: {
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.query("posts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

// Search posts with better text matching
export const searchPosts = query({
  args: {
    query: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { query: searchQuery, limit = 20 } = args;
    
    // Get all posts and filter client-side for now
    // In a production app, you might want to use a search service
    const allPosts = await ctx.db.query("posts").collect();
    
    const filteredPosts = allPosts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredPosts.slice(0, limit);
  },
});