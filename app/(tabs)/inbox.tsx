import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function InboxScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1 p-4">
        {/* Header */}
        <View className="mb-4">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            Messages
          </Text>
        </View>

        {/* Empty State */}
        <View className="bg-white dark:bg-gray-800 rounded-lg p-8 items-center">
          <Text className="text-gray-500 dark:text-gray-400 text-lg mb-2">
            No messages yet
          </Text>
          <Text className="text-gray-400 dark:text-gray-500 text-sm text-center">
            Messages from your groups will appear here
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}