import { useNavigation } from '@react-navigation/native';
import BaseLayout from '@components/baselayout';
import { View, Animated, RefreshControl, Image, ImageSourcePropType, ImageBackground, StyleSheet, TouchableOpacity, useWindowDimensions, ScrollView } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { BlurView } from '@react-native-community/blur';
import React from 'react';
import RenderHtml from 'react-native-render-html';
import { useImmer } from 'use-immer';
import { useRequest } from 'ahooks';
import { getDynamicInfo } from '@api/dynamic';
const IMAGE = require('@assets/imgs/demo/carousel-0.jpg');
const source = {
  html: `
<p style='text-align:center;'>
  Hello World!
</p>`,
};


const DynamicInfo = () => {
  const { width } = useWindowDimensions();
  const [data, setData] = useImmer({
    refreshing: false,
    list: ['公告', '#活动'],
  });

  useRequest(getDynamicInfo)

  return (<BaseLayout showAppBar={false}>
    <ScrollView refreshControl={<RefreshControl refreshing={data.refreshing} />} >
      <View className=" w-full h-[375]  relative">
        <ImageBackground source={IMAGE} className="absolute inset-0 top-0 left-0 right-0 bottom-0 -z-10" />

        <View className="absolute bottom-0 left-0 right-0  text-center px-5 py-2 overflow-hidden">
          <BlurView
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: 0 }}
            blurType="dark"
            blurAmount={1}
            reducedTransparencyFallbackColor="transparent"

          />
          <Text className="text-2xl font-semibold" numberOfLines={3}>Singapore's largest nightclub Marquee to open at Marina Bay Sands in April</Text>
        </View>
      </View>

      <View className="px-5">
        <View className="flex-row mt-2.5">
          {data.list.map((item, index) => (<View key={index} className="px-2.5 py-1 bg-[#E6A05580] rounded-2xl mr-2">
            <Text className="text-sm font-normal">{item}</Text>
          </View>))}
        </View>

        <View className="h-12 flex-row items-center justify-between mt-2.5 text-[#ffffff7f] text-xs">
          <Text className="text-[#ffffff7f] text-xs">2023/09/15</Text>
          <Text className=" text-[#ffffff7f] text-xs">1235465</Text>
        </View>

        <Divider />
      </View>


      <RenderHtml
        contentWidth={width}
        source={source}
      />
    </ScrollView>


  </BaseLayout>);
};



export default DynamicInfo;
