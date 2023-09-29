import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {getGenericPassword} from 'react-native-keychain';
import {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {adaptNavigationTheme} from 'react-native-paper';
import HomeTabs from './HomeTabs';
import LoginScreen from '@pages/loginScreen';
import DemoScreen from '@pages/demoScreen';
import CustomNavigationBar from '@components/appbar/customNavigationBar';
import useSysLanguage from '@hooks/useSysLanguage';

const Stack = createNativeStackNavigator();
const {DarkTheme} = adaptNavigationTheme({reactNavigationDark: DefaultTheme});
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
        screenOptions={{
          header: props => <CustomNavigationBar {...props} />,
        }}>
        <Stack.Screen
          name="HomeTabs"
          options={{headerShown: false}}
          component={HomeTabs}
        />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen
          options={{headerShown: true, headerTitle: '登录/注册'}}
          name="DemoScreen"
          component={DemoScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
