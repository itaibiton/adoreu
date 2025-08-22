import React from "react";
import { View, Text, Image, Dimensions } from "react-native";

interface OnboardingSlideProps {
  title: string;
  description: string;
  image?: string;
  iconName?: string;
  iconType?: "material" | "fontawesome" | "ionicons";
  gradientColors?: string[];
}

const { height } = Dimensions.get("window");

export default function OnboardingSlide({
  title,
  description,
  image,
}: OnboardingSlideProps) {

  return (
    <View className="flex-1 items-center justify-start">
      {/* Image/Icon Container - Full width, no padding */}
      <View
        className="w-full rounded-b-[4rem] overflow-hidden mb-8"
        style={{ height: height * 0.52 }}
      >
        <Image
          source={{ uri: image || 'https://via.placeholder.com/400x600' }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Title */}
      <Text className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4 px-6">
        {title}
      </Text>

      {/* Description */}
      <Text className="text-base text-gray-600 dark:text-gray-400 text-center leading-6 px-10">
        {description}
      </Text>
    </View>
  );
}