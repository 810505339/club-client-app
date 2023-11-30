import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, RefreshControl, ImageBackground, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { RootStackParamList } from '@router/type';
import BaseLayout from '@components/baselayout';
import CheckLayout from '@components/baselayout/checkLayout';
import Animated from 'react-native-reanimated';
import { TabScreen, Tabs, TabsProvider } from 'react-native-paper-tabs';
import { useImmer } from 'use-immer';


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



const Item = ({ tags, boys, girls }) => {
  return <View className="bg-slate-500 p-2.5 m-2.5 rounded-lg">
    <Text className="text-sm text-white font-bold">大家一起来快活~</Text>
    <View className="flex-row mt-3.5">
      {tags.map((item, index) => (<Text className="py-1 px-1.5 mr-1.5 rounded-xl bg-[#FFFFFF26]" key={index} >{item.label}</Text>))}
    </View>
    <View className="mt-5 flex-row justify-between">
      <ItemCard cards={girls} />
      <ItemCard cards={boys} />
      <View className="h-6 w-16 justify-center items-center bg-[#FFFFFFE6] rounded-2xl">
        <Text className="text-xs font-normal text-[#C97B24FF]">查看详情</Text>
      </View>
    </View>
  </View>;
};

const FightwineScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [data, setData] = useImmer({
    refreshing: false,
    cells: Array.from({ length: 10 }, (_, index) => {
      if (index % 2 == 0) {
        return ({
          id: index,
          tags: [{ color: '#CA236F80', label: '男A女A' }, { label: '6人局' }],
          girls: [
            'https://img.xjh.me/random_img.php',
            'https://img.xjh.me/random_img.php',
            'https://img.xjh.me/random_img.php',
          ],
          boys: [
            'https://img.xjh.me/random_img.php',
            'https://img.xjh.me/random_img.php',
          ],
        });
      } else {
        return ({
          id: index, tags: [{ color: '#C97B2480', label: 'AA制' }, { label: '8人局' }],
          girls: [
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
          ],
          boys: [
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
            'https://cdn.seovx.com/d/?mom=302',
          ],
        });
      }
    }),
  });
  const onRefresh = () => {

  };



  return (
    <BaseLayout>
      <CheckLayout />
      <TabsProvider
        defaultIndex={0}
      // onChangeIndex={handleChangeIndex} optional
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
          <TabScreen label="全部">
            <View className="bg-transparent">
              <Animated.FlatList
                renderItem={({ item }) => <Item {...item} />}
                ListFooterComponent={<Text className="text-center pb-5">没有更多</Text>}
                keyExtractor={item => item.id}
                data={data.cells}

                refreshControl={<RefreshControl refreshing={data.refreshing} onRefresh={onRefresh} />}
              />
            </View>
          </TabScreen>

          <TabScreen label="全部">
            <View className="bg-transparent" />
          </TabScreen>
        </Tabs>
      </TabsProvider>
    </BaseLayout>
  );
};
export default FightwineScreen;
