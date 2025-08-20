import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { useTheme } from './ThemeProvider';

export const ThemeToggle = () => {
    const { theme, toggleTheme, isDark } = useTheme();

    const getThemeIcon = () => {
        switch (theme) {
            case 'light':
                return '☀️';
            case 'dark':
                return '🌙';
            case 'system':
                return '🔄';
            default:
                return '☀️';
        }
    };

    const getThemeLabel = () => {
        switch (theme) {
            case 'light':
                return 'Light';
            case 'dark':
                return 'Dark';
            case 'system':
                return 'System';
            default:
                return 'Light';
        }
    };

    return (
        <TouchableOpacity
            onPress={toggleTheme}
            className={`flex-row items-center px-4 py-2 rounded-lg border ${isDark
                    ? 'bg-gray-800 border-gray-600'
                    : 'bg-white border-gray-300'
                }`}
            accessibilityLabel={`Switch theme. Current: ${getThemeLabel()}`}
            accessibilityRole="button"
        >
            <Text className="text-2xl mr-2">{getThemeIcon()}</Text>
            <Text
                className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'
                    }`}
            >
                {getThemeLabel()}
            </Text>
        </TouchableOpacity>
    );
};

export const FloatingThemeToggle = () => {
    return (
        <View className="absolute top-12 right-4 z-10">
            <ThemeToggle />
        </View>
    );
};
