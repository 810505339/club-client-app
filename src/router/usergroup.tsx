import { Stack } from './index';
import SystemMessage from '@pages/mainScreen/user/systemmessage';

const LoginGroup = () => {
  return <Stack.Group>
    <Stack.Screen
      name="SystemMessage"
      options={{ headerShown: true }}
      component={SystemMessage}
    />


    {/* <Stack.Screen
      name="Camera"
      component={Camera}
      options={{ title: 'Camera' }}
    /> */}
  </Stack.Group>;
};

export default LoginGroup;
