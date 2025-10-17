# Modular Schema Structure

This directory contains a modular schema structure that separates field definitions from table definitions, making them reusable across different parts of the application.

## Directory Structure

```
convex/
├── fields/           # Field definitions
│   ├── index.ts     # Central export for all fields
│   ├── posts.ts     # Post field definitions
│   ├── users.ts     # User field definitions
│   └── projects.ts  # Project field definitions
├── tables/          # Table definitions with indexes
│   ├── posts.ts     # Posts table with indexes
│   ├── users.ts     # Users table with indexes
│   └── projects.ts  # Projects table with indexes
└── schema.ts        # Main schema definition
```

## Usage Examples

### Importing Field Definitions

```typescript
// Import specific field definitions
import { postFields, postCoreFields } from "./convex/fields/posts";
import { userFields, userProfileFields } from "./convex/fields/users";

// Import all field definitions
import { postFields, userFields, projectFields } from "./convex/fields";
```

### Using Field Subsets

```typescript
// Use core fields for basic operations
import { postCoreFields } from "./convex/fields/posts";

// Use content fields for rich text operations
import { postContentFields } from "./convex/fields/posts";

// Use metadata fields for SEO and analytics
import { postMetadataFields } from "./convex/fields/posts";
```

### Type Safety

```typescript
// Get type-safe field names
import { postFieldNames, userFieldNames } from "./convex/fields";

// Use project status type
import { ProjectStatus } from "./convex/fields/projects";
```

## Benefits

1. **Reusability**: Field definitions can be imported and used in queries, mutations, and other parts of the application
2. **Type Safety**: TypeScript types are automatically inferred from field definitions
3. **Maintainability**: Changes to field definitions are centralized and automatically propagate
4. **Organization**: Related fields are grouped together logically
5. **Flexibility**: Field subsets can be created for different use cases

## Field Subsets

Each entity has predefined field subsets for common use cases:

### Posts
- `postCoreFields`: Essential fields (slug, title, excerpt, date, author)
- `postContentFields`: Content-related fields (content, richContent)
- `postMetadataFields`: SEO and analytics fields (ogImage, coverImage, tags, views)

### Users
- `userCoreFields`: Essential fields (name, tokenIdentifier, email)
- `userProfileFields`: Profile information (fullName, firstName, lastName, username, bio, avatarUrl)
- `userSocialFields`: Social links and location (location, website, socialLinks)
- `userSystemFields`: System-level fields (role)

### Projects
- `projectCoreFields`: Essential fields (name, problem, status, author)
- `projectDetailsFields`: Detailed information (description, technologies)
- `projectLinksFields`: External links (url, github)
- `projectSystemFields`: System-level fields (updatedAt)

## Migration Notes

The original schema has been split into modular components while maintaining backward compatibility. All existing queries and mutations will continue to work without changes.
