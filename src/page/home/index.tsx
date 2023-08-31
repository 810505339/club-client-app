import BaseLayout from '@components/baselayout';
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Text,
  Icon,
  Button,
} from '@ui-kitten/components';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

const {Navigator, Screen} = createBottomTabNavigator();

const BottomTabBar = ({navigation, state}: BottomTabBarProps) => {
  function onSelect(index: number) {
    console.log(index);
    navigation.navigate(state.routeNames[index]);
  }

  return (
    <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
      <BottomNavigationTab title="HOME" icon={<Icon name="home-outline" />} />
      <BottomNavigationTab title="LOGIN" icon={<Icon name="facebook" />} />
    </BottomNavigation>
  );
};

const HomeScreen = () => (
  <BaseLayout title={'home'}>
    <Navigator
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={{headerShown: false}}>
      <Screen name="Users" component={UsersScreen} />
      <Screen name="Orders" component={OrdersScreen} />
    </Navigator>
  </BaseLayout>
);

const UsersScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category="h1">USERS</Text>
    <Button accessoryLeft={<Icon name="facebook" />}>
      Login with Facebook
    </Button>
  </Layout>
);

const OrdersScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text category="h1">ORDERS</Text>
  </Layout>
);

export default HomeScreen;
