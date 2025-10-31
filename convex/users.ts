import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { internalMutation, QueryCtx } from "./_generated/server";
import { UserJSON } from "@clerk/backend";
import { Validator } from "convex/values";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    // Use identity.subject (Clerk user ID) instead of tokenIdentifier for consistency
    // with getUserByClerkId and upsertFromClerk
    const clerkUserId = identity.subject;
    
    // Check if we've already stored this identity before (new format: exact match)
    let user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", clerkUserId),
      )
      .unique();
    
    // If not found, check for old format (tokenIdentifier ends with clerkId)
    if (user === null) {
      const allUsers = await ctx.db.query("users").collect();
      user = allUsers.find((u) => 
        u.tokenIdentifier.endsWith(`#${clerkUserId}`) ||
        u.tokenIdentifier.endsWith(clerkUserId)
      ) ?? null;
      
      // If found with old format, update to new format
      if (user !== null) {
        await ctx.db.patch(user._id, { 
          tokenIdentifier: clerkUserId,
          name: identity.name ?? user.name,
        });
      }
    }
    
    if (user !== null) {
      // If we've seen this identity before but the name has changed, patch the value.
      if (user.name !== identity.name) {
        await ctx.db.patch(user._id, { name: identity.name });
      }
      return user._id;
    }
    // If it's a new identity, create a new `User`.
    return await ctx.db.insert("users", {
      name: identity.name ?? "Anonymous",
      tokenIdentifier: clerkUserId,
      avatarUrl: identity.imageUrl as string,
    });
  },
});

export const getUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const getUserById = query({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const searchUsers = query({
  args: { search: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("name"), args.search))
      .collect();
  },
});

export const getUserByTokenIdentifier = query({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("tokenIdentifier"), args.tokenIdentifier))
      .unique();
  },
});

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    // First try exact match (new format: tokenIdentifier = Clerk user ID)
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("tokenIdentifier"), args.clerkId))
      .unique();
    
    if (user) {
      return user;
    }
    
    // Fallback: check if tokenIdentifier ends with the clerkId (old format)
    // This handles cases where tokenIdentifier was stored as full identifier
    const allUsers = await ctx.db.query("users").collect();
    return allUsers.find((u) => 
      u.tokenIdentifier === args.clerkId || 
      u.tokenIdentifier.endsWith(`#${args.clerkId}`) ||
      u.tokenIdentifier.endsWith(args.clerkId)
    ) ?? null;
  },
});

export const current = query({
  args: {},
  handler: async (ctx) => {
    return await getCurrentUser(ctx);
  },
});

export const upsertFromClerk = internalMutation({
  args: { data: v.any() as Validator<UserJSON> }, // no runtime validation, trust Clerk
  async handler(ctx, { data }) {
    const userAttributes = {
      name: `${data.first_name} ${data.last_name}`,
      avatarUrl: data.image_url ?? "",
      email: data.email_addresses[0].email_address ?? "",
      fullName: data.first_name + " " + data.last_name,
      firstName: data.first_name ?? "",
      lastName: data.last_name ?? "",
      username: data.username ?? "",
      bio:
        typeof data.public_metadata.bio === "string"
          ? data.public_metadata.bio
          : "",
      location:
        typeof data.public_metadata.location === "string"
          ? data.public_metadata.location
          : "",
      website:
        typeof data.public_metadata.website === "string"
          ? data.public_metadata.website
          : "",
      socialLinks: Array.isArray(data.public_metadata.social_links)
        ? data.public_metadata.social_links
        : [],
      role:
        typeof data.public_metadata.role === "string"
          ? data.public_metadata.role
          : "",
      tokenIdentifier: data.id,
    };

    const user = await userByExternalId(ctx, data.id);
    if (user === null) {
      await ctx.db.insert("users", userAttributes);
    } else {
      await ctx.db.patch(user._id, userAttributes);
    }
  },
});

export const deleteFromClerk = internalMutation({
  args: { clerkUserId: v.string() },
  async handler(ctx, { clerkUserId }) {
    const user = await userByExternalId(ctx, clerkUserId);

    if (user !== null) {
      await ctx.db.delete(user._id);
      console.info("User deleted from Clerk webhook", {
        clerkUserId,
        userId: user._id,
      });
    } else {
      console.warn("Can't delete user, there is none for Clerk user ID", {
        clerkUserId,
      });
    }
  },
});

export async function getCurrentUserOrThrow(ctx: QueryCtx) {
  const userRecord = await getCurrentUser(ctx);
  if (!userRecord) throw new Error("Can't get current user");
  return userRecord;
}

export async function getCurrentUser(ctx: QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (identity === null) {
    return null;
  }
  return await userByExternalId(ctx, identity.subject);
}

async function userByExternalId(ctx: QueryCtx, externalId: string) {
  return await ctx.db
    .query("users")
    .withIndex("by_token", (q) => q.eq("tokenIdentifier", externalId))
    .unique();
}
