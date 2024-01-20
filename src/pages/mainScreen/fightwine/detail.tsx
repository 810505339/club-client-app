import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BaseLayout from '@components/baselayout';
import { ImageBackground, View } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';
import { RootStackParamList } from '@router/type';
import { useRequest } from 'ahooks';
import { joinWineParty, winePartyByDetail } from '@api/fightwine';
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from 'react-native';
import uuid from 'react-native-uuid';
import { useImmer } from 'use-immer';

const femaleAvatarBg = require('@assets/imgs/fightwine/femaleAvatarBg.png');
const maleAvatarBg = require('@assets/imgs/fightwine/maleAvatarBg.png');
const playerTypeIcon = require('@assets/imgs/fightwine/playerTypeIcon.png');



type InfoType = {
  title: string;
  value: string;
  key: string;

}
type PeopleType = {
  id: string,
  gender: string,
  avatarUrl: string,
  name: string,
  playerButton?: string
  playerType?: string
}

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


const PeoPleItem = (props: PeopleType) => {
  const { avatarUrl, gender, name, playerButton, playerType } = props;

  const avatarBg = gender == '2' ? femaleAvatarBg : maleAvatarBg;
  const playerButtonRender = playerButton && (<Text>{playerButton}</Text>);
  const playerTypeRender = playerType === 'PROMOTER' && (<Image source={playerTypeIcon} />);

  return <View>
    <View className="flex flex-row items-center justify-between h-12 relative ">
      <ImageBackground source={avatarBg} className="w-full h-full absolute -z-10" />
      <View className="px-5 py-3 flex flex-row items-center">
        <View className="border-2 border-[#000000FF] w-6 h-6 rounded-full overflow-hidden">
          {/* <Image source={{ uri: avatarUrl }} className="w-6 h-6 " /> */}
        </View>
        <Text className="ml-2 flex-auto">{name}</Text>
        {playerButtonRender}
        {playerTypeRender}
      </View>
    </View>
    <Divider />
  </View>;
};


const FightwineDetail = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'FightwineDetail'>>();
  const { partyId } = route.params;

  const [allData, setAllData] = useImmer<{
    infoList: InfoType[];
    peopleList: PeopleType[]
  }>({
    infoList,
    peopleList: [],
  });


  useRequest(() => winePartyByDetail(partyId), {
    onSuccess: (res) => {
      const _data = res.data;
      /* 需要填充的数量 */
      const _female = _data.femaleNum - _data.joinedFemaleList.length;
      const _male = _data.maleNum - _data.joinedMaleList.length;

      /* 需要填充的男女列表 */
      const needFillfemale = createPeople(_female, '2');
      const needFillmale = createPeople(_male, '1');

      setAllData(darft => {
        darft.peopleList = [..._data.joinedMaleList, ...needFillmale, ..._data.joinedFemaleList, ...needFillfemale];
        darft.infoList = darft.infoList.map(info => {
          return {
            ...info,
            value: _data[info.key],
          };
        });
      });

    },
  });


  const join = async () => {
    const { data } = await joinWineParty(partyId);

    console.log(data);

  };








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
                <Text className="opacity-50">{info.value}</Text>
              </View>
              {index === infoList.length - 1 ? null : <Divider />}
            </View>;
          })}
        </View>
      </View>

      <View className="m-5">
        {/* 参与者信息 */}
        <Text className="font-bold my-3">参与者信息</Text>
        <View className="bg-[#191919] rounded-2xl text-xs font-light overflow-hidden">
          {/* 基础信息 */}
          {allData.peopleList.map((people, index) => (<PeoPleItem {...people} key={people.id} />))}
        </View>
        <View />
      </View>
    </ScrollView>

    <View className="h-14  flex-col justify-center">
      <Divider />
      <View className="px-5 mt-2">
        <Button mode={'elevated'} className="bg-[#EE2737FF]" textColor="#0C0C0CFF" onPress={join}>加入酒局</Button>
      </View>
    </View>

  </BaseLayout>;
};

function createPeople(length: number, gender: string) {
  console.log(length);

  return Array.from({ length: length }, () => {
    return {
      id: uuid.v4(),
      name: '待加入',
      gender: gender,
      avatarUrl: '',
    };
  });
}

export default FightwineDetail;
