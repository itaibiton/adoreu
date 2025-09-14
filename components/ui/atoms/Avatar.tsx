import React from 'react';
import { View, Text, Image, ImageProps, ViewProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../../../utils/cn';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type TravelStatus = 'traveling' | 'available' | 'busy' | 'offline';

interface AvatarProps extends Omit<ViewProps, 'style'> {
  size?: AvatarSize;
  src?: string;
  alt?: string;
  fallback?: string;
  travelStatus?: TravelStatus;
  showStatusIndicator?: boolean;
  className?: string;
  imageProps?: Partial<ImageProps>;
}

const avatarSizes: Record<AvatarSize, {
  container: string;
  text: string;
  fontSize: number;
  statusSize: string;
  statusIcon: number;
}> = {
  xs: {
    container: 'w-6 h-6',
    text: 'text-xs',
    fontSize: 10,
    statusSize: 'w-2 h-2',
    statusIcon: 8,
  },
  sm: {
    container: 'w-8 h-8',
    text: 'text-sm',
    fontSize: 12,
    statusSize: 'w-2.5 h-2.5',
    statusIcon: 10,
  },
  md: {
    container: 'w-12 h-12',
    text: 'text-base',
    fontSize: 16,
    statusSize: 'w-3 h-3',
    statusIcon: 12,
  },
  lg: {
    container: 'w-16 h-16',
    text: 'text-lg',
    fontSize: 20,
    statusSize: 'w-4 h-4',
    statusIcon: 14,
  },
  xl: {
    container: 'w-20 h-20',
    text: 'text-xl',
    fontSize: 24,
    statusSize: 'w-5 h-5',
    statusIcon: 16,
  },
  '2xl': {
    container: 'w-24 h-24',
    text: 'text-2xl',
    fontSize: 28,
    statusSize: 'w-6 h-6',
    statusIcon: 18,
  },
};

const statusConfig: Record<TravelStatus, {
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
  bgColor: string;
}> = {
  traveling: {
    color: '#10B981',
    icon: 'airplane',
    bgColor: 'bg-green-500',
  },
  available: {
    color: '#2563EB',
    icon: 'checkmark-circle',
    bgColor: 'bg-blue-500',
  },
  busy: {
    color: '#F97316',
    icon: 'time',
    bgColor: 'bg-orange-500',
  },
  offline: {
    color: '#6B7280',
    icon: 'remove-circle',
    bgColor: 'bg-gray-400',
  },
};

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name: string): string {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-red-500',
  ];

  const charCodeSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return colors[charCodeSum % colors.length];
}

export default function Avatar({
  size = 'md',
  src,
  alt,
  fallback = '??',
  travelStatus,
  showStatusIndicator = false,
  className,
  imageProps,
  ...props
}: AvatarProps) {
  const sizeConfig = avatarSizes[size];
  const statusInfo = travelStatus ? statusConfig[travelStatus] : null;

  const containerClasses = cn(
    'relative rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 items-center justify-center',
    sizeConfig.container,
    className
  );

  const fallbackClasses = cn(
    'font-semibold text-white',
    sizeConfig.text
  );

  const statusClasses = cn(
    'absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-white dark:border-gray-900 items-center justify-center',
    sizeConfig.statusSize,
    statusInfo?.bgColor || 'bg-gray-400'
  );

  const initials = fallback ? getInitials(fallback) : '??';
  const bgColor = fallback ? getAvatarColor(fallback) : 'bg-gray-500';

  return (
    <View
      {...props}
      className={containerClasses}
      accessibilityRole="image"
      accessibilityLabel={alt || `Avatar for ${fallback}`}
    >
      {src ? (
        <Image
          source={{ uri: src }}
          className="w-full h-full"
          resizeMode="cover"
          accessibilityLabel={alt}
          {...imageProps}
          onError={() => {
            // Handle image loading error by showing fallback
          }}
        />
      ) : (
        <View className={cn('w-full h-full items-center justify-center', bgColor)}>
          <Text className={fallbackClasses} style={{ fontSize: sizeConfig.fontSize }}>
            {initials}
          </Text>
        </View>
      )}

      {showStatusIndicator && statusInfo && (
        <View className={statusClasses}>
          <Ionicons
            name={statusInfo.icon}
            size={sizeConfig.statusIcon}
            color="white"
          />
        </View>
      )}
    </View>
  );
}