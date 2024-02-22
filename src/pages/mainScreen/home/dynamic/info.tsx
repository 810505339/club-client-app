import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import BaseLayout from '@components/baselayout';
import { View, Animated, RefreshControl, Image, ImageSourcePropType, ImageBackground, StyleSheet, TouchableOpacity, useWindowDimensions, ScrollView, NativeSyntheticEvent, NativeScrollEvent, Share } from 'react-native';
import { Button, Divider, IconButton, Modal, Portal, Text } from 'react-native-paper';
import { BlurView } from '@react-native-community/blur';
import React from 'react';
import RenderHtml from 'react-native-render-html';
import { useImmer } from 'use-immer';
import { useRequest } from 'ahooks';
import { getDynamicInfo, isAlreadySignUp, signUp } from '@api/dynamic';
import { RootStackParamList, ScreenNavigationProp } from '@router/type';
import { useTranslation } from 'react-i18next';

const hot = require('@assets/imgs/base/hot.png');
const cardHeader = require('@assets/imgs/base/cardHeader.png');
const modalHeader = require('@assets/imgs/modal/header.png');
const modalBg = require('@assets/imgs/modal/bg.png');

const DynamicInfo = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'DynamicInfo'>>();
  const navigation = useNavigation<ScreenNavigationProp<'DynamicInfo'>>();
  const { t } = useTranslation();
  const { id, tagList, title, content, publishDate, pageView, source: img } = route.params;


  const { width } = useWindowDimensions();

  const [info, setInfo] = useImmer({
    visible: false,
  });

  const onScroll = (nativeEvent: NativeSyntheticEvent<NativeScrollEvent>) => {
    // 获取当前滚动的位置
    const scrollPosition = nativeEvent.nativeEvent.contentOffset.y;
    navigation.setOptions({
      headerStyle: {
        backgroundColor: scrollPosition >= 64 ? '#0B0B0BFF' : 'transparent',
      },
    });
  };
  const { data: application } = useRequest(() => isAlreadySignUp(id));
  const { data } = useRequest(() => getDynamicInfo({ id: id }));
  console.log(application, 'application');

  const { runAsync } = useRequest(() => signUp({
    activityId: id,
  }), {
    debounceWait: 300,
    manual: true,
    debounceLeading: true,
    debounceTrailing: false,
  });
  /* 报名 */
  async function handleSignUp() {
    const { data } = await runAsync();
    console.log(data, 'data');

  }

  const isFull = data?.data?.activitySignUpNumber == data?.data?.activityPersonNumber;
  const isApplication = application?.data;/* 是否已经报名 */

  const RenderBtn = () => {
    if (isFull) {
      return <Button className=" bg-[#EE2737FF] flex-auto mr-2" mode="elevated" textColor="#0C0C0CFF" onPress={submit} disabled={isFull} > {isFull ? t('dynamic.info.btn2') : t('dynamic.info.btn1')}</Button>;
    }
    if (isApplication) {
      return <Button className=" bg-[#EE2737FF] flex-auto mr-2" mode="elevated" textColor="#0C0C0CFF" onPress={submit} disabled={isApplication} > {isApplication ? t('dynamic.info.btn2') : t('dynamic.info.btn1')}</Button>;
    }
    return <Button className=" bg-[#EE2737FF] flex-auto mr-2" mode="elevated" textColor="#0C0C0CFF" onPress={submit}> {t('dynamic.info.btn1')}</Button>;
  };


  const RenderList = ({ item }) => {
    const { activityTime, activityPlace, amount, useOfExpenses, activityPersonNumber, activitySignUpNumber, showOrNotPersonNumber } = item;
    const list = [
      { label: t('dynamic.info.tag1'), value: activityTime },
      { label: t('dynamic.info.tag2'), value: activityPlace },
      {
        label: t('dynamic.info.tag3'), value: amount, render: () => {
          return (<Text className="text-[#E6A055FF] ml-2">${amount}</Text>);
        },
      },
      { label: t('dynamic.info.tag4'), value: useOfExpenses },
      {
        label: t('dynamic.info.tag5'), value: showOrNotPersonNumber == '1', render: () => {
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

  const hideModal = () => {
    setInfo(darft => {
      darft.visible = false;
    });
  };

  const submit = () => {
    setInfo(darft => {
      darft.visible = true;
    });
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
          {tagList.map((item, index) => {
            const style = index == 0 ? 'bg-[#E6A05580]' : 'bg-[#ffffff19]';
            return (<View key={index} className={`px-2.5 py-1  rounded-2xl mr-2 ${style}`}>
              <Text className="text-sm font-normal">{item}</Text>
            </View>);
          })}
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
          <RenderBtn />
          <IconButton icon="upload" size={22} mode="contained" containerColor={'#EE2737FF'} iconColor={'#1A1311FF'} onPress={onShare} />
        </View>
      </View>
    }

    {
      data?.data?.whetherSignUp != '1' && <View className="absolute right-0 bottom-1/3 z-50">
        <IconButton icon="upload" size={22} mode="contained" containerColor={'#EE2737FF'} iconColor={'#1A1311FF'} onPress={onShare} />
      </View>
    }


    <Portal>
      <Modal visible={info.visible} onDismiss={hideModal}>
        <View className="w-[285] h-72 bg-[#1E1E1EFF] items-center m-auto rounded-2xl ">
          <ImageBackground source={modalBg} resizeMode="contain" className="absolute -left-1 -right-1 h-[160] top-0" />
          <Image source={modalHeader} resizeMode="contain" className="absolute w-[335] right-0 -top-20" />
          <View className="m-auto w-40">
            <Text className="text-base font-bold text-white  text-center mt-10" numberOfLines={2}>{t('dynamic.info.text1')}</Text>
          </View>
          <View className="flex-row justify-around items-center  w-full px-5 pb-5 ">
            <Button className="bg-transparent flex-1 mr-5" mode="outlined" labelStyle={{ fontWeight: 'bold' }} textColor="#ffffffbf" onPress={hideModal}>{t('common.btn1')}</Button>
            <Button className="bg-[#EE2737FF] flex-1" textColor="#000000FF" labelStyle={{ fontWeight: 'bold' }} mode="contained" onPress={async () => await handleSignUp()} >{t('common.btn2')}</Button>
          </View>
        </View>
      </Modal>
    </Portal>

  </BaseLayout>);
};



export default DynamicInfo;
