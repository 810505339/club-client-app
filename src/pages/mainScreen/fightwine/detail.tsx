import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BaseLayout from '@components/baselayout';
import { ImageBackground, View, TextInput, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { Button, Divider, IconButton, Modal, Portal, Text } from 'react-native-paper';
import { RootStackParamList } from '@router/type';
import { useRequest } from 'ahooks';
import { joinWineParty, winePartyByDetail } from '@api/fightwine';
import { ScrollView } from 'react-native-gesture-handler';

import uuid from 'react-native-uuid';
import { useImmer } from 'use-immer';
import useUpdateFile, { IUpdateImage } from '@hooks/useUpdateFile';
import { ImageLibraryOptions } from 'react-native-image-picker';
import { useEffect } from 'react';

const femaleAvatarBg = require('@assets/imgs/fightwine/femaleAvatarBg.png');
const maleAvatarBg = require('@assets/imgs/fightwine/maleAvatarBg.png');
const playerTypeIcon = require('@assets/imgs/fightwine/playerTypeIcon.png');

export enum STATE {
  '未开始' = 'WAIT_START',
  '进行中' = 'IN_PROGRESS',
  '待入场' = 'WAIT_ENTER',
  '已入场' = 'ENTERED',
  '已取消' = 'CANCELED',
}



type InfoType = {
  title: string;
  value: string;
  key: string;

}
type IPeopleType = {
  id: string,
  gender: string,
  avatarUrl: string,
  name: string,
  playerButton?: string
  playerType?: string
}

type IAllData = {
  infoList: InfoType[];
  peopleList: IPeopleType[];
  status: STATE,
  res: any
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

/* 用户item */
const PeoPleItem = (props: IPeopleType) => {
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

/* 评价 */
const Appraise = (props) => {

  type IData = {
    visible: boolean,
    option: ImageLibraryOptions,
    selectImage?: IUpdateImage
  }
  const [data, setData] = useImmer<IData>({
    option: {
      mediaType: 'photo',
      // maxWidth: 600,// 设置选择照片的大小，设置小的话会相应的进行压缩
      // maxHeight: 600,
      quality: 0.8,
      selectionLimit: 4,
    },
    visible: false,
    selectImage: undefined,
  });

  const { handleChooseImage, imageList, deleteImage } = useUpdateFile(data.option);
  const window = useWindowDimensions();

  /* 点击上传酒局评价 */
  const onChooseImage = async () => {
    console.log(4 - imageList.length, 'imageList.length');


    await handleChooseImage();

  };
  /* 点击删除 */
  const onDeleteImage = (id: string) => {
    deleteImage(id);
  };
  /* 弹窗关闭 */
  const hideModal = () => {
    setData(draft => {
      draft.visible = false;
    });
  };
  const onSelectImage = (image: IUpdateImage) => {
    console.log(image);
    setData(draft => {
      draft.visible = true;
      draft.selectImage = image;
    });
  };

  /* computed */
  const contentContainerStyle = data.selectImage && {
    width: data.selectImage.width, height: data.selectImage.height,
    margin: (window.width - data.selectImage.width) / 2,
  };

  /* useEffect */

  useEffect(() => {

    setData(draft => {
      draft.option.selectionLimit = 4 - imageList.length;
    });
    /*  */

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageList.length]);





  return (<View className="m-5">
    <Text className="font-bold my-3">酒局评价</Text>
    <View className="bg-[#191919] border border-[#343434] rounded-xl h-24 justify-center items-center">
      <Text className="opacity-50 text-left" numberOfLines={2}>还没有人评价本次酒局， 来做第一个评价人吧～</Text>
    </View>
    <View className="flex-row items-center space-x-2 my-3">
      <Text className="font-bold">评价本次酒局</Text>
      <Text className=" text-[#EE2737] font-normal text-xs">*必填</Text>
    </View>
    <View className="bg-[#191919] rounded-xl border-[#343434] p-2">
      <TextInput placeholder="请输入酒局评价"
        editable
        maxLength={300}
        /* // ios fix for centering it at the top-left corner  */
        multiline
        numberOfLines={4}
        /* 仅限 Android  */
        textAlignVertical="top"
      />
    </View>

    <View className="flex-row  my-3 space-x-2">
      <Text className="font-bold">上传图片</Text>
      <Text className="text-[#EE2737] font-normal text-xs">*选填，最多上传4张图片</Text>
    </View>

    <View className="flex-row  space-x-2    items-center ">
      {imageList.map((image) => {
        return (<TouchableOpacity className="w-20 h-20 rounded relative " key={image.id} onPress={() => onSelectImage(image)}>
          <IconButton icon="backspace-reverse"
            className="absolute z-10 -right-4 -top-4 "
            iconColor={'#000'}
            size={14} onPress={() => onDeleteImage(image.id)} />
          <Image source={{ uri: image.previewUrl }} className="w-20 h-20 rounded" onProgress={() => onDeleteImage(image.id)} />
        </TouchableOpacity>);
      })}
      {imageList.length < 4 && <IconButton
        icon="plus-thick"
        iconColor={'#ffffff'}
        size={20}
        className=" w-20 h-20  bg-[#191919] border border-[#343434]"
        onPress={onChooseImage}
      />}

    </View>
    <Portal>
      <Modal visible={data.visible} onDismiss={hideModal} contentContainerStyle={contentContainerStyle}>
        <View >
          <Image source={{ uri: data.selectImage?.previewUrl }} width={data.selectImage?.width} height={data.selectImage?.height} resizeMode="contain" className="" />
        </View>
      </Modal>
    </Portal>
  </View>);
};


const FightwineDetail = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'FightwineDetail'>>();
  const { partyId } = route.params;

  const [allData, setAllData] = useImmer<IAllData>({
    infoList,
    peopleList: [],
    status: STATE.未开始, //
    res: {},
  });

  const { res, status } = allData;


  const { loading } = useRequest(() => winePartyByDetail(partyId), {
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
        darft.status = _data.status;
        darft.res = _data;
      });

    },
  });





  const NavBar = () => {

    /* 点击加入酒局按钮 */
    const join = async () => {
      const { data } = await joinWineParty(partyId);

      console.log(data);

    };

    if (allData.res.isJoined) {
      return (
        <View className="flex-row  items-center justify-around">
          <Button mode={'outlined'} className="bg-[#101010] w-[126]" style={{ borderColor: '#EE2737' }} textColor="#EE2737FF" >查看门票</Button>
          <Button mode={'elevated'} className="bg-[#EE2737FF]  w-[126]" textColor="#0C0C0CFF" >开始聊天</Button>
        </View>
      );


    } else {
      return <Button mode={'elevated'} className="bg-[#EE2737FF]" textColor="#0C0C0CFF" onPress={join}>加入酒局</Button>;
    }
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
      {/* 评价酒局 */}
      {status === STATE.已入场 && <Appraise />}

    </ScrollView>

    <View className="h-14  flex-col justify-center">
      <Divider />
      <View className="px-5 mt-2">
        {!loading && <NavBar />}
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
