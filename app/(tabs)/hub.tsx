import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HubScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1 p-4">
        {/* City Header */}
        <View className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            City Hub
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 mt-1">
            Discover groups and activities in your area
          </Text>
        </View>

        {/* Filter Options */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          <TouchableOpacity className="bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-full mr-2">
            <Text className="text-blue-700 dark:text-blue-300">Today</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-full mr-2">
            <Text className="text-gray-700 dark:text-gray-300">This Week</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-full mr-2">
            <Text className="text-gray-700 dark:text-gray-300">Women Only</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Groups List Placeholder */}
        <View className="bg-white dark:bg-gray-800 rounded-lg p-6 items-center">
          <Text className="text-gray-500 dark:text-gray-400 text-lg">
            No groups in your area yet
          </Text>
          <Text className="text-gray-400 dark:text-gray-500 text-sm mt-2 text-center">
            Be the first to create a group activity
          </Text>
          <TouchableOpacity className="bg-blue-600 px-6 py-2 rounded-lg mt-4">
            <Text className="text-white font-semibold">Create Group</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}