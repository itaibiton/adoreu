import { Redirect } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useOnboardingStatus } from "../hooks/useOnboardingStatus";

export default function StartPage() {
  const { isLoading, isAuthenticated, isOnboarded } = useOnboardingStatus();

  // Show loading while checking auth and onboarding status
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-black">
        <ActivityIndicator size="large" className="text-blue-500" />
      </View>
    );
  }

  // Redirect based on authentication and onboarding status
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/sign-in" />;
  } else if (!isOnboarded) {
    return <Redirect href="/(auth)/welcome" />;
  } else {
    return <Redirect href="/(tabs)/map" />;
  }
}