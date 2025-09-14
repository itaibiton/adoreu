import React from 'react';
import { View, Text, ViewProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../../../utils/cn';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral' | 'travel';
export type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps extends Omit<ViewProps, 'style'> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
  icon?: keyof typeof Ionicons.glyphMap;
  dot?: boolean;
  className?: string;
  textClassName?: string;
}

const badgeVariants: Record<BadgeVariant, string> = {
  primary: 'bg-blue-100 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700',
  secondary: 'bg-orange-100 border-orange-200 dark:bg-orange-900/30 dark:border-orange-700',
  success: 'bg-green-100 border-green-200 dark:bg-green-900/30 dark:border-green-700',
  warning: 'bg-yellow-100 border-yellow-200 dark:bg-yellow-900/30 dark:border-yellow-700',
  error: 'bg-red-100 border-red-200 dark:bg-red-900/30 dark:border-red-700',
  neutral: 'bg-gray-100 border-gray-200 dark:bg-gray-800 dark:border-gray-600',
  travel: 'bg-gradient-to-r from-blue-100 to-teal-100 border-blue-200 dark:from-blue-900/30 dark:to-teal-900/30 dark:border-blue-700',
};

const badgeSizes: Record<BadgeSize, { container: string; text: string; icon: number; dot: string }> = {
  sm: {
    container: 'px-2 py-1 rounded-full',
    text: 'text-xs font-medium',
    icon: 12,
    dot: 'w-1.5 h-1.5',
  },
  md: {
    container: 'px-3 py-1.5 rounded-full',
    text: 'text-sm font-medium',
    icon: 14,
    dot: 'w-2 h-2',
  },
  lg: {
    container: 'px-4 py-2 rounded-full',
    text: 'text-base font-semibold',
    icon: 16,
    dot: 'w-2.5 h-2.5',
  },
};

const textVariants: Record<BadgeVariant, string> = {
  primary: 'text-blue-800 dark:text-blue-200',
  secondary: 'text-orange-800 dark:text-orange-200',
  success: 'text-green-800 dark:text-green-200',
  warning: 'text-yellow-800 dark:text-yellow-200',
  error: 'text-red-800 dark:text-red-200',
  neutral: 'text-gray-800 dark:text-gray-200',
  travel: 'text-blue-800 dark:text-blue-200',
};

const dotVariants: Record<BadgeVariant, string> = {
  primary: 'bg-blue-500',
  secondary: 'bg-orange-500',
  success: 'bg-green-500',
  warning: 'bg-yellow-500',
  error: 'bg-red-500',
  neutral: 'bg-gray-500',
  travel: 'bg-teal-500',
};

const iconColors: Record<BadgeVariant, string> = {
  primary: '#1E40AF',
  secondary: '#C2410C',
  success: '#166534',
  warning: '#A16207',
  error: '#B91C1C',
  neutral: '#374151',
  travel: '#0F766E',
};

export default function Badge({
  variant = 'neutral',
  size = 'md',
  children,
  icon,
  dot = false,
  className,
  textClassName,
  ...props
}: BadgeProps) {
  const sizeConfig = badgeSizes[size];

  const containerClasses = cn(
    'flex-row items-center justify-center border',
    sizeConfig.container,
    badgeVariants[variant],
    className
  );

  const textClasses = cn(
    sizeConfig.text,
    textVariants[variant],
    textClassName
  );

  const dotClasses = cn(
    'rounded-full mr-1.5',
    sizeConfig.dot,
    dotVariants[variant]
  );

  return (
    <View
      {...props}
      className={containerClasses}
      accessibilityRole="text"
    >
      {dot && <View className={dotClasses} />}

      {icon && !dot && (
        <View className="mr-1">
          <Ionicons
            name={icon}
            size={sizeConfig.icon}
            color={iconColors[variant]}
          />
        </View>
      )}

      <Text className={textClasses}>
        {children}
      </Text>
    </View>
  );
}