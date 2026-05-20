import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  mosques: defineTable({
    name: v.string(),
    region: v.string(),
    district: v.string(),
    imam: v.string(),
    capacity: v.number(),
    status: v.string(),
    waqf: v.boolean(),
  }).index("by_region", ["region"]),

  waqfAssets: defineTable({
    name: v.string(),
    type: v.string(),
    region: v.string(),
    areaM2: v.optional(v.number()),
    units: v.optional(v.number()),
    status: v.string(),
    value: v.string(),
    mosqueId: v.optional(v.id("mosques")),
  }).index("by_region", ["region"]),

  announcements: defineTable({
    type: v.string(),
    title: v.string(),
    titleSomali: v.string(),
    titleArabic: v.string(),
    content: v.string(),
    date: v.string(),
    author: v.string(),
    urgent: v.boolean(),
    channels: v.array(v.string()),
  }).index("by_type", ["type"]).index("by_date", ["date"]),

  publications: defineTable({
    type: v.string(),
    title: v.string(),
    titleArabic: v.string(),
    scholar: v.string(),
    date: v.string(),
    downloads: v.number(),
    language: v.string(),
  }).index("by_type", ["type"]),
});
