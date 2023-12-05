import BaseLayout from '@components/baselayout';
import { Text, IconButton, Divider, Checkbox, Button } from 'react-native-paper';
import { ScrollView, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { RootStackParamList } from '@router/type';
import Panel from '@components/panel';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';


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
  const route = useRoute<RouteProp<RootStackParamList, 'OrdersInfo'>>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const toUrl = () => {
    navigation.navigate('CouponsModal');
  };


  const { orderContext = [], headerImg } = route?.params;
  return <BaseLayout className="bg-[#0B0B0BE6]">
    <ScrollView>
      <View >
        {headerImg && <View className=" absolute right-5 left-5 h-52 rounded-2xl overflow-hidden">
          <ImageBackground source={headerImg} resizeMode="cover" className=" w-full absolute left-0 right-0 bottom-0 top-0" />
        </View>}
        <Panel className="mt-44">
          <View>
            <Text className="text-xs text-white mb-5">订单内容</Text>
            {orderContext && orderContext?.map((item, index) => (<View key={index} className="flex-row  items-center justify-between mb-2.5">
              <Text className="text-xs font-light text-[#ffffff7f]">{item.label}:</Text>
              <Text numberOfLines={2} className="w-56 text-right">{item.value}</Text>
            </View>))}
          </View>
          <Divider />
          <TouchableOpacity className=" flex-row  items-center justify-between py-3.5" onPress={toUrl}>
            <Text className="text-xs font-bold text-white">优惠券</Text>
            <View className="flex-row items-center justify-center">
              <Text >已选择<Text className="text-[#E6A055FF]"> 2 </Text> 张优惠券
              </Text>
              <IconButton icon="chevron-right" size={14} className="w-5 h-3" />
            </View>
          </TouchableOpacity>
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
        </Panel>


      </View>
    </ScrollView>
    <View className="flex-row justify-around items-center mt-2 h-14">
      <Divider className="absolute top-0 left-0 right-0" />
      <Button mode={'elevated'} textColor="#ffffff">取消订单</Button>
      <Button mode={'elevated'} className="bg-[#EE2737FF]" textColor="#0C0C0CFF">继续支付</Button>
    </View>
  </BaseLayout>;
};


export default OrdersInfo;
