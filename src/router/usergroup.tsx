import { Stack } from './index';
import SystemMessage from '@pages/mainScreen/user/systemmessage';
import SystemMessageInfo from '@pages/mainScreen/user/systemmessage/info';
import Account from '@pages/mainScreen/user/account';

const LoginGroup = () => {
  return <Stack.Group>
    <Stack.Screen
      name="SystemMessage"
      options={{ headerShown: true }}
      component={SystemMessage}
    />


    <Stack.Screen
      name="SystemMessageInfo"
      component={SystemMessageInfo}

    />
    <Stack.Screen
      name="Account"
      component={Account}

    />
  </Stack.Group>;
};

export default LoginGroup;
