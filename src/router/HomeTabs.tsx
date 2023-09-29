import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigation} from 'react-native-paper';
/* pages */

import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

import HomeScreen from '@pages/mainScreen/home';
import DynamicScreen from '@pages/mainScreen/dynamic';
import FightwineScreen from '@pages/mainScreen/fightwine';
import UserScreen from '@pages/mainScreen/user';
import CustomNavigationBar from '@components/appbar/customNavigationBar';

const {Navigator, Screen} = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Navigator
      screenOptions={{
        header: props => <CustomNavigationBar {...props} />,
        headerShown: false,
      }}>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Dynamic" component={DynamicScreen} />
      <Screen name="Fightwine" component={FightwineScreen} />
      <Screen name="User" component={UserScreen} />
    </Navigator>
  );
};

export default HomeTabs;
