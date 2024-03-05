import { useNavigation } from '@react-navigation/native';
import { TabParamList } from '@router/type';
import Header from './components/header';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import BaseLayout from '@components/baselayout';
import SwiperView from './components/swiperView';
import HorizontalFlatList from './components/HorizontalFlatList';
import { getcarouselList } from '@api/common';
import { useImmer } from 'use-immer';
import { fileStore } from '@store/getfileurl';
import { LogLevelEnum, TencentImSDKPlugin } from 'react-native-tim-js';
// const HOMEBG = require('@assets/imgs/home/bg.png')

type IData = {
  id: string;
  swiperList: any[]
}

const init = async () => {
  const sdkAppID = 1600009072;
  await TencentImSDKPlugin.v2TIMManager.initSDK(
    sdkAppID,
    LogLevelEnum.V2TIM_LOG_DEBUG,
    undefined,
    true,
  );
};


const HomeScreen = () => {
  const navigation =
    useNavigation<BottomTabNavigationProp<TabParamList, 'Home'>>();

  const [data, setData] = useImmer<IData>({
    id: '',
    swiperList: [],
  });
  function onChange(value: any) {
    console.log(value, 'value');

    setData((draft: IData) => {
      draft.id = value.id;
    });
  }
  /* 轮播图 */
  async function getcarouselListApi() {
    const res = await getcarouselList({ storeId: data.id, limitNum: '5',type:'0' });
    setData((draft: IData) => {
      draft.swiperList = res ?? [];
    });

  }

  useEffect(() => {
    init();
  }, []);


  useEffect(() => {

    console.log(data.id,'data.id');

    if (data.id) {
      getcarouselListApi();

    }



  }, [data.id]);


  useEffect(() => {
    navigation.setOptions({
      header: props => <Header {...props} onChange={onChange} />,
    });
  }, [navigation]);
  return (
    <BaseLayout className="bg-[#0B0B0BE6]">
      <HorizontalFlatList className="mt-7" />
      {data.swiperList && <SwiperView swiperList={data?.swiperList} />}
    </BaseLayout>
  );
};


export default HomeScreen;


