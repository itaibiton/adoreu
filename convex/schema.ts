import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkUserId: v.string(),
    email: v.optional(v.string()),
    displayName: v.string(),
    handle: v.optional(v.string()),
    bio: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    homeCity: v.optional(v.string()),
    languages: v.optional(v.array(v.string())),
    interests: v.optional(v.array(v.string())),
    onboardingComplete: v.boolean(),
    settings: v.optional(
      v.object({
        presenceVisibilityDefault: v.optional(
          v.union(
            v.literal("friends"),
            v.literal("fof"),
            v.literal("hub"),
            v.literal("private")
          )
        ),
        dmFromStrangers: v.optional(v.boolean()),
      })
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_user_id", ["clerkUserId"])
    .index("by_handle", ["handle"]),

  trips: defineTable({
    userId: v.id("users"),
    city: v.string(),
    country: v.string(),
    startDate: v.number(),
    endDate: v.number(),
    visibility: v.union(
      v.literal("friends"),
      v.literal("fof"),
      v.literal("hub"),
      v.literal("private")
    ),
    isCurrent: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_dates", ["startDate", "endDate"])
    .index("by_city", ["city"]),

  presence: defineTable({
    userId: v.id("users"),
    city: v.string(),
    country: v.string(),
    status: v.union(v.literal("home"), v.literal("travel")),
    visibility: v.union(
      v.literal("friends"),
      v.literal("fof"),
      v.literal("hub"),
      v.literal("private")
    ),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_city", ["city"]),

  friends: defineTable({
    userId: v.id("users"),
    friendUserId: v.id("users"),
    status: v.union(
      v.literal("requested"),
      v.literal("accepted"),
      v.literal("blocked")
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_friend", ["friendUserId"])
    .index("by_pair", ["userId", "friendUserId"]),

  groups: defineTable({
    hostUserId: v.id("users"),
    city: v.string(),
    country: v.string(),
    title: v.string(),
    description: v.string(),
    tags: v.array(v.string()),
    windowStart: v.number(),
    windowEnd: v.number(),
    capacityMin: v.number(),
    capacityMax: v.number(),
    composition: v.object({
      preset: v.union(
        v.literal("any"),
        v.literal("mixed"),
        v.literal("womenOnly"),
        v.literal("beginnersWelcome")
      ),
      notes: v.optional(v.string()),
    }),
    visibility: v.union(
      v.literal("friends"),
      v.literal("fof"),
      v.literal("hub"),
      v.literal("private")
    ),
    status: v.union(
      v.literal("open"),
      v.literal("full"),
      v.literal("closed")
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_host", ["hostUserId"])
    .index("by_city", ["city"])
    .index("by_dates", ["windowStart", "windowEnd"])
    .index("by_status", ["status"]),

  groupMembers: defineTable({
    groupId: v.id("groups"),
    userId: v.id("users"),
    role: v.union(v.literal("host"), v.literal("member")),
    joinStatus: v.union(
      v.literal("pending"),
      v.literal("approved"),
      v.literal("declined"),
      v.literal("removed")
    ),
    introText: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_group", ["groupId"])
    .index("by_user", ["userId"])
    .index("by_group_and_user", ["groupId", "userId"]),

  messages: defineTable({
    groupId: v.id("groups"),
    userId: v.id("users"),
    content: v.string(),
    createdAt: v.number(),
  })
    .index("by_group", ["groupId"])
    .index("by_user", ["userId"]),

  notifications: defineTable({
    userId: v.id("users"),
    type: v.string(),
    payload: v.any(),
    isRead: v.boolean(),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_read", ["userId", "isRead"]),
});