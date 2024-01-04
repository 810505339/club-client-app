import BaseLayout from '@components/baselayout';
import { RefreshControl, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { TabsProvider, Tabs, TabScreen } from 'react-native-paper-tabs';
import Animated from 'react-native-reanimated';
import { useImmer } from 'use-immer';
import ListHeaderComponent from './components/ListHeaderComponent';
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '@router/type';
import { useRequest } from 'ahooks';
import { getOrderList,tempPay } from '@api/order';


const renderItem = ({ item, handleItemPress }) => {
  return <TouchableOpacity onPress={() => handleItemPress(item)}>
    <View className="  bg-[#151313FF]  p-2.5   rounded-xl border  border-[#252525] my-2.5">
      <View className="flex-row items-center justify-between">
        <Text className="text-[#FFFFFF] text-sm font-semibold">预定门票</Text>
        <Text className="text-xs font-normal text-[#ffffff7f]">已支付</Text>
      </View>

      <View className="mt-2.5 flex-row">
        <View className="w-24 h-14 bg-violet-500 rounded-md" />
        <View className="flex-auto ml-2.5 mr-5">
          <Text numberOfLines={2} className="text-[#ffffff] text-sm">商品名称商品名称商品名称商品名称</Text>
          <Text className="text-[#ffffff7f] text-xs">2023/09/06 18:29:56</Text>
        </View>
        <Text>12572.25</Text>
      </View>
      <View className="py-2.5 mt-2.5 flex-row items-center justify-between">
        <Text className="text-xs text-[#ffffff] ">
          剩余
          <Text className="text-[#EE2737FF]">1:29:56</Text>
          可继续支付
        </Text>
        <View className="flex-row">
          <View className="w-16 border border-[#EE2737FF] py-2 px-1 rounded-2xl mr-2.5 items-center justify-center">
            <Text className="text-[#EE2737FF] text-xs">取消订单</Text>
          </View>
          <View className="w-16 border border-[#ffffff] py-2 px-1 rounded-2xl items-center justify-center">
            <Text className="text-[#ffffff] text-xs">继续支付</Text>
          </View>
        </View>

      </View>

    </View>
  </TouchableOpacity>;
};







const Orders = () => {

  const navigation = useNavigation<ScreenNavigationProp<'OrdersInfo'>>();

  useRequest(()=>tempPay('1742429025592176641'));
  const [data, setData] = useImmer({
    refreshing: false,
    cells: [1, 2, 4, 5, 6],
    types: ['全部', '待支付', '已支付', '支付失败', '已取消'],
    typeIndex: 0,
  });

  const onRefresh = () => {

  };
  const handleItemPress = () => {
    navigation.navigate('OrdersInfo');
  };

  return (<BaseLayout>
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
              ListHeaderComponent={<ListHeaderComponent list={data.types} tabIndex={data.typeIndex} />}
              renderItem={({ item }) => renderItem({ item, handleItemPress })}
              ListFooterComponent={<Text className="text-center pb-5">没有更多</Text>}
              keyExtractor={item => item}
              data={data.cells}
              stickyHeaderIndices={[0]}
              refreshControl={<RefreshControl refreshing={data.refreshing} onRefresh={onRefresh} />}
            />
          </View>
        </TabScreen>
        <TabScreen label="拼酒局">
          <View className="bg-transparent" />
        </TabScreen>
        <TabScreen
          label="预定门票"
        // optional props
        // badge={true} // only show indicator
        // badge="text"
        // badge={1}
        // onPressIn={() => {
        //   console.log('onPressIn explore');
        // }}
        // onPress={() => {
        //   console.log('onPress explore');
        // }}
        >
          <View style={{ backgroundColor: 'red', flex: 1 }} />
        </TabScreen>
        <TabScreen
          label="预定卡座"
        // optional props
        // badge={true} // only show indicator
        // badge="text"
        // badge={1}
        // onPressIn={() => {
        //   console.log('onPressIn explore');
        // }}
        // onPress={() => {
        //   console.log('onPress explore');
        // }}
        >
          <View />
        </TabScreen>
      </Tabs>
    </TabsProvider>
  </BaseLayout>);
};

export default Orders;


