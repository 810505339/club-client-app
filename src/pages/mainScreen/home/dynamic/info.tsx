import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import BaseLayout from '@components/baselayout';
import { View, Animated, RefreshControl, Image, ImageSourcePropType, ImageBackground, StyleSheet, TouchableOpacity, useWindowDimensions, ScrollView, NativeSyntheticEvent, NativeScrollEvent, Share } from 'react-native';
import { Button, Divider, IconButton, Text } from 'react-native-paper';
import { BlurView } from '@react-native-community/blur';
import React from 'react';
import RenderHtml from 'react-native-render-html';
import { useImmer } from 'use-immer';
import { useRequest } from 'ahooks';
import { getDynamicInfo } from '@api/dynamic';
import { RootStackParamList, ScreenNavigationProp } from '@router/type';

const hot = require('@assets/imgs/base/hot.png');
const cardHeader = require('@assets/imgs/base/cardHeader.png');

const DynamicInfo = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'DynamicInfo'>>();
  const navigation = useNavigation<ScreenNavigationProp<'DynamicInfo'>>();

  const { id, tagList, title, content, publishDate, pageView, source: img } = route.params;
  console.log(img);

  const { width } = useWindowDimensions();

  const onScroll = (nativeEvent: NativeSyntheticEvent<NativeScrollEvent>) => {
    // 获取当前滚动的位置
    const scrollPosition = nativeEvent.nativeEvent.contentOffset.y;
    navigation.setOptions({
      headerStyle: {
        backgroundColor: scrollPosition >= 64 ? '#0B0B0BFF' : 'transparent',
      },
    });
  };
  const { data } = useRequest(() => getDynamicInfo({ id: id }));
  console.log(data);

  const RenderList = ({ item }) => {
    const { activityTime, activityPlace, amount, useOfExpenses, activityPersonNumber, activitySignUpNumber, showOrNotPersonNumber } = item;
    const list = [
      { label: '活动时间', value: activityTime },
      { label: '活动地点', value: activityPlace },
      {
        label: '活动费用', value: amount, render: () => {
          return (<Text className="text-[#E6A055FF] ml-2">${amount}</Text>);
        },
      },
      { label: '费用用途', value: useOfExpenses },
      {
        label: '报名人数', value: showOrNotPersonNumber == '1', render: () => {
          return (<Text className="text-white font-semibold ml-2">
            <Text className="text-[#E6A055FF]">{activitySignUpNumber}</Text> / {activityPersonNumber}
          </Text>);
        },
      },
    ];
    return (<View className="bg-[#FFFFFF0D] p-2.5 rounded-xl mt-4">
      {list.map((item, i) => (item.value && <View key={i} className="flex-row items-center my-1">
        <Text className="text-white opacity-50">{item.label}:</Text>
        {item?.render?.() ?? <Text className="text-white font-semibold ml-2">{item.value}</Text>}

      </View>))}
    </View>);
  };


  const source = {
    html: content,
  };

  const onShare = async () => {
    console.log(1);

    try {
      const result = await Share.share({
        url: 'www.baidu.com',
        message: 'www.baidu.com',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (<BaseLayout showAppBar={false} source={false}>

    <ScrollView onScroll={onScroll}>
      <View className=" w-full h-[375]  relative">
        <ImageBackground source={img ?? cardHeader} className="absolute inset-0 top-0 left-0 right-0 bottom-0 -z-10" />
        <View className="absolute bottom-0 left-0 right-0  text-center px-5 py-2 overflow-hidden">
          <BlurView
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: 0 }}
            blurType="dark"
            blurAmount={1}
            reducedTransparencyFallbackColor="transparent"

          />
          <Text className="text-2xl font-semibold" numberOfLines={3}>{title}</Text>
        </View>
      </View>
      <View className="px-5">
        <View className="flex-row mt-2.5">
          {tagList.map((item, index) => (<View key={index} className="px-2.5 py-1 bg-[#E6A05580] rounded-2xl mr-2">
            <Text className="text-sm font-normal">{item}</Text>
          </View>))}
        </View>
        <View className="h-12 flex-row items-center justify-between mt-2.5 text-[#ffffff7f] text-xs">
          <Text className="text-[#ffffff7f] text-xs">{publishDate}</Text>
          <View className="flex-row">
            <Image source={hot} />
            <Text className=" text-[#ffffff7f] text-xs">{pageView}</Text>
          </View>
        </View>
        <Divider />

        {data?.data?.whetherSignUp == '1' && <RenderList item={data.data} />}

      </View>


      <View className="p-5">
        <RenderHtml
          contentWidth={width - 40}

          source={source}
        />
      </View>
    </ScrollView>

    {
      data?.data?.whetherSignUp == '1' && <View className="h-14 px-5">
        <Divider />
        <View className="flex-row items-center">
          <Button className=" bg-[#EE2737FF] flex-auto mr-2" mode="elevated" textColor="#0C0C0CFF" >立即报名</Button>
          <IconButton icon="upload" size={22} mode="contained" containerColor={'#EE2737FF'} iconColor={'#1A1311FF'} onPress={onShare} />
        </View>
      </View>
    }

    {
      data?.data?.whetherSignUp != '1' && <View className="absolute right-0 bottom-1/3 z-50">
        <IconButton icon="upload" size={22} mode="contained" containerColor={'#EE2737FF'} iconColor={'#1A1311FF'} onPress={onShare} />
      </View>
    }




  </BaseLayout>);
};



export default DynamicInfo;
