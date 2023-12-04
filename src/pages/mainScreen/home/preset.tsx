import BaseLayout from '@components/baselayout';
import { Image, View } from 'react-native';
import { Text, TextInput, IconButton, Divider, Button } from 'react-native-paper';
import { useImmer } from 'use-immer';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import AreaList from './components/areaList';
import useSelectShop from '@hooks/useSelectShop';
import CustomModal from '@components/custom-modal';
import { onSaleNum } from '@api/store';
import { findIndex } from '@store/shopStore';
import NumberInput from '@components/number-input';
import { useRequest } from 'ahooks';
import { useEffect } from 'react';


const tickerBg = require('@assets/imgs/home/preset/ticket-header.png');

const Preset = () => {

  const { snap, bottomSheetModalRef, shop, onPress } = useSelectShop();

  const { run } = useRequest(onSaleNum, {
    manual: true,
    onSuccess: (res) => {
      console.log(res, 'res');
      setData((draft) => {
        draft.remainingNum = res?.data?.remainingNum ?? 0;
        draft.ticketId = res?.data?.ticketId ?? '';
        draft.amount = res?.data?.amount ?? 0;
        draft.total = res?.data?.amount;
      });

    },
  });


  const [data, setData] = useImmer({
    time: new Date(),
    showTime: false,
    remainingNum: 0, //剩余票数
    selectAreaId: '',
    total: 0,
    ticketId: '',
    amount: 0,
    num: 1,//默认票数
  });
  const formatDay = dayjs(data.time).format('YYYY-MM-DD');
  const setShowTime = (showTime: boolean) => {
    setData(draft => {
      draft.showTime = showTime;
    });
  };
  const onChange = (event: DateTimePickerEvent, selectDate?: Date) => {
    const currentDate = selectDate || data.time;
    console.log(event.type);

    setData(draft => {
      draft.time = currentDate;
      draft.showTime = false;
    });
  };
  //当选择的区域变化的时候
  const changeArea = async (list: any, index: number) => {
    setData(draft => {
      draft.selectAreaId = list[index]?.id;
    });
  };


  const showShop = () => {
    bottomSheetModalRef.current?.present();
  };
  //数量改变
  const changeSum = (sum: number) => {
    setData(draft => {
      draft.num = sum;
      draft.total = sum * data.amount;
    });
  };

  const shopName = findIndex(shop.select.id)?.name;

  useEffect(() => {
    console.log(`shop:${shop.select.id}`, `time:${data.time}`, `areaId:${data.selectAreaId}`, '12345');

    if (shop.select.id && data.time && data.selectAreaId) {
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
    data.time,
    data.selectAreaId,
  ]);

  return (<BaseLayout className="bg-[#0B0B0BFF]">
    <CustomModal ref={bottomSheetModalRef} data={snap.shopList} selectValue={shop.select.id} onPress={onPress} headerText="选择门店" snapPoints={['50%']} />

    <View className="absolute w-52 h-28 right-3 top-16 z-20">
      <Image source={tickerBg} resizeMode="contain" className="w-full h-full" />
    </View>
    <View className="mt-10 flex-auto bg-[#101010FF] rounded-t-2xl overflow-hidden p-5">
      <View className="">
        <Text className="text-xs text-white font-semibold opacity-50">选择门店</Text>
        <TextInput mode="outlined" className="flex-auto bg-transparent mt-4" value={shopName} showSoftInputOnFocus={false} outlineStyle={{ borderRadius: 16 }} right={<TextInput.Icon icon="chevron-down" />} onPressIn={showShop} />
      </View>
      <View className="mt-7">
        <Text className="text-xs text-white font-semibold opacity-50">选择日期</Text>
        <TextInput mode="outlined" className="flex-auto bg-transparent mt-4" showSoftInputOnFocus={false} value={formatDay} outlineStyle={{ borderRadius: 16 }} onPressIn={() => { setShowTime(true); }} right={<TextInput.Icon icon="calendar" />} />
        {data.showTime && <DateTimePicker onChange={onChange} value={data.time} />}
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
            <NumberInput max={data.remainingNum} min={1} num={data.num} onChange={changeSum} />
          </View>
        </View>
      </View>
    </View>
    <View className="sticky  inset-auto h-14  flex-col justify-center ">
      <Divider />
      <View className="flex-row items-center justify-between px-5">
        <Text style={{ fontSize: 10 }}>总计：<Text className="text-[#E6A055FF]">$</Text><Text className="text-[#E6A055FF] text-2xl font-bold" >{data.total}</Text></Text>
        <Button mode={'elevated'} className="bg-[#EE2737FF]" textColor="#0C0C0CFF">确定</Button>
      </View>

    </View>
  </BaseLayout>);

};


export default Preset;
