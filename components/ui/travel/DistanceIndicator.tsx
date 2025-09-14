import React from 'react';
import { View, Text, ViewProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../../../utils/cn';
import { travel } from '../../../utils/design-tokens';

export type DistanceRange = 'near' | 'medium' | 'far';
export type DistanceFormat = 'km' | 'miles';
export type IndicatorSize = 'sm' | 'md' | 'lg';

interface DistanceIndicatorProps extends Omit<ViewProps, 'style'> {
  distance: number; // in kilometers
  format?: DistanceFormat;
  size?: IndicatorSize;
  showIcon?: boolean;
  showRange?: boolean;
  className?: string;
  textClassName?: string;
}

const sizeConfig: Record<IndicatorSize, {
  container: string;
  text: string;
  icon: number;
  dot: string;
}> = {
  sm: {
    container: 'px-2 py-1 rounded-full',
    text: 'text-xs font-medium',
    icon: 12,
    dot: 'w-2 h-2',
  },
  md: {
    container: 'px-3 py-1.5 rounded-full',
    text: 'text-sm font-semibold',
    icon: 14,
    dot: 'w-2.5 h-2.5',
  },
  lg: {
    container: 'px-4 py-2 rounded-full',
    text: 'text-base font-bold',
    icon: 16,
    dot: 'w-3 h-3',
  },
};

function getDistanceRange(distance: number): DistanceRange {
  if (distance < 1) return 'near';
  if (distance < 5) return 'medium';
  return 'far';
}

function formatDistance(distance: number, format: DistanceFormat): string {
  if (format === 'miles') {
    const miles = distance * 0.621371;
    if (miles < 0.1) return '<0.1 mi';
    if (miles < 1) return `${miles.toFixed(1)} mi`;
    return `${Math.round(miles)} mi`;
  }

  if (distance < 0.1) return '<100 m';
  if (distance < 1) return `${Math.round(distance * 1000)} m`;
  if (distance < 10) return `${distance.toFixed(1)} km`;
  return `${Math.round(distance)} km`;
}

function getRangeLabel(range: DistanceRange): string {
  switch (range) {
    case 'near': return 'Nearby';
    case 'medium': return 'Close';
    case 'far': return 'Far';
  }
}

const rangeStyles: Record<DistanceRange, {
  bg: string;
  text: string;
  dot: string;
  icon: string;
}> = {
  near: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-800 dark:text-green-200',
    dot: 'bg-green-500',
    icon: '#10B981',
  },
  medium: {
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-800 dark:text-orange-200',
    dot: 'bg-orange-500',
    icon: '#F97316',
  },
  far: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-800 dark:text-blue-200',
    dot: 'bg-blue-500',
    icon: '#2563EB',
  },
};

export default function DistanceIndicator({
  distance,
  format = 'km',
  size = 'md',
  showIcon = true,
  showRange = false,
  className,
  textClassName,
  ...props
}: DistanceIndicatorProps) {
  const range = getDistanceRange(distance);
  const formattedDistance = formatDistance(distance, format);
  const sizeSettings = sizeConfig[size];
  const styleSettings = rangeStyles[range];

  const containerClasses = cn(
    'flex-row items-center border border-opacity-20',
    sizeSettings.container,
    styleSettings.bg,
    `border-${range === 'near' ? 'green' : range === 'medium' ? 'orange' : 'blue'}-200`,
    className
  );

  const textClasses = cn(
    sizeSettings.text,
    styleSettings.text,
    textClassName
  );

  const displayText = showRange
    ? `${getRangeLabel(range)} • ${formattedDistance}`
    : formattedDistance;

  return (
    <View
      {...props}
      className={containerClasses}
      accessibilityRole="text"
      accessibilityLabel={`Distance: ${formattedDistance}, ${getRangeLabel(range)}`}
    >
      {showIcon && (
        <View className="mr-1.5">
          <Ionicons
            name="location"
            size={sizeSettings.icon}
            color={styleSettings.icon}
          />
        </View>
      )}

      <View className={cn('rounded-full mr-1.5', sizeSettings.dot, styleSettings.dot)} />

      <Text className={textClasses}>
        {displayText}
      </Text>
    </View>
  );
}

// Preset components for common use cases
export function NearbyIndicator({ distance, ...props }: Omit<DistanceIndicatorProps, 'distance'> & { distance?: number }) {
  return (
    <DistanceIndicator
      distance={distance || 0.5}
      showRange
      {...props}
    />
  );
}

export function WalkingDistanceIndicator({ distance, ...props }: DistanceIndicatorProps) {
  const walkingTime = Math.round((distance * 1000) / 83.3); // ~5 km/h walking speed

  return (
    <View className="flex-row items-center space-x-2">
      <DistanceIndicator distance={distance} {...props} />
      <Text className="text-xs text-gray-600 dark:text-gray-400">
        ~{walkingTime} min walk
      </Text>
    </View>
  );
}

export function DrivingDistanceIndicator({ distance, ...props }: DistanceIndicatorProps) {
  const drivingTime = Math.round((distance / 50) * 60); // ~50 km/h average city speed

  return (
    <View className="flex-row items-center space-x-2">
      <DistanceIndicator distance={distance} showIcon={false} {...props} />
      <View className="flex-row items-center">
        <Ionicons name="car" size={12} color="#6B7280" />
        <Text className="text-xs text-gray-600 dark:text-gray-400 ml-1">
          ~{drivingTime}m
        </Text>
      </View>
    </View>
  );
}