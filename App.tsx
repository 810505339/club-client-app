import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from '@router/index';
import '@utils/i18next';
import { PaperProvider, MD3DarkTheme, MD3LightTheme, Modal, Portal } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import SplashScreen from 'react-native-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Toast from 'react-native-toast-message';
import toastConfig from '@components/toast/customToast';
import { getFileUrl } from '@store/getfileurl';

const App = () => {

  useEffect(() => {
    /* 这是启动页 */
    SplashScreen.hide();
    getFileUrl();
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

    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <PaperProvider theme={paperTheme}>
          <SafeAreaProvider>
            <StatusBar backgroundColor="transparent" translucent={true} />
            <AppNavigator />
            <Toast config={toastConfig} bottomOffset={200} position="bottom" />
          </SafeAreaProvider>
        </PaperProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
