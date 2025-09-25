import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";
import { Id } from "./_generated/dataModel";

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
    richContent: v.optional(v.any()),
    author: v.id("users"),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("posts", {
      ...args,
      views: 0, // Initialize views to 0
    });
  },
});

// Increment post views
export const incrementPostViews = mutation({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.postId);
    if (!post) {
      throw new Error("Post not found");
    }
    
    const currentViews = post.views || 0;
    return await ctx.db.patch(args.postId, {
      views: currentViews + 1,
    });
  },
});

// Comprehensive posts query with search, sorting, pagination, and filtering
export const getPosts = query({
  args: {
    // Search functionality
    search: v.optional(v.string()),
    
    // Sorting
    sortField: v.optional(v.union(v.literal("date"), v.literal("title"), v.literal("views"))),
    sortOrder: v.optional(v.union(v.literal("asc"), v.literal("desc"))),
    
    // Pagination
    paginationOpts: paginationOptsValidator,
    
    // Filtering
    author: v.optional(v.id("users")),
    preview: v.optional(v.boolean()),
    tags: v.optional(v.array(v.string())), // Filter by tags
    
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
      tags,
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
    } else if (sortField === "views") {
      query = ctx.db.query("posts").withIndex("by_views");
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

    // Apply tag filters
    if (tags && tags.length > 0) {
      query = query.filter((q) => {
        // Check if any of the provided tags exist in the post's tags
        return q.or(
          ...tags.map(tag => 
            q.eq(q.field("tags"), [tag])
          )
        );
      });
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
    } else if (sortField === "views") {
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
    sortField: v.optional(v.union(v.literal("date"), v.literal("title"), v.literal("views"))),
    sortOrder: v.optional(v.union(v.literal("asc"), v.literal("desc"))),
    limit: v.optional(v.number()),
    author: v.optional(v.id("users")),
    preview: v.optional(v.boolean()),
    tags: v.optional(v.array(v.string())), // Filter by tags
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
      tags,
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
    } else if (sortField === "views") {
      query = ctx.db.query("posts").withIndex("by_views");
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

    // Apply tag filters
    if (tags && tags.length > 0) {
      query = query.filter((q) => {
        // Check if any of the provided tags exist in the post's tags
        return q.or(
          ...tags.map(tag => 
            q.eq(q.field("tags"), [tag])
          )
        );
      });
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
    author: v.optional(v.id("users")),
    preview: v.optional(v.boolean()),
    tags: v.optional(v.array(v.string())), // Filter by tags
    dateFrom: v.optional(v.string()),
    dateTo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { search, author, preview, tags, dateFrom, dateTo } = args;

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

    if (tags && tags.length > 0) {
      query = query.filter((q) => {
        // Check if any of the provided tags exist in the post's tags
        return q.or(
          ...tags.map(tag => 
            q.eq(q.field("tags"), [tag])
          )
        );
      });
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
    authorId: v.id("users"),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const { authorId, paginationOpts } = args;
    
    return await ctx.db.query("posts")
      .withIndex("by_author", (q) => q.eq("author", authorId as Id<"users">))
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

// Get all post slugs for static generation
export const getAllPostSlugs = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts")
      .withIndex("by_preview", (q) => q.eq("preview", false))
      .order("desc")
      .collect();
    
    return posts.map(post => ({ slug: post.slug }));
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

// Get all unique tags from posts
export const getAllTags = query({
  args: {},
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").collect();
    const allTags = new Set<string>();
    
    posts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => allTags.add(tag));
      }
    });
    
    return Array.from(allTags).sort();
  },
});

// Get popular posts (sorted by views)
export const getPopularPosts = query({
  args: {
    limit: v.optional(v.number()),
    preview: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { limit = 10, preview = false } = args;
    
    return await ctx.db.query("posts")
      .withIndex("by_preview", (q) => q.eq("preview", preview))
      .order("desc")
      .collect()
      .then(posts => 
        posts
          .filter(post => (post.views || 0) > 0)
          .sort((a, b) => (b.views || 0) - (a.views || 0))
          .slice(0, limit)
      );
  },
});

// Get posts by tag
export const getPostsByTag = query({
  args: {
    tag: v.string(),
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const { tag, paginationOpts } = args;
    
    return await ctx.db.query("posts")
      .filter((q) => q.eq(q.field("tags"), [tag]))
      .order("desc")
      .paginate(paginationOpts);
  },
});

// Update post mutation
export const updatePost = mutation({
  args: {
    postId: v.id("posts"),
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    ogImage: v.string(),
    coverImage: v.string(),
    preview: v.optional(v.boolean()),
    content: v.string(),
    richContent: v.optional(v.any()),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx, args) => {
    const { postId, ...updateData } = args;
    
    // Check if post exists
    const post = await ctx.db.get(postId);
    if (!post) {
      throw new Error("Post not found");
    }
    
    return await ctx.db.patch(postId, updateData);
  },
});

// Get post by ID (for editing)
export const getPostById = query({
  args: {
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.postId);
  },
});