import { View, TouchableOpacity, ListRenderItem } from 'react-native';
import { Text } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { useImmer } from 'use-immer';


type IProps = {
  onPress: (index: number) => void
  index: number
  activeIndex: number
}


const AreaItem = (props: IProps) => {
  const { onPress, index, activeIndex } = props;
  const border = index === activeIndex ? 'border-2 border-[#E6A055FF]' : '';
  return (<TouchableOpacity onPress={() => onPress(index)}>
    <View className={`bg-violet-500 w-24 h-16 mr-5 rounded-xl ${border}`} />
    <Text className="text-white text-xs font-semibold mt-2.5">Lounge</Text>
    <Text className="opacity-50 text-white" style={{ fontSize: 10 }}>18:00 - 1:00</Text>
    <Text className="text-[#E6A055FF] text-xs font-semibold mt-1">$12.00</Text>
  </TouchableOpacity>);
};

const AreaList = () => {

  const [data, setData] = useImmer({
    cells: Array.from({ length: 5 }, (item, index) => ({ id: index })),
    activeIndex: 0,
  });
  const onPress = (index: number) => {
    setData(draft => {
      draft.activeIndex = index;
    });
  };

  return <Animated.FlatList horizontal showsHorizontalScrollIndicator={false} data={data.cells} keyExtractor={item => item.id} renderItem={({ index }) => <AreaItem index={index} activeIndex={data.activeIndex} onPress={onPress} />} />;

};

export default AreaList;
