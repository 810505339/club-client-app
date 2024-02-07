import BaseLayout from '@components/baselayout';
import { RefreshControl, View, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { TabsProvider, Tabs, TabScreen } from 'react-native-paper-tabs';
import Animated from 'react-native-reanimated';
import { useImmer } from 'use-immer';
import ListHeaderComponent from './components/ListHeaderComponent';
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '@router/type';
import { useRequest } from 'ahooks';
import { getOrderDetail, getOrderList, tempPay } from '@api/order';
import CustomFlatList from '@components/custom-flatlist';
import { FC } from 'react';
import { fileStore } from '@store/getfileurl';
import { useTranslation } from 'react-i18next';


const Item: FC<any> = (props) => {
  const { name, orderStatus, handleItemPress, orderType, createTime, originalAmount, picture } = props;
  const img = fileStore.fileUrl + (picture?.fileName ?? '');
  return <TouchableOpacity onPress={() => handleItemPress(props)}>
    <View className="  bg-[#151313FF]  p-2.5   rounded-xl border  border-[#252525] m-2.5">
      <View className="flex-row items-center justify-between">
        <Text className="text-[#FFFFFF] text-sm font-semibold">{orderType}</Text>
        <Text className="text-xs font-normal text-[#ffffff7f]">{orderStatus}</Text>
      </View>

      <View className="mt-2.5 flex-row">
        <View className="w-24 h-14 bg-violet-500 rounded-md">
          <Image source={{ uri: img }} />
        </View>
        <View className="flex-auto ml-2.5 mr-5">
          <Text numberOfLines={2} className="text-[#ffffff] text-sm">{name}</Text>
          <Text className="text-[#ffffff7f] text-xs">{createTime}</Text>
        </View>
        <Text>${originalAmount}</Text>
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






const orderStatus = [
  { title: '全部', type: undefined },
  { title: '待支付', type: 'NOT_PAY' },
  { title: '已支付', type: 'PAY_SUCCESS' },
  { title: '支付失败', type: 'PAY_FAIL' },
  { title: '已取消', type: 'PAY_CANCEL' },
];
const a = orderStatus.map(o => o.title);
const Orders = () => {

  const navigation = useNavigation<ScreenNavigationProp<'OrdersInfo'>>();
  const { t } = useTranslation();

  const [data, setData] = useImmer({
    defaultIndex: 0,
    // orderStatus: ['全部', '待支付', '已支付', '支付失败', '已取消'],
    orderStatus: [

    ],
    typeIndex: 2,
    tabs: [
      {
        title: '全部',
        orderType: undefined,
      },
      {
        title: '拼酒局',
        orderType: 'WINE_PARTY',
      },
      {
        title: '预定门票',
        orderType: 'TICKET',
      },
      {
        title: '预定卡座',
        orderType: 'BOOTH',
      },

    ],
  });


  const handleItemPress = async (item: any) => {

    const { data } = await getOrderDetail(item.orderId);
    console.log(data);
    navigation.navigate('OrdersInfo', {
      orderContext: [
        { label: t('orders.label8'), value: data.productName },
        { label: t('orders.label9'), value: data.productNum },
        { label: t('orders.label2'), value: `${data.areaName}` },
        { label: t('orders.label6'), value: data.latestArrivalTime },

      ],
      // headerImg: card_2,
      submit: async () => {
        await tempPay(item.orderId);
      },
      storeId: item.storeId,
      amount: item.realAmount,
      

    });
  };
  const handleChangeIndex = (index: number) => {
    console.log(index);

    setData(draft => {
      draft.defaultIndex = index;
    });
  };

  return (<BaseLayout>
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

        {data.tabs.map((tab, index) => {
          const orderType = data.tabs[index].orderType;
          // <ListHeaderComponent list={a} tabIndex={data.typeIndex} />;
          return (<TabScreen label={tab.title} key={index} >
            <View>

              {index === data.defaultIndex && <CustomFlatList
                renderItem={(item) => <Item {...item} handleItemPress={handleItemPress} />}
                onFetchData={getOrderList}
                params={{ orderType: orderType }}
                keyExtractor={(item) => item.storeId}
              />}
            </View>
          </TabScreen>);
        })}
        {/* <TabScreen label="全部">
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
        </TabScreen> */}
      </Tabs>
    </TabsProvider>
  </BaseLayout>);
};

export default Orders;


