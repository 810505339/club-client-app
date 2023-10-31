import { useNavigation } from '@react-navigation/native';
import { FC, PropsWithChildren } from 'react';
import { View, FlatList, ImageBackground, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { RootStackParamList } from '@router/type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type IData = {
  [key in string]: string;

}

const data: IData[] = [
  { key: '1', navigation: '', text: '拼酒局', source: require('@assets/imgs/home/fightwine.png'), color: '#ED8EFFFF' },
  { key: '2', navigation: 'Preset', text: '预定门票', source: require('@assets/imgs/home/tickets.png'), color: '#FFBF65FF' },
  { key: '3', navigation: 'Preset', text: '预定卡座', source: require('@assets/imgs/home/deck.png'), color: '#91F2FFFF' },
  { key: '4', navigation: '', text: '发广播', source: require('@assets/imgs/home/radio.png'), color: '#FF8383FF' },
  { key: '5', navigation: '', text: '消费排行', source: require('@assets/imgs/home/consumption.png'), color: '#99FFA2FF' },
  { key: '6', navigation: 'Dynamic', text: '0.2 动态', source: require('@assets/imgs/home/dynamic.png'), color: '#C7C2FFFF' },

];

const Item = ({ navigation, text, source, color, onPress }: IData & {
  onPress: (navigation: string) => void
}) => {
  console.log(navigation);

  return (
    <TouchableOpacity className="mx-1.5  w-24 h-32  rounded-XL relative" onPress={() => onPress(navigation)}>
      <ImageBackground source={source as ImageSourcePropType} className="w-full h-full" />
      <Text className="text-xs   absolute bottom-2 text-center w-full" style={{ color: color }}>{text}</Text>
    </TouchableOpacity>
  );
};


type IProps = {
  style?: any,
  className?: string
}

const HorizontalFlatList: FC<PropsWithChildren<IProps>> = ({ style }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPress = (nav: unknown) => {
    navigation.navigate(nav);

  };

  return (
    <View style={style} >
      <FlatList
        data={data}
        renderItem={({ item }) => <Item  {...item} onPress={onPress} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.key}
      />
    </View>
  );
};

export default HorizontalFlatList;
