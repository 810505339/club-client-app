import BaseLayout from '@components/baselayout';
import Panel from '@components/panel';
import CustomModal from '@components/custom-modal';
import { ImageBackground, View, ScrollView } from 'react-native';
import { Button, Divider, Text, TextInput } from 'react-native-paper';
import AreaList from './components/areaList';
import useSelectShop from '@hooks/useSelectShop';
import { useImmer } from 'use-immer';
import useSelectTimer from '@hooks/useSelectTimer';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import NumberInput from '@components/number-input';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@router/type';
import { useTranslation } from 'react-i18next';

const card_2 = require('@assets/imgs/base/card_2.png');

const ReserveBooth = () => {
  const navgation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const { snap, bottomSheetModalRef, shop, onPress, shopName, showShop } = useSelectShop();
  const { time,
    showTime,
    onChange,
    setShowTime } = useSelectTimer();

  const { time: time1,
    showTime: showTime1,
    onChange: onChange1,
    setShowTime: setShowTime1 } = useSelectTimer();

  const formatDay = dayjs(time).format('YYYY-MM-DD');
  const formatTimer = dayjs(time1).format('HH:mm');

  const [data, setData] = useImmer({
    selectArea: {},
    num: 1,
  });

  //当选择的区域变化的时候
  const changeArea = async (list: any, index: number) => {
    setData(draft => {
      draft.selectArea = list[index];
    });
  };
  const changeSum = (sum: number) => {
    setData(draft => {
      draft.num = sum;
    });
  };

  const checkTime = (event: DateTimePickerEvent, selectDate?: Date | undefined) => {
    console.log(selectDate, 'selectDate');

    onChange1(event, selectDate);

  };

  const toUrl = () => {
    navgation.navigate('ConfirmBooth', {

      areaId: data.selectArea?.id,
      areaName: data.selectArea?.name,
      storeId: shop.select.id,
      entranceDate: formatDay,
      latestArrivalTime: formatTimer,
      peopleNum: data.num,
    });
  };

  return (<BaseLayout>
    <CustomModal ref={bottomSheetModalRef} data={snap.shopList} selectValue={shop.select.id} onPress={onPress} headerText="选择门店" snapPoints={['50%']} />
    <View className="flex-1">
      <View className="flex-1">
        <View className="absolute left-5  h-[160px] right-5 top-5 -z-10 rounded-2xl overflow-hidden">
          <ImageBackground source={card_2} resizeMode="stretch" className="w-full h-full" />
        </View>

        <ScrollView>
          <Panel className="mt-44">
            <View className="">
              <Text className="text-xs text-white font-semibold opacity-50">{t('common.label1')}</Text>
              <TextInput mode="outlined" className="flex-auto bg-transparent mt-4" value={shopName} showSoftInputOnFocus={false} outlineStyle={{ borderRadius: 16 }} right={<TextInput.Icon icon="chevron-down" />} onPressIn={showShop} />
            </View>
            <View className="mt-7">
              <Text className="text-xs text-white font-semibold opacity-50">{t('common.label2')}</Text>
              <TextInput mode="outlined" className="flex-auto bg-transparent mt-4" showSoftInputOnFocus={false} value={formatDay} outlineStyle={{ borderRadius: 16 }} onPressIn={() => { setShowTime(true); }} right={<TextInput.Icon icon="calendar" />} />
              {showTime && <DateTimePicker onChange={onChange} value={time} minimumDate={new Date()} />}
            </View>
            <View className="mt-7">
              <Text className="text-xs text-white font-semibold opacity-50">{t('reserveBooth.label1')}</Text>
              <TextInput mode="outlined" className="flex-auto bg-transparent mt-4" showSoftInputOnFocus={false} value={formatTimer} outlineStyle={{ borderRadius: 16 }} onPressIn={() => { setShowTime1(true); }} right={<TextInput.Icon icon="timer" />} />
              {showTime1 && <DateTimePicker mode="time" is24Hour onChange={checkTime} value={time1} />}
            </View>
            <View className="mt-7 flex-row items-center justify-between">
              <Text className="text-xs text-white font-semibold opacity-50">{t('reserveBooth.label1')}</Text>
              <View className="flex-row items-center">
                <NumberInput min={1} num={data.num} onChange={changeSum} />
              </View>
            </View>
            <View className="mt-7">
              <Text className="text-xs text-white font-semibold opacity-50 mb-4">{t('common.label3')}</Text>
              <AreaList storeId={shop.select.id} date={formatDay} onChange={changeArea} />
            </View>
          </Panel>
        </ScrollView>


      </View>
      <View className="h-14  flex-col justify-center">
        <Divider />
        <View className="flex-row  px-5 mt-2">
          <Button mode={'elevated'} className="bg-[#EE2737FF] w-full" textColor="#0C0C0CFF" onPress={toUrl} >{t('common.btn3')}</Button>
        </View>
      </View>
    </View>
  </BaseLayout>);
};


export default ReserveBooth;
