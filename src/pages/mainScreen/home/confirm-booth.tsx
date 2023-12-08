//发起酒局

import BaseLayout from '@components/baselayout';
import React, { ReactNode, useEffect } from 'react';
import { Dimensions, Image, ScrollView, View } from 'react-native';
import { Button, Divider, Icon, Text, TextInput } from 'react-native-paper';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Panel from '@components/panel';
import { useRequest } from 'ahooks';
import { getOpenBooth } from '@api/booths';
import BoothsList from './components/boothList';
import { RootStackParamList } from '@router/type';
import { fileStore } from '@store/getfileurl';
import PackageList from './components/packageList';
import useSelectBooths from '@hooks/useSelectBooths';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useSelectShop from '@hooks/useSelectShop';
import { useImmer } from 'use-immer';


type IItem = {
  label: string,
  render: () => ReactNode,
}


const width = Dimensions.get('window').width;
const card_2 = require('@assets/imgs/base/card_2.png');
const ConfirmBooth = () => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'ConfirmBooth'>>();
  const { areaId, entranceDate, peopleNum,latestArrivalTime,areaName } = route.params;


  const { booths, itemPress } = useSelectBooths({ areaId, entranceDate, peopleNum });
  const {shopName} = useSelectShop();
  const [data,setData] = useImmer({
    selectPackage:{},
  });
  const file = fileStore.fileUrl;
  const selectBooth = booths?.activeIndex != undefined ? booths.list[booths?.activeIndex] : {};

  const changePackage = (list:any[],index:number|undefined)=>{
    if (index != undefined)
    {
      setData((draft)=>{
        draft.selectPackage = list[index];
      });
    }
  };

  const list: IItem[] = [
    {
      label: '选择卡座', render: () => {
        return <BoothsList itemPress={itemPress} {...booths} />;
      },
    },
    {
      label: '选择套餐', render: () => (<View>
        <PackageList boothId={selectBooth?.boothId} onChange={changePackage} />
        <Text className="text-[#E6A055FF] mt-5">*  卡座预订成功后，将会赠送您相同人数的门票</Text>
      </View>),
    },
  ];


  const toUrl = () => {


    navigation.navigate('OrdersInfo', {
      orderContext: [
        { label: '所选门店', value: shopName },
        { label: '卡座位置', value:`${areaName} - ${selectBooth?.name}`},
        { label: '已选套餐', value: data.selectPackage?.name },
        { label: '入场时间', value: entranceDate },
        { label: '到店人数', value: peopleNum },
        { label: '最晚到场时间', value: latestArrivalTime },
        { label: '应付金额', value:`${selectBooth?.minConsumption}` },
      ],
      headerImg:card_2 ,
    });
  };





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
    <View className="h-14  flex-col justify-center">
      <Divider />
      <View className="flex-row items-center justify-between  px-5 mt-2">
        <View>
          <Text style={{ fontSize: 10 }}>该卡座最大可容纳 <Text className="text-[#E6A055FF]">{selectBooth?.maxAccommodate}</Text>人</Text>
          <Text className="mt-2" style={{ fontSize: 10 }}>最低消费： <Text className="text-[#E6A055FF]">$ {selectBooth?.minConsumption}</Text></Text>
        </View>
        <Button mode={'elevated'} className="bg-[#EE2737FF]" textColor="#0C0C0CFF"  onPress={toUrl} >确 定</Button>
      </View>
    </View>
  </BaseLayout>);
};



export default ConfirmBooth;
