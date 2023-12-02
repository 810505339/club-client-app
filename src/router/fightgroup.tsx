import { Stack } from './index';
import Launch from '@pages/mainScreen/fightwine/launch';
import LaunchWine from '@pages/mainScreen/fightwine/launchwine';
const LoginGroup = () => {
  return <Stack.Group>
    <Stack.Screen name="Launch" component={Launch} />
    <Stack.Screen name="LaunchWine" component={LaunchWine} />
  </Stack.Group>;
};

export default LoginGroup;
