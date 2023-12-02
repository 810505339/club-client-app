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


const tickerBg = require('@assets/imgs/home/preset/ticket-header.png');

const Preset = () => {

  const { snap, bottomSheetModalRef, shop, onPress } = useSelectShop();

  const [data, setData] = useImmer({
    time: new Date(),
    showTime: false,
    ticketNumber: '1',
    selectAreaId: '',
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
      draft.selectAreaId == list[index].id;
    });

    const { data: res } = await onSaleNum({
      'storeId': shop.select.id,
      'areaId': list[index].id,
      'entranceDate': formatDay,
    });
    console.log(res);
  };


  const onTicketsChange = (text: string) => {
    const newText = text.replace(/[^\d]+/, '');
    setData(draft => {
      draft.ticketNumber = newText;

    });
  };

  const onPlus = () => {
    setData(draft => {
      draft.ticketNumber = `${Number(draft.ticketNumber) + 1}`;

    });
  };

  const onMinus = () => {
    setData(draft => {
      draft.ticketNumber = `${Number(draft.ticketNumber) - 1}`;
    });
  };

  const showShop = () => {
    bottomSheetModalRef.current?.present();
  };



  return (<BaseLayout className="bg-[#0B0B0BFF]">
    <CustomModal ref={bottomSheetModalRef} data={snap.shopList} selectValue={shop.select.id} onPress={onPress} headerText="选择门店" snapPoints={['50%']} />

    <View className="absolute w-52 h-28 right-3 top-16 z-20">
      <Image source={tickerBg} resizeMode="contain" className="w-full h-full" />
    </View>
    <View className="mt-10 flex-auto bg-[#101010FF] rounded-t-2xl overflow-hidden p-5">
      <View className="">
        <Text className="text-xs text-white font-semibold opacity-50">选择门店</Text>
        <TextInput mode="outlined" className="flex-auto bg-transparent mt-4" value={shop.select.name} showSoftInputOnFocus={false} outlineStyle={{ borderRadius: 16 }} right={<TextInput.Icon icon="chevron-down" />} onPressIn={showShop} />
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
          <Text className="text-[#FFFFFF]" style={{ fontSize: 10 }}>剩余<Text className="text-[#E6A055FF] text-xs">80</Text>张门票</Text>
          <View className="flex-row items-center">
            <IconButton mode="outlined" icon="minus" size={10} containerColor={'#FFFFFF'} iconColor={'#222222FF'} onPress={onMinus} />
            <TextInput mode="outlined" className="bg-transparent text-center w-20" keyboardType="numeric" value={data.ticketNumber} onChangeText={onTicketsChange} outlineStyle={{ borderRadius: 16 }} />
            <IconButton mode="outlined" icon="plus" size={10} containerColor={'#FFFFFF'} iconColor={'#222222FF'} onPress={onPlus} />
          </View>
        </View>
      </View>
    </View>
    <View className="sticky  inset-auto h-14  flex-col justify-center ">
      <Divider />
      <View className="flex-row items-center justify-between px-5">
        <Text style={{ fontSize: 10 }}>总计：<Text className="text-[#E6A055FF]">$</Text><Text className="text-[#E6A055FF] text-2xl font-bold" >1800</Text></Text>
        <Button mode={'elevated'} className="bg-[#EE2737FF]" textColor="#0C0C0CFF">确定</Button>
      </View>
    </View>
  </BaseLayout>);

};


export default Preset;
