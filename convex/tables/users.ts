import { defineTable } from "convex/server";
import { userFields } from "../fields/users";

/**
 * Index definitions for users table
 */
export const usersTable = defineTable(userFields)
  .index("by_token", ["tokenIdentifier"]);
