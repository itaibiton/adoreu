import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function GroupsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1 p-4">
        {/* Header */}
        <View className="mb-4">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            My Groups
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 mt-1">
            Groups you're hosting or participating in
          </Text>
        </View>

        {/* Tab Selector */}
        <View className="flex-row mb-4 bg-gray-200 dark:bg-gray-800 rounded-lg p-1">
          <TouchableOpacity className="flex-1 bg-white dark:bg-gray-700 py-2 rounded-md">
            <Text className="text-center text-gray-900 dark:text-white font-medium">
              Active
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 py-2">
            <Text className="text-center text-gray-600 dark:text-gray-400">
              Past
            </Text>
          </TouchableOpacity>
        </View>

        {/* Empty State */}
        <View className="bg-white dark:bg-gray-800 rounded-lg p-8 items-center">
          <Text className="text-gray-500 dark:text-gray-400 text-lg mb-2">
            No active groups
          </Text>
          <Text className="text-gray-400 dark:text-gray-500 text-sm text-center mb-4">
            Join or create a group to start connecting with travelers
          </Text>
          <View className="flex-row space-x-3">
            <TouchableOpacity className="bg-blue-600 px-4 py-2 rounded-lg">
              <Text className="text-white font-semibold">Browse Hub</Text>
            </TouchableOpacity>
            <TouchableOpacity className="border border-blue-600 px-4 py-2 rounded-lg">
              <Text className="text-blue-600 font-semibold">Create Group</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}