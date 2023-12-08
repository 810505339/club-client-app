import { Stack } from './index';
import Preset from '@pages/mainScreen/home/preset';
import Dynamic from '@pages/mainScreen/home/dynamic/index';
import DynamicInfo from '@pages/mainScreen/home/dynamic/info';
import ReserveBooth from '@pages/mainScreen/home/reserve-booth';
import ConfirmBooth from '@pages/mainScreen/home/confirm-booth';
import { useTranslation } from 'react-i18next';


const Homegroup = () => {

  const { t } = useTranslation();
  return <Stack.Group>
    <Stack.Screen name="Dynamic" component={Dynamic} />
    <Stack.Screen name="Preset" options={{ title: t('default.titleList.bookTickets') }} component={Preset} />
    <Stack.Screen name="DynamicInfo" component={DynamicInfo} />
    <Stack.Screen name="ReserveBooth" options={{ title: t('default.titleList.reserveBooth') }} component={ReserveBooth} />
    <Stack.Screen name="ConfirmBooth"   options={{ title: t('default.titleList.confirmBooth') }} component={ConfirmBooth} />
  </Stack.Group>;
};

export default Homegroup;
