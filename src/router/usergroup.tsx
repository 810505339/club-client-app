import { Stack } from './index';
import SystemMessage from '@pages/mainScreen/user/systemmessage';
import SystemMessageInfo from '@pages/mainScreen/user/systemmessage/info';
import Account from '@pages/mainScreen/user/account';
import AccountPhone from '@pages/mainScreen/user/account/phone';
import Orders from '@pages/mainScreen/user/orders';
import OrdersInfo from '@pages/mainScreen/user/orders/info';

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

    <Stack.Screen
      name="AccountPhone"
      component={AccountPhone}

    />

    <Stack.Screen
      name="Orders"
      component={Orders}

    />
    <Stack.Screen name="OrdersInfo" component={OrdersInfo} />


  </Stack.Group>;
};

export default LoginGroup;
