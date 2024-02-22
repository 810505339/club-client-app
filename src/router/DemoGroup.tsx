import { Stack } from './index';
import DemoHome from '@pages/demoScreen/im/pages/home';
import DemoLogin from '@pages/demoScreen/im/pages/login';
import DemoChat from '@pages/demoScreen/im/pages/chat';
// import DemoMergerMessageScreen from '@pages/demoScreen/im/pages/merger_message_screen';
// import DemoGroupHome from '@pages/demoScreen/im/pages/GroupScreen';

const LoginGroup = () => {
  return <Stack.Group>
    <Stack.Screen
      name="DemoHome"
      options={{
        title: '消息',

      }}
      component={DemoHome}
    />
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name="DemoLogin"
      component={DemoLogin}
    />
    <Stack.Screen
      // options={{
      //   headerShadowVisible: true,
      //   headerBackTitleVisible: false,
      // }}
      name="DemoChat"
      component={DemoChat}
    />
    {/* <Stack.Screen
      name="DemoMergerMessageScreen"
      options={{
        title: '聊天信息',
      }}
      component={DemoMergerMessageScreen}
    /> */}
    {/* <Stack.Screen
      name="DemoGroupHome"
      options={{
        title: '聊天信息',
      }}
      component={DemoGroupHome}
    /> */}
  </Stack.Group>;
};

export default LoginGroup;
