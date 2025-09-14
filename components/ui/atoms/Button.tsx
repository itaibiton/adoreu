import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacityProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../../../utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'travel';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  loading?: boolean;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  fullWidth?: boolean;
  className?: string;
  textClassName?: string;
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-blue-600 active:bg-blue-700 shadow-md',
  secondary: 'bg-orange-500 active:bg-orange-600 shadow-md',
  outline: 'border-2 border-blue-600 bg-transparent active:bg-blue-50 dark:active:bg-blue-950',
  ghost: 'bg-transparent active:bg-gray-100 dark:active:bg-gray-800',
  travel: 'bg-gradient-to-r from-blue-600 to-teal-600 active:from-blue-700 active:to-teal-700 shadow-lg',
};

const buttonSizes: Record<ButtonSize, { container: string; text: string; icon: number }> = {
  sm: {
    container: 'px-3 py-2 rounded-md',
    text: 'text-sm font-medium',
    icon: 16,
  },
  md: {
    container: 'px-4 py-3 rounded-lg',
    text: 'text-base font-semibold',
    icon: 18,
  },
  lg: {
    container: 'px-6 py-4 rounded-xl',
    text: 'text-lg font-semibold',
    icon: 20,
  },
  xl: {
    container: 'px-8 py-5 rounded-xl',
    text: 'text-xl font-bold',
    icon: 24,
  },
};

const textVariants: Record<ButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-white',
  outline: 'text-blue-600 dark:text-blue-400',
  ghost: 'text-gray-700 dark:text-gray-200',
  travel: 'text-white',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  className,
  textClassName,
  ...props
}: ButtonProps) {
  const sizeConfig = buttonSizes[size];

  const containerClasses = cn(
    'flex-row items-center justify-center transition-all duration-200',
    sizeConfig.container,
    buttonVariants[variant],
    fullWidth && 'w-full',
    disabled && 'opacity-50',
    className
  );

  const textClasses = cn(
    sizeConfig.text,
    textVariants[variant],
    textClassName
  );

  const iconColor = variant === 'outline' ? '#2563EB' :
                   variant === 'ghost' ? '#374151' : '#FFFFFF';

  return (
    <TouchableOpacity
      {...props}
      disabled={disabled || loading}
      className={containerClasses}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={iconColor}
          className="mr-2"
        />
      ) : leftIcon ? (
        <View className="mr-2">
          <Ionicons
            name={leftIcon}
            size={sizeConfig.icon}
            color={iconColor}
          />
        </View>
      ) : null}

      <Text className={textClasses}>
        {children}
      </Text>

      {rightIcon && !loading && (
        <View className="ml-2">
          <Ionicons
            name={rightIcon}
            size={sizeConfig.icon}
            color={iconColor}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}