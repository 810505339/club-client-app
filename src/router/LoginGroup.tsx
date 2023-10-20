import { Stack } from './index';
import Login from '@pages/loginScreen/login';
import NewUser from '@pages/loginScreen/set-password/newUser';
import OldUser from '@pages/loginScreen/set-password/oldUser';
import LoginOrRegister from '@pages/loginScreen/login/loginOrRegister';
import Verification from '@pages/loginScreen/verification';
import AuthenticationSex from '@pages/loginScreen/authentication/sex';
import AuthenticationPower from '@pages/loginScreen/authentication/power';
import Authentication from '@pages/loginScreen/authentication';
import AuthenticationCamera from '@pages/loginScreen/authentication/camera';
import AuthenticationFacestatus from '@pages/loginScreen/authentication/facestatus';
import UserInfo from '@pages/loginScreen/userinfo/index';

const LoginGroup = () => {
  return <Stack.Group>
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
      name="AuthenticationCamera"
      component={AuthenticationCamera}

      options={{ title: '输入验证码', headerShown: false }}
    />
    <Stack.Screen
      name="AuthenticationFacestatus"
      component={AuthenticationFacestatus}

      options={{ title: '输入验证码', headerShown: false }}
    />

    <Stack.Screen
      name="UserInfo"
      component={UserInfo}

      options={{ title: '输入验证码', headerShown: false }}
    />

    {/* <Stack.Screen
      name="Camera"
      component={Camera}
      options={{ title: 'Camera' }}
    /> */}
  </Stack.Group>;
};

export default LoginGroup;
