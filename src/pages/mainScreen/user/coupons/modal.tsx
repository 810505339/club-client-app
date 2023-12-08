import BaseLayout from '@components/baselayout';
import { useRequest } from 'ahooks';
import { getCustomerCoupon } from '@api/coupon';
import { ImageBackground, RefreshControl, View } from 'react-native';
import { Text } from 'react-native-paper';
import Animated from 'react-native-reanimated';

const headerImg = require('@assets/imgs/base/coupons-header.png');


const Header = () => {
  return <View className="flex-row justify-center items-center">
    <View className="flex-1 border">
      <Text className="text-center">可用优惠券（4）</Text>
    </View>
    <View className="flex-1">
      <Text>不可用优惠券(9)</Text>
    </View>
  </View>;
};

const CouponsModal = () => {

    useRequest(getCustomerCoupon);
  return (<BaseLayout source={false}>
    <ImageBackground source={headerImg} resizeMode="stretch" className="absolute top-0 left-0 right-0 h-[181px]" />
    

  </BaseLayout>);

};

export default CouponsModal;
