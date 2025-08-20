import { useSignUp, useOAuth } from "@clerk/clerk-expo";
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
import { AntDesign } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import * as WebBrowser from "expo-web-browser";

// Warm up the browser for OAuth
WebBrowser.maybeCompleteAuthSession();

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();

  // OAuth hooks
  const { startOAuthFlow: startGoogleOAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: startAppleOAuth } = useOAuth({ strategy: "oauth_apple" });

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    if (!firstName || !lastName || !emailAddress || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors?.[0]?.message || "Sign up failed");
    } finally {
      setIsLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    if (!code) {
      Alert.alert("Error", "Please enter the verification code");
      return;
    }

    setIsLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/(auth)/onboarding");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
        Alert.alert("Error", "Verification failed. Please try again.");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors?.[0]?.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const onSignUpWithOAuth = useCallback(async (provider: "google" | "apple") => {
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
        router.replace("/(auth)/onboarding");
      } else {
        // OAuth was cancelled or failed
        console.log("OAuth sign up was cancelled or failed");
        console.log("SignIn status:", signIn?.status);
        console.log("SignUp status:", signUp?.status);
      }
    } catch (err: any) {
      console.error("OAuth error:", JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors?.[0]?.message || err.message || "OAuth sign up failed");
    } finally {
      setIsLoading(false);
    }
  }, [isLoaded, startGoogleOAuth, startAppleOAuth]);

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
                Join the travel community
              </Text>
            </View>

            {!pendingVerification ? (
              // Sign Up Form
              <View>
                <Text className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                  Create your account
                </Text>

                <View className="flex-row mb-4">
                  <View className="flex-1 mr-3">
                    <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </Text>
                    <TextInput
                      autoCapitalize="words"
                      value={firstName}
                      placeholder="John"
                      placeholderTextColor="#9CA3AF"
                      onChangeText={setFirstName}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                    />
                  </View>

                  <View className="flex-1">
                    <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </Text>
                    <TextInput
                      autoCapitalize="words"
                      value={lastName}
                      placeholder="Doe"
                      placeholderTextColor="#9CA3AF"
                      onChangeText={setLastName}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                    />
                  </View>
                </View>

                <View className="mb-4">
                  <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </Text>
                  <TextInput
                    autoCapitalize="none"
                    value={emailAddress}
                    placeholder="john@example.com"
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
                    placeholder="Create a strong password"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry
                    onChangeText={setPassword}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                  />
                  <Text className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    At least 8 characters
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={onSignUpPress}
                  disabled={isLoading}
                  className="w-full bg-blue-600 py-3 rounded-lg mt-4"
                >
                  {isLoading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text className="text-white text-center font-semibold text-base">
                      Sign Up
                    </Text>
                  )}
                </TouchableOpacity>

                {/* Sign In Link */}
                <View className="flex-row justify-center mt-8">
                  <Text className="text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                  </Text>
                  <Link href="/(auth)/sign-in" asChild>
                    <TouchableOpacity>
                      <Text className="text-blue-600 font-semibold">Sign in</Text>
                    </TouchableOpacity>
                  </Link>
                </View>
              </View>
            ) : (
              // Verification Form
              <View className="space-y-4">
                <Text className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  Verify your email
                </Text>
                <Text className="text-gray-600 dark:text-gray-400 mb-6">
                  We've sent a verification code to {emailAddress}
                </Text>

                <View>
                  <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Verification Code
                  </Text>
                  <TextInput
                    value={code}
                    placeholder="Enter 6-digit code"
                    placeholderTextColor="#9CA3AF"
                    onChangeText={setCode}
                    keyboardType="number-pad"
                    maxLength={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 text-center text-lg"
                  />
                </View>

                <TouchableOpacity
                  onPress={onPressVerify}
                  disabled={isLoading}
                  className="w-full bg-blue-600 py-3 rounded-lg mt-4"
                >
                  {isLoading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text className="text-white text-center font-semibold text-base">
                      Verify Email
                    </Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setPendingVerification(false)}
                  className="mt-4"
                >
                  <Text className="text-blue-600 text-center">
                    Back to sign up
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}