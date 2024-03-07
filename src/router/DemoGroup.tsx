import { Stack } from './index';
import DemoIm from '@pages/demoScreen/im/index';
// import DemoMergerMessageScreen from '@pages/demoScreen/im/pages/merger_message_screen';
// import DemoGroupHome from '@pages/demoScreen/im/pages/GroupScreen';
import DemoCamera from '@pages/demoScreen/Camera';

const LoginGroup = () => {
  return <Stack.Group>
    <Stack.Screen
      name="DemoIm"
      options={{
        title: '消息',

      }}
      component={DemoIm}
    />

    <Stack.Screen
      name="DemoCamera"
      options={{
        title: '消息',

      }}
      component={DemoCamera}
    />



  </Stack.Group>;
};

export default LoginGroup;
