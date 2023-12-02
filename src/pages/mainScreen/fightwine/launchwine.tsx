//发起酒局

import BaseLayout from '@components/baselayout';
import React, { ReactNode, useEffect } from 'react';
import { View } from 'react-native';
import { Button, Icon, Text, TextInput } from 'react-native-paper';
import { useImmer } from 'use-immer';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import AreaList from '../home/components/areaList';
import dayjs from 'dayjs';
import { load } from '@storage/shop/action';
import { useNavigation } from '@react-navigation/native';

type IItem = {
  label: string,
  render: () => ReactNode,
}



const LaunchWine = () => {

  const navigation = useNavigation();

  const [data, setData] = useImmer({
    timershow: false,
    date: new Date(),
    lastDate: new Date(),
    lastDateShow: false,
    storeId: '',
  });

  const getStoreById = async () => {
    const select = await load();
    setData(draft => {
      draft.storeId = select.selectId;
    });
  };

  useEffect(() => {
    getStoreById();
  }, []);




  const dateFormat = dayjs(data.date).format('YYYY-MM-DD');
  const lastDateFormat = dayjs(data.lastDate).format('HH:mm');
  const list: IItem[] = [
    { label: '设置名称', render: () => (<TextInput className="bg-[#221F1F80]" />) },
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
    { label: '选择区域', render: () => (data.storeId != '' && <AreaList storeId={data.storeId} date={dateFormat} onChange={changeArea} />) },
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

  const changeArea = (list: any, index: number) => {

  };

  const handleNext = () => {
    navigation.navigate();
  };

  return (<BaseLayout>
    <View className="p-5">
      {list.map((item, i) => (
        <View className="mb-8" key={i}>
          <Text className="text-xs font-semibold mb-2.5">{item.label}</Text>
          {item.render()}
        </View>
      ))}
      {data.timershow && <DateTimePicker onChange={onDateChange} value={data.date} />}
      {data.lastDateShow && <DateTimePicker onChange={onTimerChange} mode="time" value={data.lastDate} />}

      <View>
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
    </View>
  </BaseLayout>);
};



export default LaunchWine;
