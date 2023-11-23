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
// const HOMEBG = require('@assets/imgs/home/bg.png')

type IData = {
  id: string;
  swiperList: any[]
}

const HomeScreen = () => {
  const navigation =
    useNavigation<BottomTabNavigationProp<TabParamList, 'Home'>>();

  const [data, setData] = useImmer<IData>({
    id: '',
    swiperList: [],
  });
  function onChange(value: any) {
    setData((draft: IData) => {
      draft.id = value.id;
    });
  }

  async function getcarouselListApi() {
    const res = await getcarouselList({ storeId: data.id, type: '0', limitNum: '5' });
    setData((draft: IData) => {
      draft.swiperList = res;
    });

  }


  useEffect(() => {
    if (data.id) {
      getcarouselListApi();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.id]);


  useEffect(() => {
    navigation.setOptions({
      header: props => <Header {...props} onChange={onChange} />,
    });
  }, [navigation]);
  return (
    <BaseLayout className="bg-[#0B0B0BE6]">
      <HorizontalFlatList className="mt-7" />
      <SwiperView swiperList={data.swiperList}  />
    </BaseLayout>
  );
};


export default HomeScreen;


