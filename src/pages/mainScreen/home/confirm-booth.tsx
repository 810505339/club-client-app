//发起酒局

import BaseLayout from '@components/baselayout';
import React, { ReactNode, useEffect } from 'react';
import { Dimensions, Image, ScrollView, View } from 'react-native';
import { Button, Icon, Text, TextInput } from 'react-native-paper';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Panel from '@components/panel';
import { useRequest } from 'ahooks';
import { getOpenBooth } from '@api/booths';
import BoothsList from './components/boothList';
import { RootStackParamList } from '@router/type';
import { fileStore } from '@store/getfileurl';
import PackageList from './components/packageList';
import useSelectBooths from '@hooks/useSelectBooths';


type IItem = {
  label: string,
  render: () => ReactNode,
}

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const ConfirmBooth = () => {

  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'ConfirmBooth'>>();
  const { areaId, entranceDate, peopleNum } = route.params;



  const { booths, itemPress } = useSelectBooths({ areaId, entranceDate, peopleNum });
  const file = fileStore.fileUrl;
  const boothId = booths?.activeIndex != undefined ? booths.list[booths?.activeIndex]?.boothId : '';

  const list: IItem[] = [
    {
      label: '选择卡座', render: () => {
        return <BoothsList itemPress={itemPress} {...booths} />;
      },
    },
    { label: '选择套餐', render: () => (<PackageList boothId={boothId} />) },
  ];


  console.log(boothId, 'boothId');





  return (<BaseLayout>
    {<Image resizeMode="cover" className="absolute top-0" style={{ width: width, height: 500 }} source={{ uri: file + '/' + booths?.picture?.fileName }} />}
    <ScrollView >
      <Panel className="mt-[200]">
        {list.map((item, i) => (
          <View className="mb-8" key={i}>
            <Text className="text-xs font-semibold mb-2.5 opacity-50">{item.label}</Text>
            {item.render()}
          </View>
        ))}
      </Panel>
    </ScrollView>
  </BaseLayout>);
};



export default ConfirmBooth;
