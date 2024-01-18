import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BaseLayout from '@components/baselayout';
import { View } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';
import { RootStackParamList } from '@router/type';
import { useRequest } from 'ahooks';
import { winePartyByDetail } from '@api/fightwine';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import { useImmer } from 'use-immer';


const infoList = [
  {
    title: '当前状态',
    value: '',
    key: 'status',
  },
  {
    title: '酒局名称',
    key: 'partyName',
    value: '',
  },
  {
    title: '酒局日期',
    value: '',
    key: 'entranceDate',
  },
  {
    title: '最晚到场时间',
    value: '',
    key: 'latestArrivalTime',
  },
  {
    title: '门店',
    value: '',
    key: 'storeName',
  },
  {
    title: '卡座位置',
    value: '',
    key: 'boothName',
  },
  {
    title: '选择套餐',
    value: '',
    key: 'drinksMealName',
  },
];

const FightwineDetail = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'FightwineDetail'>>();
  const { partyId } = route.params;

  const [allData, setAllData] = useImmer({
    infoList,
  });


  useRequest(() => winePartyByDetail(partyId), {
    onSuccess: (res) => {
      console.log(res.data);
      setAllData(darft => {
        darft.infoList = darft.infoList.map(info => {
          return {
            ...info,
            value: res.data[info.key],
          };
        });
      });

    },
  });








  return <BaseLayout>
    <ScrollView >
      <View className="mx-5">
        <Text className="font-bold my-3">基础信息</Text>
        <View className="bg-[#191919] rounded-2xl text-xs font-light">
          {/* 基础信息 */}
          {allData.infoList.map((info, index) => {
            return <View key={info.title} >
              <View className="flex flex-row items-center justify-between px-5 py-4">
                <Text>{info.title}</Text>
                <Text>{info.value}</Text>
              </View>
              {index === infoList.length - 1 ? null : <Divider />}
            </View>;
          })}
        </View>
      </View>

      <View className="m-5">
        {/* 参与者信息 */}
        <Text className="font-bold my-3">参与者信息</Text>
        <View className="bg-[#191919] rounded-2xl text-xs font-light">
          {/* 基础信息 */}
          {allData.infoList.map((info, index) => {
            return <View key={info.title} >
              <View className="flex flex-row items-center justify-between px-5 py-4">
                <View className="border-2 border-[#000000FF] w-6 h-6 rounded-full">
                  <Image source={{ uri: 'https://picsum.photos/200/300' }} className="w-6 h-6 rounded-full " />
                </View>

                <Text>{info.value}</Text>
              </View>
              {index === infoList.length - 1 ? null : <Divider />}
            </View>;
          })}
        </View>
        <View />
      </View>
    </ScrollView>

    <View className="h-14  flex-col justify-center">
      <Divider />
      <View className="px-5 mt-2">

        <Button mode={'elevated'} className="bg-[#EE2737FF]" textColor="#0C0C0CFF" >加入酒局</Button>
      </View>
    </View>

  </BaseLayout>;
};

export default FightwineDetail;
