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
import AnimatedScreen from '@pages/demoScreen/animated';
import Homegroup from './homegroup';
import Carouseldemo from '@pages/demoScreen/carousel';

const initialRouteName: keyof RootStackParamList = 'HomeTabs';

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
        {Homegroup()}
        <Stack.Screen name="Demo" component={Demo} />
        <Stack.Screen name="IM" component={IM} />
        <Stack.Screen name="Animated" component={AnimatedScreen} />
        <Stack.Screen name="Carouseldemo" component={Carouseldemo} />
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
