import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@page/home';
import useSysLanguage from 'hooks/useSysLanguage';
import LoginScreen from '@page/login';
import {getGenericPassword} from 'react-native-keychain';
import {useEffect} from 'react';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator
    initialRouteName="Login"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

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
    <NavigationContainer>
      <HomeNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
