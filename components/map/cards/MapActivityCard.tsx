import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../../../utils/cn';
import Badge from '../../ui/atoms/Badge';
import Avatar from '../../ui/atoms/Avatar';
import DistanceIndicator from '../../ui/travel/DistanceIndicator';

export interface MapActivityCardData {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  category: 'adventure' | 'culture' | 'food' | 'nightlife' | 'nature' | 'relaxation';
  host: {
    id: string;
    name: string;
    avatar?: string;
  };
  location: string;
  distance?: number;
  startTime: string;
  duration: string;
  participantCount: number;
  maxParticipants?: number;
  price?: {
    amount: number;
    currency: string;
  };
  status: 'upcoming' | 'ongoing' | 'ending_soon';
  tags?: string[];
}

interface MapActivityCardProps {
  activity: MapActivityCardData;
  onPress?: (activity: MapActivityCardData) => void;
  onJoinPress?: (activity: MapActivityCardData) => void;
  isSelected?: boolean;
  className?: string;
}

const categoryConfig = {
  adventure: {
    color: '#10B981',
    icon: 'compass' as keyof typeof Ionicons.glyphMap,
    label: 'Adventure',
    bgClass: 'bg-green-100 dark:bg-green-900',
  },
  culture: {
    color: '#8B5CF6',
    icon: 'library' as keyof typeof Ionicons.glyphMap,
    label: 'Culture',
    bgClass: 'bg-purple-100 dark:bg-purple-900',
  },
  food: {
    color: '#F97316',
    icon: 'restaurant' as keyof typeof Ionicons.glyphMap,
    label: 'Food',
    bgClass: 'bg-orange-100 dark:bg-orange-900',
  },
  nightlife: {
    color: '#EC4899',
    icon: 'moon' as keyof typeof Ionicons.glyphMap,
    label: 'Nightlife',
    bgClass: 'bg-pink-100 dark:bg-pink-900',
  },
  nature: {
    color: '#059669',
    icon: 'leaf' as keyof typeof Ionicons.glyphMap,
    label: 'Nature',
    bgClass: 'bg-emerald-100 dark:bg-emerald-900',
  },
  relaxation: {
    color: '#06B6D4',
    icon: 'water' as keyof typeof Ionicons.glyphMap,
    label: 'Relaxation',
    bgClass: 'bg-cyan-100 dark:bg-cyan-900',
  },
};

export default function MapActivityCard({
  activity,
  onPress,
  onJoinPress,
  isSelected,
  className
}: MapActivityCardProps) {
  const config = categoryConfig[activity.category];
  const isFull = activity.maxParticipants && activity.participantCount >= activity.maxParticipants;
  const spotsLeft = activity.maxParticipants ? activity.maxParticipants - activity.participantCount : null;

  return (
    <TouchableOpacity
      onPress={() => onPress?.(activity)}
      className={cn(
        "bg-white dark:bg-gray-800 rounded-xl overflow-hidden mb-3",
        "border border-gray-200 dark:border-gray-700",
        isSelected && "border-blue-500 bg-blue-50 dark:bg-blue-950",
        "active:scale-[0.98] transition-all",
        className
      )}
    >
      <View className="flex-row">
        {/* Image or category icon */}
        <View className="relative">
          {activity.imageUrl ? (
            <Image
              source={{ uri: activity.imageUrl }}
              className="w-24 h-24"
              resizeMode="cover"
            />
          ) : (
            <View className={cn("w-24 h-24 items-center justify-center", config.bgClass)}>
              <Ionicons name={config.icon} size={32} color={config.color} />
            </View>
          )}

          {/* Status badge */}
          {activity.status === 'ongoing' && (
            <View className="absolute top-2 left-2">
              <Badge variant="success" size="sm">
                Live
              </Badge>
            </View>
          )}
          {activity.status === 'ending_soon' && (
            <View className="absolute top-2 left-2">
              <Badge variant="warning" size="sm">
                Ending
              </Badge>
            </View>
          )}
        </View>

        {/* Content */}
        <View className="flex-1 p-3">
          {/* Title and category */}
          <View className="flex-row items-start justify-between mb-1">
            <Text
              className="flex-1 font-semibold text-gray-900 dark:text-white mr-2"
              numberOfLines={1}
            >
              {activity.title}
            </Text>
            <Badge variant="neutral" size="sm" icon={config.icon}>
              {config.label}
            </Badge>
          </View>

          {/* Time and location */}
          <View className="flex-row items-center mb-2">
            <Ionicons name="time-outline" size={14} color="#6B7280" />
            <Text className="text-sm text-gray-600 dark:text-gray-400 ml-1 mr-3">
              {activity.startTime} • {activity.duration}
            </Text>
            {activity.distance !== undefined && (
              <DistanceIndicator distance={activity.distance} size="sm" showIcon />
            )}
          </View>

          {/* Host and participants */}
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <Avatar
                size="xs"
                src={activity.host.avatar}
                fallback={activity.host.name}
              />
              <Text className="text-xs text-gray-600 dark:text-gray-400 ml-2">
                {activity.host.name}
              </Text>
            </View>

            {/* Participant count and join button */}
            <View className="flex-row items-center">
              {!isFull && spotsLeft && spotsLeft <= 3 && (
                <Text className="text-xs text-orange-500 mr-2">
                  {spotsLeft} spots left
                </Text>
              )}

              <View className="flex-row items-center mr-2">
                <Ionicons name="people" size={14} color="#6B7280" />
                <Text className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                  {activity.participantCount}
                  {activity.maxParticipants && `/${activity.maxParticipants}`}
                </Text>
              </View>

              {!isFull && (
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation();
                    onJoinPress?.(activity);
                  }}
                  className="bg-blue-600 rounded-lg px-3 py-1.5"
                >
                  <Text className="text-white text-sm font-semibold">Join</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Price */}
          {activity.price && (
            <View className="flex-row items-center mt-2">
              <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {activity.currency || '$'}{activity.price.amount}
              </Text>
              <Text className="text-xs text-gray-500 dark:text-gray-500 ml-1">
                per person
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}