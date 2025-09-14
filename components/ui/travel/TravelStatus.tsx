import React from 'react';
import { View, Text, ViewProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../../../utils/cn';

export type TravelStatus = 'traveling' | 'available' | 'busy' | 'offline';
export type StatusSize = 'sm' | 'md' | 'lg';
export type StatusVariant = 'badge' | 'pill' | 'minimal';

interface TravelStatusProps extends Omit<ViewProps, 'style'> {
  status: TravelStatus;
  size?: StatusSize;
  variant?: StatusVariant;
  showLabel?: boolean;
  showIcon?: boolean;
  customLabel?: string;
  location?: string;
  className?: string;
  textClassName?: string;
}

const statusConfig: Record<TravelStatus, {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}> = {
  traveling: {
    label: 'Traveling',
    icon: 'airplane',
    color: '#10B981',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    textColor: 'text-green-800 dark:text-green-200',
    borderColor: 'border-green-200 dark:border-green-700',
  },
  available: {
    label: 'Available',
    icon: 'checkmark-circle',
    color: '#2563EB',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    textColor: 'text-blue-800 dark:text-blue-200',
    borderColor: 'border-blue-200 dark:border-blue-700',
  },
  busy: {
    label: 'Busy',
    icon: 'time',
    color: '#F97316',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    textColor: 'text-orange-800 dark:text-orange-200',
    borderColor: 'border-orange-200 dark:border-orange-700',
  },
  offline: {
    label: 'Offline',
    icon: 'remove-circle',
    color: '#6B7280',
    bgColor: 'bg-gray-100 dark:bg-gray-800',
    textColor: 'text-gray-800 dark:text-gray-200',
    borderColor: 'border-gray-200 dark:border-gray-600',
  },
};

const sizeConfig: Record<StatusSize, {
  badge: string;
  pill: string;
  minimal: string;
  text: string;
  icon: number;
  dot: string;
}> = {
  sm: {
    badge: 'px-2 py-1 rounded-md',
    pill: 'px-2 py-1 rounded-full',
    minimal: 'p-0',
    text: 'text-xs font-medium',
    icon: 12,
    dot: 'w-2 h-2',
  },
  md: {
    badge: 'px-3 py-1.5 rounded-lg',
    pill: 'px-3 py-1.5 rounded-full',
    minimal: 'p-0',
    text: 'text-sm font-semibold',
    icon: 14,
    dot: 'w-2.5 h-2.5',
  },
  lg: {
    badge: 'px-4 py-2 rounded-xl',
    pill: 'px-4 py-2 rounded-full',
    minimal: 'p-0',
    text: 'text-base font-bold',
    icon: 16,
    dot: 'w-3 h-3',
  },
};

export default function TravelStatus({
  status,
  size = 'md',
  variant = 'badge',
  showLabel = true,
  showIcon = true,
  customLabel,
  location,
  className,
  textClassName,
  ...props
}: TravelStatusProps) {
  const statusSettings = statusConfig[status];
  const sizeSettings = sizeConfig[size];

  const getContainerClasses = () => {
    if (variant === 'minimal') {
      return cn('flex-row items-center', className);
    }

    return cn(
      'flex-row items-center border',
      sizeSettings[variant],
      statusSettings.bgColor,
      statusSettings.borderColor,
      className
    );
  };

  const textClasses = cn(
    sizeSettings.text,
    variant === 'minimal' ? statusSettings.textColor.replace('800', '600').replace('200', '400') : statusSettings.textColor,
    textClassName
  );

  const displayLabel = customLabel || statusSettings.label;
  const displayText = location && status === 'traveling'
    ? `${displayLabel} to ${location}`
    : displayLabel;

  const dotClasses = cn(
    'rounded-full mr-2',
    sizeSettings.dot,
    statusSettings.bgColor.replace('bg-', 'bg-').replace('-100', '-500').replace('-900/30', '-500')
  );

  return (
    <View
      {...props}
      className={getContainerClasses()}
      accessibilityRole="text"
      accessibilityLabel={`Status: ${displayText}`}
    >
      {variant === 'minimal' ? (
        <View className={dotClasses} />
      ) : showIcon ? (
        <View className="mr-2">
          <Ionicons
            name={statusSettings.icon}
            size={sizeSettings.icon}
            color={statusSettings.color}
          />
        </View>
      ) : null}

      {showLabel && (
        <Text className={textClasses}>
          {displayText}
        </Text>
      )}
    </View>
  );
}

// Preset components for specific travel statuses
export function TravelingStatus({ location, ...props }: Omit<TravelStatusProps, 'status'> & { location?: string }) {
  return (
    <TravelStatus
      status="traveling"
      location={location}
      {...props}
    />
  );
}

export function AvailableStatus(props: Omit<TravelStatusProps, 'status'>) {
  return (
    <TravelStatus
      status="available"
      customLabel="Open to meet"
      {...props}
    />
  );
}

export function BusyStatus({ customLabel, ...props }: Omit<TravelStatusProps, 'status'> & { customLabel?: string }) {
  return (
    <TravelStatus
      status="busy"
      customLabel={customLabel || "Exploring"}
      {...props}
    />
  );
}

export function OfflineStatus(props: Omit<TravelStatusProps, 'status'>) {
  return (
    <TravelStatus
      status="offline"
      {...props}
    />
  );
}

// Status dot component for compact displays
export function StatusDot({
  status,
  size = 'md',
  className,
  ...props
}: Pick<TravelStatusProps, 'status' | 'size' | 'className'> & ViewProps) {
  const statusSettings = statusConfig[status];
  const sizeSettings = sizeConfig[size];

  const dotClasses = cn(
    'rounded-full border-2 border-white dark:border-gray-900',
    sizeSettings.dot,
    statusSettings.bgColor.replace('bg-', 'bg-').replace('-100', '-500').replace('-900/30', '-500'),
    className
  );

  return (
    <View
      {...props}
      className={dotClasses}
      accessibilityRole="image"
      accessibilityLabel={`${statusSettings.label} status`}
    />
  );
}