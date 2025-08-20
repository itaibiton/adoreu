import { useEffect } from "react";
import { Stack } from "expo-router";
import { ClerkProvider } from "../providers/ClerkProvider";
import { ThemeProvider } from "../components/ThemeProvider";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { useConvexAuth, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import "../global.css";

function InitializeUser() {
  const { user, isLoaded: clerkLoaded } = useUser();
  const { isAuthenticated } = useConvexAuth();
  const createUser = useMutation(api.auth.createUser);

  useEffect(() => {
    if (clerkLoaded && isAuthenticated && user) {
      // Create or update user in Convex
      createUser({
        clerkUserId: user.id,
        email: user.primaryEmailAddress?.emailAddress,
        displayName: user.fullName || user.username || "User",
      }).catch(console.error);
    }
  }, [clerkLoaded, isAuthenticated, user, createUser]);

  return null;
}

export default function RootLayout() {
  return (
    <ClerkProvider>
      <ThemeProvider>
        <InitializeUser />
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </ClerkProvider>
  );
}