import { useSignIn, useOAuth } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useState, useCallback } from "react";
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
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { AntDesign } from "@expo/vector-icons";
import { useColorScheme } from "react-native";

// Warm up the browser for OAuth
WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();

  // OAuth hooks
  const { startOAuthFlow: startGoogleOAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: startAppleOAuth } = useOAuth({ strategy: "oauth_apple" });

  const onSignInPress = async () => {
    if (!isLoaded) return;

    if (!emailAddress || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(tabs)/map");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "Sign in failed. Please try again.");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors?.[0]?.message || "Sign in failed");
    } finally {
      setIsLoading(false);
    }
  };

  const onSignInWithOAuth = useCallback(async (provider: "google" | "apple") => {
    console.log(`Starting OAuth with ${provider}...`);
    if (!isLoaded) {
      console.log("Clerk not loaded yet");
      return;
    }

    setIsLoading(true);
    try {
      const startOAuthFlow = provider === "google" ? startGoogleOAuth : startAppleOAuth;

      if (!startOAuthFlow) {
        console.log("OAuth provider not configured");
        Alert.alert("Error", "OAuth provider not configured");
        setIsLoading(false);
        return;
      }

      console.log("Starting OAuth flow...");
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();
      console.log("OAuth flow completed", { createdSessionId, signIn, signUp });

      if (createdSessionId && setActive) {
        console.log("Setting active session...");
        await setActive({ session: createdSessionId });
        router.replace("/(tabs)/map");
      } else {
        // OAuth was cancelled or failed
        console.log("OAuth sign in was cancelled or failed");
        console.log("SignIn status:", signIn?.status);
        console.log("SignUp status:", signUp?.status);
      }
    } catch (err: any) {
      console.error("OAuth error:", JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors?.[0]?.message || err.message || "OAuth sign in failed");
    } finally {
      setIsLoading(false);
    }
  }, [isLoaded, startGoogleOAuth, startAppleOAuth, setActive]);

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
          <View className="flex-1 justify-center px-6 py-12">
            {/* Logo/Title */}
            <View className="mb-8">
              <Text className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-2">
                Adoreu
              </Text>
              <Text className="text-lg text-center text-gray-600 dark:text-gray-400">
                Social Travel Platform
              </Text>
            </View>

            {/* Sign In Form */}
            <View>
              <Text className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Welcome back
              </Text>

              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </Text>
                <TextInput
                  autoCapitalize="none"
                  value={emailAddress}
                  placeholder="Enter your email"
                  placeholderTextColor="#9CA3AF"
                  onChangeText={setEmailAddress}
                  keyboardType="email-address"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                />
              </View>

              <View className="mb-6">
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password
                </Text>
                <TextInput
                  value={password}
                  placeholder="Enter your password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry
                  onChangeText={setPassword}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                />
              </View>

              <TouchableOpacity
                onPress={onSignInPress}
                disabled={isLoading}
                className="w-full bg-blue-600 py-3 rounded-lg mt-4"
              >
                {isLoading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white text-center font-semibold text-base">
                    Sign In
                  </Text>
                )}
              </TouchableOpacity>

              {/* OAuth Buttons */}
              <View className="mt-6">
                <View className="flex-row items-center mb-4">
                  <View className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
                  <Text className="mx-4 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </Text>
                  <View className="flex-1 h-px bg-gray-300 dark:bg-gray-600" />
                </View>

                <View className="flex-row">
                  <TouchableOpacity
                    onPress={() => onSignInWithOAuth("google")}
                    disabled={isLoading}
                    className="flex-1 border border-gray-300 dark:border-gray-600 py-3 rounded-lg flex-row items-center justify-center mr-3"
                  >
                    <AntDesign
                      name="google"
                      size={20}
                      color="#4285F4"
                      style={{ marginRight: 8 }}
                    />
                    <Text className="text-gray-700 dark:text-gray-300 font-medium">
                      Google
                    </Text>
                  </TouchableOpacity>

                  {Platform.OS === "ios" && (
                    <TouchableOpacity
                      onPress={() => onSignInWithOAuth("apple")}
                      disabled={isLoading}
                      className="flex-1 border border-gray-300 dark:border-gray-600 py-3 rounded-lg flex-row items-center justify-center"
                    >
                      <AntDesign
                        name="apple1"
                        size={20}
                        color={colorScheme === "dark" ? "#FFFFFF" : "#000000"}
                        style={{ marginRight: 8 }}
                      />
                      <Text className="text-gray-700 dark:text-gray-300 font-medium">
                        Apple
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* Sign Up Link */}
              <View className="flex-row justify-center mt-8">
                <Text className="text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                </Text>
                <Link href="/(auth)/sign-up" asChild>
                  <TouchableOpacity>
                    <Text className="text-blue-600">Sign up</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}