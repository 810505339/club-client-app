import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {getGenericPassword} from 'react-native-keychain';
import {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {adaptNavigationTheme} from 'react-native-paper';
import CustomNavigationBar from '@components/appbar/customNavigationBar';
import useSysLanguage from '@hooks/useSysLanguage';
import HomeTabs from './HomeTabs';
import Login from '@pages/loginScreen/login';
import NewUser from '@pages/loginScreen/set-password/newUser';
import OldUser from '@pages/loginScreen/set-password/oldUser';
import LoginOrRegister from '@pages/loginScreen/login/loginOrRegister';
import {RootStackParamList} from './type';

const Stack = createNativeStackNavigator<RootStackParamList>();
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
      <Stack.Navigator initialRouteName="Login">
        {/* <Stack.Screen name="HomeTabs" component={HomeTabs} /> */}
        <Stack.Group
          screenOptions={{
            header: props => <CustomNavigationBar {...props} />,
            headerTransparent: true,
          }}>
          <Stack.Screen
            name="Login"
            options={{headerShown: false}}
            component={Login}
          />
          <Stack.Screen
            name="LoginOrRegister"
            options={{title: '登录/注册'}}
            component={LoginOrRegister}
          />
          <Stack.Screen name="NewUser" component={NewUser} />
          <Stack.Screen name="OldUser" component={OldUser} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
