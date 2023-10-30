import { Stack } from './index';
import Preset from '@pages/mainScreen/home/preset';


const Homegroup = () => {
  return <Stack.Group>
    <Stack.Screen name="Preset" component={Preset} />
  </Stack.Group>;
};

export default Homegroup;
