import BaseLayout from '@components/baselayout';
import { useRequest } from 'ahooks';
import { getCustomerCoupon } from '@api/coupon';
import { ImageBackground, RefreshControl, TouchableOpacity, View, useWindowDimensions, Animated } from 'react-native';
import { Button, RadioButton, Text } from 'react-native-paper';
import { SharedValue, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { TabScreen, Tabs, TabsProvider } from 'react-native-paper-tabs';
import CustomFlatList from '@components/custom-flatlist';
import { useImmer } from 'use-immer';
import { useTranslation } from 'react-i18next';
import { TabView, SceneMap, SceneRendererProps, NavigationState } from 'react-native-tab-view';
import { useEffect, useState } from 'react';

const headerImg = require('@assets/imgs/base/coupons-header.png');

const bgColor = {
  DISCOUNT_VOUCHERS: 'bg-[#DB671EFF]',
  CASH_VOUCHERS: 'bg-[#E6A055FF]',
  MAX_OUT_VOUCHERS: 'bg-[#EE2737FF]',

};


const FirstRoute = () => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState('');

  const onChecked = (id: string) => {
    setChecked(id);
  };
  return <View className="mt-5" >
    <CustomFlatList renderItem={(item, index) => Item(item, index, t, checked, onChecked)} onFetchData={getCustomerCoupon} />
  </View>;
};


const renderScene = SceneMap({
  first: FirstRoute,
  second: FirstRoute,
});




export const Item = (item, index, t, checked, onChecked) => {


  const { name, couponTypeDetailVO } = item.couponVO;

  const renderText = () => {


    const unitE = couponTypeDetailVO.type === 'DISCOUNT_VOUCHERS' ? '折' : '';
    const unitS = couponTypeDetailVO.type !== 'DISCOUNT_VOUCHERS' ? '$' : '';


    return couponTypeDetailVO.discount && <Text className="font-bold text-white text-2xl">{unitS} {couponTypeDetailVO.discount} {unitE}</Text>;
  };

  //h-24
  return <TouchableOpacity className="my-2.5 mx-5 flex-row rounded-xl overflow-hidden h-24 " onPress={() => onChecked(item.id)}>
    <View className={`${bgColor[couponTypeDetailVO?.type]} w-32 justify-center items-center`}>
      {renderText()}
      {/* <Text className="font-bold text-white text-2xl">${couponTypeDetailVO.discount}</Text> */}
      {couponTypeDetailVO?.doorSill && <Text>满${couponTypeDetailVO?.doorSill}可用</Text>}

    </View>
    <View className=" flex-auto bg-[#151313FF] p-2.5 flex-row">
      <View>
        <Text className="text-xs font-bold">{name}</Text>
        <View className="flex-row  flex-auto mt-2">
          <Text style={{ fontSize: 10 }} className="bg-[#8114A940] rounded-2xl px-2 mr-2 h-5 leading-5">{t(`coupons.${couponTypeDetailVO?.type}`)}</Text>
        </View>
        <Text style={{ fontSize: 10 }} className="font-light text-[#ffffff7f]">{item.takeEffectTime} - {item.disabledTime}</Text>
      </View>
      <View className="items-center ">
        <RadioButton status={checked === item.id ? 'checked' : 'unchecked'} onPress={() => onChecked(item.id)} value={item.id} />
      </View>
    </View>

  </TouchableOpacity>;
};


const CouponsModal = () => {
  const { t } = useTranslation();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: t('coupons.btn1') },
    { key: 'second', title: t('coupons.btn2') },
  ]);
  const _renderTabBar = (props: SceneRendererProps & {
    navigationState: NavigationState<{
      key: string;
      title: string;

    }>
  }) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);



    return (
      <View className="flex-row items-center justify-around h-20 ">

        {props.navigationState.routes.map((route, i) => {

          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });
          return (
            <TouchableOpacity
              className="flex-1"
              key={i}
              onPress={() => setIndex(i)}>
              <Animated.Text className={'text-center font-bold text-sm'} style={{ opacity }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };






  return (<BaseLayout source={false}>
    <ImageBackground source={headerImg} resizeMode="stretch" className="absolute  top-0 left-0 right-0 h-[181px]" />
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={_renderTabBar}
      initialLayout={{ width: layout.width }}
    />
  </BaseLayout>);
};

export default CouponsModal;
