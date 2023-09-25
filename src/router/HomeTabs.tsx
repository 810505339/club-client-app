import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigation} from 'react-native-paper';
/* pages */

import HomeScreen from '@pages/home';
import DynamicScreen from '@pages/dynamic';
import FightwineScreen from '@pages/fightwine';
import LoginScreen from '@pages/login';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

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
    <Navigator
      screenOptions={{headerShown: false}}
      tabBar={({navigation, state, descriptors, insets}) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          onTabPress={({route, preventDefault}) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({route, focused, color}) => {
            const {options} = descriptors[route.key];

            if (options.tabBarIcon) {
              return options.tabBarIcon({focused, color, size: 24});
            }

            return null;
          }}
          getLabelText={({route}) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}>
      <Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => {
            return <Icon name="profile" size={size} color={color} />;
          },
        }}
      />
    </Navigator>
  );
};

export default HomeTabs;
