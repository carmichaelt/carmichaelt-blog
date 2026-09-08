import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const reactionKind = v.union(v.literal("stop"), v.literal("pause"), v.literal("think"));

export default defineSchema({
  reactions: defineTable({
    slug: v.string(),
    kind: reactionKind,
    visitorKey: v.string(),
  })
    .index("by_slug", ["slug"])
    .index("by_slug_and_kind", ["slug", "kind"])
    .index("by_slug_and_visitor", ["slug", "visitorKey"])
    .index("by_slug_visitor_kind", ["slug", "visitorKey", "kind"]),
});
