import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export function useOnboardingStatus() {
  const { user, isLoaded: clerkLoaded } = useUser();
  const currentUser = useQuery(
    api.auth.getCurrentUser,
    user ? { clerkUserId: user.id } : { clerkUserId: undefined }
  );

  const isLoading = !clerkLoaded || (user && currentUser === undefined);
  const isAuthenticated = !!user;
  const isOnboarded = currentUser?.onboardingComplete ?? false;

  return {
    isLoading,
    isAuthenticated,
    isOnboarded,
    user: currentUser,
  };
}