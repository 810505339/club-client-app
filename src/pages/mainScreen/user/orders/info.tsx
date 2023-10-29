import BaseLayout from '@components/baselayout';
import { Text, IconButton, Divider, Checkbox, Button } from 'react-native-paper';
import { ScrollView, View, Image } from 'react-native';




const boxList = [
  { label: '所选门店：', value: '0.2 Lounge & Club 83 Duxton Rd Shop' },
  { label: '商品名称：', value: 'Lounge 门票' },
  { label: '商品数量：', value: '10' },
  { label: '入场时间：', value: '2023/09/21 18:00' },
  { label: '订单编号：', value: '1235465132198454' },
  { label: '流水单号：', value: '1235465132198454' },
  { label: '应付金额：', value: '$ 1235.26' },
];

const payList = [
  { label: '优惠金额：', value: '-$ 253.26', color: '#FF2C2CFF' },
  { label: '实付金额：', value: '$ 985.00', color: '#E6A055FF' },
];

const Payment = [
  { label: '微信支付', icon: require('@assets/imgs/user/wechat.png') },
  { label: '支付宝支付', icon: require('@assets/imgs/user/alipay.png') },
  { label: 'PayNow', icon: require('@assets/imgs/user/paynow.png') },
  { label: '余额支付', icon: require('@assets/imgs/user/balance.png') },
];

const OrdersInfo = () => {
  return <BaseLayout className="bg-[#0B0B0BE6]">
    <ScrollView>
      <View className="mx-5">
        <View className="my-5 h-52 bg-violet-500 rounded-3xl" />
        <View>
          <Text className="text-xs text-white mb-5">订单内容</Text>
          {boxList.map((item, index) => (<View key={index} className="flex-row  items-center justify-between mb-2.5">
            <Text className="text-xs font-light text-[#ffffff7f]">{item.label}</Text>
            <Text numberOfLines={2} className="w-56 text-right">{item.value}</Text>
          </View>))}
        </View>


        <Divider />
        <View className=" flex-row  items-center justify-between py-3.5">
          <Text className="text-xs font-bold text-white">优惠券</Text>
          <View className="flex-row items-center justify-center">
            <Text >已选择<Text className="text-[#E6A055FF]"> 2 </Text> 张优惠券
            </Text>
            <IconButton icon="chevron-right" size={14} className="w-5 h-3" />
          </View>
        </View>
        <Divider />
        <View className="mt-3">
          {payList.map((item, index) => (<View key={index} className="flex-row  items-center justify-between py-1">
            <Text className="text-xs font-light text-[#ffffff7f]">{item.label}</Text>
            <Text className="w-56 text-right text-base font-bold " style={{ color: item.color }}>{item.value}</Text>
          </View>))}
        </View>
        <View className="mt-5">
          <Text className="text-xs font-bold text-white pb-2.5">请选择支付方式</Text>
          <Divider />
          {Payment.map((item, index) => (
            <View key={index} className="">
              <View className="py-4 flex-row items-center relative pl-8 justify-between">
                <Image source={item.icon} className="absolute top-auto bottom-auto " />
                <Text>{item.label}</Text>
                <Checkbox status={'unchecked'} />
              </View>
              <Divider />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
    <View className="static bottom-0 flex-row justify-around items-center mt-2 h-14">
      <Button mode={'elevated'} textColor="#ffffff">取消订单</Button>
      <Button mode={'elevated'} className="bg-[#EE2737FF]" textColor="#0C0C0CFF">继续支付</Button>
    </View>
  </BaseLayout>;
};


export default OrdersInfo;
