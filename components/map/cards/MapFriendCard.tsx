import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../../../utils/cn';
import Badge from '../../ui/atoms/Badge';
import DistanceIndicator from '../../ui/travel/DistanceIndicator';

export interface MapFriendCardData {
  id: string;
  name: string;
  avatar?: string;
  status: 'available' | 'busy' | 'offline';
  currentLocation?: string;
  currentActivity?: string;
  distance?: number;
  lastSeen?: string;
  mutualFriends?: number;
}

interface MapFriendCardProps {
  friend: MapFriendCardData;
  onPress?: (friend: MapFriendCardData) => void;
  onMessagePress?: (friend: MapFriendCardData) => void;
  isSelected?: boolean;
  className?: string;
}

export default function MapFriendCard({
  friend,
  onPress,
  onMessagePress,
  isSelected,
  className
}: MapFriendCardProps) {
  const statusConfig = {
    available: {
      color: 'bg-green-500',
      text: 'Available',
      icon: 'checkmark-circle' as keyof typeof Ionicons.glyphMap,
    },
    busy: {
      color: 'bg-orange-500',
      text: 'Busy',
      icon: 'time' as keyof typeof Ionicons.glyphMap,
    },
    offline: {
      color: 'bg-gray-400',
      text: 'Offline',
      icon: 'remove-circle' as keyof typeof Ionicons.glyphMap,
    },
  };

  const status = statusConfig[friend.status];

  return (
    <TouchableOpacity
      onPress={() => onPress?.(friend)}
      className={cn(
        "bg-white dark:bg-gray-800 rounded-xl p-3 mb-2",
        "border border-gray-200 dark:border-gray-700",
        isSelected && "border-blue-500 bg-blue-50 dark:bg-blue-950",
        "active:scale-[0.98] transition-all",
        className
      )}
    >
      <View className="flex-row items-center">
        {/* Avatar with status */}
        <View className="relative mr-3">
          {friend.avatar ? (
            <Image
              source={{ uri: friend.avatar }}
              className="w-12 h-12 rounded-full"
              resizeMode="cover"
            />
          ) : (
            <View className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 items-center justify-center">
              <Text className="text-white font-semibold text-lg">
                {friend.name.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <View className={cn(
            "absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800",
            status.color
          )} />
        </View>

        {/* Content */}
        <View className="flex-1">
          {/* Name and status */}
          <View className="flex-row items-center justify-between mb-1">
            <Text className="font-semibold text-gray-900 dark:text-white">
              {friend.name}
            </Text>
            {friend.distance !== undefined && (
              <DistanceIndicator distance={friend.distance} size="sm" showIcon={false} />
            )}
          </View>

          {/* Current activity or location */}
          <View className="flex-row items-center">
            {friend.currentActivity ? (
              <>
                <Ionicons name="calendar" size={12} color="#9CA3AF" />
                <Text className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                  {friend.currentActivity}
                </Text>
              </>
            ) : friend.currentLocation ? (
              <>
                <Ionicons name="location" size={12} color="#9CA3AF" />
                <Text className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                  {friend.currentLocation}
                </Text>
              </>
            ) : friend.status === 'offline' && friend.lastSeen ? (
              <Text className="text-sm text-gray-500 dark:text-gray-500">
                Last seen {friend.lastSeen}
              </Text>
            ) : (
              <Badge variant="neutral" size="sm" icon={status.icon}>
                {status.text}
              </Badge>
            )}
          </View>

          {/* Mutual friends */}
          {friend.mutualFriends && friend.mutualFriends > 0 && (
            <View className="flex-row items-center mt-1">
              <Ionicons name="people" size={12} color="#9CA3AF" />
              <Text className="text-xs text-gray-500 dark:text-gray-500 ml-1">
                {friend.mutualFriends} mutual friends
              </Text>
            </View>
          )}
        </View>

        {/* Actions */}
        {friend.status === 'available' && (
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              onMessagePress?.(friend);
            }}
            className="ml-2 bg-blue-100 dark:bg-blue-900 rounded-full p-2"
          >
            <Ionicons name="chatbubble" size={18} color="#3B82F6" />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}