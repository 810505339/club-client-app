import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { getGenericPassword } from 'react-native-keychain';
import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { adaptNavigationTheme } from 'react-native-paper';
import CustomNavigationBar from '@components/appbar/customNavigationBar';
import useSysLanguage from '@hooks/useSysLanguage';
import HomeTabs from './HomeTabs';
import { RootStackParamList } from './type';
import LoginGroup from './LoginGroup';

export const Stack = createNativeStackNavigator<RootStackParamList>();
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
      <Stack.Navigator initialRouteName="AuthenticationSex" screenOptions={{
        header: props => <CustomNavigationBar {...props} />,
        headerTransparent: true,
      }}>
        {LoginGroup()}
        <Stack.Screen
          name="HomeTab"
          component={HomeTabs}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
