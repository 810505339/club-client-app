import BaseLayout from '@components/baselayout';
import BoothsList from '../home/components/boothList';
import { Dimensions, Image, ImageBackground, ScrollView, View } from 'react-native';
import { Button, Divider, Modal, Portal, Switch, Text } from 'react-native-paper';
import NumberInput from '@components/number-input';
import useSelectBooths from '@hooks/useSelectBooths';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@router/type';
import Panel from '@components/panel';
import { fileStore } from '@store/getfileurl';
import { useTranslation } from 'react-i18next';
import PackageList from '../home/components/packageList';
import { useImmer } from 'use-immer';
import Toast from 'react-native-toast-message';
import { useEffect } from 'react';
import { checkBooth, calPayAmount, create } from '@api/fightwine';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useSelectShop from '@hooks/useSelectShop';
import { useRequest } from 'ahooks';
const boy = require('@assets/imgs/fightwine/boys.png');
const girls = require('@assets/imgs/fightwine/girls.png');
const width = Dimensions.get('window').width;
const headerIcon = require('@assets/imgs/base/modalHeader.png');
const orderHeader = require('@assets/imgs/base/fightwineBg.png');
const Booths = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Booths'>>();
  const { areaId, entranceDate, partyName, latestArrivalTime, winePartyMode, storeId, areaName, modeName } = route.params;
  const { booths, itemPress } = useSelectBooths({ areaId, entranceDate });
  const file = fileStore.fileUrl;
  const { t } = useTranslation();
  const [data, setData] = useImmer({
    maleNum: 0,
    femaleNum: 0,
    autoLock: false,
    visible: false,
    selectPackage: {},

  });
  const selectBooth: any = booths?.activeIndex != undefined ? booths.list[booths?.activeIndex] : {};
  const { shopName } = useSelectShop();
  const { loading, runAsync } = useRequest((params) => calPayAmount(params), {
    manual: true,
  });



  const changePackage = (list: any[], index: number | undefined) => {
    if (index != undefined) {
      setData((draft) => {
        draft.selectPackage = list[index];
      });
    }
  };

  const onPresonChange = (num: number, key: string) => {
    setData(draft => {
      draft[key] = num;
    });
  };

  const onVerify = (num: number, needKey: string) => {
    if (!selectBooth?.maxAccommodate) {
      Toast.show({ text1: '请选择卡座' });
      return true;
    }
    if (num + data[needKey] > selectBooth?.maxAccommodate) {
      return true;
    }

    return false;

  };

  const onSure = async () => {
    const res = await checkBooth({
      entranceDate,
      boothId: selectBooth?.boothId,
    });
    setData(draft => {
      draft.visible = res.data.inParty;
    });
    if (!res.data.inParty) {
      onNext();
    }

  };
  const onNext = async () => {
    // await create({
    //   storeId: storeId,
    //   areaId: areaId,
    //   partyMode: winePartyMode,
    //   partyType: 'BOOK',
    //   partyName: partyName,
    //   entranceDate: entranceDate,
    //   latestArrivalTime: latestArrivalTime,
    //   boothId: selectBooth?.boothId,
    //   boothName: selectBooth?.name,
    //   drinksMealId: data.selectPackage?.id,
    //   ...data,
    // });
    if ((!data.maleNum) && (!data.femaleNum)) {
      Toast.show({ text1: '请输入人数' });
      return;
    }

    const res = await runAsync({
      boothId: selectBooth?.boothId,
      partyMode: winePartyMode,
      maleNum: data.maleNum,
      femaleNum: data.femaleNum,
      playerType: 'PROMOTER',
    });


    if (!res.code) {
      navigation.navigate('OrdersInfo', {
        orderContext: [
          { label: t('orders.label1'), value: shopName },
          { label: t('orders.label2'), value: `${areaName} - ${selectBooth?.name}` },
          { label: t('orders.label3'), value: data.selectPackage?.name },
          { label: t('orders.label4'), value: entranceDate },
          { label: t('orders.label6'), value: latestArrivalTime },
          { label: t('orders.label10'), value: partyName },
          { label: t('orders.label14'), value: modeName },
          { label: t('orders.label11'), value: latestArrivalTime },
          { label: t('orders.label12'), value: data.maleNum },
          { label: t('orders.label13'), value: data.femaleNum },
          { label: t('orders.label7'), value: res.data.payAmount },

        ],
        headerImg: orderHeader,
        submit: async () => {
          const res = await create({
            storeId: storeId,
            areaId: areaId,
            partyMode: winePartyMode,
            partyType: 'BOOK',
            partyName: partyName,
            entranceDate: entranceDate,
            latestArrivalTime: latestArrivalTime,
            boothId: selectBooth?.boothId,
            boothName: selectBooth?.name,
            drinksMealId: data.selectPackage?.id,
            ...data,
          });
          return res;
        },
        useScope: 'WINE_PARTY', //使用范围
        winePartyMode: winePartyMode,
        storeId: storeId,
        amount: `${res.data.payAmount}`,
      });
    }

  };

  const onDismiss = () => {
    setData(draft => {
      draft.visible = !draft.visible;
    });
  };

  const list = [
    { label: t('confirmBooth.label1'), render: () => <BoothsList itemPress={itemPress} {...booths} /> },
    {
      label: '设置参与人数', render: () => (<View>
        {selectBooth?.maxAccommodate && <Text className="text-center mb-5 text-[10px]">您选择的卡座最多可容纳<Text className="text-[#E6A055FF] font-bold">{selectBooth?.maxAccommodate}</Text>人</Text>}

        <View className=" flex flex-row justify-between items-center">
          <View className="flex-col  items-center">
            <View className=" w-[100px]  h-[100px] mb-2.5">
              <Image source={boy} className="flex-auto" />
              <View className="absolute z-10 left-0 right-0 top-0 bottom-0 justify-center items-center">
                <Text className="text-2xl font-semibold m-auto">男</Text>
              </View>
            </View>
            <NumberInput num={data.maleNum} onChange={(num) => onPresonChange(num, 'maleNum')} onVerify={(num) => onVerify(num, 'femaleNum')} />
          </View>
          <View className="flex-col  items-center">
            <View className=" w-[100px]  h-[100px] mb-2.5">
              <Image source={girls} className="flex-auto" />
              <View className=" absolute z-10 left-0 right-0 top-0 bottom-0 justify-center items-center">
                <Text className="  text-2xl font-semibold m-auto">女</Text>
              </View>
            </View>
            <NumberInput num={data.femaleNum} onChange={(num) => onPresonChange(num, 'femaleNum')} onVerify={(num) => onVerify(num, 'maleNum')} />
          </View>
        </View>
      </View>),
    },
    {
      label: t('confirmBooth.label2'), render: () => (<View>
        <PackageList boothId={selectBooth?.boothId} onChange={changePackage} />
        <Text className="text-[#E6A055FF] mt-5">*  {t('confirmBooth.label8')}</Text>
      </View>),
    },
    {
      label: '自动锁定', render: () => {
        return (<View className="flex-col">
          <Divider />
          <View className="flex-row items-center justify-between py-4">
            <Text>满足锁定要求后自动锁定酒局</Text>
            <Switch value={data.autoLock} onValueChange={() => setData(draft => { draft.autoLock = !draft.autoLock; })} />
          </View>
          <Divider />
          <Text className="text-[#E6A055FF] mt-2" style={{ fontSize: 10 }}>* 锁定酒局后，将会确认卡座、发放门票、开启聊天</Text>
        </View>);
      },
    },

  ];


  useEffect(() => {
    //清空数据
  }, [booths?.activeIndex]);





  return (<BaseLayout loading={loading}>
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
        <Button mode={'elevated'} className="bg-[#EE2737FF]" textColor="#0C0C0CFF" onPress={onSure} >{t('common.btn2')}</Button>
      </View>
    </View>
    <Portal>
      <Modal visible={data.visible} onDismiss={onDismiss}>
        <View className="w-[285]  bg-[#222222FF] items-center m-auto rounded-2xl relative ">
          <Image source={headerIcon} resizeMode="contain" className="w-[285] h-[60] absolute -top-2 left-0 right-0" />
          <View>
            <Text className="text-lg font-bold text-white  text-center pt-2">酒局提示</Text>
          </View>
          <View className="m-auto py-8 px-5">
            <Text className="text-xs font-bold text-white  text-center " numberOfLines={2}>此卡座有人正在拼酒局，先锁定卡座者将可以使用此卡座。是否继续？</Text>
          </View>
          <View className="flex-row justify-around items-center  w-full px-5 pb-5 ">
            <Button className="bg-transparent flex-1 mr-5" mode="outlined" labelStyle={{ fontWeight: 'bold' }} textColor="#ffffffbf" onPress={onDismiss} >{t('common.btn5')}</Button>
            <Button className="bg-[#EE2737FF] flex-1" textColor="#000000FF" labelStyle={{ fontWeight: 'bold' }} mode="contained" onPress={onNext} >{t('common.btn4')}</Button>
          </View>
        </View>
      </Modal>
    </Portal>

  </BaseLayout>);
};

export default Booths;
