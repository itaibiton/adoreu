import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
  StatusBar
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth } from "@clerk/clerk-expo";
import { cn } from "../../utils/cn";

// Import map components
import {
  FriendMarker,
  ActivityMarker,
  MatchMarker,
  MapFriendCard,
  MapActivityCard,
  MapMatchCard,
  type FriendMarkerData,
  type ActivityMarkerData,
  type MatchMarkerData,
  type MapFriendCardData,
  type MapActivityCardData,
  type MapMatchCardData
} from "../../components/map";

const { height } = Dimensions.get("window");

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

type FilterTab = 'all' | 'suggested' | 'friends';

export default function MapScreen() {
  const { userId } = useAuth();
  const insets = useSafeAreaInsets();
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [mapRegion, setMapRegion] = useState({
    latitude: 31.8044,  // Ashdod, Israel
    longitude: 34.6553,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const currentUser = useQuery(
    api.auth.getCurrentUser,
    userId ? { clerkUserId: userId } : { clerkUserId: undefined }
  );

  // Realistic example data with map coordinates - Ashdod area
  const friendsData: (FriendMarkerData & MapFriendCardData)[] = [
    {
      id: 'f1',
      name: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?img=1',
      status: 'available',
      currentLocation: 'Aroma Cafe - Big Ashdod',
      currentActivity: undefined,
      distance: 0.8,
      latitude: 31.7980,  // Near Big Ashdod mall
      longitude: 34.6569,
      mutualFriends: 3
    },
    {
      id: 'f2',
      name: 'Mike Torres',
      avatar: 'https://i.pravatar.cc/150?img=3',
      status: 'busy',
      currentActivity: 'Beach Volleyball at Lido Beach',
      distance: 1.2,
      latitude: 31.8089,  // Lido Beach area
      longitude: 34.6432,
      mutualFriends: 5
    },
    {
      id: 'f3',
      name: 'Emma Wilson',
      avatar: 'https://i.pravatar.cc/150?img=5',
      status: 'available',
      currentLocation: 'Ashdod Yam Park',
      distance: 2.3,
      latitude: 31.8134,  // Ashdod Yam Park
      longitude: 34.6498,
      mutualFriends: 2
    },
    {
      id: 'f4',
      name: 'Alex Kumar',
      avatar: 'https://i.pravatar.cc/150?img=8',
      status: 'offline',
      lastSeen: '2 hours ago',
      distance: 3.5,
      latitude: 31.7920,  // City center area
      longitude: 34.6605,
      mutualFriends: 1
    }
  ];

  const activitiesData: (ActivityMarkerData & MapActivityCardData)[] = [
    {
      id: 'a1',
      title: 'Sunset Yoga at Teshuva Beach',
      description: 'Relaxing yoga session with Mediterranean views',
      category: 'relaxation',
      imageUrl: 'https://source.unsplash.com/400x300/?yoga,beach',
      host: {
        id: 'h1',
        name: 'Zen Studio Ashdod',
        avatar: 'https://i.pravatar.cc/150?img=20'
      },
      location: 'Teshuva Beach',
      distance: 1.5,
      latitude: 31.8156,  // Teshuva Beach
      longitude: 34.6412,
      startTime: '6:00 PM',
      duration: '1.5 hours',
      participantCount: 12,
      maxParticipants: 20,
      price: { amount: 80, currency: '₪' },
      status: 'upcoming',
      tags: ['yoga', 'sunset', 'beach']
    },
    {
      id: 'a2',
      title: 'Food Market Festival',
      description: 'Sample the best Israeli street food',
      category: 'food',
      imageUrl: 'https://source.unsplash.com/400x300/?foodtruck,festival',
      host: {
        id: 'h2',
        name: 'Ashdod Food Events',
        avatar: 'https://i.pravatar.cc/150?img=21'
      },
      location: 'City Mall Plaza',
      distance: 0.9,
      latitude: 31.8044,  // City center
      longitude: 34.6610,
      startTime: 'Now',
      duration: '4 hours',
      participantCount: 145,
      maxParticipants: undefined,
      status: 'ongoing',
      tags: ['food', 'festival', 'market']
    },
    {
      id: 'a3',
      title: 'Night Photography Walk',
      description: 'Capture the marina lights and city skyline',
      category: 'culture',
      host: {
        id: 'h3',
        name: 'Photo Walks Ashdod',
        avatar: 'https://i.pravatar.cc/150?img=22'
      },
      location: 'Ashdod Marina',
      distance: 2.1,
      latitude: 31.8201,  // Marina area
      longitude: 34.6458,
      startTime: '8:30 PM',
      duration: '2 hours',
      participantCount: 8,
      maxParticipants: 12,
      price: { amount: 50, currency: '₪' },
      status: 'upcoming',
      tags: ['photography', 'night', 'marina']
    },
    {
      id: 'a4',
      title: 'Beach Bar Hopping',
      description: 'Experience Ashdod\'s best beach bars',
      category: 'nightlife',
      imageUrl: 'https://source.unsplash.com/400x300/?rooftop,bar',
      host: {
        id: 'h4',
        name: 'Night Life Ashdod',
        avatar: 'https://i.pravatar.cc/150?img=23'
      },
      location: 'Lido Beach Strip',
      distance: 0.5,
      latitude: 31.8089,  // Lido Beach
      longitude: 34.6455,
      startTime: '9:00 PM',
      duration: '3 hours',
      participantCount: 18,
      maxParticipants: 20,
      price: { amount: 120, currency: '₪' },
      status: 'ending_soon',
      tags: ['nightlife', 'bars', 'beach']
    },
    {
      id: 'a5',
      title: 'Ashdod to Ashkelon Bike Tour',
      description: 'Scenic coastal bike ride',
      category: 'adventure',
      imageUrl: 'https://source.unsplash.com/400x300/?bike,coastal',
      host: {
        id: 'h5',
        name: 'Coastal Adventures IL',
        avatar: 'https://i.pravatar.cc/150?img=24'
      },
      location: 'Eye of the Sun Bridge',
      distance: 1.8,
      latitude: 31.7950,  // Eye of the Sun area
      longitude: 34.6524,
      startTime: '10:00 AM',
      duration: '3 hours',
      participantCount: 6,
      maxParticipants: 15,
      price: { amount: 150, currency: '₪' },
      status: 'upcoming',
      tags: ['biking', 'coastal', 'scenic']
    }
  ];

  const matchesData: (MatchMarkerData & MapMatchCardData)[] = [
    {
      id: 'm1',
      type: 'solo',
      matchName: 'Jamie Rodriguez',
      matchAvatar: 'https://i.pravatar.cc/150?img=10',
      compatibility: 92,
      sharedInterests: ['Photography', 'Food Tours', 'Hiking'],
      bio: 'Digital nomad exploring Israel. Love finding hidden cafes and sunset spots!',
      location: 'Marina District',
      distance: 1.1,
      latitude: 31.8112,  // Near Marina
      longitude: 34.6520,
      activityPreference: 'Food tours and photography walks'
    },
    {
      id: 'm2',
      type: 'group',
      matchName: 'Adventure Seekers',
      matchAvatar: 'https://i.pravatar.cc/150?img=15',
      compatibility: 78,
      sharedInterests: ['Hiking', 'Camping', 'Beach Sports'],
      bio: 'Group of 4 friends looking for outdoor adventures',
      location: 'Yud-Alef Beach',
      distance: 2.5,
      latitude: 31.8024,  // Yud-Alef area
      longitude: 34.6490,
      memberCount: 4,
      activityPreference: 'Outdoor adventures and group activities'
    },
    {
      id: 'm3',
      type: 'solo',
      matchName: 'Taylor Kim',
      matchAvatar: 'https://i.pravatar.cc/150?img=12',
      compatibility: 85,
      sharedInterests: ['Yoga', 'Meditation', 'Healthy Food'],
      bio: 'Wellness enthusiast. Morning yoga and green smoothies are my thing!',
      location: 'Ashdod Art Museum Area',
      distance: 0.7,
      latitude: 31.8065,  // Near art museum
      longitude: 34.6580,
      activityPreference: 'Wellness activities and healthy dining'
    }
  ];

  // Filter data based on active filter
  const getFilteredData = () => {
    switch (activeFilter) {
      case 'suggested':
        return {
          friends: friendsData.filter(f => f.status === 'available'),
          activities: activitiesData.filter(a => a.participantCount < 10),
          matches: matchesData.filter(m => m.compatibility >= 80)
        };
      case 'friends':
        return {
          friends: friendsData,
          activities: activitiesData.filter(a =>
            // Simulate activities with friends attending
            ['a1', 'a3', 'a5'].includes(a.id)
          ),
          matches: []
        };
      default:
        return {
          friends: friendsData,
          activities: activitiesData,
          matches: matchesData
        };
    }
  };

  const filteredData = getFilteredData();

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Permission to access location was denied');
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);

      const newRegion = {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setMapRegion(newRegion);
    } catch (error) {
      console.log('Error getting location:', error);
    }
  };

  const handleMarkerPress = (id: string) => {
    setSelectedItemId(id);
    // Scroll to item in list
  };

  const handleCardPress = (item: any) => {
    setSelectedItemId(item.id);
    // Zoom map to item location
    if (item.latitude && item.longitude) {
      setMapRegion({
        ...mapRegion,
        latitude: item.latitude,
        longitude: item.longitude,
      });
    }
  };

  return (
    <View className="flex-1">
      {/* Status Bar */}
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Full Screen Map */}
      <View className="absolute inset-0">
        {MapView && isMapAvailable ? (
          <MapView
            style={{ width: '100%', height: '100%' }}
            region={mapRegion}
            showsUserLocation={true}
            showsMyLocationButton={false}
            onRegionChangeComplete={(region: any) => setMapRegion(region)}
            mapType="standard"
          >
            {/* Friend Markers */}
            {filteredData.friends.map((friend) => (
              <Marker
                key={friend.id}
                coordinate={{
                  latitude: friend.latitude,
                  longitude: friend.longitude,
                }}
                onPress={() => handleMarkerPress(friend.id)}
              >
                <FriendMarker
                  friend={friend}
                  onPress={() => handleMarkerPress(friend.id)}
                  isSelected={selectedItemId === friend.id}
                />
              </Marker>
            ))}

            {/* Activity Markers */}
            {filteredData.activities.map((activity) => (
              <Marker
                key={activity.id}
                coordinate={{
                  latitude: activity.latitude,
                  longitude: activity.longitude,
                }}
                onPress={() => handleMarkerPress(activity.id)}
              >
                <ActivityMarker
                  activity={activity}
                  onPress={() => handleMarkerPress(activity.id)}
                  isSelected={selectedItemId === activity.id}
                />
              </Marker>
            ))}

            {/* Match Markers */}
            {filteredData.matches.map((match) => (
              <Marker
                key={match.id}
                coordinate={{
                  latitude: match.latitude,
                  longitude: match.longitude,
                }}
                onPress={() => handleMarkerPress(match.id)}
              >
                <MatchMarker
                  match={match}
                  onPress={() => handleMarkerPress(match.id)}
                  isSelected={selectedItemId === match.id}
                />
              </Marker>
            ))}
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

      {/* Map Controls */}
      <View
        className="absolute right-4"
        style={{ top: insets.top + 16 }}
      >
        <TouchableOpacity
          className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg mb-3"
          onPress={() => setIsMapExpanded(!isMapExpanded)}
        >
          <Ionicons
            name={isMapExpanded ? "contract" : "expand"}
            size={24}
            color="#374151"
          />
        </TouchableOpacity>

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
            height: height * 0.45,
            paddingBottom: insets.bottom
          }}
        >
          <SafeAreaView className="flex-1" edges={['left', 'right']}>
            {/* Drag Handle */}
            <View className="items-center py-2">
              <View className="w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
            </View>

            {/* Filter Tabs */}
            <View className="flex-row px-4 mb-3">
              <TouchableOpacity
                onPress={() => setActiveFilter('all')}
                className={cn(
                  "flex-1 py-2 px-4 rounded-lg mr-2",
                  activeFilter === 'all'
                    ? "bg-blue-600"
                    : "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                )}
              >
                <Text className={cn(
                  "text-center font-semibold",
                  activeFilter === 'all' ? "text-white" : "text-gray-700 dark:text-gray-300"
                )}>
                  All
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveFilter('suggested')}
                className={cn(
                  "flex-1 py-2 px-4 rounded-lg mr-2",
                  activeFilter === 'suggested'
                    ? "bg-blue-600"
                    : "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                )}
              >
                <Text className={cn(
                  "text-center font-semibold",
                  activeFilter === 'suggested' ? "text-white" : "text-gray-700 dark:text-gray-300"
                )}>
                  Suggested
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveFilter('friends')}
                className={cn(
                  "flex-1 py-2 px-4 rounded-lg",
                  activeFilter === 'friends'
                    ? "bg-blue-600"
                    : "bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700"
                )}
              >
                <Text className={cn(
                  "text-center font-semibold",
                  activeFilter === 'friends' ? "text-white" : "text-gray-700 dark:text-gray-300"
                )}>
                  Friends
                </Text>
              </TouchableOpacity>
            </View>

            {/* List Content */}
            <ScrollView
              className="flex-1 px-4"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              {/* Match Cards */}
              {filteredData.matches.length > 0 && (
                <View className="mb-4">
                  {filteredData.matches.map((match) => (
                    <MapMatchCard
                      key={match.id}
                      match={match}
                      onPress={() => handleCardPress(match)}
                      onConnectPress={(m) => Alert.alert('Connect', `Connecting with ${m.matchName}`)}
                      isSelected={selectedItemId === match.id}
                    />
                  ))}
                </View>
              )}

              {/* Activity Cards */}
              {filteredData.activities.length > 0 && (
                <View className="mb-4">
                  <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Activities Near You
                  </Text>
                  {filteredData.activities.map((activity) => (
                    <MapActivityCard
                      key={activity.id}
                      activity={activity}
                      onPress={() => handleCardPress(activity)}
                      onJoinPress={(a) => Alert.alert('Join', `Joining ${a.title}`)}
                      isSelected={selectedItemId === activity.id}
                    />
                  ))}
                </View>
              )}

              {/* Friend Cards */}
              {filteredData.friends.length > 0 && (
                <View className="mb-4">
                  <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Friends Nearby
                  </Text>
                  {filteredData.friends.map((friend) => (
                    <MapFriendCard
                      key={friend.id}
                      friend={friend}
                      onPress={() => handleCardPress(friend)}
                      onMessagePress={(f) => Alert.alert('Message', `Messaging ${f.name}`)}
                      isSelected={selectedItemId === friend.id}
                    />
                  ))}
                </View>
              )}

              {/* Empty State */}
              {filteredData.friends.length === 0 &&
                filteredData.activities.length === 0 &&
                filteredData.matches.length === 0 && (
                  <View className="flex-1 items-center justify-center py-20">
                    <Ionicons name="search" size={48} color="#9CA3AF" />
                    <Text className="text-gray-500 dark:text-gray-400 mt-4 text-center">
                      No results found for this filter.{'\n'}
                      Try adjusting your filters or location.
                    </Text>
                  </View>
                )}
            </ScrollView>
          </SafeAreaView>
        </View>
      )}
    </View>
  );
}