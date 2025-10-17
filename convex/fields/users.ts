import { v } from "convex/values";
import { doc } from "convex-helpers/validators";
import schema from "../schema";

export const userDocValidator = doc(schema, "users");
/**
 * Field definitions for users table
 * These can be reused across different parts of the application
 */
export const userFields = {
  name: v.string(),
  tokenIdentifier: v.string(),
  avatarUrl: v.optional(v.string()),
  email: v.optional(v.string()),
  fullName: v.optional(v.string()),
  firstName: v.optional(v.string()),
  lastName: v.optional(v.string()),
  username: v.optional(v.string()),
  bio: v.optional(v.string()),
  location: v.optional(v.string()),
  website: v.optional(v.string()),
  socialLinks: v.optional(v.array(v.string())),
  role: v.optional(v.string()),
} as const;

/**
 * Type-safe field names for users
 */
export const userFieldNames = Object.keys(userFields) as Array<keyof typeof userFields>;

/**
 * Common user field subsets for different use cases
 */
export const userCoreFields = {
  name: userFields.name,
  tokenIdentifier: userFields.tokenIdentifier,
  email: userFields.email,
} as const;

export const userProfileFields = {
  fullName: userFields.fullName,
  firstName: userFields.firstName,
  lastName: userFields.lastName,
  username: userFields.username,
  bio: userFields.bio,
  avatarUrl: userFields.avatarUrl,
} as const;

export const userSocialFields = {
  location: userFields.location,
  website: userFields.website,
  socialLinks: userFields.socialLinks,
} as const;

export const userSystemFields = {
  role: userFields.role,
} as const;
