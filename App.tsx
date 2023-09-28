import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from 'router';
import { RecoilRoot } from 'recoil';
import '@utils/i18next';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import SplashScreen from 'react-native-splash-screen';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();

  const paperTheme =
    colorScheme === 'dark'
      ? { ...MD3DarkTheme, colors: theme.dark }
      : { ...MD3LightTheme, colors: theme.dark };
  return (
    <RecoilRoot>
      <PaperProvider theme={paperTheme}>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </PaperProvider>
    </RecoilRoot>
  );
};

export default App;
