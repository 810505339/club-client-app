import { Stack } from './index';
import Launch from '@pages/mainScreen/fightwine/launch';
const LoginGroup = () => {
  return <Stack.Group>
    <Stack.Screen name="Launch" component={Launch} />
  </Stack.Group>;
};

export default LoginGroup;
