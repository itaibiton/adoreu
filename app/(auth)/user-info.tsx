import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const INTERESTS = [
  "Food & Dining",
  "Nightlife",
  "Sports & Fitness",
  "Arts & Culture",
  "Nature & Outdoors",
  "Shopping",
  "Music & Concerts",
  "Beach & Water",
  "Adventure",
  "Photography",
  "Local Experiences",
  "Wellness & Spa",
];

export default function UserInfoScreen() {
  const { user } = useUser();
  const completeOnboarding = useMutation(api.auth.completeOnboarding);

  const [handle, setHandle] = useState("");
  const [homeCity, setHomeCity] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else if (selectedInterests.length < 5) {
      setSelectedInterests([...selectedInterests, interest]);
    } else {
      Alert.alert("Limit reached", "You can select up to 5 interests");
    }
  };

  const onCompletePress = async () => {
    if (!handle || !homeCity || selectedInterests.length === 0) {
      Alert.alert("Error", "Please complete all fields and select at least one interest");
      return;
    }

    if (handle.length < 3) {
      Alert.alert("Error", "Handle must be at least 3 characters");
      return;
    }

    if (!user) {
      Alert.alert("Error", "User not found");
      return;
    }

    setIsLoading(true);
    try {
      await completeOnboarding({
        clerkUserId: user.id,
        handle: handle.toLowerCase(),
        homeCity,
        interests: selectedInterests,
      });

      router.replace("/(tabs)/map");
    } catch (error: any) {
      console.error(error);
      Alert.alert("Error", error.message || "Failed to complete onboarding");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow"
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-6 py-8">
            {/* Header */}
            <View className="mb-8">
              <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Complete Your Profile
              </Text>
              <Text className="text-gray-600 dark:text-gray-400">
                Let's set up your Adoreu profile to connect with travelers
              </Text>
            </View>

            {/* Progress Indicator */}
            <View className="mb-8">
              <View className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <View className="h-full w-full bg-blue-600" />
              </View>
              <Text className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Final step
              </Text>
            </View>

            {/* Handle Input */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Choose your handle
              </Text>
              <View className="flex-row items-center border border-gray-300 dark:border-gray-600 rounded-lg px-4 bg-white dark:bg-gray-800">
                <Text className="text-gray-500 dark:text-gray-400 text-base">@</Text>
                <TextInput
                  value={handle}
                  placeholder="yourhandle"
                  placeholderTextColor="#9CA3AF"
                  onChangeText={(text) => setHandle(text.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                  autoCapitalize="none"
                  maxLength={20}
                  className="flex-1 py-3 pl-1 text-gray-900 dark:text-white"
                />
              </View>
              <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                3-20 characters, letters, numbers and underscore only
              </Text>
            </View>

            {/* Home City Input */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your home city
              </Text>
              <TextInput
                value={homeCity}
                placeholder="e.g., Tel Aviv, New York, London"
                placeholderTextColor="#9CA3AF"
                onChangeText={setHomeCity}
                autoCapitalize="words"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800"
              />
            </View>

            {/* Interests Selection */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select your interests (up to 5)
              </Text>
              <View className="flex-row flex-wrap">
                {INTERESTS.map((interest) => {
                  const isSelected = selectedInterests.includes(interest);
                  return (
                    <TouchableOpacity
                      key={interest}
                      onPress={() => toggleInterest(interest)}
                      className={`m-1 px-4 py-2 rounded-full border ${
                        isSelected
                          ? "bg-blue-600 border-blue-600"
                          : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      <Text
                        className={`text-sm ${
                          isSelected
                            ? "text-white"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {interest}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Text className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {selectedInterests.length}/5 selected
              </Text>
            </View>

            {/* Complete Button */}
            <TouchableOpacity
              onPress={onCompletePress}
              disabled={isLoading || !handle || !homeCity || selectedInterests.length === 0}
              className={`w-full py-4 rounded-full mt-6 ${
                !handle || !homeCity || selectedInterests.length === 0
                  ? "bg-gray-400"
                  : "bg-blue-600"
              }`}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white text-center font-semibold text-lg">
                  Complete Setup
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}