import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@pages/mainScreen/home';
import DynamicScreen from '@pages/mainScreen/dynamic';
import FightwineScreen from '@pages/mainScreen/fightwine';
import UserScreen from '@pages/mainScreen/user';
import CustomNavigationBar from '@components/appbar/customNavigationBar';
import {TabParamList} from './type';

const {Navigator, Screen} = createBottomTabNavigator<TabParamList>();

const HomeTabs = () => {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        header: props => <CustomNavigationBar {...props} />,
        headerTransparent: true,
      }}>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Dynamic" component={DynamicScreen} />
      <Screen name="Fightwine" component={FightwineScreen} />
      <Screen name="User" component={UserScreen} />
    </Navigator>
  );
};

export default HomeTabs;
