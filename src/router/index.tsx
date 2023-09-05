import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@page/home/index';
import useSysLanguage from 'hooks/useSysLanguage';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  useSysLanguage();

  return (
    <NavigationContainer>
      <HomeNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
