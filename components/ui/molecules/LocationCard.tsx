import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../../../utils/cn';
import Card, { CardContent, CardFooter } from './Card';
import Badge from '../atoms/Badge';
import DistanceIndicator from '../travel/DistanceIndicator';

export interface LocationCardData {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  type: 'city' | 'landmark' | 'restaurant' | 'hotel' | 'attraction' | 'hidden_gem';
  country?: string;
  region?: string;
  distance?: number;
  rating?: number;
  reviewCount?: number;
  priceRange?: '$' | '$$' | '$$$' | '$$$$';
  tags?: string[];
  highlights?: string[];
  travelersCount?: number;
  favoriteCount?: number;
  isBookmarked?: boolean;
  weatherInfo?: {
    temperature: number;
    condition: string;
    icon: string;
  };
}

interface LocationCardProps {
  location: LocationCardData;
  variant?: 'default' | 'compact' | 'hero';
  onPress?: (location: LocationCardData) => void;
  onBookmarkPress?: (locationId: string) => void;
  onNavigatePress?: (locationId: string) => void;
  showActions?: boolean;
  showWeather?: boolean;
  className?: string;
}

const locationTypeConfig: Record<LocationCardData['type'], {
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}> = {
  city: { color: '#2563EB', icon: 'business', label: 'City' },
  landmark: { color: '#7C3AED', icon: 'flag', label: 'Landmark' },
  restaurant: { color: '#F97316', icon: 'restaurant', label: 'Restaurant' },
  hotel: { color: '#10B981', icon: 'bed', label: 'Hotel' },
  attraction: { color: '#EC4899', icon: 'camera', label: 'Attraction' },
  hidden_gem: { color: '#06B6D4', icon: 'diamond', label: 'Hidden Gem' },
};

export default function LocationCard({
  location,
  variant = 'default',
  onPress,
  onBookmarkPress,
  onNavigatePress,
  showActions = true,
  showWeather = false,
  className,
}: LocationCardProps) {
  const typeInfo = locationTypeConfig[location.type];
  const isCompact = variant === 'compact';
  const isHero = variant === 'hero';

  const renderRating = () => {
    if (!location.rating) return null;

    return (
      <View className="flex-row items-center">
        <Ionicons name="star" size={14} color="#FCD34D" />
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">
          {location.rating.toFixed(1)}
        </Text>
        {location.reviewCount && (
          <Text className="text-xs text-gray-500 dark:text-gray-500 ml-1">
            ({location.reviewCount})
          </Text>
        )}
      </View>
    );
  };

  const renderPriceRange = () => {
    if (!location.priceRange) return null;

    return (
      <View className="flex-row items-center">
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {location.priceRange}
        </Text>
      </View>
    );
  };

  const renderCompactCard = () => (
    <TouchableOpacity
      onPress={() => onPress?.(location)}
      className="flex-row p-3 active:bg-gray-50 dark:active:bg-gray-800"
    >
      {location.imageUrl && (
        <Image
          source={{ uri: location.imageUrl }}
          className="w-16 h-16 rounded-lg mr-3"
          resizeMode="cover"
        />
      )}

      <View className="flex-1">
        <View className="flex-row items-start justify-between mb-1">
          <Text className="flex-1 font-semibold text-gray-900 dark:text-white mr-2">
            {location.name}
          </Text>
          {location.isBookmarked && (
            <Ionicons name="bookmark" size={16} color="#2563EB" />
          )}
        </View>

        <View className="flex-row items-center mb-1">
          <Ionicons name={typeInfo.icon} size={12} color={typeInfo.color} />
          <Text className="text-sm text-gray-600 dark:text-gray-400 ml-1">
            {typeInfo.label}
          </Text>
          {location.country && (
            <>
              <Text className="text-gray-400 mx-1">•</Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                {location.country}
              </Text>
            </>
          )}
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-2">
            {renderRating()}
            {renderPriceRange()}
          </View>
          {location.distance !== undefined && (
            <DistanceIndicator distance={location.distance} size="sm" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  if (isCompact) {
    return renderCompactCard();
  }

  return (
    <Card
      variant={isHero ? 'travel' : 'default'}
      pressable
      onPress={() => onPress?.(location)}
      shadow
      className={cn('overflow-hidden', className)}
    >
      {location.imageUrl && (
        <View className="relative">
          <Image
            source={{ uri: location.imageUrl }}
            className={cn(
              'w-full bg-gray-200 dark:bg-gray-700',
              isHero ? 'h-64' : 'h-48'
            )}
            resizeMode="cover"
          />

          {/* Type badge overlay */}
          <View className="absolute top-3 left-3">
            <Badge
              variant="neutral"
              size="sm"
              icon={typeInfo.icon}
              className="bg-white/90 dark:bg-gray-800/90"
            >
              {typeInfo.label}
            </Badge>
          </View>

          {/* Bookmark button */}
          {showActions && (
            <TouchableOpacity
              onPress={() => onBookmarkPress?.(location.id)}
              className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-gray-800/90 rounded-full items-center justify-center"
            >
              <Ionicons
                name={location.isBookmarked ? 'bookmark' : 'bookmark-outline'}
                size={18}
                color={location.isBookmarked ? '#2563EB' : '#6B7280'}
              />
            </TouchableOpacity>
          )}

          {/* Weather info */}
          {showWeather && location.weatherInfo && (
            <View className="absolute bottom-3 right-3 flex-row items-center bg-black/70 px-2 py-1 rounded-full">
              <Text className="text-white font-medium text-sm">
                {location.weatherInfo.temperature}°
              </Text>
            </View>
          )}

          {/* Price range overlay */}
          {location.priceRange && (
            <View className="absolute bottom-3 left-3">
              <View className="bg-black/70 px-2 py-1 rounded-full">
                <Text className="text-white font-semibold text-sm">
                  {location.priceRange}
                </Text>
              </View>
            </View>
          )}
        </View>
      )}

      <CardContent className="p-4">
        {/* Title and location */}
        <View className="mb-3">
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            {location.name}
          </Text>
          {(location.region || location.country) && (
            <View className="flex-row items-center">
              <Ionicons name="location" size={16} color="#6B7280" />
              <Text className="text-gray-600 dark:text-gray-400 ml-1">
                {[location.region, location.country].filter(Boolean).join(', ')}
              </Text>
            </View>
          )}
        </View>

        {/* Description */}
        {location.description && (
          <Text className="text-gray-600 dark:text-gray-400 text-sm mb-3">
            {location.description}
          </Text>
        )}

        {/* Rating, distance, and stats */}
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center space-x-4">
            {renderRating()}
            {location.distance !== undefined && (
              <DistanceIndicator distance={location.distance} size="sm" />
            )}
          </View>

          <View className="flex-row items-center space-x-3">
            {location.travelersCount && (
              <View className="flex-row items-center">
                <Ionicons name="people" size={16} color="#6B7280" />
                <Text className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                  {location.travelersCount}
                </Text>
              </View>
            )}

            {location.favoriteCount && (
              <View className="flex-row items-center">
                <Ionicons name="heart" size={16} color="#EC4899" />
                <Text className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                  {location.favoriteCount}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Highlights */}
        {location.highlights && location.highlights.length > 0 && (
          <View className="mb-3">
            <Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Highlights:
            </Text>
            <View className="space-y-1">
              {location.highlights.slice(0, 3).map((highlight, index) => (
                <View key={index} className="flex-row items-center">
                  <View className="w-1 h-1 bg-blue-500 rounded-full mr-2" />
                  <Text className="text-sm text-gray-600 dark:text-gray-400 flex-1">
                    {highlight}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Tags */}
        {location.tags && location.tags.length > 0 && (
          <View className="flex-row flex-wrap gap-1">
            {location.tags.slice(0, 4).map((tag, index) => (
              <Badge key={index} variant="neutral" size="sm">
                {tag}
              </Badge>
            ))}
            {location.tags.length > 4 && (
              <Badge variant="neutral" size="sm">
                +{location.tags.length - 4}
              </Badge>
            )}
          </View>
        )}
      </CardContent>

      {/* Actions */}
      {showActions && (
        <CardFooter className="px-4 pb-4 flex-row space-x-3">
          <TouchableOpacity
            onPress={() => onNavigatePress?.(location.id)}
            className="flex-1 flex-row items-center justify-center px-4 py-2 bg-blue-600 rounded-lg active:bg-blue-700"
          >
            <Ionicons name="navigate" size={16} color="white" />
            <Text className="text-white font-semibold ml-2">Navigate</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onBookmarkPress?.(location.id)}
            className="flex-row items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg active:bg-gray-50 dark:active:bg-gray-800"
          >
            <Ionicons
              name={location.isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={16}
              color={location.isBookmarked ? '#2563EB' : '#6B7280'}
            />
          </TouchableOpacity>
        </CardFooter>
      )}
    </Card>
  );
}

// Preset variants
export function CompactLocationCard(props: Omit<LocationCardProps, 'variant'>) {
  return <LocationCard {...props} variant="compact" />;
}

export function HeroLocationCard(props: Omit<LocationCardProps, 'variant'>) {
  return <LocationCard {...props} variant="hero" />;
}