import { defineTable } from "convex/server";
import { projectFields } from "../fields/projects";

/**
 * Index definitions for projects table
 */
export const projectsTable = defineTable(projectFields)
  .index("by_author", ["author"])
  .index("by_status", ["status"]);
