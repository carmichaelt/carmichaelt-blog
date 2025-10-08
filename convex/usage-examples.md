# Convex Posts Query Usage Examples

This document provides comprehensive examples of how to use the enhanced posts queries with search, sorting, pagination, and filtering capabilities.

## Available Queries

### 1. `getPosts` - Main paginated query

The primary query for fetching posts with full pagination support.

```typescript
import { usePaginatedQuery } from "convex/react";
import { api } from "../convex/_generated/api";

function PostsList() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.posts.getPosts,
    {
      // Search functionality
      search: "react tutorial",

      // Sorting
      sortField: "date", // "date" | "title"
      sortOrder: "desc", // "asc" | "desc"

      // Filtering
      author: "author_id_here",
      preview: false, // Only published posts

      // Date range filtering
      dateFrom: "2024-01-01",
      dateTo: "2024-12-31",

      // Pagination options
      paginationOpts: { numItems: 10 }
    },
    { initialNumItems: 10 }
  );

  return (
    <div>
      {results.map((post) => (
        <div key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <span>{post.date}</span>
        </div>
      ))}
      {status === "CanLoadMore" && (
        <button onClick={() => loadMore(10)}>Load More</button>
      )}
    </div>
  );
}
```

### 2. `getPostsSimple` - Simple query without pagination

For cases where you need a simple list without pagination.

```typescript
import { useQuery } from "convex/react";

function RecentPosts() {
  const posts = useQuery(api.posts.getPostsSimple, {
    sortField: "date",
    sortOrder: "desc",
    limit: 5,
    preview: false, // Only published posts
  });

  if (!posts) return <div>Loading...</div>;

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
        </div>
      ))}
    </div>
  );
}
```

### 3. `getPostsCount` - Count query for pagination metadata

Get the total count of posts matching your filters.

```typescript
import { useQuery } from "convex/react";

function PostsCount() {
  const count = useQuery(api.posts.getPostsCount, {
    search: "react",
    preview: false,
    author: "author_id_here",
  });

  return <div>Total posts: {count || 0}</div>;
}
```

### 4. `getPostsByAuthor` - Author-specific posts with pagination

Get posts by a specific author with pagination.

```typescript
import { usePaginatedQuery } from "convex/react";

function AuthorPosts({ authorId }: { authorId: string }) {
  const { results, status, loadMore } = usePaginatedQuery(
    api.posts.getPostsByAuthor,
    {
      authorId,
      paginationOpts: { numItems: 10 }
    },
    { initialNumItems: 10 }
  );

  return (
    <div>
      <h2>Posts by Author</h2>
      {results.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
        </div>
      ))}
      {status === "CanLoadMore" && (
        <button onClick={() => loadMore(10)}>Load More</button>
      )}
    </div>
  );
}
```

### 5. `getRecentPosts` - Recent published posts

Get the most recent published posts.

```typescript
import { useQuery } from "convex/react";

function RecentPosts() {
  const posts = useQuery(api.posts.getRecentPosts, {
    limit: 5
  });

  if (!posts) return <div>Loading...</div>;

  return (
    <div>
      <h2>Recent Posts</h2>
      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <span>{post.date}</span>
        </div>
      ))}
    </div>
  );
}
```

### 6. `getPostBySlug` - Get single post by slug

Get a specific post by its slug.

```typescript
import { useQuery } from "convex/react";

function PostPage({ slug }: { slug: string }) {
  const post = useQuery(api.posts.getPostBySlug, { slug });

  if (!post) return <div>Loading...</div>;

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
```

### 7. `searchPosts` - Full-text search

Search posts with partial text matching.

```typescript
import { useQuery } from "convex/react";
import { useState } from "react";

function SearchPosts() {
  const [searchQuery, setSearchQuery] = useState("");
  const posts = useQuery(api.posts.searchPosts, {
    query: searchQuery,
    limit: 20
  });

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search posts..."
      />
      {posts && (
        <div>
          {posts.map((post) => (
            <div key={post._id}>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

## Advanced Usage Patterns

### Combining Multiple Filters

```typescript
const posts = useQuery(api.posts.getPostsSimple, {
  search: "react",
  author: "author_id",
  preview: false,
  dateFrom: "2024-01-01",
  dateTo: "2024-12-31",
  sortField: "date",
  sortOrder: "desc",
  limit: 20,
});
```

### Dynamic Filtering

```typescript
function FilterablePosts() {
  const [filters, setFilters] = useState({
    search: "",
    author: undefined,
    preview: undefined,
    dateFrom: undefined,
    dateTo: undefined,
  });

  const posts = useQuery(api.posts.getPostsSimple, {
    ...filters,
    sortField: "date",
    sortOrder: "desc",
    limit: 10
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
      />
      {/* Other filter controls */}
      {posts?.map(post => (
        <div key={post._id}>{post.title}</div>
      ))}
    </div>
  );
}
```

## Performance Considerations

1. **Use Indexes**: The queries are optimized to use appropriate indexes based on your filters
2. **Pagination**: Use `getPosts` with pagination for large datasets
3. **Search Limitations**: The current search implementation uses exact matches. For production apps, consider implementing full-text search
4. **Caching**: Convex automatically caches query results, so repeated queries with the same parameters will be fast

## Schema Requirements

Make sure your `convex/schema.ts` includes the necessary indexes:

```typescript
export default defineSchema({
  posts: defineTable({
    // ... your fields
  })
    .index("by_date", ["date"])
    .index("by_author", ["author"])
    .index("by_slug", ["slug"])
    .index("by_preview", ["preview"])
    .index("by_date_preview", ["date", "preview"]),
});
```

This comprehensive query system provides all the functionality you need for a modern blog application with efficient searching, sorting, pagination, and filtering capabilities.
