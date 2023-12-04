import { FC, useEffect } from 'react';
import { View, TouchableOpacity, ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { useImmer } from 'use-immer';
import { getAreaById } from '@api/store';
import dayjs from 'dayjs';
import { fileStore } from '@store/getfileurl';
import { useRequest } from 'ahooks';
import { getByBoothId } from '@api/booths';

type IProps = {
  onPress: (index: number) => void
  index: number
  activeIndex: number,
  name: string,
  businessDateVOS: any[],
  pictureFIleVOs: any[]
}


const PackageItem = (props: IProps) => {
  const { onPress, index, activeIndex, name, businessDateVOS, pictureFIleVOs } = props;

  const border = index === activeIndex ? 'border-2 border-[#E6A055FF]' : '';
  return (<TouchableOpacity onPress={() => onPress(index)}>
    <View className={` w-24 h-16 mr-5 rounded-xl ${border} overflow-hidden`} >
      <ImageBackground source={{ uri: fileStore.fileUrl + '/' + pictureFIleVOs[0]?.fileName }} className="w-24 h-16 " />
    </View>
    <Text className="text-white text-xs font-semibold mt-2.5">{name}</Text>
    <Text className="opacity-50 text-white" style={{ fontSize: 10 }}>18:00 - 1:00</Text>
    <Text className="text-[#E6A055FF] text-xs font-semibold mt-1">$12.00</Text>
  </TouchableOpacity>);
};

export type IAreaListProps = {
  storeId: string,
  date: string,
  onChange: (list: any[], activeIndex: number) => void

}
const AreaList: FC<IAreaListProps> = (props) => {
  const { boothId, onChange } = props;
  const [data, setData] = useImmer({
    cells: [],
    activeIndex: 0,
  });
  const onPress = (index: number) => {
    setData(draft => {
      draft.activeIndex = index;
    });
  };

  const { run } = useRequest(() => getByBoothId(boothId), {
    manual: true,
    onSuccess: (res) => {
      
    },
  });

  useEffect(() => {
    if (boothId) {
      run();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boothId]);


  return <Animated.FlatList horizontal showsHorizontalScrollIndicator={false} data={data.cells} keyExtractor={item => item.id} renderItem={({ index, item }) => <PackageItem {...item} index={index} activeIndex={data.activeIndex} onPress={onPress} />} />;

};

export default AreaList;

