import { query } from "./_generated/server";
import { v } from "convex/values";

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    // Return sorted by date (descending string compare works for YYYY-MM-DD)
    const all = await ctx.db.query("announcements").collect();
    return all.sort((a, b) => b.date.localeCompare(a.date));
  },
});
