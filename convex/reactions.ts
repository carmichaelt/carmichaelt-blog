import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

import { reactionKind } from "./schema";

const visitorKey = v.string();
const slug = v.string();

function assertVisitorKey(value: string) {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)) {
    throw new Error("Invalid visitor key.");
  }
}

function assertSlug(value: string) {
  if (value.length === 0 || value.length > 120 || value.includes("/")) {
    throw new Error("Invalid slug.");
  }
}

export const getForSlug = query({
  args: { slug },
  handler: async (ctx, args) => {
    assertSlug(args.slug);
    const rows = await ctx.db
      .query("reactions")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .collect();

    const counts: Record<"stop" | "pause" | "think", number> = {
      stop: 0,
      pause: 0,
      think: 0,
    };

    for (const row of rows) {
      counts[row.kind] += 1;
    }

    return counts;
  },
});

export const listMine = query({
  args: { slug, visitorKey },
  handler: async (ctx, args) => {
    assertSlug(args.slug);
    assertVisitorKey(args.visitorKey);
    const rows = await ctx.db
      .query("reactions")
      .withIndex("by_slug_and_visitor", (q) =>
        q.eq("slug", args.slug).eq("visitorKey", args.visitorKey),
      )
      .collect();

    return rows.map((row) => row.kind);
  },
});

export const toggle = mutation({
  args: {
    slug,
    visitorKey,
    kind: reactionKind,
  },
  handler: async (ctx, args) => {
    assertSlug(args.slug);
    assertVisitorKey(args.visitorKey);

    const existing = await ctx.db
      .query("reactions")
      .withIndex("by_slug_visitor_kind", (q) =>
        q.eq("slug", args.slug).eq("visitorKey", args.visitorKey).eq("kind", args.kind),
      )
      .unique();

    if (existing) {
      await ctx.db.delete(existing._id);
      return { on: false };
    }

    await ctx.db.insert("reactions", {
      slug: args.slug,
      kind: args.kind,
      visitorKey: args.visitorKey,
    });
    return { on: true };
  },
});
