import BaseLayout from '@components/baselayout';
import { Image, ImageBackground, View } from 'react-native';
import { Text, TextInput, IconButton, Divider, Button } from 'react-native-paper';
import { useImmer } from 'use-immer';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import AreaList from './components/areaList';
import useSelectShop from '@hooks/useSelectShop';
import CustomModal from '@components/custom-modal';
import { onSaleNum } from '@api/store';
import NumberInput from '@components/number-input';
import { useRequest } from 'ahooks';
import { useEffect } from 'react';
import Panel from '@components/panel';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@router/type';
import currency from 'currency.js';
import Toast from 'react-native-toast-message';
import useSelectTimer from '@hooks/useSelectTimer';
import { useTranslation } from 'react-i18next';
import { ticketBooking } from '@api/ticket';

/* 预定门票 */
const tickerBg = require('@assets/imgs/home/preset/ticket-header.png');
const card_1 = require('@assets/imgs/base/card_1.png');

const defaultData = {
  remainingNum: 0, //剩余票数
  selectAreaId: '',
  total: 0,
  ticketId: '',
  amount: 0,
  ticketName: '',
  num: 0,//默认票数
};


const Preset = () => {

  const { snap, bottomSheetModalRef, shop, onPress, shopName, showShop } = useSelectShop();
  const { time,
    showTime,
    onChange,
    setShowTime } = useSelectTimer();

  const navgation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

  const { run, refresh, loading } = useRequest(onSaleNum, {
    manual: true,
    onSuccess: (res) => {

      setData((draft) => {
        draft.remainingNum = res?.remainingNum ?? 0;
        draft.ticketId = res?.ticketId ?? '';
        draft.amount = res?.amount ?? 0;
        draft.total = currency(draft?.amount).multiply(0).value;
        draft.ticketName = res?.ticketName;
        draft.num = 0;
      });

    },
  });


  const [data, setData] = useImmer(defaultData);
  const formatDay = dayjs(time).format('YYYY-MM-DD');
  //当选择的区域变化的时候
  const changeArea = async (list: any, index: number) => {
    setData(draft => {
      draft.selectAreaId = list[index]?.id;
    });
  };



  //数量改变
  const changeSum = (sum: number) => {
    setData(draft => {
      draft.num = sum;
      draft.total = currency(draft.amount).multiply(sum).value;
    });
  };

  const toUrl = () => {
    if (!data.num) {
      Toast.show({ text1: '数量必须大于1' });
      return;
    }
    if (!data.ticketId) {
      refresh();
      return;
    }
    navgation.navigate('OrdersInfo', {
      orderContext: [
        { label: t('orders.label1'), value: shopName },
        { label: t('orders.label8'), value: data.ticketName },
        { label: t('orders.label9'), value: data.num },
        { label: t('orders.label4'), value: formatDay },
        { label: t('orders.label7'), value: data.total },
      ],
      headerImg: card_1,
      submit: async () => {
        await ticketBooking({
          storeId: shop.select.id,
          areaId: data.selectAreaId,
          ticketId: data.ticketId,
          ticketNum: data.num,
          entranceDate: formatDay,
          productName: data.ticketName,
        });
      },
      useScope: 'TICKET', //使用范围
      ticketId: data.ticketId, //门票id
      storeId: shop.select.id,
      amount: `${data.total}`,//需要支付多少钱

    });
  };



  useEffect(() => {
    console.log(shop.select.id, time, data.selectAreaId);
    if (!data.selectAreaId && shop.select.id) {
      Toast.show({ text1: '暂无区域' });
      setData((draft) => {
        Object.keys(defaultData).map(k => {
          draft[k] = defaultData[k];
        });
      });
    }

    if (shop.select.id && time && data.selectAreaId) {
      console.log('请求');

      run({
        'storeId': shop.select.id,
        'areaId': data.selectAreaId,
        'entranceDate': formatDay,
        total: 0,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    time,
    data.selectAreaId,
  ]);



  return (<BaseLayout className="" loading={loading}>
    <CustomModal ref={bottomSheetModalRef} data={snap.shopList} selectValue={shop.select.id} onPress={onPress} headerText="选择门店" snapPoints={['50%']} />
    <View className="flex-1">
      <View className="flex-1">
        <View className="absolute w-52 h-28 right-3 top-18 z-20">
          <Image source={tickerBg} resizeMode="contain" className="w-full h-full" />
        </View>

        <Panel className="mt-20">
          <View className="">
            <Text className="text-xs text-white font-semibold opacity-50">{t('common.label1')}</Text>
            <TextInput mode="outlined" className="flex-auto bg-transparent mt-4" value={shopName} showSoftInputOnFocus={false} outlineStyle={{ borderRadius: 16 }} right={<TextInput.Icon icon="chevron-down" onPress={showShop} />} onPressIn={showShop} />
          </View>
          <View className="mt-7">
            <Text className="text-xs text-white font-semibold opacity-50">{t('common.label2')}</Text>
            <TextInput mode="outlined" className="flex-auto bg-transparent mt-4" showSoftInputOnFocus={false} value={formatDay} outlineStyle={{ borderRadius: 16 }} onPressIn={() => { setShowTime(true); }} right={<TextInput.Icon icon="calendar" />} />
            {showTime && <DateTimePicker onChange={onChange} value={time} />}
          </View>
          <View className="mt-7">
            <Text className="text-xs text-white font-semibold opacity-50 mb-4">{t('common.label3')}</Text>
            <AreaList storeId={shop.select.id} date={formatDay} onChange={changeArea} />
          </View>
          <View className="mt-7">
            <Text className="text-xs text-white font-semibold opacity-50 mb-4">{t('common.label4')}</Text>
            <View className="flex-row items-center justify-between">
              <Text className="text-[#FFFFFF]" style={{ fontSize: 10 }}>{t('preset.label1')}<Text className="text-[#E6A055FF] text-xs">{data.remainingNum}</Text>{t('preset.label2')}</Text>
              <View className="flex-row items-center">
                <NumberInput max={data.remainingNum} min={0} num={data.num} onChange={changeSum} />
              </View>
            </View>
          </View>
        </Panel>
      </View>
      <View className="h-14  flex-col justify-center">
        <Divider />
        <View className="flex-row items-center justify-between px-5 mt-1">
          <Text style={{ fontSize: 10 }}>{t('preset.label3')}<Text className="text-[#E6A055FF]">$</Text><Text className="text-[#E6A055FF] text-2xl font-bold" >{data.total}</Text></Text>
          <Button mode={'elevated'} className="bg-[#EE2737FF]" textColor="#0C0C0CFF" onPress={toUrl} >{t('common.btn2')}</Button>
        </View>
      </View>
    </View>
  </BaseLayout>);

};


export default Preset;
