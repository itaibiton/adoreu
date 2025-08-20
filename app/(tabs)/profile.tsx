import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const currentUser = useQuery(
    api.auth.getCurrentUser,
    user ? { clerkUserId: user.id } : { clerkUserId: undefined }
  );

  const handleSignOut = async () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          onPress: async () => {
            try {
              await signOut();
              router.replace("/(auth)/sign-in");
            } catch (error) {
              console.error("Error signing out:", error);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1">
        {/* Profile Header */}
        <View className="bg-white dark:bg-gray-800 p-6">
          <View className="items-center mb-4">
            <View className="w-24 h-24 bg-gray-300 dark:bg-gray-600 rounded-full items-center justify-center mb-3">
              <Ionicons name="person" size={50} color="#9CA3AF" />
            </View>
            <Text className="text-2xl font-bold text-gray-900 dark:text-white">
              {currentUser?.displayName}
            </Text>
            <Text className="text-gray-600 dark:text-gray-400">
              @{currentUser?.handle}
            </Text>
          </View>

          {/* Stats */}
          <View className="flex-row justify-around pt-4 border-t border-gray-200 dark:border-gray-700">
            <View className="items-center">
              <Text className="text-xl font-semibold text-gray-900 dark:text-white">0</Text>
              <Text className="text-gray-600 dark:text-gray-400 text-sm">Friends</Text>
            </View>
            <View className="items-center">
              <Text className="text-xl font-semibold text-gray-900 dark:text-white">0</Text>
              <Text className="text-gray-600 dark:text-gray-400 text-sm">Groups</Text>
            </View>
            <View className="items-center">
              <Text className="text-xl font-semibold text-gray-900 dark:text-white">0</Text>
              <Text className="text-gray-600 dark:text-gray-400 text-sm">Trips</Text>
            </View>
          </View>
        </View>

        {/* Profile Info */}
        <View className="bg-white dark:bg-gray-800 mt-2 p-4">
          <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            About
          </Text>
          
          <View className="space-y-3">
            <View className="flex-row items-center">
              <Ionicons name="home-outline" size={20} color="#6B7280" />
              <Text className="text-gray-700 dark:text-gray-300 ml-3">
                {currentUser?.homeCity || "No home city set"}
              </Text>
            </View>
            
            <View className="flex-row items-center">
              <Ionicons name="mail-outline" size={20} color="#6B7280" />
              <Text className="text-gray-700 dark:text-gray-300 ml-3">
                {user?.primaryEmailAddress?.emailAddress}
              </Text>
            </View>
          </View>
        </View>

        {/* Interests */}
        {currentUser?.interests && currentUser.interests.length > 0 && (
          <View className="bg-white dark:bg-gray-800 mt-2 p-4">
            <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Interests
            </Text>
            <View className="flex-row flex-wrap">
              {currentUser.interests.map((interest, index) => (
                <View
                  key={index}
                  className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full mr-2 mb-2"
                >
                  <Text className="text-blue-700 dark:text-blue-300 text-sm">
                    {interest}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Settings Section */}
        <View className="bg-white dark:bg-gray-800 mt-2">
          <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <View className="flex-row items-center">
              <Ionicons name="settings-outline" size={20} color="#6B7280" />
              <Text className="text-gray-700 dark:text-gray-300 ml-3">Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <View className="flex-row items-center">
              <Ionicons name="shield-outline" size={20} color="#6B7280" />
              <Text className="text-gray-700 dark:text-gray-300 ml-3">Privacy</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <View className="flex-row items-center">
              <Ionicons name="help-circle-outline" size={20} color="#6B7280" />
              <Text className="text-gray-700 dark:text-gray-300 ml-3">Help</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleSignOut}
            className="flex-row items-center p-4"
          >
            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            <Text className="text-red-500 ml-3">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}