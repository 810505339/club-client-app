import * as eva from '@eva-design/eva';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from 'router';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {RecoilRoot} from 'recoil';
import '@utils/i18next';
import useTheme from 'hooks/useTheme';
export default () => {
  //获取系统主题
  const {theme} = useTheme();
  return (
    <RecoilRoot>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </ApplicationProvider>
    </RecoilRoot>
  );
};
