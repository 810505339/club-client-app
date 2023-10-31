import { Stack } from './index';
import Preset from '@pages/mainScreen/home/preset';
import Dynamic from '@pages/mainScreen/home/dynamic';


const Homegroup = () => {
  return <Stack.Group>
    <Stack.Screen name="Preset" component={Preset} />
    <Stack.Screen name="Dynamic" component={Dynamic} />
  </Stack.Group>;
};

export default Homegroup;
