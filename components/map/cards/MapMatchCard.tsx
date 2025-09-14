import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { cn } from '../../../utils/cn';
import Badge from '../../ui/atoms/Badge';
import Avatar from '../../ui/atoms/Avatar';
import Button from '../../ui/atoms/Button';

export interface MapMatchCardData {
  id: string;
  type: 'solo' | 'group';
  matchName: string;
  matchAvatar?: string;
  compatibility: number; // 0-100
  sharedInterests: string[];
  bio?: string;
  location?: string;
  distance?: number;
  memberCount?: number; // for groups
  activityPreference?: string;
}

interface MapMatchCardProps {
  match: MapMatchCardData;
  onPress?: (match: MapMatchCardData) => void;
  onConnectPress?: (match: MapMatchCardData) => void;
  isSelected?: boolean;
  className?: string;
}

export default function MapMatchCard({
  match,
  onPress,
  onConnectPress,
  isSelected,
  className
}: MapMatchCardProps) {
  const getCompatibilityColor = (score: number): [string, string] => {
    if (score >= 80) return ['#10B981', '#059669']; // green gradient
    if (score >= 60) return ['#F97316', '#EA580C']; // orange gradient
    return ['#6B7280', '#4B5563']; // gray gradient
  };

  const getCompatibilityLabel = (score: number): string => {
    if (score >= 90) return 'Perfect Match!';
    if (score >= 80) return 'Great Match';
    if (score >= 70) return 'Good Match';
    if (score >= 60) return 'Compatible';
    return 'Potential Match';
  };

  const gradientColors = getCompatibilityColor(match.compatibility);

  return (
    <TouchableOpacity
      onPress={() => onPress?.(match)}
      className={cn(
        "bg-white dark:bg-gray-800 rounded-xl overflow-hidden mb-3",
        "border border-gray-200 dark:border-gray-700",
        isSelected && "border-blue-500 bg-blue-50 dark:bg-blue-950",
        "active:scale-[0.98] transition-all",
        className
      )}
    >
      {/* Gradient header */}
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="px-4 py-2"
      >
        <View className="flex-row items-center justify-between p-4">
          <View className="flex-row items-center">
            <Ionicons
              name="sparkles"
              size={16}
              color="white"
            />
            <Text className="text-white font-bold ml-2">
              Match Opportunity
            </Text>
          </View>
          <View className="bg-white/20 rounded-full px-2 py-0.5">
            <Text className="text-white font-bold text-sm">
              {match.compatibility}% Match
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* Content */}
      <View className="p-4">
        <View className="flex-row items-center w-full  mb-2">
          <Avatar
            size="md"
            src={match.matchAvatar}
            fallback={match.matchName}
            className="mr-3"
          />
          <View className="flex justify-between">
            <Text className="font-semibold text-gray-900 dark:text-white text-base">
              {match.matchName}
            </Text>
            <Badge
              variant={match.type === 'solo' ? 'primary' : 'secondary'}
              size="sm"
              icon={match.type === 'solo' ? 'person' : 'people'}
            >
              {match.type === 'solo' ? 'Solo' : `Group (${match.memberCount})`}
            </Badge>
            {/* <Text className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
              {getCompatibilityLabel(match.compatibility)}
            </Text> */}
          </View>
        </View>

        <View className="flex-row items-start">
          {/* Avatar */}

          {/* Info */}
          <View className="flex-1">
            {/* Name and type */}


            {/* Compatibility label */}


            {/* Bio */}
            {match.bio && (
              <Text
                className="text-sm text-gray-600 dark:text-gray-400 mb-2"
                numberOfLines={2}
              >
                {match.bio}
              </Text>
            )}

            {/* Location and distance */}
            {match.location && (
              <View className="flex-row items-center mb-2">
                <Ionicons name="location" size={14} color="#6B7280" />
                <Text className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                  {match.location}
                </Text>
                {match.distance !== undefined && (
                  <Text className="text-sm text-blue-600 dark:text-blue-400 ml-2">
                    • {match.distance < 1 ? `${(match.distance * 1000).toFixed(0)}m` : `${match.distance.toFixed(1)}km`} away
                  </Text>
                )}
              </View>
            )}

            {/* Shared interests */}
            {match.sharedInterests.length > 0 && (
              <View className="mb-3">
                <Text className="text-xs text-gray-500 dark:text-gray-500 mb-1">
                  Shared Interests:
                </Text>
                <View className="flex-row flex-wrap gap-1">
                  {match.sharedInterests.slice(0, 3).map((interest, index) => (
                    <Badge
                      key={index}
                      variant="travel"
                      size="sm"
                    >
                      {interest}
                    </Badge>
                  ))}
                  {match.sharedInterests.length > 3 && (
                    <Badge variant="neutral" size="sm">
                      +{match.sharedInterests.length - 3}
                    </Badge>
                  )}
                </View>
              </View>
            )}

            {/* Activity preference */}
            {match.activityPreference && (
              <View className="flex-row items-center mb-3">
                <Ionicons name="heart" size={14} color="#EC4899" />
                <Text className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                  Looking for: {match.activityPreference}
                </Text>
              </View>
            )}

            {/* Connect button */}
            {/* <TouchableOpacity
              onPress={(e) => {
                e.stopPropagation();
                onConnectPress?.(match);
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600"
            >
              <LinearGradient
                colors={['#3B82F6', '#8B5CF6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className=""
              >
                <View className="flex-row items-center justify-center p-4 rounded-lg">
                  <Ionicons name="link" size={16} color="white" />
                  <Text className="text-white font-semibold ml-2">
                    Connect Now
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity> */}
            <Button
              variant="primary"
              onPress={() => onConnectPress?.(match)}
            >
              Connect Now
            </Button>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}