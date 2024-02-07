import { useNavigation } from '@react-navigation/native';
import { NativeStackHeaderProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, RefreshControl, ImageBackground, StyleSheet, StyleProp, ViewStyle, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { RootStackParamList } from '@router/type';
import BaseLayout from '@components/baselayout';
import CheckLayout from '@components/baselayout/checkLayout';
import Animated from 'react-native-reanimated';
import { TabScreen, Tabs, TabsProvider } from 'react-native-paper-tabs';
import { useImmer } from 'use-immer';
import CustomFlatList from '@components/custom-flatlist';
import { winePartyByAll } from '@api/fightwine';
import useMode from './hooks/useMode';
import { useEffect } from 'react';
import CustomNavigationBar from '@components/appBar/customNavigationBar';
import { HeaderButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types';

const bg1 = require('@assets/imgs/fightwine/bg1.png');
const bg2 = require('@assets/imgs/fightwine/bg2.png');
const bg3 = require('@assets/imgs/fightwine/bg3.png');
const bg4 = require('@assets/imgs/fightwine/bg4.png');

const launch = require('@assets/imgs/base/launch.png');
type Item = {
  bg: ImageSourcePropType;
  tagColor: string;
  color: string;
  winePartyMode: string;
  modeName?: string
}



//这里业务接口
const list: Item[] = [
  { bg: bg1, tagColor: 'bg-[#1A5CC980]', color: 'text-[#1A5CC9FF]', winePartyMode: 'FEMALE_AA' },
  { bg: bg2, tagColor: 'bg-[#C97B2480]', color: 'text-[#C97B24FF]', winePartyMode: 'AA' },
  { bg: bg3, tagColor: 'bg-[#20C9C380]', color: 'text-[#069E98FF]', winePartyMode: 'PAY_SOLO' },
  { bg: bg4, tagColor: 'bg-[#CA236F80]', color: 'text-[#CA236FFF]', winePartyMode: 'MALE_AA' },
];




const ItemCard = ({ cards }: { cards: any[] }) => {

  const positionLeft = (index: number): StyleProp<ViewStyle> => {
    const left = -(cards.length >= 20 ? 20 : cards.length) * index;


    return {
      left,
      zIndex: index,
    };

  };

  return (<View className="flex flex-row  border flex-1 mr-5 overflow-hidden">
    {cards.map((item, index) => (<View key={index} style={positionLeft(index)} className={'w-6 h-6 rounded-full relative border border-[#000000] overflow-hidden  '}>
      <ImageBackground resizeMode="cover" source={{ uri: item }} className="flex-auto" />
    </View>))
    }
  </View >);
};



export const Item = (props) => {
  const { partyName, statusDesc, peopleNum, modeName, entranceDate, latestArrivalTime, onPress, id, partyMode } = props;

  //寻找对应的元素 需要里面的tagColor,color
  const { tagColor, color, bg } = list.find(item => item.winePartyMode === partyMode)!;

  const tags = [
    { label: modeName },
    { label: `${peopleNum}人局` },
    { label: `${entranceDate} ${latestArrivalTime}入场` },
  ];


  const tagBg = (index: number) => {
    return index === 0 ? tagColor : 'bg-[#FFFFFF26]';
  };




  return <View className=" h-32 p-2.5 m-2.5  relative rounded-2xl overflow-hidden">

    <ImageBackground source={bg} className="absolute left-0 right-0 bottom-0 z-0 top-0" />
    <View className="flex flex-row items-center justify-between ">

      <Text className="text-sm text-white font-bold">{partyName}</Text>
      <Text className="text-xs text-white border border-white rounded-xl px-1.5 py-1">{statusDesc}</Text>
    </View>
    <View className="flex-row mt-3.5">
      {tags.map((item, index) => (<Text className={`py-1 px-1.5 mr-1.5 rounded-xl ${tagBg(index)}`} key={index} >{item.label}</Text>))}
    </View>
    <View className="mt-5 flex-row ">
      {/* <ItemCard cards={} />
      <ItemCard cards={} /> */}
      <View className="h-6 w-16 justify-self-end justify-center items-center bg-[#FFFFFFE6] rounded-2xl">
        <Text className={`text-xs font-normal ${color}`} onPress={() => onPress(id)} >查看详情</Text>
      </View>
    </View>
  </View>;
};


type HeaderRightProps = {
  onPress: () => void
}

const HeaderRight = (props: HeaderButtonProps & HeaderRightProps) => {

  console.log(props);



  return (
    <View className="mr-4">
      <Button textColor="white" contentStyle={{ height: 36 }} style={{ height: 36 }} className="bg-[#EE2737FF]" onPress={props.onPress}  >我的酒局</Button>
    </View>
  );
};

const FightwineScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    navigation.setOptions({
      headerRight: (props: HeaderButtonProps) => <HeaderRight {...props} onPress={nextMyWineParty} />,
    });
  }, [navigation]);

  const { modeList } = useMode<Item[]>(undefined, list);

  const [data, setData] = useImmer({
    refreshing: false,
    defaultIndex: 0,
  });


  //发起酒局
  const onLaunch = () => {
    navigation.navigate('Launch');
  };


  const toUrl = (id: string) => {
    navigation.navigate('FightwineDetail', { partyId: id });
  };

  const handleChangeIndex = (index: number) => {
    setData((darft) => {
      darft.defaultIndex = index;
    });

  };

  /* 跳转我的酒局 */
  function nextMyWineParty() {
    navigation.navigate('MyWineParty');
  }



  return (
    <BaseLayout>
      <CheckLayout />
      <TabsProvider
        defaultIndex={0}
        onChangeIndex={handleChangeIndex}
      >
        <Tabs
          uppercase={true} // true/false | default=true (on material v2) | labels are uppercase
          // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
          // iconPosition // leading, top | default=leading
          style={{ backgroundColor: 'transparent' }} // works the same as AppBar in react-native-paper
          dark={true} // works the same as AppBar in react-native-paper
          // theme={} // works the same as AppBar in react-native-paper
          mode="scrollable" // fixed, scrollable | default=fixed
          showLeadingSpace={false} //  (default=true) show leading space in scrollable tabs inside the header
          disableSwipe={false} // (default=false) disable swipe to left/right gestures
        >

          {modeList.map((m, index) => (<TabScreen key={m.winePartyMode} label={m.modeName!}>
            <View className="bg-transparent">
              {index === data.defaultIndex && <CustomFlatList params={{ winePartyMode: m.winePartyMode }} keyExtractor={(item) => item.id} renderItem={(item) => <Item {...item} modeName={m.modeName} onPress={toUrl} />} onFetchData={winePartyByAll} />}
            </View>
          </TabScreen>))}
        </Tabs>
      </TabsProvider>

      <TouchableOpacity className="absolute z-50 w-16 h-16 bottom-1/4 right-0" onPress={onLaunch}>
        <ImageBackground source={launch} className="w-16 h-16" />
      </TouchableOpacity>
    </BaseLayout>
  );
};
export default FightwineScreen;
