# Partial Pre-rendering (PPR) with Convex - Usage Guide

This guide explains how to use the implemented PPR setup with Convex queries for your blog application.

## 🚀 **What's Been Implemented**

### **1. Server Components with Convex Integration**
- ✅ **HeroPost**: Server component that fetches the featured post
- ✅ **MoreStories**: Server component that fetches additional posts
- ✅ **SearchAndFilters**: Client component for interactive search/filtering

### **2. Partial Pre-rendering (PPR)**
- ✅ **Static Shell**: The page structure is pre-rendered
- ✅ **Dynamic Islands**: Search results update dynamically
- ✅ **Suspense Boundaries**: Proper loading states for each section

### **3. Comprehensive Search & Filtering**
- ✅ **Text Search**: Search by title, excerpt, or content
- ✅ **Sorting**: Sort by date or title (ascending/descending)
- ✅ **Filtering**: Filter by author, preview status, date range
- ✅ **Pagination**: Configurable posts per page
- ✅ **URL State**: All filters are reflected in the URL

## 📋 **How It Works**

### **URL Structure**
Your search and filters are reflected in the URL:
```
/?search=react&sortField=title&sortOrder=asc&preview=false&limit=20
```

### **Component Architecture**
```
page.tsx (Server Component)
├── SearchAndFilters (Client Component) - Interactive UI
├── HeroPost (Server Component) - Featured post
└── MoreStories (Server Component) - Additional posts
```

### **Data Flow**
1. **URL Parameters** → Parsed in `page.tsx`
2. **Search Parameters** → Passed to server components
3. **Convex Queries** → Fetch data using `fetchQuery`
4. **Suspense Boundaries** → Handle loading states
5. **Client Interactions** → Update URL via `SearchAndFilters`

## 🎯 **Usage Examples**

### **Basic Search**
```
/?search=react
```
Searches for posts containing "react" in title, excerpt, or content.

### **Advanced Filtering**
```
/?search=tutorial&sortField=date&sortOrder=desc&preview=false&dateFrom=2024-01-01&limit=20
```
- Search for "tutorial"
- Sort by date (newest first)
- Only published posts (no previews)
- From January 1, 2024
- Show 20 posts per page

### **Author Filtering**
```
/?author=author_id_here&sortField=title&sortOrder=asc
```
Show posts by specific author, sorted alphabetically by title.

## 🔧 **Component Props**

### **HeroPost Props**
```typescript
type Props = {
  search?: string;
  sortField?: "date" | "title";
  sortOrder?: "asc" | "desc";
  author?: Id<"authors">;
  preview?: boolean;
  dateFrom?: string;
  dateTo?: string;
};
```

### **MoreStories Props**
```typescript
type Props = {
  search?: string;
  sortField?: "date" | "title";
  sortOrder?: "asc" | "desc";
  limit?: number;
  author?: Id<"authors">;
  preview?: boolean;
  dateFrom?: string;
  dateTo?: string;
};
```

## 🎨 **UI Features**

### **SearchAndFilters Component**
- **Search Input**: Real-time search with Enter key support
- **Active Filters**: Visual badges showing current filters
- **Advanced Filters**: Collapsible panel with all filter options
- **Clear All**: One-click filter reset
- **Responsive Design**: Works on all screen sizes

### **Filter Options**
- **Search**: Text search across title, excerpt, content
- **Sort By**: Date or Title
- **Sort Order**: Ascending or Descending
- **Preview Status**: All, Published Only, or Preview Only
- **Date Range**: From/To date pickers
- **Author**: Author ID input
- **Limit**: Posts per page (5, 10, 20, 50)

## ⚡ **Performance Features**

### **Partial Pre-rendering Benefits**
- **Static Shell**: Page structure loads instantly
- **Dynamic Islands**: Only search results update
- **Suspense Boundaries**: Smooth loading transitions
- **Convex Caching**: Automatic query result caching

### **Loading States**
- **HeroPost**: Skeleton loader with image placeholder
- **MoreStories**: Grid of skeleton cards
- **SearchAndFilters**: Instant UI updates

## 🛠 **Customization**

### **Adding New Filters**
1. Update the `SearchParams` type in `page.tsx`
2. Add the filter to `SearchAndFilters` component
3. Pass the filter to server components
4. Update Convex queries if needed

### **Modifying Search Logic**
Edit the Convex queries in `convex/posts.ts`:
- `getPostsSimple`: For server components
- `getPosts`: For client-side pagination
- `searchPosts`: For full-text search

### **Styling**
All components use Tailwind CSS and Shadcn UI:
- Consistent design system
- Responsive layouts
- Accessible components
- Dark mode support

## 🚨 **Important Notes**

### **Server vs Client Components**
- **Server Components**: Use `fetchQuery` for data fetching
- **Client Components**: Use `useQuery` or `usePaginatedQuery`
- **PPR**: Server components are pre-rendered, client components are hydrated

### **Convex Integration**
- **Server Components**: Must use `fetchQuery` from `convex/nextjs`
- **Client Components**: Use hooks from `convex/react`
- **Type Safety**: Full TypeScript support with generated types

### **URL State Management**
- All filters are reflected in the URL
- Browser back/forward works correctly
- Shareable URLs with current filter state
- SEO-friendly URLs

## 🔍 **Debugging**

### **Check Query Results**
```typescript
// In your server components, you can log results:
console.log("Posts fetched:", posts);
```

### **Monitor Network Requests**
- Convex queries are automatically cached
- Check browser dev tools for network activity
- Suspense boundaries show loading states

### **URL Parameters**
- All search parameters are visible in the URL
- Use browser dev tools to inspect URL changes
- Test different parameter combinations

## 🎉 **Ready to Use!**

Your PPR setup is now complete and ready for production! The system provides:

- ⚡ **Fast Loading**: Static shell with dynamic islands
- 🔍 **Powerful Search**: Comprehensive filtering options
- 📱 **Responsive Design**: Works on all devices
- 🎨 **Modern UI**: Clean, accessible interface
- 🚀 **Performance**: Optimized Convex queries with caching
- 🔧 **Maintainable**: Clean, typed codebase

Start by visiting your homepage and try the search and filter functionality!
