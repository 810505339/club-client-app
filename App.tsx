import * as eva from '@eva-design/eva';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from 'router';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {RecoilRoot} from 'recoil';

export default () => (
  <RecoilRoot>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </ApplicationProvider>
  </RecoilRoot>
);
