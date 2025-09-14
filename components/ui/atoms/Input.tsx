import React, { forwardRef } from 'react';
import {
  View,
  TextInput,
  Text,
  TextInputProps,
  ViewProps,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../../../utils/cn';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'filled' | 'travel';

interface InputProps extends Omit<TextInputProps, 'style'> {
  size?: InputSize;
  variant?: InputVariant;
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  required?: boolean;
  containerProps?: ViewProps;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
}

const inputSizes: Record<InputSize, {
  container: string;
  input: string;
  icon: number;
  label: string;
}> = {
  sm: {
    container: 'px-3 py-2',
    input: 'text-sm',
    icon: 18,
    label: 'text-sm mb-1',
  },
  md: {
    container: 'px-4 py-3',
    input: 'text-base',
    icon: 20,
    label: 'text-base mb-2',
  },
  lg: {
    container: 'px-5 py-4',
    input: 'text-lg',
    icon: 22,
    label: 'text-lg mb-2',
  },
};

const inputVariants: Record<InputVariant, string> = {
  default: 'border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800',
  filled: 'bg-gray-100 border border-transparent dark:bg-gray-700',
  travel: 'border-2 border-blue-200 bg-blue-50/50 dark:border-blue-700 dark:bg-blue-950/30',
};

const inputStates = {
  focus: {
    default: 'border-blue-500 dark:border-blue-400',
    filled: 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30',
    travel: 'border-blue-500 bg-blue-100/50 dark:border-blue-400',
  },
  error: {
    default: 'border-red-500 dark:border-red-400',
    filled: 'border-red-500 bg-red-50 dark:border-red-400 dark:bg-red-950/30',
    travel: 'border-red-500 bg-red-50 dark:border-red-400 dark:bg-red-950/30',
  },
};

export default forwardRef<TextInput, InputProps>(function Input(
  {
    size = 'md',
    variant = 'default',
    label,
    error,
    hint,
    leftIcon,
    rightIcon,
    onRightIconPress,
    required = false,
    editable = true,
    containerProps,
    className,
    inputClassName,
    labelClassName,
    ...props
  },
  ref
) {
  const sizeConfig = inputSizes[size];
  const [isFocused, setIsFocused] = React.useState(false);

  const containerClasses = cn(
    'flex-row items-center rounded-lg',
    sizeConfig.container,
    inputVariants[variant],
    isFocused && inputStates.focus[variant],
    error && inputStates.error[variant],
    !editable && 'opacity-60',
    className
  );

  const inputClasses = cn(
    'flex-1 text-gray-900 dark:text-gray-100',
    sizeConfig.input,
    leftIcon && 'ml-2',
    rightIcon && 'mr-2',
    inputClassName
  );

  const labelClasses = cn(
    'font-medium text-gray-700 dark:text-gray-300',
    sizeConfig.label,
    labelClassName
  );

  const iconColor = error ? '#EF4444' :
                   isFocused ? '#2563EB' :
                   '#6B7280';

  return (
    <View {...containerProps}>
      {label && (
        <Text className={labelClasses}>
          {label}
          {required && <Text className="text-red-500 ml-1">*</Text>}
        </Text>
      )}

      <View className={containerClasses}>
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={sizeConfig.icon}
            color={iconColor}
          />
        )}

        <TextInput
          ref={ref}
          {...props}
          editable={editable}
          className={inputClasses}
          placeholderTextColor={error ? '#EF4444' : '#9CA3AF'}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          accessibilityLabel={label}
          accessibilityHint={hint}
          accessibilityInvalid={!!error}
        />

        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
            accessibilityRole={onRightIconPress ? 'button' : undefined}
            accessibilityLabel={onRightIconPress ? 'Icon action' : undefined}
          >
            <Ionicons
              name={rightIcon}
              size={sizeConfig.icon}
              color={iconColor}
            />
          </TouchableOpacity>
        )}
      </View>

      {(error || hint) && (
        <Text
          className={cn(
            'text-sm mt-1',
            error ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
          )}
        >
          {error || hint}
        </Text>
      )}
    </View>
  );
});