import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../../../utils/cn';
import Card, { CardContent, CardFooter } from './Card';
import Badge from '../atoms/Badge';
import Avatar from '../atoms/Avatar';
import DistanceIndicator from '../travel/DistanceIndicator';

export interface ActivityCardData {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: 'adventure' | 'culture' | 'food' | 'nightlife' | 'nature' | 'relaxation';
  price?: {
    amount: number;
    currency: string;
  };
  duration?: string;
  location: string;
  distance?: number;
  rating?: number;
  participantCount: number;
  maxParticipants?: number;
  date: string;
  time: string;
  organizer: {
    id: string;
    name: string;
    avatar?: string;
  };
  tags?: string[];
}

interface ActivityCardProps {
  activity: ActivityCardData;
  variant?: 'default' | 'compact' | 'featured';
  onPress?: (activity: ActivityCardData) => void;
  onOrganizerPress?: (organizerId: string) => void;
  onJoinPress?: (activityId: string) => void;
  showActions?: boolean;
  className?: string;
}

const categoryConfig: Record<ActivityCardData['category'], {
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}> = {
  adventure: { color: '#10B981', icon: 'mountain', label: 'Adventure' },
  culture: { color: '#8B5CF6', icon: 'library', label: 'Culture' },
  food: { color: '#F97316', icon: 'restaurant', label: 'Food & Drink' },
  nightlife: { color: '#EC4899', icon: 'musical-notes', label: 'Nightlife' },
  nature: { color: '#059669', icon: 'leaf', label: 'Nature' },
  relaxation: { color: '#06B6D4', icon: 'spa', label: 'Relaxation' },
};

export default function ActivityCard({
  activity,
  variant = 'default',
  onPress,
  onOrganizerPress,
  onJoinPress,
  showActions = true,
  className,
}: ActivityCardProps) {
  const categoryInfo = categoryConfig[activity.category];
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';

  const formatPrice = (price: ActivityCardData['price']) => {
    if (!price) return 'Free';
    return `${price.currency}${price.amount}`;
  };

  const renderCompactCard = () => (
    <TouchableOpacity
      onPress={() => onPress?.(activity)}
      className="flex-row p-3 active:bg-gray-50 dark:active:bg-gray-800"
    >
      {activity.imageUrl && (
        <Image
          source={{ uri: activity.imageUrl }}
          className="w-16 h-16 rounded-lg mr-3"
          resizeMode="cover"
        />
      )}

      <View className="flex-1">
        <View className="flex-row items-start justify-between mb-1">
          <Text className="flex-1 font-semibold text-gray-900 dark:text-white mr-2">
            {activity.title}
          </Text>
          <Text className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {formatPrice(activity.price)}
          </Text>
        </View>

        <View className="flex-row items-center mb-2">
          <Ionicons name={categoryInfo.icon} size={14} color={categoryInfo.color} />
          <Text className="text-sm text-gray-600 dark:text-gray-400 ml-1 mr-3">
            {categoryInfo.label}
          </Text>
          {activity.distance !== undefined && (
            <DistanceIndicator distance={activity.distance} size="sm" />
          )}
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-gray-500 dark:text-gray-500">
            {activity.date} • {activity.time}
          </Text>
          <Text className="text-xs text-gray-500 dark:text-gray-500">
            {activity.participantCount} joining
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isCompact) {
    return renderCompactCard();
  }

  return (
    <Card
      variant={isFeatured ? 'travel' : 'default'}
      pressable
      onPress={() => onPress?.(activity)}
      shadow
      className={cn('overflow-hidden', className)}
    >
      {activity.imageUrl && (
        <View className="relative">
          <Image
            source={{ uri: activity.imageUrl }}
            className={cn(
              'w-full bg-gray-200 dark:bg-gray-700',
              isFeatured ? 'h-48' : 'h-32'
            )}
            resizeMode="cover"
          />

          {/* Category badge overlay */}
          <View className="absolute top-3 left-3">
            <Badge
              variant="neutral"
              size="sm"
              icon={categoryInfo.icon}
              className="bg-white/90 dark:bg-gray-800/90"
            >
              {categoryInfo.label}
            </Badge>
          </View>

          {/* Price overlay */}
          <View className="absolute top-3 right-3">
            <View className="bg-black/70 px-2 py-1 rounded-full">
              <Text className="text-white font-semibold text-sm">
                {formatPrice(activity.price)}
              </Text>
            </View>
          </View>

          {/* Rating overlay */}
          {activity.rating && (
            <View className="absolute bottom-3 right-3 flex-row items-center bg-black/70 px-2 py-1 rounded-full">
              <Ionicons name="star" size={12} color="#FCD34D" />
              <Text className="text-white font-medium text-xs ml-1">
                {activity.rating.toFixed(1)}
              </Text>
            </View>
          )}
        </View>
      )}

      <CardContent className="p-4">
        {/* Title and description */}
        <View className="mb-3">
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            {activity.title}
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 text-sm">
            {activity.description}
          </Text>
        </View>

        {/* Meta information */}
        <View className="flex-row items-center flex-wrap gap-3 mb-3">
          <View className="flex-row items-center">
            <Ionicons name="time" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-600 dark:text-gray-400 ml-1">
              {activity.duration || 'Flexible'}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="location" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-600 dark:text-gray-400 ml-1">
              {activity.location}
            </Text>
          </View>

          {activity.distance !== undefined && (
            <DistanceIndicator distance={activity.distance} size="sm" />
          )}
        </View>

        {/* Tags */}
        {activity.tags && activity.tags.length > 0 && (
          <View className="flex-row flex-wrap gap-1 mb-3">
            {activity.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="neutral" size="sm">
                {tag}
              </Badge>
            ))}
            {activity.tags.length > 3 && (
              <Badge variant="neutral" size="sm">
                +{activity.tags.length - 3}
              </Badge>
            )}
          </View>
        )}

        {/* Date and time */}
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center">
            <Ionicons name="calendar" size={16} color="#6B7280" />
            <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
              {activity.date} at {activity.time}
            </Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="people" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-600 dark:text-gray-400 ml-1">
              {activity.participantCount}
              {activity.maxParticipants && `/${activity.maxParticipants}`} going
            </Text>
          </View>
        </View>
      </CardContent>

      {/* Organizer and actions */}
      <CardFooter className="px-4 pb-4 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => onOrganizerPress?.(activity.organizer.id)}
          className="flex-row items-center flex-1 mr-3"
        >
          <Avatar
            size="sm"
            src={activity.organizer.avatar}
            fallback={activity.organizer.name}
          />
          <View className="ml-2 flex-1">
            <Text className="text-sm font-medium text-gray-900 dark:text-white">
              {activity.organizer.name}
            </Text>
            <Text className="text-xs text-gray-500 dark:text-gray-500">
              Organizer
            </Text>
          </View>
        </TouchableOpacity>

        {showActions && (
          <TouchableOpacity
            onPress={() => onJoinPress?.(activity.id)}
            className="bg-blue-600 px-4 py-2 rounded-lg active:bg-blue-700"
          >
            <Text className="text-white font-semibold">Join</Text>
          </TouchableOpacity>
        )}
      </CardFooter>
    </Card>
  );
}

// Preset variants
export function CompactActivityCard(props: Omit<ActivityCardProps, 'variant'>) {
  return <ActivityCard {...props} variant="compact" />;
}

export function FeaturedActivityCard(props: Omit<ActivityCardProps, 'variant'>) {
  return <ActivityCard {...props} variant="featured" />;
}