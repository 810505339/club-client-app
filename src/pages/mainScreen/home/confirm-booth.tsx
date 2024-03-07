//发起酒局

import BaseLayout from '@components/baselayout';
import React, { ReactNode, useEffect } from 'react';
import { Dimensions, Image, ScrollView, View } from 'react-native';
import { Button, Divider, Icon, Text, TextInput } from 'react-native-paper';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Panel from '@components/panel';
import BoothsList from './components/boothList';
import { RootStackParamList } from '@router/type';
import { fileStore } from '@store/getfileurl';
import PackageList from './components/packageList';
import useSelectBooths from '@hooks/useSelectBooths';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useSelectShop from '@hooks/useSelectShop';
import { useImmer } from 'use-immer';
import { useTranslation } from 'react-i18next';
import { booking } from '@api/booths';
import Toast from 'react-native-toast-message';


type IItem = {
  label: string,
  render: () => ReactNode,
}


const width = Dimensions.get('window').width;
const card_2 = require('@assets/imgs/base/card_2.png');
const ConfirmBooth = () => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'ConfirmBooth'>>();
  const { t } = useTranslation();
  const { areaId, entranceDate, peopleNum, latestArrivalTime, areaName, storeId } = route.params;


  const { booths, itemPress } = useSelectBooths({ areaId, entranceDate, peopleNum });
  const { shopName } = useSelectShop();
  const [data, setData] = useImmer({
    selectPackage: {},
  });
  const file = fileStore.fileUrl;
  const selectBooth: any = booths?.activeIndex != undefined ? booths.list[booths?.activeIndex] : {};

  const changePackage = (list: any[], index: number | undefined) => {
    if (index != undefined) {
      setData((draft) => {
        draft.selectPackage = list[index];
      });
    }
  };

  const list: IItem[] = [
    {
      label: t('confirmBooth.label1'), render: () => {
        return <BoothsList itemPress={itemPress} {...booths} />;
      },
    },
    {
      label: t('confirmBooth.label2'), render: () => (<View>
        <PackageList boothId={selectBooth?.boothId} onChange={changePackage} />
        <Text className="text-[#E6A055FF] mt-5">*  {t('confirmBooth.label8')}</Text>
      </View>),
    },
  ];


  const toUrl = () => {

    if (!selectBooth.boothId) {
      Toast.show({
        text1: '请选择卡座',
      });
      return;
    }

    navigation.navigate('OrdersInfo', {
      orderContext: [
        { label: t('orders.label1'), value: shopName },
        { label: t('orders.label2'), value: `${areaName} - ${selectBooth?.name}` },
        { label: t('orders.label3'), value: data.selectPackage?.name },
        { label: t('orders.label4'), value: entranceDate },
        { label: t('orders.label5'), value: peopleNum },
        { label: t('orders.label6'), value: latestArrivalTime },
        { label: t('orders.label7'), value: `${selectBooth?.reserveAmount}` },
      ],
      headerImg: card_2,
      submit: async () => {
        await booking({
          storeId: storeId,
          areaId: areaId,
          entranceDate: entranceDate,
          boothId: selectBooth?.boothId,
          latestArrivalTime: latestArrivalTime,
          productName: '11',
          peopleNum: peopleNum,
        });
      },
      useScope: 'BOOTH', //使用范围
      boothId: selectBooth?.boothId,
      storeId: storeId,
      amount: selectBooth?.reserveAmount,
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
          <Text style={{ fontSize: 10 }}>{t('confirmBooth.label5')} <Text className="text-[#E6A055FF]">{selectBooth?.maxAccommodate}</Text>{t('confirmBooth.label6')}</Text>
          <Text className="mt-2" style={{ fontSize: 10 }}>{t('confirmBooth.label7')}： <Text className="text-[#E6A055FF]">$ {selectBooth?.reserveAmount}</Text></Text>
        </View>
        <Button mode={'elevated'} className="bg-[#EE2737FF]" textColor="#0C0C0CFF" onPress={toUrl} >{t('common.btn2')}</Button>
      </View>
    </View>
  </BaseLayout>);
};



export default ConfirmBooth;
