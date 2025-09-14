import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Modal,
  TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '../../../utils/cn';
import Card from './Card';

export interface SearchSuggestion {
  id: string;
  title: string;
  subtitle?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  type?: 'location' | 'activity' | 'user' | 'general';
}

export type SearchBarSize = 'sm' | 'md' | 'lg';

interface SearchBarProps extends Omit<TextInputProps, 'style'> {
  size?: SearchBarSize;
  suggestions?: SearchSuggestion[];
  onSuggestionPress?: (suggestion: SearchSuggestion) => void;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  showSuggestions?: boolean;
  loading?: boolean;
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

const searchSizes: Record<SearchBarSize, {
  container: string;
  input: string;
  icon: number;
}> = {
  sm: {
    container: 'px-3 py-2 rounded-lg',
    input: 'text-sm',
    icon: 18,
  },
  md: {
    container: 'px-4 py-3 rounded-xl',
    input: 'text-base',
    icon: 20,
  },
  lg: {
    container: 'px-5 py-4 rounded-2xl',
    input: 'text-lg',
    icon: 22,
  },
};

const suggestionTypeIcons: Record<NonNullable<SearchSuggestion['type']>, keyof typeof Ionicons.glyphMap> = {
  location: 'location',
  activity: 'calendar',
  user: 'person',
  general: 'search',
};

const suggestionTypeColors: Record<NonNullable<SearchSuggestion['type']>, string> = {
  location: '#10B981',
  activity: '#F97316',
  user: '#2563EB',
  general: '#6B7280',
};

export default function SearchBar({
  size = 'md',
  suggestions = [],
  onSuggestionPress,
  onSearch,
  onClear,
  showSuggestions = true,
  loading = false,
  className,
  inputClassName,
  placeholder = 'Search destinations, activities, people...',
  value,
  onChangeText,
  ...props
}: SearchBarProps) {
  const [query, setQuery] = useState(value || '');
  const [isFocused, setIsFocused] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const sizeConfig = searchSizes[size];

  const containerClasses = cn(
    'flex-row items-center bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
    sizeConfig.container,
    isFocused && 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30',
    className
  );

  const inputClasses = cn(
    'flex-1 text-gray-900 dark:text-gray-100 mx-2',
    sizeConfig.input,
    inputClassName
  );

  const handleChangeText = (text: string) => {
    setQuery(text);
    onChangeText?.(text);
  };

  const handleSearch = () => {
    onSearch?.(query);
    inputRef.current?.blur();
    setShowModal(false);
  };

  const handleClear = () => {
    setQuery('');
    onChangeText?.('');
    onClear?.();
    inputRef.current?.focus();
  };

  const handleSuggestionPress = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.title);
    onChangeText?.(suggestion.title);
    onSuggestionPress?.(suggestion);
    setShowModal(false);
    inputRef.current?.blur();
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (showSuggestions && suggestions.length > 0) {
      setShowModal(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Delay hiding modal to allow suggestion press
    setTimeout(() => setShowModal(false), 150);
  };

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.title.toLowerCase().includes(query.toLowerCase()) ||
    suggestion.subtitle?.toLowerCase().includes(query.toLowerCase())
  );

  const renderSuggestion = ({ item }: { item: SearchSuggestion }) => {
    const iconName = item.icon || suggestionTypeIcons[item.type || 'general'];
    const iconColor = suggestionTypeColors[item.type || 'general'];

    return (
      <TouchableOpacity
        onPress={() => handleSuggestionPress(item)}
        className="flex-row items-center px-4 py-3 active:bg-gray-50 dark:active:bg-gray-700"
      >
        <View className="w-8 h-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 mr-3">
          <Ionicons name={iconName} size={16} color={iconColor} />
        </View>

        <View className="flex-1">
          <Text className="text-gray-900 dark:text-gray-100 font-medium">
            {item.title}
          </Text>
          {item.subtitle && (
            <Text className="text-gray-600 dark:text-gray-400 text-sm mt-0.5">
              {item.subtitle}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View className={containerClasses}>
        <Ionicons
          name="search"
          size={sizeConfig.icon}
          color={isFocused ? '#2563EB' : '#6B7280'}
        />

        <TextInput
          ref={inputRef}
          {...props}
          value={query}
          onChangeText={handleChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onSubmitEditing={handleSearch}
          className={inputClasses}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          returnKeyType="search"
          accessibilityLabel="Search input"
          accessibilityHint="Search for destinations, activities, or people"
        />

        {query.length > 0 && (
          <TouchableOpacity
            onPress={handleClear}
            className="p-1"
            accessibilityRole="button"
            accessibilityLabel="Clear search"
          >
            <Ionicons
              name="close-circle"
              size={sizeConfig.icon}
              color="#6B7280"
            />
          </TouchableOpacity>
        )}

        {loading && (
          <View className="ml-2">
            <Ionicons
              name="refresh"
              size={sizeConfig.icon}
              color="#2563EB"
            />
          </View>
        )}
      </View>

      <Modal
        visible={showModal && filteredSuggestions.length > 0}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/20"
          activeOpacity={1}
          onPress={() => setShowModal(false)}
        >
          <View className="flex-1 justify-start pt-20">
            <Card
              variant="elevated"
              size="sm"
              className="mx-4 max-h-80"
              shadow
            >
              <FlatList
                data={filteredSuggestions}
                keyExtractor={(item) => item.id}
                renderItem={renderSuggestion}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => (
                  <View className="h-px bg-gray-200 dark:bg-gray-700 mx-4" />
                )}
              />
            </Card>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}