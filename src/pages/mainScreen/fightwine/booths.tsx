import BaseLayout from '@components/baselayout';
import BoothsList from '../home/components/boothList';
import { useRequest } from 'ahooks';
import { getBoothByAreaId, getByBoothId } from '@api/booths';
import dayjs from 'dayjs';
import { Dimensions, Image, ImageBackground, ScrollView, View } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';
import NumberInput from '@components/number-input';
import useSelectBooths from '@hooks/useSelectBooths';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@router/type';
import Panel from '@components/panel';
import { fileStore } from '@store/getfileurl';
import { useTranslation } from 'react-i18next';
import PackageList from '../home/components/packageList';
const boy = require('@assets/imgs/fightwine/boys.png');
const girls = require('@assets/imgs/fightwine/girls.png');
const width = Dimensions.get('window').width;
const Booths = () => {

  const route = useRoute<RouteProp<RootStackParamList, 'Booths'>>();
  const { areaId, entranceDate, partyName, latestArrivalTime } = route.params;
  const { booths, itemPress } = useSelectBooths({ areaId, entranceDate });
  const file = fileStore.fileUrl;
  const { t } = useTranslation();
  const selectBooth: any = booths?.activeIndex != undefined ? booths.list[booths?.activeIndex] : {};

  const changePackage = (list: any[], index: number | undefined) => {
    if (index != undefined) {

    }
  };

  const list = [
    { label: t('confirmBooth.label1'), render: () => <BoothsList itemPress={itemPress} {...booths} /> },
    {
      label: '设置参与人数', render: () => (<View>
        <Text className="text-center mb-5 text-[10px]">您选择的卡座最多可容纳<Text className="text-[#E6A055FF] font-bold">6</Text>人</Text>
        <View className=" flex flex-row justify-between items-center">
          <View className="flex-col  items-center">
            <View className=" w-[100px]  h-[100px] mb-2.5">
              <Image source={boy} className="flex-auto" />
              <View className=" absolute z-10 left-0 right-0 top-0 bottom-0 justify-center items-center">
                <Text className="  text-2xl font-semibold m-auto">男</Text>
              </View>
            </View>
            <NumberInput />
          </View>
          <View className="flex-col  items-center">
            <View className=" w-[100px]  h-[100px] mb-2.5">
              <Image source={girls} className="flex-auto" />
              <View className=" absolute z-10 left-0 right-0 top-0 bottom-0 justify-center items-center">
                <Text className="  text-2xl font-semibold m-auto">女</Text>
              </View>
            </View>
            <NumberInput />
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

  ];





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
    {/* <View className="h-14  flex-col justify-center">
      <Divider />
      <View className="flex-row items-center justify-between  px-5 mt-2">
        <View>
          <Text style={{ fontSize: 10 }}>{t('confirmBooth.label5')} <Text className="text-[#E6A055FF]">{selectBooth?.maxAccommodate}</Text>{t('confirmBooth.label6')}</Text>
          <Text className="mt-2" style={{ fontSize: 10 }}>{t('confirmBooth.label7')}： <Text className="text-[#E6A055FF]">$ {selectBooth?.minConsumption}</Text></Text>
        </View>
        <Button mode={'elevated'} className="bg-[#EE2737FF]" textColor="#0C0C0CFF" onPress={toUrl} >{t('common.btn2')}</Button>
      </View>
    </View> */}
  </BaseLayout>);
};

export default Booths;
