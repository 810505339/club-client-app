import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { getGenericPassword } from 'react-native-keychain';
import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { adaptNavigationTheme } from 'react-native-paper';
import useSysLanguage from '@hooks/useSysLanguage';
import { RootStackParamList } from './type';
import Demo from '@pages/demoScreen/index';
import IM from '@pages/demoScreen/im/index';
import AnimatedScreen from '@pages/demoScreen/animated';
import Carouseldemo from '@pages/demoScreen/carousel';
import CustomNavigationBar from '@components/appBar/customNavigationBar';
import HomeTabs from './HomeTabs';
import LoginGroup from './LoginGroup';
import Homegroup from './homegroup';
import UserGroup from './usergroup';

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
