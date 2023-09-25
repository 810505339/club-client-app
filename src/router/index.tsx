import {NavigationContainer} from '@react-navigation/native';
import useSysLanguage from 'hooks/useSysLanguage';
import {getGenericPassword} from 'react-native-keychain';
import {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeTabs from './HomeTabs';
import LoginScreen from '@pages/LoginScreen';
const Stack = createNativeStackNavigator();

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
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
