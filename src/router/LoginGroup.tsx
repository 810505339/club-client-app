import { Stack } from './index';
import Login from '@pages/LoginScreen/login/index';
import NewUser from '@pages/LoginScreen/set-password/newUser';
import OldUser from '@pages/LoginScreen/set-password/oldUser';
import LoginOrRegister from '@pages/LoginScreen/login/loginOrRegister';
import Verification from '@pages/LoginScreen/verification/index';

import AuthenticationSex from '@pages/LoginScreen/authentication/sex';
import AuthenticationPower from '@pages/LoginScreen/authentication/power';
import Authentication from '@pages/LoginScreen/authentication/index';
import AuthenticationFacestatus from '@pages/LoginScreen/authentication/facestatus';

import UserInfo from '@pages/LoginScreen/userinfo';

// import AuthenticationCamera from '@pages/loginScreen/authentication/camera';

// import UserInfo from '@pages/loginScreen/userinfo/index';

const LoginGroup = () => {

  return <Stack.Group screenOptions={{ presentation: 'modal' }}>
    <Stack.Screen
      name="Login"
      options={{ headerShown: false }}
      component={Login}
    />
    <Stack.Screen
      name="LoginOrRegister"
      options={{ title: '登录/注册' }}
      component={LoginOrRegister}
    />
    <Stack.Screen
      name="NewUser"
      component={NewUser}
      options={{ title: '设置密码' }}
    />
    <Stack.Screen
      name="OldUser"
      component={OldUser}
      options={{ title: '输入密码' }}
    />
    <Stack.Screen
      name="Verification"
      component={Verification}
      options={{ title: '输入验证码' }}
    />
    <Stack.Screen
      name="AuthenticationSex"
      component={AuthenticationSex}
      options={{ title: '性别认证' }}
    />
    <Stack.Screen
      name="AuthenticationPower"
      component={AuthenticationPower}
      options={{ title: '输入验证码' }}
    />
    <Stack.Screen
      name="Authentication"
      component={Authentication}
      options={{ title: '输入验证码' }}
    />



    <Stack.Screen
      name="UserInfo"
      component={UserInfo}

      options={{ title: '用户信息' }}
    />

    <Stack.Screen
      name="AuthenticationFacestatus"
      component={AuthenticationFacestatus}
      options={{ title: '1' }}
    />
  </Stack.Group>;
};

export default LoginGroup;
