import React from "react";
import { View, Text, Image, Dimensions } from "react-native";
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

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
  iconName,
  iconType = "material",
  gradientColors = ["#3B82F6", "#8B5CF6"],
}: OnboardingSlideProps) {
  const renderIcon = () => {
    const iconProps = {
      size: 120,
      color: "white",
    };

    switch (iconType) {
      case "fontawesome":
        return <FontAwesome5 name={iconName || "users"} {...iconProps} />;
      case "ionicons":
        return <Ionicons name={iconName || "location-sharp"} {...iconProps} />;
      default:
        return <MaterialCommunityIcons name={iconName || "airplane"} {...iconProps} />;
    }
  };

  return (
    <View className="flex-1 items-center justify-start px-6">
      {/* Image/Icon Container */}
      <View
        className="w-full rounded-3xl overflow-hidden mb-8"
        style={{ height: height * 0.52 }}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="w-full h-full items-center justify-center"
          >
            <View className="items-center">
              {renderIcon()}
              <View className="mt-6 px-8">
                <View className="h-1 bg-white/20 rounded-full">
                  <View className="h-1 bg-white rounded-full w-1/3" />
                </View>
              </View>
            </View>
          </LinearGradient>
        )}
      </View>

      {/* Title */}
      <Text className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
        {title}
      </Text>

      {/* Description */}
      <Text className="text-base text-gray-600 dark:text-gray-400 text-center leading-6 px-4">
        {description}
      </Text>
    </View>
  );
}