import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from '@router/index';
import { RecoilRoot } from 'recoil';
import '@utils/i18next';
import { PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import SplashScreen from 'react-native-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';

const App = () => {
  useEffect(() => {
    /* 这是启动页 */
    SplashScreen.hide();
  }, []);
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme();
  const colors = {
    ...theme.dark,
    primary: '#EE2737',
  };

  const paperTheme =
    colorScheme === 'dark'
      ? { ...MD3DarkTheme, colors: colors }
      : { ...MD3LightTheme, colors: colors };
  return (
    <RecoilRoot>
      <PaperProvider theme={paperTheme}>
        <SafeAreaProvider>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <AppNavigator />
        </SafeAreaProvider>
      </PaperProvider>
    </RecoilRoot>
  );
};

export default App;
