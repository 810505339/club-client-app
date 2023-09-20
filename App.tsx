import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from 'router';
import {RecoilRoot} from 'recoil';
import '@utils/i18next';
import {PaperProvider} from 'react-native-paper';

const App = () => {
  return (
    <RecoilRoot>
      <PaperProvider>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </PaperProvider>
    </RecoilRoot>
  );
};

export default App;
