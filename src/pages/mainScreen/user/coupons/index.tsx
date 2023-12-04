import BaseLayout from '@components/baselayout';
import { RefreshControl, View } from 'react-native';
import { Text } from 'react-native-paper';
import { TabScreen, Tabs, TabsProvider } from 'react-native-paper-tabs';
import Animated from 'react-native-reanimated';
import { useImmer } from 'use-immer';


export const renderItem = ({ item }) => {
  return <View className="my-2.5 mx-5 flex-row rounded-xl overflow-hidden h-24 ">
    <View className="bg-[#EE2737] w-32 justify-center items-center ">
      <Text className="font-bold text-white text-2xl">$1000</Text>
      <Text>满$5000可用</Text>
    </View>
    <View className=" flex-auto bg-[#151313FF] p-2.5">
      <Text className="text-xs font-bold">门票现金券</Text>
      <View className="flex-row  flex-auto mt-2">
        <Text style={{ fontSize: 10 }} className="bg-[#EE273733] rounded-2xl px-2 mr-2 h-5 leading-5">现金券</Text>
        <Text style={{ fontSize: 10 }} className="bg-[#E6A05533] rounded-2xl px-2  h-5 leading-5">适用商品</Text>
      </View>
      <Text style={{ fontSize: 10 }} className="font-light text-[#ffffff7f]">有效期至 2023/10/01</Text>
    </View>
  </View>;
};


const Coupons = () => {

  const [data, setData] = useImmer({
    refreshing: false,
    cells: [1, 2, 3, 4, 5, 6, 7],
  });
  const onRefresh = () => {

  };

  return (<BaseLayout >
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
        <TabScreen label="可用优惠券">
          <View className="bg-transparent mt-2.5">
            <Animated.FlatList
              renderItem={({ item }) => renderItem({ item })}
              ListFooterComponent={<Text className="text-center pb-5">没有更多</Text>}
              keyExtractor={item => item}
              data={data.cells}
              refreshControl={<RefreshControl refreshing={data.refreshing} onRefresh={onRefresh} />}
            />
          </View>
        </TabScreen>
        <TabScreen label="历史优惠券">
          <View className="bg-transparent">
            <Animated.FlatList
              renderItem={({ item }) => renderItem({ item })}
              ListFooterComponent={<Text className="text-center pb-5">没有更多</Text>}
              keyExtractor={item => item}
              data={data.cells}
              stickyHeaderIndices={[0]}
              refreshControl={<RefreshControl refreshing={data.refreshing} onRefresh={onRefresh} />}
            />
          </View>
        </TabScreen>
      </Tabs>
    </TabsProvider>
  </BaseLayout>);

};


export default Coupons;
