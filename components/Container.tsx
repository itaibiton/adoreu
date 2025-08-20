import { SafeAreaView } from 'react-native';
import { useTheme } from './ThemeProvider';

export const Container = ({ children }: { children: React.ReactNode }) => {
  const { isDark } = useTheme();

  return (
    <SafeAreaView
      className={`${styles.container} ${isDark ? 'bg-gray-900' : 'bg-white'}`}
    >
      {children}
    </SafeAreaView>
  );
};

const styles = {
  container: 'flex flex-1 m-6',
};
