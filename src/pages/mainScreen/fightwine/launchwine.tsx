//发起酒局

import BaseLayout from '@components/baselayout';
import React, { ReactNode, useEffect } from 'react';
import { View } from 'react-native';
import { Button, Divider, Icon, Text, TextInput } from 'react-native-paper';
import { useImmer } from 'use-immer';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import AreaList from '../home/components/areaList';
import dayjs from 'dayjs';
import { load } from '@storage/shop/action';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@router/type';
import useSelectShop from '@hooks/useSelectShop';
import Toast from 'react-native-toast-message';

type IItem = {
  label: string,
  render: () => ReactNode,
}



const LaunchWine = () => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'LaunchWine'>>();
  const { winePartyMode, modeName } = route.params;
  const { shop } = useSelectShop();

  const [data, setData] = useImmer({
    timershow: false,
    date: new Date(),
    lastDate: new Date(),
    lastDateShow: false,
    areaId: '',
    partyName: '',
    areaName: '',
  });






  const dateFormat = dayjs(data.date).format('YYYY-MM-DD');
  const lastDateFormat = dayjs(data.lastDate).format('HH:mm');
  const list: IItem[] = [
    { label: '设置名称', render: () => (<TextInput className="bg-[#221F1F80]" value={data.partyName} onChangeText={(text) => setData(draft => { draft.partyName = text; })} />) },
    { label: '选择日期', render: () => (<TextInput value={dateFormat} className="bg-transparent" showSoftInputOnFocus={false} onFocus={() => setData((draft) => { draft.timershow = true; })} />) },
    {
      label: '最晚到场时间', render: () => (<View>
        <TextInput value={lastDateFormat} className="bg-transparent" showSoftInputOnFocus={false} onFocus={() => setData((draft) => { draft.lastDateShow = true; })} />
        <View className=" bg-[#eea95a19] p-2.5 items-center flex-row rounded-md mt-2.5">
          <Icon
            source="alert-circle"
            color="#FAAD14FF"
            size={20}
          />
          <Text className="text-[#F8B568FF] ml-2 text-xs font-normal">超过当天晚上12点到场，门票将不再可用</Text>
        </View>
      </View>),
    },
    { label: '选择区域', render: () => (shop.select.id != '' && <AreaList storeId={shop.select.id} date={dateFormat} onChange={changeArea} />) },
  ];

  //选择日期
  const onDateChange = (event: DateTimePickerEvent, selectDate?: Date) => {
    const currentDate = selectDate || data.date;
    setData(draft => {
      draft.date = currentDate;
      draft.timershow = false;
    });
  };
  //选择最晚时间
  const onTimerChange = (_, selectDate?: Date) => {
    const currentDate = selectDate || data.lastDate;
    console.log(currentDate);

    setData(draft => {
      draft.lastDate = currentDate;
      draft.lastDateShow = false;
    });
  };

  //changeArea

  const changeArea = async (list: any, index: number) => {
    setData(draft => {
      draft.areaId = list[index]?.id;
      draft.areaName = list[index]?.name;
    });
  };


  const handleNext = () => {
    if (data.partyName === '') {
      Toast.show({
        text1: '请输入酒局名称',
      });
      return;
    }

    if (!shop.select.id)
    {
      Toast.show({
        text1: '请选择区域',
      });
      return;
    }

    navigation.navigate('Booths', {
      partyName: data.partyName,
      areaId: data.areaId,
      entranceDate: dateFormat, //入场日期
      latestArrivalTime: lastDateFormat,
      winePartyMode,
      storeId: shop.select.id,//	最晚到场时间
      areaName: data.areaName,//	最晚到场时间
      modeName,
    });
  };

  return (<BaseLayout>
    <View className="p-5 flex-1">
      {list.map((item, i) => (
        <View className="mb-8" key={i}>
          <Text className="text-xs font-semibold mb-2.5">{item.label}</Text>
          {item.render()}
        </View>
      ))}
      {data.timershow && <DateTimePicker onChange={onDateChange} value={data.date} />}
      {data.lastDateShow && <DateTimePicker onChange={onTimerChange} mode="time" value={data.lastDate} />}
    </View>
    <View className="h-14  flex-col justify-center">
      <Divider />
      <Button
        mode="outlined"
        style={{ borderColor: '#EE2737', height: 50, borderRadius: 33, backgroundColor: '#EE2737' }}
        labelStyle={{
          fontSize: 18,
          color: '#0C0C0CFF',
          fontWeight: '600',
        }}
        contentStyle={{ height: 50 }}
        onPress={handleNext}>
        下一步
      </Button>
    </View>
  </BaseLayout>);
};



export default LaunchWine;
