
import { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';


type IProp = {
  name: string
  isOpen: boolean
  itemPress: (i: number) => void
  i: number
  activeIndex: number | undefined
}
const Item = (props: IProp) => {
  const { name, isOpen = false, itemPress, i, activeIndex = undefined } = props;


  const onPress = () => {
    itemPress(i);
  };

  const itemStyle = !isOpen ? 'opacity-25' : '';
  const itemStyle1 = activeIndex == i ? 'bg-[#EE2737FF] border-0 text-[#000000FF]' : '';
  return (<TouchableOpacity disabled={!isOpen} className={` h-10 min-w-[58] px-2 mr-2.5 mb-2.5 border  border-white bg-[#ffffff4c] rounded-3xl items-center justify-center ${itemStyle}${itemStyle1}`} onPress={onPress} >
    <Text className={`text-base ${itemStyle1}`}>{name}</Text>
  </TouchableOpacity>);
};


type IBoothsList = {
  list: IProp[]
  itemPress: (i: number) => void
  activeIndex: number | undefined
}

const BoothsList: FC<IBoothsList> = ({ list, activeIndex, itemPress }) => {

  return (<View className="flex-row flex-wrap ">
    {list?.map((l, i) => (<Item key={i} {...l} i={i} activeIndex={activeIndex} itemPress={itemPress} />))}
  </View>);
};

export default BoothsList;
