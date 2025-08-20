import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from "@clerk/clerk-expo";

export default function MapScreen() {
  const { userId } = useAuth();
  const currentUser = useQuery(
    api.auth.getCurrentUser,
    userId ? { clerkUserId: userId } : { clerkUserId: undefined }
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="flex-1 p-4">
        {/* Welcome Message */}
        <View className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 shadow-sm">
          <Text className="text-xl font-semibold text-gray-900 dark:text-white">
            Welcome to Adoreu, {currentUser?.displayName}!
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 mt-1">
            Your home city: {currentUser?.homeCity || "Not set"}
          </Text>
        </View>

        {/* Map Placeholder */}
        <View className="flex-1 bg-white dark:bg-gray-800 rounded-lg items-center justify-center">
          <Text className="text-gray-500 dark:text-gray-400 text-lg">
            Map View Coming Soon
          </Text>
          <Text className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            See where your friends are traveling
          </Text>
        </View>

        {/* Action Button */}
        <TouchableOpacity className="bg-blue-600 rounded-lg py-4 mt-4">
          <Text className="text-white text-center font-semibold text-base">
            Plan a Trip
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}