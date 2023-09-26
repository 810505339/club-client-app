import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import useSysLanguage from 'hooks/useSysLanguage';
import { getGenericPassword } from 'react-native-keychain';
import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { adaptNavigationTheme } from 'react-native-paper';
import HomeTabs from './HomeTabs';
import LoginScreen from '@pages/loginScreen';
import DemoScreen from 'pages/demoScreen';
const Stack = createNativeStackNavigator();
const { DarkTheme } = adaptNavigationTheme({ reactNavigationDark: DefaultTheme });
const AppNavigator = () => {
  useSysLanguage();

  useEffect(() => {
    (async () => {
      try {
        const credentials = await getGenericPassword();
        console.log(credentials);
        if (credentials) {
        } else {
          console.log('No credentials stored');
        }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
    })();
  }, []);

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator
        initialRouteName="HomeTabs"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="DemoScreen" component={DemoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
