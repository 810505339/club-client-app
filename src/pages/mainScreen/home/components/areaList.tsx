import { FC, useEffect } from 'react';
import { View, TouchableOpacity, ListRenderItem } from 'react-native';
import { Text } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { useImmer } from 'use-immer';
import { getAreaById } from '@api/store';
import dayjs from 'dayjs';


type IProps = {
  onPress: (index: number) => void
  index: number
  activeIndex: number,
  name: string,
  businessDateVOS: any[]
}


const AreaItem = (props: IProps) => {
  const { onPress, index, activeIndex, name, businessDateVOS } = props;
  // console.log(businessDateVOS);

  const border = index === activeIndex ? 'border-2 border-[#E6A055FF]' : '';
  return (<TouchableOpacity onPress={() => onPress(index)}>
    <View className={`bg-violet-500 w-24 h-16 mr-5 rounded-xl ${border}`} />
    <Text className="text-white text-xs font-semibold mt-2.5">{name}</Text>
    <Text className="opacity-50 text-white" style={{ fontSize: 10 }}>18:00 - 1:00</Text>
    <Text className="text-[#E6A055FF] text-xs font-semibold mt-1">$12.00</Text>
  </TouchableOpacity>);
};

export type IAreaListProps = {
  id: string,
  date: string,
  onChange: (list: any[], activeIndex: number) => void

}
const AreaList: FC<IAreaListProps> = (props) => {
  const { id, date, onChange } = props;
  const [data, setData] = useImmer({
    cells: [],
    activeIndex: 0,
  });
  const onPress = (index: number) => {
    setData(draft => {
      draft.activeIndex = index;
    });
  };


  const getAreaByIdApi = async () => {
    const { data } = await getAreaById(id, { date });
    const week = dayjs(date).day();
    console.log(week, 'week');
    setData(draft => {
      draft.cells = data;
      draft.activeIndex = 0;
    });
  };



  useEffect(() => {
    if (id && date) {

      getAreaByIdApi();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, date]);

  useEffect(() => {
    if (data.cells.length > 0) {
      onChange(data.cells, data.activeIndex);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.activeIndex, id, date, data.cells]);


  return <Animated.FlatList horizontal showsHorizontalScrollIndicator={false} data={data.cells} keyExtractor={item => item.id} renderItem={({ index, item }) => <AreaItem {...item} index={index} activeIndex={data.activeIndex} onPress={onPress} />} />;

};

export default AreaList;

