import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

/* pages */

import HomeScreen from '@pages/home';
import DynamicScreen from '@pages/dynamic';
import FightwineScreen from '@pages/fightwine';
import LoginScreen from '@pages/login';

const {Navigator, Screen} = createBottomTabNavigator();

// type RootStackParamList = {
//   Login: undefined,
//   Profile: {userId: string},
//   Feed: {sort: 'latest' | 'top'} | undefined,
// };

// type loginScreenNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'Login',
// >;

const HomeTabs = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Dynamic" component={DynamicScreen} />
      <Screen name="Fightwine" component={FightwineScreen} />
      <Screen name="Orders" component={LoginScreen} />
    </Navigator>
  );
};

export default HomeTabs;
