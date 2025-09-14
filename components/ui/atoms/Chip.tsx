import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  TouchableOpacityProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../../../utils/cn';

export type ChipVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'travel';
export type ChipSize = 'sm' | 'md' | 'lg';

interface ChipProps extends Omit<TouchableOpacityProps, 'style'> {
  variant?: ChipVariant;
  size?: ChipSize;
  children: React.ReactNode;
  selected?: boolean;
  deletable?: boolean;
  onDelete?: () => void;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  className?: string;
  textClassName?: string;
}

const chipVariants: Record<ChipVariant, {
  default: string;
  selected: string;
}> = {
  default: {
    default: 'bg-gray-100 border-gray-200 dark:bg-gray-800 dark:border-gray-600',
    selected: 'bg-gray-800 border-gray-800 dark:bg-gray-200 dark:border-gray-200',
  },
  primary: {
    default: 'bg-blue-100 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700',
    selected: 'bg-blue-600 border-blue-600 dark:bg-blue-500 dark:border-blue-500',
  },
  secondary: {
    default: 'bg-orange-100 border-orange-200 dark:bg-orange-900/30 dark:border-orange-700',
    selected: 'bg-orange-500 border-orange-500 dark:bg-orange-500 dark:border-orange-500',
  },
  success: {
    default: 'bg-green-100 border-green-200 dark:bg-green-900/30 dark:border-green-700',
    selected: 'bg-green-600 border-green-600 dark:bg-green-500 dark:border-green-500',
  },
  warning: {
    default: 'bg-yellow-100 border-yellow-200 dark:bg-yellow-900/30 dark:border-yellow-700',
    selected: 'bg-yellow-500 border-yellow-500 dark:bg-yellow-500 dark:border-yellow-500',
  },
  error: {
    default: 'bg-red-100 border-red-200 dark:bg-red-900/30 dark:border-red-700',
    selected: 'bg-red-600 border-red-600 dark:bg-red-500 dark:border-red-500',
  },
  travel: {
    default: 'bg-gradient-to-r from-blue-100 to-teal-100 border-blue-200 dark:from-blue-900/30 dark:to-teal-900/30 dark:border-blue-700',
    selected: 'bg-gradient-to-r from-blue-600 to-teal-600 border-blue-600',
  },
};

const chipSizes: Record<ChipSize, {
  container: string;
  text: string;
  icon: number;
  deleteIcon: number;
}> = {
  sm: {
    container: 'px-2 py-1 rounded-full',
    text: 'text-xs font-medium',
    icon: 12,
    deleteIcon: 14,
  },
  md: {
    container: 'px-3 py-1.5 rounded-full',
    text: 'text-sm font-medium',
    icon: 14,
    deleteIcon: 16,
  },
  lg: {
    container: 'px-4 py-2 rounded-full',
    text: 'text-base font-semibold',
    icon: 16,
    deleteIcon: 18,
  },
};

const textVariants: Record<ChipVariant, {
  default: string;
  selected: string;
}> = {
  default: {
    default: 'text-gray-800 dark:text-gray-200',
    selected: 'text-white dark:text-gray-800',
  },
  primary: {
    default: 'text-blue-800 dark:text-blue-200',
    selected: 'text-white',
  },
  secondary: {
    default: 'text-orange-800 dark:text-orange-200',
    selected: 'text-white',
  },
  success: {
    default: 'text-green-800 dark:text-green-200',
    selected: 'text-white',
  },
  warning: {
    default: 'text-yellow-800 dark:text-yellow-200',
    selected: 'text-white',
  },
  error: {
    default: 'text-red-800 dark:text-red-200',
    selected: 'text-white',
  },
  travel: {
    default: 'text-blue-800 dark:text-blue-200',
    selected: 'text-white',
  },
};

const iconColors: Record<ChipVariant, {
  default: string;
  selected: string;
}> = {
  default: { default: '#374151', selected: '#FFFFFF' },
  primary: { default: '#1E40AF', selected: '#FFFFFF' },
  secondary: { default: '#C2410C', selected: '#FFFFFF' },
  success: { default: '#166534', selected: '#FFFFFF' },
  warning: { default: '#A16207', selected: '#FFFFFF' },
  error: { default: '#B91C1C', selected: '#FFFFFF' },
  travel: { default: '#0F766E', selected: '#FFFFFF' },
};

export default function Chip({
  variant = 'default',
  size = 'md',
  children,
  selected = false,
  deletable = false,
  onDelete,
  leftIcon,
  disabled,
  className,
  textClassName,
  ...props
}: ChipProps) {
  const sizeConfig = chipSizes[size];
  const variantConfig = chipVariants[variant];
  const textVariantConfig = textVariants[variant];
  const iconColorConfig = iconColors[variant];

  const containerClasses = cn(
    'flex-row items-center justify-center border transition-all duration-200',
    sizeConfig.container,
    selected ? variantConfig.selected : variantConfig.default,
    disabled && 'opacity-50',
    className
  );

  const textClasses = cn(
    sizeConfig.text,
    selected ? textVariantConfig.selected : textVariantConfig.default,
    textClassName
  );

  const iconColor = selected ? iconColorConfig.selected : iconColorConfig.default;

  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      className={containerClasses}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled, selected: selected }}
    >
      {leftIcon && (
        <View className="mr-1">
          <Ionicons
            name={leftIcon}
            size={sizeConfig.icon}
            color={iconColor}
          />
        </View>
      )}

      <Text className={textClasses}>
        {children}
      </Text>

      {deletable && (
        <TouchableOpacity
          onPress={onDelete}
          className="ml-1 p-0.5"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityRole="button"
          accessibilityLabel="Delete chip"
        >
          <Ionicons
            name="close"
            size={sizeConfig.deleteIcon}
            color={iconColor}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}