import { Text, View } from 'react-native';
import { useTheme } from './ThemeProvider';

export const EditScreenInfo = ({ path }: { path: string }) => {
  const { isDark } = useTheme();
  const title = 'Open up the code for this screen:';
  const description =
    'Change any of the text, save the file, and your app will automatically update.';

  return (
    <View>
      <View className={styles.getStartedContainer}>
        <Text className={`${styles.getStartedText} ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {title}
        </Text>
        <View className={`${styles.codeHighlightContainer} ${styles.homeScreenFilename} ${isDark ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
          <Text className={isDark ? 'text-green-400' : 'text-gray-900'}>{path}</Text>
        </View>
        <Text className={`${styles.getStartedText} ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          {description}
        </Text>
      </View>
    </View>
  );
};

const styles = {
  codeHighlightContainer: `rounded-md px-1`,
  getStartedContainer: `items-center mx-12`,
  getStartedText: `text-lg leading-6 text-center`,
  helpContainer: `items-center mx-5 mt-4`,
  helpLink: `py-4`,
  helpLinkText: `text-center`,
  homeScreenFilename: `my-2`,
};
