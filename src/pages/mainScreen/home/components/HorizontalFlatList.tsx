import { View, FlatList, ImageBackground, ImageSourcePropType } from 'react-native';
import { Text } from 'react-native-paper'

type IData = {

  [key in string]: string;
}

const data: IData[] = [
  { key: '1', text: '拼酒局', source: require('@assets/imgs/home/fightwine.png'), color: '#ED8EFFFF' },
  { key: '2', text: '预定门票', source: require('@assets/imgs/home/tickets.png'), color: '#FFBF65FF' },
  { key: '3', text: '预定卡座', source: require('@assets/imgs/home/deck.png'), color: '#91F2FFFF' },
  { key: '4', text: '发广播', source: require('@assets/imgs/home/radio.png'), color: '#FF8383FF' },
  { key: '5', text: '消费排行', source: require('@assets/imgs/home/consumption.png'), color: '#99FFA2FF' },
  { key: '6', text: '0.2 动态', source: require('@assets/imgs/home/dynamic.png'), color: '#C7C2FFFF' },

];

const Item = ({ text, source, color }: IData) => (
  <View className='mx-1.5  w-[72px] h-[102px]  rounded-md relative'>
    <ImageBackground source={source as ImageSourcePropType} className='w-full h-full' />
    <Text className='text-xs   absolute bottom-2 text-center w-full' style={{ color: color }}>{text}</Text>
  </View>
);
const HorizontalFlatList = () => (
  <View className='absolute z-10 top-28'>
    <FlatList
      data={data}
      renderItem={({ item }) => <Item  {...item} />}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.key}
    />
  </View>
);

export default HorizontalFlatList;
