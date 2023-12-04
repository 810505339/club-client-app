
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useImmer } from 'use-immer';

type IProp = {
  name: string
  disabled: boolean
  itemPress: (i: number) => void
  i: number
  activeIndex: number | undefined
}
const Item = (props: IProp) => {
  const { name, disabled = false, itemPress, i, activeIndex = undefined } = props;


  const onPress = () => {
    itemPress(i);
  };

  const itemStyle = disabled ? 'opacity-25' : '';
  const itemStyle1 = activeIndex == i ? 'bg-[#EE2737FF] border-0' : '';
  return (<TouchableOpacity disabled={disabled} className={` h-10 w-14 mr-2.5 mb-2.5 border  border-white bg-[#ffffff4c] rounded-3xl items-center justify-center ${itemStyle}${itemStyle1}`} onPress={onPress} >
    <Text className="text-base text-white">{name}</Text>
  </TouchableOpacity>);
};

const BoothsList = () => {
  const list = Array.from({ length: 13 }, (_, i) => {
    return ({ name: `L${i + 1}`, disabled: i % 2 == 0 });
  });

  const [data, setData] = useImmer<{ activeIndex: undefined | number }>({
    activeIndex: undefined,
  });

  const itemPress = (i: number) => {
    setData(draft => {
      draft.activeIndex = i;
    });
  };


  return (<View className="flex-row flex-wrap ">
    {list.map((l, i) => (<Item key={i} {...l} i={i} activeIndex={data.activeIndex} itemPress={itemPress} />))}
  </View>);
};

export default BoothsList;
