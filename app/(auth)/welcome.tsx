import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StatusBar,
} from "react-native";
import { router } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import OnboardingSlide from "../../components/OnboardingSlide";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Connect with Travelers",
    description:
      "Meet like-minded travelers from around the world. Share experiences, get local tips, and make lasting friendships wherever you go.",
    iconName: "account-group",
    iconType: "material" as const,
    gradientColors: ["#3B82F6", "#8B5CF6"],
    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
  },
  {
    id: "2",
    title: "Discover Hidden Gems",
    description:
      "Find the best local spots, restaurants, and activities recommended by travelers and locals. Experience destinations like never before.",
    iconName: "map-marked-alt",
    iconType: "fontawesome" as const,
    gradientColors: ["#10B981", "#3B82F6"],
    image: 'https://images.pexels.com/photos/2450296/pexels-photo-2450296.jpeg',

  },
  {
    id: "3",
    title: "Share Your Journey",
    description:
      "Document your travels, share your stories, and inspire others. Create a network of travel memories and connections that last a lifetime.",
    iconName: "airplane",
    iconType: "ionicons" as const,
    gradientColors: ["#8B5CF6", "#EC4899"],
    image: 'https://images.pexels.com/photos/93820/pexels-photo-93820.jpeg',

  },
];

export default function WelcomeScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    scrollX.value = offsetX;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  const handleContinue = () => {
    if (currentIndex < slides.length - 1) {
      // Go to next slide
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * SCREEN_WIDTH,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    } else {
      // Navigate to user info screen
      router.push("/(auth)/user-info");
    }
  };


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View className="flex-1 bg-white dark:bg-gray-900">
        {/* Skip Button */}
        {/* <View className="absolute top-12 right-6 z-10">
          <TouchableOpacity onPress={handleSkip} className="py-2 px-4">
            <Text className="text-gray-600 dark:text-gray-400 text-base">
              Skip
            </Text>
          </TouchableOpacity>
        </View> */}

        {/* Slides */}
        <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            className="flex-1"
          >
            {slides.map((slide) => (
              <View key={slide.id} style={{ width: SCREEN_WIDTH }}>
                <OnboardingSlide
                  title={slide.title}
                  description={slide.description}
                  image={slide.image}
                  iconName={slide.iconName}
                  iconType={slide.iconType}
                  gradientColors={slide.gradientColors}
                />
              </View>
            ))}
          </ScrollView>

          {/* Bottom Section: Indicators and Button */}
          <View className="px-6 pb-8">
            {/* Page Indicators */}
            <View className="flex-row justify-center mb-8">
              {slides.map((_, index) => (
                <Dot key={index} index={index} currentIndex={currentIndex} />
              ))}
            </View>

            {/* Continue Button */}
            <TouchableOpacity
              onPress={handleContinue}
              className="bg-blue-600 py-4 rounded-full items-center"
              activeOpacity={0.8}
            >
              <Text className="text-white font-semibold text-lg">
                {currentIndex === slides.length - 1 ? "Get Started" : "Continue"}
              </Text>
            </TouchableOpacity>
          </View>
      </View>
    </GestureHandlerRootView>
  );
}

// Dot Indicator Component
function Dot({ index, currentIndex }: { index: number; currentIndex: number }) {
  const animatedStyle = useAnimatedStyle(() => {
    const isActive = currentIndex === index;
    return {
      width: withSpring(isActive ? 32 : 8, {
        damping: 15,
        stiffness: 200,
      }),
      opacity: withSpring(isActive ? 1 : 0.3, {
        damping: 15,
        stiffness: 200,
      }),
    };
  });

  return (
    <Animated.View
      style={animatedStyle}
      className="h-2 bg-blue-600 dark:bg-blue-400 rounded-full mx-1"
    />
  );
}