import BaseLayout from '@components/baselayout';
import { View, TouchableOpacity, Image } from 'react-native';
import { Button, Modal, Text } from 'react-native-paper';
import { TabsProvider, Tabs, TabScreen } from 'react-native-paper-tabs';

import { useImmer } from 'use-immer';

import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '@router/type';

import { cancelOrder, getOrderDetail, getOrderList, tempPay } from '@api/order';
import CustomFlatList from '@components/custom-flatlist';
import { FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { fileStore } from '@store/getfileurl';
import { useTranslation } from 'react-i18next';
import Dialog from '@components/dialog';
import ListHeaderComponent from './components/ListHeaderComponent';
import { useInterval } from 'ahooks';
/* 预定门票 */
const card1Image = require('assets/imgs/base/card_1.png');
/* 拼酒局 */
const card2Image = require('assets/imgs/base/card_2.png');

enum IOrderType {
  拼酒局 = 'WINE_PARTY',
  预定门票 = 'TICKET',
  预定卡座 = 'BOOTH',
  活动 = 'ACTIVITY',
}

enum IOrderStatus {
  未支付 = 'NOT_PAY',
  支付成功 = 's'
}

/* 订单图片 */
const getImage = (orderType: IOrderType, img: string) => {
  if (orderType === IOrderType.预定门票 || orderType === IOrderType.活动) {
    return {
      uri: img,
    };
  }
  if (orderType === IOrderType.拼酒局) {
    return card2Image;
  }
  if (orderType === IOrderType.预定卡座) {
    return card1Image;
  }
};
/* 根据不同的type获取OrderContext */
const getOrderContext = (orderType: IOrderType) => {
  //todo
};


const Item: FC<any> = memo((props) => {
  const { name, orderStatus, handleItemPress, orderType, createTime, originalAmount, picture, cancel, orderId, payEndTime } = props;
  const img = fileStore.fileUrl + '/' + (picture?.fileName ?? '');

  const PayEndTimeRender = (props: { payEndTime: string }) => {
    const { payEndTime } = props;
    const date1 = dayjs(payEndTime ?? new Date());
    const date2 = dayjs(new Date());
    const [seconds, setSeconds] = useState(date1.diff(date2, 'second'));
    const time = dayjs().startOf('day').second(seconds);
    const formattedTime = time.format('HH:mm:ss');
    useInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    return <Text className="text-xs text-[#ffffff] ">
      剩余
      <Text className="text-[#EE2737FF]">{formattedTime}</Text>
      可继续支付
    </Text>;
  };

  /*  */
  const RenderOrderStatus = () => {
    return <View className="py-2.5 mt-2.5 flex-row items-center justify-between">
      {payEndTime && <PayEndTimeRender payEndTime={payEndTime} />}
      <View className="flex-row gap-2">
        <Button mode="outlined" style={{
          borderColor: '#ee2737',
          height: 34,
        }}
          labelStyle={{ marginHorizontal: 10, fontSize: 12, marginVertical: 5 }}
          onPress={() => cancel(orderId)}
        >
          取消订单
        </Button>
        <Button mode="outlined" textColor="#ffffff" style={{
          height: 34,
        }} labelStyle={{ marginHorizontal: 5, fontSize: 12, marginVertical: 5 }}
          onPress={() => handleItemPress(props)}>
          继续支付
        </Button>
      </View>

    </View>;
  };




  return <TouchableOpacity onPress={() => handleItemPress(props)}>
    <View className="  bg-[#151313FF]  p-2.5   rounded-xl border  border-[#252525] m-2.5">
      <View className="flex-row items-center justify-between">
        <Text className="text-[#FFFFFF] text-sm font-semibold">{orderType}</Text>
        <Text className="text-xs font-normal text-[#ffffff7f]">{orderStatus}</Text>
      </View>

      <View className="mt-2.5 flex-row">
        <View className="w-24 h-14  rounded-md">
          <Image source={getImage(orderType, img)} className="w-24 h-14  rounded-md" />
        </View>
        <View className="flex-auto ml-2.5 mr-5">
          <Text numberOfLines={2} className="text-[#ffffff] text-sm">{name}</Text>
          <Text className="text-[#ffffff7f] text-xs">{createTime}</Text>
        </View>
        <Text>${originalAmount}</Text>
      </View>
      {orderStatus === IOrderStatus.未支付 && <RenderOrderStatus />}
    </View>
  </TouchableOpacity>;
});






const orderStatus = [
  { title: '全部', type: undefined },
  { title: '待支付', type: 'NOT_PAY' },
  { title: '已支付', type: 'PAY_SUCCESS' },
  { title: '支付失败', type: 'PAY_FAIL' },
  { title: '已取消', type: 'PAY_CANCEL' },
];
const orderStatusTitle = orderStatus.map(o => o.title);
const Orders = () => {

  const navigation = useNavigation<ScreenNavigationProp<'OrdersInfo'>>();
  const Dom = useRef();
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
        orderType: IOrderType.拼酒局,
      },
      {
        title: '预定门票',
        orderType: IOrderType.预定门票,
      },
      {
        title: '预定卡座',
        orderType: IOrderType.预定卡座,
      },
      {
        title: '活动',
        orderType: IOrderType.活动,
      },

    ],
    visible: false,
    selectOrderId: '0',

  });

  /* 点击取消取消订单 */
  const cancel = useCallback((orderId: string) => {
    setData(draft => {
      draft.visible = true;
      draft.selectOrderId = orderId;
    });
  }, [data.selectOrderId]);

  /* 点击取消订单确定 */
  const confirm = async () => {
    const res = await cancelOrder(data.selectOrderId);
    if (res.success) {

      onDismiss();
      Dom.current!.refreshData();
    }

  };
  /* 点击取消订单取消 */
  const onDismiss = () => {
    setData(draft => {
      draft.visible = false;
    });
  };


  const handleItemPress = async (item: any) => {

    const { data } = await getOrderDetail(item.orderId);
    const img = fileStore.fileUrl + '/' + (item.picture?.fileName ?? '');
    console.log(data);


    navigation.navigate('OrdersInfo', {
      orderContext: [
        { label: t('orders.label8'), value: data.productName },
        { label: t('orders.label9'), value: data.productNum },
        { label: t('orders.label2'), value: data.areaName },
        { label: t('orders.label6'), value: data.latestArrivalTime },

      ],
      headerImg: getImage(item.orderType, img),
      submit: async () => {
        await tempPay(item.orderId);
      },
      storeId: item.storeId,
      amount: item.realAmount,
      orderStatus: item.orderStatus,
      orderId: item.orderId,
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
          <ListHeaderComponent list={orderStatusTitle} tabIndex={data.typeIndex} />;
          return (<TabScreen label={tab.title} key={index} >
            <View>

              {index === data.defaultIndex && <CustomFlatList
                renderItem={(item) => <Item {...item} handleItemPress={handleItemPress} cancel={cancel} />}
                onFetchData={getOrderList}
                params={{ orderType: orderType }}
                keyExtractor={(item) => item.orderId}
                ref={Dom}
              />}
            </View>
          </TabScreen>);
        })}
      </Tabs>
    </TabsProvider>
    <Dialog visible={data.visible} confirm={confirm} onDismiss={onDismiss} >
      <Text>是否取消订单?取消以后无法恢复</Text>
    </Dialog>
  </BaseLayout>);
};



export default Orders;


