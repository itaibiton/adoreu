import React from 'react';
import { Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';

import { EditScreenInfo } from './EditScreenInfo';
import { useTheme } from './ThemeProvider';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  const { isDark } = useTheme();
  const { setColorScheme } = useColorScheme();

  // Update NativeWind's color scheme based on our theme
  React.useEffect(() => {
    setColorScheme(isDark ? 'dark' : 'light');
  }, [isDark, setColorScheme]);

  return (
    <View className={`${styles.container} ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      <Text className={`${styles.title} ${isDark ? 'text-white' : 'text-red-500'}`}>
        {title}
      </Text>
      <View className={`${styles.separator} ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
      <EditScreenInfo path={path} />
      {children}
    </View>
  );
};

const styles = {
  container: `items-center flex-1 justify-center`,
  separator: `h-[1px] my-7 w-4/5`,
  title: `text-xl font-bold`,
};
