import { defineSchema } from "convex/server";
import { userFields } from "./users";
import { defineTable } from "convex/server";
import { postFields } from "./posts";
import { projectFields } from "./projects";


/**
 * Main schema definition using modular table definitions
 * Field definitions are separated and can be reused across the application
 */
export default defineSchema({
  posts: defineTable(postFields)
  .index("by_date", ["date"])
  .index("by_author", ["author"])
  .index("by_slug", ["slug"])
  .index("by_preview", ["preview"])
  .index("by_date_preview", ["date", "preview"])
  .index("by_views", ["views"])
  .index("by_tags", ["tags"]),
  
  users: defineTable(userFields)
  .index("by_token", ["tokenIdentifier"]),

  projects: defineTable(projectFields)
  .index("by_author", ["author"])
  .index("by_status", ["status"]),
});





