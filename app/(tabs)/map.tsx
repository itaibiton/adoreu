import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
  Image,
  Alert,
  Platform,
  StatusBar
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from "@clerk/clerk-expo";

const { height } = Dimensions.get("window");

interface Friend {
  id: string;
  name: string;
  avatar: string;
  distance: string;
  location: string;
}

interface Activity {
  id: string;
  title: string;
  type: string;
  distance: string;
  participants: number;
}

interface AISuggestion {
  id: string;
  title: string;
  description: string;
  category: string;
  rating: number;
}

// Conditional import for react-native-maps
let MapView: any;
let Marker: any;
let PROVIDER_GOOGLE: any;
let isMapAvailable = false;

try {
  const Maps = require("react-native-maps");
  MapView = Maps.default;
  Marker = Maps.Marker;
  PROVIDER_GOOGLE = Maps.PROVIDER_GOOGLE;
  isMapAvailable = true;
  console.log("react-native-maps loaded successfully");
} catch (error) {
  console.log("react-native-maps not available - using fallback", error);
}

export default function MapScreen() {
  const { userId } = useAuth();
  const insets = useSafeAreaInsets();
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const currentUser = useQuery(
    api.auth.getCurrentUser,
    userId ? { clerkUserId: userId } : { clerkUserId: undefined }
  );

  // Mock data
  const friends: Friend[] = [
    { id: '1', name: 'Sarah Chen', avatar: 'https://via.placeholder.com/40', distance: '2.3 km', location: 'Coffee Shop' },
    { id: '2', name: 'Mike Torres', avatar: 'https://via.placeholder.com/40', distance: '1.8 km', location: 'Central Park' },
    { id: '3', name: 'Emma Wilson', avatar: 'https://via.placeholder.com/40', distance: '3.1 km', location: 'Art Museum' },
  ];

  const activities: Activity[] = [
    { id: '1', title: 'Morning Yoga', type: 'Fitness', distance: '0.5 km', participants: 12 },
    { id: '2', title: 'Food Truck Festival', type: 'Food', distance: '1.2 km', participants: 45 },
    { id: '3', title: 'Photography Walk', type: 'Art', distance: '2.0 km', participants: 8 },
  ];

  const aiSuggestions: AISuggestion[] = [
    { id: '1', title: 'Rooftop Bar', description: 'Great sunset views', category: 'Entertainment', rating: 4.5 },
    { id: '2', title: 'Local Bookstore', description: 'Cozy reading nooks', category: 'Culture', rating: 4.8 },
    { id: '3', title: 'Farmers Market', description: 'Fresh produce & crafts', category: 'Shopping', rating: 4.3 },
  ];

  useEffect(() => {
    console.log("Map component mounted, isMapAvailable:", isMapAvailable);
    console.log("MapView component:", MapView ? "Loaded" : "Not loaded");
    console.log("Initial mapRegion:", mapRegion);
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      console.log("Requesting location permissions...");
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Permission to access location was denied');
        return;
      }

      console.log("Getting current position...");
      const userLocation = await Location.getCurrentPositionAsync({});
      console.log("Got location:", userLocation.coords);
      setLocation(userLocation);

      const newRegion = {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      console.log("Setting new map region:", newRegion);
      setMapRegion(newRegion);
    } catch (error) {
      console.log('Error getting location:', error);
      // Keep default San Francisco location if location fails
    }
  };

  const renderListItem = ({ item, type }: { item: any, type: 'friends' | 'activities' | 'suggestions' }) => {
    return (
      <View className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-3 shadow-sm">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            {type === 'friends' && (
              <>
                <Image
                  source={{ uri: item.avatar }}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900 dark:text-white">
                    {item.name}
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">
                    {item.location}
                  </Text>
                </View>
                <Text className="text-sm text-blue-600 dark:text-blue-400">
                  {item.distance}
                </Text>
              </>
            )}

            {type === 'activities' && (
              <>
                <View className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full items-center justify-center mr-3">
                  <Ionicons
                    name="calendar"
                    size={20}
                    color="#3B82F6"
                  />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">
                    {item.type} • {item.participants} people
                  </Text>
                </View>
                <Text className="text-sm text-blue-600 dark:text-blue-400">
                  {item.distance}
                </Text>
              </>
            )}

            {type === 'suggestions' && (
              <>
                <View className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full items-center justify-center mr-3">
                  <Ionicons
                    name="sparkles"
                    size={20}
                    color="#10B981"
                  />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </Text>
                  <Text className="text-sm text-gray-500 dark:text-gray-400">
                    {item.description}
                  </Text>
                </View>
                <View className="items-center">
                  <View className="flex-row items-center">
                    <Ionicons name="star" size={14} color="#F59E0B" />
                    <Text className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                      {item.rating}
                    </Text>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderSection = (title: string, data: any[], type: 'friends' | 'activities' | 'suggestions') => (
    <View className="mb-6">
      <Text className="text-lg font-semibold text-gray-900 dark:text-white px-4">
        {title}
      </Text>
      <View className="px-4">
        {data.map((item) => (
          <View key={item.id}>
            {renderListItem({ item, type })}
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <View className="flex-1">
      {/* Status Bar */}
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Full Screen Map */}
      <View className="absolute inset-0">
        {MapView ? (
          <MapView
            style={{ width: '100%', height: '100%' }}
            region={mapRegion}
            showsUserLocation={true}
            showsMyLocationButton={false}
            onRegionChangeComplete={(region: any) => {
              console.log("Map region changed:", region);
              setMapRegion(region);
            }}
            onMapReady={() => console.log("Map is ready!")}
            mapType="standard"
          >
            {location && (
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title="You are here"
              />
            )}
          </MapView>
        ) : (
          <View className="w-full h-full bg-gray-200 dark:bg-gray-700 items-center justify-center">
            <Ionicons name="map" size={64} color="#9CA3AF" />
            <Text className="text-gray-500 dark:text-gray-400 mt-4 text-center px-8">
              Map requires a development build.{'\n'}
              Run: npx expo run:ios or npx expo run:android
            </Text>
          </View>
        )}
      </View>

      {/* Map Controls - positioned to account for status bar */}
      <View
        className="absolute right-4"
        style={{ top: insets.top + 16 }}
      >
        <TouchableOpacity
          className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg"
          onPress={() => setIsMapExpanded(!isMapExpanded)}
        >
          <Ionicons
            name={isMapExpanded ? "contract" : "expand"}
            size={24}
            color="#374151"
          />
        </TouchableOpacity>
      </View>

      <View
        className="absolute left-4"
        style={{ top: insets.top + 16 }}
      >
        <TouchableOpacity
          className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg"
          onPress={getCurrentLocation}
        >
          <Ionicons
            name="locate"
            size={24}
            color="#3B82F6"
          />
        </TouchableOpacity>
      </View>

      {/* Bottom Content Overlay */}
      {!isMapExpanded && (
        <View
          className="absolute left-0 right-0 bottom-0 bg-gray-50 dark:bg-gray-900 rounded-t-3xl"
          style={{
            height: height * 0.35,
            paddingBottom: insets.bottom
          }}
        >
          <SafeAreaView className="flex-1" edges={['left', 'right']}>
            <ScrollView
              className="flex-1"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 16 }}
            >
              {renderSection('Friends Nearby', friends, 'friends')}
              {renderSection('Activities', activities, 'activities')}
              {renderSection('AI Suggestions', aiSuggestions, 'suggestions')}
            </ScrollView>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
}