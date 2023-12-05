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


const tickerBg = require('@assets/imgs/home/preset/ticket-header.png');
const card_1 = require('@assets/imgs/base/card_1.png');


const Preset = () => {

  const { snap, bottomSheetModalRef, shop, onPress, shopName, showShop } = useSelectShop();
  const { time,
    showTime,
    onChange,
    setShowTime } = useSelectTimer();

  const navgation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { run, refresh } = useRequest(onSaleNum, {
    manual: true,
    onSuccess: (res) => {
      console.log(res, 'res');
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


  const [data, setData] = useImmer({
    remainingNum: 0, //剩余票数
    selectAreaId: '',
    total: 0,
    ticketId: '',
    amount: 0,
    ticketName: '',
    num: 0,//默认票数
  });
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
        { label: '所选门店', value: shopName },
        { label: '商品名称', value: data.ticketName },
        { label: '商品数量', value: data.num },
        { label: '入场时间', value: formatDay },
        { label: '应付金额', value: data.total },
      ],
      headerImg: card_1,
    });
  };



  useEffect(() => {

    if (shop.select.id && time && data.selectAreaId) {
      run({
        'storeId': shop.select.id,
        'areaId': data.selectAreaId,
        'entranceDate': formatDay,
        total: 0,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    shop.select.id,
    time,
    data.selectAreaId,
  ]);

  return (<BaseLayout className="">
    <CustomModal ref={bottomSheetModalRef} data={snap.shopList} selectValue={shop.select.id} onPress={onPress} headerText="选择门店" snapPoints={['50%']} />
    <View className="flex-1">
      <View className="flex-1">
        <View className="absolute w-52 h-28 right-3 top-18 z-20">
          <Image source={tickerBg} resizeMode="contain" className="w-full h-full" />
        </View>

        <Panel className="mt-20">
          <View className="">
            <Text className="text-xs text-white font-semibold opacity-50">选择门店</Text>
            <TextInput mode="outlined" className="flex-auto bg-transparent mt-4" value={shopName} showSoftInputOnFocus={false} outlineStyle={{ borderRadius: 16 }} right={<TextInput.Icon icon="chevron-down" />} onPressIn={showShop} />
          </View>
          <View className="mt-7">
            <Text className="text-xs text-white font-semibold opacity-50">选择日期</Text>
            <TextInput mode="outlined" className="flex-auto bg-transparent mt-4" showSoftInputOnFocus={false} value={formatDay} outlineStyle={{ borderRadius: 16 }} onPressIn={() => { setShowTime(true); }} right={<TextInput.Icon icon="calendar" />} />
            {showTime && <DateTimePicker onChange={onChange} value={time} />}
          </View>
          <View className="mt-7">
            <Text className="text-xs text-white font-semibold opacity-50 mb-4">选择区域</Text>
            <AreaList storeId={shop.select.id} date={formatDay} onChange={changeArea} />
          </View>
          <View className="mt-7">
            <Text className="text-xs text-white font-semibold opacity-50 mb-4">选择数量</Text>
            <View className="flex-row items-center justify-between">
              <Text className="text-[#FFFFFF]" style={{ fontSize: 10 }}>剩余<Text className="text-[#E6A055FF] text-xs">{data.remainingNum}</Text>张门票</Text>
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
          <Text style={{ fontSize: 10 }}>总计：<Text className="text-[#E6A055FF]">$</Text><Text className="text-[#E6A055FF] text-2xl font-bold" >{data.total}</Text></Text>
          <Button mode={'elevated'} className="bg-[#EE2737FF]" textColor="#0C0C0CFF" onPress={toUrl} >确定</Button>
        </View>
      </View>
    </View>
  </BaseLayout>);

};


export default Preset;
