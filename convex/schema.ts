import { defineSchema } from "convex/server";
import { postsTable } from "./tables/posts";
import { usersTable } from "./tables/users";
import { projectsTable } from "./tables/projects";

/**
 * Main schema definition using modular table definitions
 * Field definitions are separated and can be reused across the application
 */
export default defineSchema({
  posts: postsTable,
  users: usersTable,
  projects: projectsTable,
});
