import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUserByClerkId = query({
  args: { clerkUserId: v.string() },
  handler: async (ctx, { clerkUserId }) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", clerkUserId))
      .first();
  },
});

export const createUser = mutation({
  args: {
    clerkUserId: v.string(),
    email: v.optional(v.string()),
    displayName: v.string(),
  },
  handler: async (ctx, { clerkUserId, email, displayName }) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", clerkUserId))
      .first();

    if (existingUser) {
      return existingUser._id;
    }

    // Create new user
    const now = Date.now();
    const userId = await ctx.db.insert("users", {
      clerkUserId,
      email,
      displayName,
      onboardingComplete: false,
      createdAt: now,
      updatedAt: now,
    });

    return userId;
  },
});

export const updateUser = mutation({
  args: {
    clerkUserId: v.string(),
    displayName: v.optional(v.string()),
    handle: v.optional(v.string()),
    bio: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    homeCity: v.optional(v.string()),
    languages: v.optional(v.array(v.string())),
    interests: v.optional(v.array(v.string())),
    onboardingComplete: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { clerkUserId, ...updates } = args;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", clerkUserId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, {
      ...updates,
      updatedAt: Date.now(),
    });

    return user._id;
  },
});

export const completeOnboarding = mutation({
  args: {
    clerkUserId: v.string(),
    handle: v.string(),
    homeCity: v.string(),
    interests: v.array(v.string()),
  },
  handler: async (ctx, { clerkUserId, handle, homeCity, interests }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", clerkUserId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    // Check if handle is already taken
    const existingHandle = await ctx.db
      .query("users")
      .withIndex("by_handle", (q) => q.eq("handle", handle))
      .first();

    if (existingHandle && existingHandle._id !== user._id) {
      throw new Error("Handle already taken");
    }

    await ctx.db.patch(user._id, {
      handle,
      homeCity,
      interests,
      onboardingComplete: true,
      updatedAt: Date.now(),
    });

    // Create presence for home city
    await ctx.db.insert("presence", {
      userId: user._id,
      city: homeCity,
      country: "", // Will be filled in later with proper geo data
      status: "home",
      visibility: "friends",
      updatedAt: Date.now(),
    });

    return user._id;
  },
});

export const getCurrentUser = query({
  args: { clerkUserId: v.optional(v.string()) },
  handler: async (ctx, { clerkUserId }) => {
    if (!clerkUserId) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_user_id", (q) => q.eq("clerkUserId", clerkUserId))
      .first();

    return user;
  },
});