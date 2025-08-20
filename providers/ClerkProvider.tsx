import { ClerkProvider as ClerkProviderBase, ClerkLoaded } from "@clerk/clerk-expo";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

// Token cache for Clerk
const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`SecureStore: Loaded ${key}`);
      } else {
        console.log(`SecureStore: No entry found for ${key}`);
      }
      return item;
    } catch (error) {
      console.error(`SecureStore error: ${error}`);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      console.log(`SecureStore: Saving ${key}`);
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error(`SecureStore error: ${error}`);
    }
  },
};

export function ClerkProvider({ children }: { children: ReactNode }) {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error(
      "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
    );
  }

  return (
    <ClerkProviderBase 
      tokenCache={tokenCache} 
      publishableKey={publishableKey}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <ClerkLoaded>{children}</ClerkLoaded>
      </ConvexProviderWithClerk>
    </ClerkProviderBase>
  );
}