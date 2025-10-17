import { defineTable } from "convex/server";
import { postFields } from "../fields/posts";

/**
 * Index definitions for posts table
 */
export const postsTable = defineTable(postFields)
  .index("by_date", ["date"])
  .index("by_author", ["author"])
  .index("by_slug", ["slug"])
  .index("by_preview", ["preview"])
  .index("by_date_preview", ["date", "preview"])
  .index("by_views", ["views"])
  .index("by_tags", ["tags"]);
