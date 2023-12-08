import BaseLayout from '@components/baselayout';
import { useRequest } from 'ahooks';
import { getCustomerCoupon } from '@api/coupon';
import { ImageBackground, RefreshControl, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { TabScreen, Tabs, TabsProvider } from 'react-native-paper-tabs';
import CustomFlatList from '@components/custom-flatlist';
import { useImmer } from 'use-immer';

const headerImg = require('@assets/imgs/base/coupons-header.png');


export const renderItem = (item, index) => {

  const { name, status } = item?.couponVO;
  //h-24
  return <View className="my-2.5 mx-5 flex-row rounded-xl overflow-hidden h-[1000] ">
    <View className="bg-[#EE2737] w-32 justify-center items-center ">
      <Text className="font-bold text-white text-2xl">$1000</Text>
      <Text>满$5000可用</Text>
    </View>
    <View className=" flex-auto bg-[#151313FF] p-2.5">
      <Text className="text-xs font-bold">{name}</Text>
      <View className="flex-row  flex-auto mt-2">
        <Text style={{ fontSize: 10 }} className="bg-[#EE273733] rounded-2xl px-2 mr-2 h-5 leading-5">{item.useState}</Text>

      </View>
      <Text style={{ fontSize: 10 }} className="font-light text-[#ffffff7f]">{item.takeEffectTime} - {item.disabledTime}</Text>
    </View>
  </View>;
};


const CouponsModal = () => {

  const [data, setData] = useImmer({
    active: 0,
  });

  const changeActive = (index: number) => {
    setData((draft) => { draft.active = index; });
  };






  return (<BaseLayout source={false}>
    <ImageBackground source={headerImg} resizeMode="stretch" className="absolute top-0 left-0 right-0 h-[181px]" />
    <View className="flex-row justify-center items-center h-20 ">
      <Button textColor="#ffffff" mode="text" labelStyle={{ fontSize: 14, fontWeight: 'bold' }} className={`${data.active == 1 && 'opacity-75'}`} onPress={() => changeActive(0)}   >可用优惠券（4）</Button>
      <Button textColor="#ffffff" mode="text" labelStyle={{ fontSize: 14, fontWeight: 'bold' }} className={`${data.active == 0 && 'opacity-75'}`} onPress={() => changeActive(1)} >可用优惠券（4）</Button>
    </View>



    <View className="mt-5 border">
      <CustomFlatList renderItem={renderItem} onFetchData={getCustomerCoupon} />
    </View>



  </BaseLayout>);

};

export default CouponsModal;
