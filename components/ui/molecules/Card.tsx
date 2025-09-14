import React from 'react';
import {
  View,
  TouchableOpacity,
  ViewProps,
  TouchableOpacityProps,
} from 'react-native';
import { cn } from '../../../utils/cn';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'travel' | 'glass';
export type CardSize = 'sm' | 'md' | 'lg';

interface BaseCardProps {
  variant?: CardVariant;
  size?: CardSize;
  children: React.ReactNode;
  className?: string;
  shadow?: boolean;
}

interface StaticCardProps extends BaseCardProps, Omit<ViewProps, 'style'> {
  pressable?: false;
}

interface PressableCardProps extends BaseCardProps, Omit<TouchableOpacityProps, 'style'> {
  pressable: true;
}

type CardProps = StaticCardProps | PressableCardProps;

const cardVariants: Record<CardVariant, string> = {
  default: 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
  elevated: 'bg-white dark:bg-gray-800 shadow-lg',
  outlined: 'bg-transparent border-2 border-gray-300 dark:border-gray-600',
  travel: 'bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-950/30 border border-blue-200 dark:border-blue-700 shadow-md',
  glass: 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white/20 dark:border-gray-700/20 shadow-xl',
};

const cardSizes: Record<CardSize, string> = {
  sm: 'p-3 rounded-lg',
  md: 'p-4 rounded-xl',
  lg: 'p-6 rounded-2xl',
};

const cardShadows: Record<CardVariant, string> = {
  default: 'shadow-sm',
  elevated: 'shadow-lg',
  outlined: '',
  travel: 'shadow-md',
  glass: 'shadow-xl',
};

const pressableStates: Record<CardVariant, string> = {
  default: 'active:bg-gray-50 dark:active:bg-gray-750 active:scale-[0.98]',
  elevated: 'active:bg-gray-50 dark:active:bg-gray-750 active:shadow-md active:scale-[0.98]',
  outlined: 'active:bg-gray-50 dark:active:bg-gray-800 active:scale-[0.98]',
  travel: 'active:from-blue-50 active:to-blue-100 dark:active:from-gray-750 dark:active:to-blue-950/50 active:scale-[0.98]',
  glass: 'active:bg-white/90 dark:active:bg-gray-800/90 active:scale-[0.98]',
};

export default function Card(props: CardProps) {
  const {
    variant = 'default',
    size = 'md',
    children,
    className,
    shadow = false,
    ...restProps
  } = props;

  const baseClasses = cn(
    'transition-all duration-200',
    cardSizes[size],
    cardVariants[variant],
    shadow && cardShadows[variant],
    className
  );

  if (props.pressable) {
    const { pressable, ...touchableProps } = restProps as PressableCardProps;

    const pressableClasses = cn(
      baseClasses,
      pressableStates[variant]
    );

    return (
      <TouchableOpacity
        {...touchableProps}
        className={pressableClasses}
        accessibilityRole="button"
      >
        {children}
      </TouchableOpacity>
    );
  }

  const viewProps = restProps as StaticCardProps;

  return (
    <View
      {...viewProps}
      className={baseClasses}
    >
      {children}
    </View>
  );
}

// Convenience components for common card layouts
export function CardHeader({
  children,
  className,
  ...props
}: ViewProps & { className?: string }) {
  return (
    <View
      {...props}
      className={cn('mb-3', className)}
    >
      {children}
    </View>
  );
}

export function CardContent({
  children,
  className,
  ...props
}: ViewProps & { className?: string }) {
  return (
    <View
      {...props}
      className={cn('flex-1', className)}
    >
      {children}
    </View>
  );
}

export function CardFooter({
  children,
  className,
  ...props
}: ViewProps & { className?: string }) {
  return (
    <View
      {...props}
      className={cn('mt-3 flex-row items-center justify-between', className)}
    >
      {children}
    </View>
  );
}