import { ScreenContent } from 'components/ScreenContent';
import { ThemeProvider } from 'components/ThemeProvider';
import { FloatingThemeToggle } from 'components/ThemeToggle';
import { StatusBar } from 'expo-status-bar';

import './global.css';

export default function App() {
  return (
    <ThemeProvider>
      <ScreenContent title="Home" path="App.tsx" />
      <FloatingThemeToggle />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
