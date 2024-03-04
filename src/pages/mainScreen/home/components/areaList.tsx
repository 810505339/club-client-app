import { FC, useEffect } from 'react';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { useImmer } from 'use-immer';
import { getAreaById } from '@api/store';
import dayjs from 'dayjs';
import { fileStore } from '@store/getfileurl';

type IProps = {
  onPress: (index: number) => void
  index: number
  activeIndex: number,
  name: string,
  businessDateVOS: any[],
  pictureFIleVOs: any[]
}


const AreaItem = (props: IProps) => {
  const { onPress, index, activeIndex, name, businessDateVOS, pictureFIleVOs } = props;
  const beginTime = businessDateVOS[0].beginTime;
  const endTime = businessDateVOS[0].endTime;

  const border = index === activeIndex ? 'border-2 border-[#E6A055FF]' : '';
  return (<TouchableOpacity onPress={() => onPress(index)}>
    <View className={` w-24 h-16 mr-5 rounded-xl ${border} overflow-hidden`} >
      <ImageBackground source={{ uri: fileStore.fileUrl + '/' + pictureFIleVOs[0]?.fileName }} className="w-24 h-16 " />
    </View>
    <Text className="text-white text-xs font-semibold mt-2.5">{name}</Text>
    <Text className="opacity-50 text-white" style={{ fontSize: 10 }}>{beginTime} - {endTime}</Text>
    {/* <Text className="text-[#E6A055FF] text-xs font-semibold mt-1">$12.00</Text> */}
  </TouchableOpacity>);
};

export type IAreaListProps = {
  storeId: string,
  date: string,
  onChange: (list: any[], activeIndex: number) => void

}
const AreaList: FC<IAreaListProps> = (props) => {
  const { storeId, date, onChange } = props;
  const [data, setData] = useImmer({
    cells: [],
    activeIndex: 0,
  });
  const onPress = (index: number) => {
    setData(draft => {
      draft.activeIndex = index;
    });
    onChange(data.cells, index);
  };


  const getAreaByIdApi = async () => {
    const { data: res } = await getAreaById(storeId, { date });
    const week = dayjs(date).day() == 0 ? 7 : dayjs(date).day();
    //获取今天的时间
    //数据里面找到今天的营业

    console.log(week, 'week');
    setData(draft => {
      const list = res ?? [];
      draft.cells = list;
        draft.activeIndex = 0;
      onChange(list, 0);
    });

  };



  useEffect(() => {
    if (storeId && date) {
      getAreaByIdApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeId, date]);

  return <Animated.FlatList horizontal showsHorizontalScrollIndicator={false} data={data.cells} keyExtractor={item => item.id} renderItem={({ index, item }) => <AreaItem {...item} index={index} activeIndex={data.activeIndex} onPress={onPress} />} />;

};

export default AreaList;

