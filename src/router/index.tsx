import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { getGenericPassword } from 'react-native-keychain';
import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { adaptNavigationTheme } from 'react-native-paper';
import CustomNavigationBar from '@components/appbar/customNavigationBar';
import useSysLanguage from '@hooks/useSysLanguage';
import HomeTabs from './hometabs';
import { RootStackParamList } from './type';
import LoginGroup from './logingroup';
import Demo from '@pages/demoScreen/index';
import IM from '@pages/demoScreen/im/index';
import UserGroup from './usergroup';

const initialRouteName: keyof RootStackParamList = 'SystemMessage';

export const Stack = createNativeStackNavigator<RootStackParamList>();
const { DarkTheme } = adaptNavigationTheme({ reactNavigationDark: DefaultTheme });
const AppNavigator = () => {
  useSysLanguage();
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{
        header: props => <CustomNavigationBar {...props} />,
        headerTransparent: true,
      }}>
        {LoginGroup()}
        {UserGroup()}
        <Stack.Screen name="Demo" component={Demo} />
        <Stack.Screen name="IM" component={IM} />
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
