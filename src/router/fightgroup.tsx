import { Stack } from './index';
import FightwineDetail from '@pages/mainScreen/fightwine/detail';
import Launch from '@pages/mainScreen/fightwine/launch';
import LaunchWine from '@pages/mainScreen/fightwine/launchwine';
import Booths from '@pages/mainScreen/fightwine/booths';
import MyWineParty from '@pages/mainScreen/fightwine/mywineparty';

const LoginGroup = () => {
  return <Stack.Group>
    <Stack.Screen name="Launch" component={Launch} />
    <Stack.Screen name="LaunchWine" component={LaunchWine} />
    <Stack.Screen name="Booths" component={Booths} />
    <Stack.Screen name="FightwineDetail" component={FightwineDetail} />
    <Stack.Screen name="MyWineParty" component={MyWineParty} />
  </Stack.Group>;
};

export default LoginGroup;
