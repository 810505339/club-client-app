import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@pages/mainScreen/home';
import TicketScreen from '@pages/mainScreen/ticket';
import FightwineScreen from '@pages/mainScreen/fightwine';
import UserScreen from '@pages/mainScreen/user';
import CustomNavigationBar from '@components/appbar/customNavigationBar';
import { TabParamList } from './type';
import { Image } from 'react-native';



const HOMEICON = require('@assets/imgs/bottombar/user.png')
const FIGHTWINEICON = require('@assets/imgs/bottombar/fightwine.png')
const TICKETCICON = require('@assets/imgs/bottombar/ticket.png')
const USERICON = require('@assets/imgs/bottombar/user.png')




const { Navigator, Screen } = createBottomTabNavigator<TabParamList>();

const HomeTabs = () => {
  return (
    <Navigator initialRouteName="Home" screenOptions={({ route }) => {

      return {
        headerTransparent: true,
        
        tabBarActiveTintColor: '#E6A055FF',
        tabBarIconStyle: {
          position:'absolute',
          top:20,
        },
        tabBarLabelStyle: {
         
          position:'absolute',
          top:34,
        },
        tabBarItemStyle: {
          display: 'flex',
          position:'relative',

        },
        tabBarStyle: {
          backgroundColor: '#000000B3',
          height: 54,
          justifyContent:'center',
          alignItems:'center',
        
        },
        tabBarIcon: ({ focused }) => {
          let image;
          if (route.name == 'Home') {
            image = focused ? HOMEICON : HOMEICON
          }

          if (route.name == 'Fightwine') {
            image = focused ? FIGHTWINEICON : FIGHTWINEICON
          }
          if (route.name == 'Ticket') {
            image = focused ? TICKETCICON : TICKETCICON
          }
          if (route.name == 'User') {
            image = focused ? USERICON : USERICON
          }
          return (image && <Image style={{ width: 28, height: 28,}} source={image} />)
        }
      }
    }}>
      <Screen name="Home" component={HomeScreen} />
      <Screen name="Fightwine" component={FightwineScreen} />
      <Screen name="Ticket" component={TicketScreen} />
      <Screen name="User" component={UserScreen} />
    </Navigator>
  );
};

export default HomeTabs;
