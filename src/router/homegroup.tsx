import { Stack } from './index';
import Preset from '@pages/mainScreen/home/preset';
import Dynamic from '@pages/mainScreen/home/dynamic/index';
import DynamicInfo from '@pages/mainScreen/home/dynamic/info';
import { useTranslation } from 'react-i18next';


const Homegroup = () => {

  const { t } = useTranslation();
  return <Stack.Group>
    <Stack.Screen name="Dynamic" component={Dynamic} />
    <Stack.Screen name="Preset" options={{ title: t('default.titleList.bookTickets') }} component={Preset} />
    <Stack.Screen name="DynamicInfo" component={DynamicInfo} />
  </Stack.Group>;
};

export default Homegroup;
