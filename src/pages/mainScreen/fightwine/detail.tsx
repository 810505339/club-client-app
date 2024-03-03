import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BaseLayout from '@components/baselayout';
import { ImageBackground, View, TextInput, TouchableOpacity, Image, useWindowDimensions, ActivityIndicator } from 'react-native';
import { Button, Divider, IconButton, Modal, Portal, Text } from 'react-native-paper';
import { RootStackParamList } from '@router/type';
import { useRequest } from 'ahooks';
import { joinWineParty, winePartyByDetail, cancelWineParty, kickOut, joinApproval, quitWineParty, checkNeedLockConfirm, lockConfirm } from '@api/fightwine';
import { ScrollView } from 'react-native-gesture-handler';

import uuid from 'react-native-uuid';
import { useImmer } from 'use-immer';
import useUpdateFile, { IUpdateImage } from '@hooks/useUpdateFile';
import { ImageLibraryOptions } from 'react-native-image-picker';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TencentImSDKPlugin } from 'react-native-tim-js';
import Dialog from '@components/dialog';
import Toast from 'react-native-toast-message';
import useUserInfo from '@hooks/useUserInfo';

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
  onClickPlayButton: (index: number) => void,
  index: number
}

enum IDialogState {
  踢人 = 1,
  取消 = 2,
  审核 = 3,
  退出 = 4,
  提前锁定 = 5
}

type IAllData = {
  infoList: InfoType[];
  peopleList: IPeopleType[];
  status: STATE,
  res: any,
  dialog: {
    context: string,
    visible: boolean,
    state: IDialogState,
    cancelText: string,
    confirmText: string
  }
  player?: IPeopleType,
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
  const { avatarUrl, gender, name, playerButton, playerType, index, onClickPlayButton } = props;

  const avatarBg = gender == '2' ? femaleAvatarBg : maleAvatarBg;
  /* 审核提出按钮 */
  const playerButtonRender = playerButton && (<TouchableOpacity onPress={() => onClickPlayButton(index)} className="border border-white rounded-xl ">
    <Text className="text-xs py-1 px-2 text-center">{playerButton}</Text>
  </TouchableOpacity>);


  const playerTypeRender = playerType === 'PROMOTER' && (<Image source={playerTypeIcon} />);


  return <View>
    <View className="flex flex-row items-center justify-between h-12 relative ">
      <ImageBackground source={avatarBg} className="w-full h-full absolute -z-10" />
      <View className="px-5 py-3 flex flex-row items-center">
        <View className="border-2 border-[#000000FF] w-6 h-6 rounded-full overflow-hidden">
          {avatarUrl && <Image source={{ uri: avatarUrl }} className="w-6 h-6 " />}

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
    selectImage?: IUpdateImage,
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
    {/* 点击图片查看弹窗 */}
    {data.visible && <Portal>
      <Modal visible={data.visible} onDismiss={hideModal} contentContainerStyle={contentContainerStyle}>
        <View >
          <Image source={{ uri: data.selectImage?.previewUrl }} width={data.selectImage?.width} height={data.selectImage?.height} resizeMode="contain" className="" />
        </View>
      </Modal>
    </Portal>}



  </View>);
};


const FightwineDetail = () => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'FightwineDetail'>>();
  const { partyId } = route.params;
  const { t } = useTranslation();

  const [allData, setAllData] = useImmer<IAllData>({
    infoList,
    peopleList: [],
    status: STATE.未开始, //
    res: {},
    dialog: {
      context: '',
      visible: false,
      state: IDialogState.踢人,
      cancelText: '取消',
      confirmText: '确定',
    },
  });
  const { userInfoStorage } = useUserInfo();

  const { userId, userSig, userInfo } = userInfoStorage;


  const { res, status, dialog } = allData;



  const { loading, run } = useRequest(() => winePartyByDetail(partyId), {
    onSuccess: async (res) => {
      const _data = res.data;
      if (_data.isJoined && _data.playerType != 'FREE_PARTICIPANT' && _data.status == 'IN_PROGRESS') {
        const check = await checkNeedLockConfirm(partyId);
        console.log(check, 'check');

        setAllData((draft) => {
          /* 判断是否需要弹出提前锁定的窗口 */
          if (check.data) {
            draft.dialog.visible = true;
            draft.dialog.state = IDialogState.提前锁定;
            draft.dialog.context = '是否提前锁定?';
          }
        });
      }

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


  /* 点击确认按钮弹窗 */
  async function confirm() {
    if (dialog.state === IDialogState.提前锁定) {
      //提前锁定
      const { data } = await lockConfirm(partyId);
      console.log(data, '提前锁定');
      if (data) {
        Toast.show({
          text1: '锁定成功',
        });
      }
    }


    {
      if (dialog.state === IDialogState.取消) {
        /* 取消 */
        const { data } = await cancelWineParty(partyId);
        if (data) {
          //todo 刷新上一个页面
          navigation.goBack();
        }
      }
    }

    if (dialog.state === IDialogState.退出) {
      /* 取消 */
      const { data } = await quitWineParty(partyId);
      if (data.data) {
        //todo 刷新上一个页面
        navigation.goBack();
        return;
      }
    }

    if (dialog.state === IDialogState.踢人) {
      await kickOut({
        playerId: allData.player?.id,
        partyId,
      });
    }
    if (dialog.state === IDialogState.审核) {
      await joinApproval({
        playerId: allData.player?.id,
        partyId,
        pass: true,
      });
    }
    setAllData((draft) => {
      draft.dialog.visible = false;
    });
    /* 踢人跟审核都需要刷新详情 */
    run();
  }
  /* 点击全局取消按钮弹窗 */
  async function onDismiss() {
    if (dialog.state === IDialogState.审核) {
      await joinApproval({
        playerId: allData.player?.id,
        partyId,
        pass: false,
      });

      run();
    }
    setAllData((draft) => {
      draft.dialog.visible = false;
    });
  }

  const NavBar = () => {

    /* 点击加入酒局按钮 */
    const join = async () => {
      /* 请求加入酒局 */

      if (res.isNeedPay) {
        /* 需要支付跳转订单 */
        navigation.navigate('OrdersInfo', {
          orderContext: [
            { label: t('orders.label1'), value: res.storeName },
            { label: t('orders.label2'), value: `${res.areaName} - ${res.boothName}` },
            { label: t('orders.label3'), value: res.drinksMealName },
            { label: t('orders.label4'), value: res.entranceDate },
            { label: t('orders.label6'), value: res.latestArrivalTime },
            { label: t('orders.label10'), value: res.partyName },
            { label: t('orders.label14'), value: res.modeName },
            // { label: t('orders.label11'), value: latestArrivalTime },
            { label: t('orders.label12'), value: res.maleNum },
            { label: t('orders.label13'), value: res.femaleNum },
            { label: t('orders.label7'), value: res.needPayAmount },
          ],
          amount: res.needPayAmount,
          winePartyMode: res.partyMode,/* 酒局模式 */
          useScope: 'WINE_PARTY', //使用范围
          // storeId: storeId,
          submit: async (couponId: string | undefined) => {
            /* 加入酒局成功以后 */
            const data = await joinSuccess(partyId, couponId);
            data.orderId;
          },
        });


      } else {
        const data = await joinSuccess(partyId);
        if (data) {
          Toast.show({
            text1: '加入成功',
          });
          /* 刷新酒局 */
          run();
        }


      }



    };
    /* 跳转im开始聊天 */
    const nextIm = async () => {



      const loginRes = await TencentImSDKPlugin.v2TIMManager.login(userId, userSig);
      console.log(userId, userSig, 'loginRes');



      if (loginRes.code == 0) {
        navigation.navigate('Chat', {
          conversation: {
            // userID: userId,
            conversationID: `c2c_${res.id}`,
            showName: res.partyName,
            groupID: res.id,
            type: 2,
            initialMessageList: [],
            unMount: (message: V2TimMessage[]) => { },
          },
        });
      }
    };

    /* 加入酒局成功 */
    async function joinSuccess(partyId: string, couponId?: string | undefined) {
      const { data } = await joinWineParty({
        partyId,
        couponId,
      });

      console.log(data);

      return data;



    }
    /* 取消酒局 */
    const cancelWine = async () => {
      setAllData(draft => {
        draft.dialog.context = '确认取消酒局吗?';
        draft.dialog.visible = true;
        draft.dialog.state = IDialogState.取消;
      });
    };
    /* 退出酒局 */
    const quitWine = () => {
      setAllData(draft => {
        draft.dialog.context = '确认退出酒局吗?';
        draft.dialog.visible = true;
        draft.dialog.state = IDialogState.退出;
      });
    };

    if (res.isJoined && res.status === STATE.进行中) {
      return <Button mode={'elevated'} className="bg-[#EE2737FF]" textColor="#0C0C0CFF" onPress={quitWine}>退出酒局</Button>;
    }

    if (res.isJoined && res.playerType === 'PROMOTER' && res.partyMode === 'PAY_SOLO' && res.status === STATE.进行中) {
      return <Button mode={'elevated'} className="bg-[#EE2737FF]" textColor="#0C0C0CFF" onPress={cancelWine}>取消酒局</Button>;
    }







    {
      if (res.isJoined && res.status === STATE.待入场) {
        return (
          <View className="flex-row  items-center justify-around">
            <Button mode={'outlined'} className="bg-[#101010] w-[126]" style={{ borderColor: '#EE2737' }} textColor="#EE2737FF" >查看门票</Button>
            <Button mode={'elevated'} className="bg-[#EE2737FF]  w-[126]" textColor="#0C0C0CFF" onPress={nextIm} >开始聊天</Button>
          </View>
        );


      } else if (res.status === STATE.进行中) {
        return <Button mode={'elevated'} className="bg-[#EE2737FF]" textColor="#0C0C0CFF" onPress={join}>加入酒局</Button>;
      } else {
        return null;
      }
    }
  };


  /* 点击提出或者审核按钮 */
  async function onClickPlayButton(index: number) {
    /* 寻找点击的player */
    const _player = allData.peopleList[index];
    const KICK_OUT = _player.playerButton === 'KICK_OUT';
    console.log(_player);
    if (_player.playerButton) {
      setAllData((draft) => {
        draft.dialog.visible = true;
        draft.dialog.state = KICK_OUT ? IDialogState.踢人 : IDialogState.审核;
        draft.dialog.context = KICK_OUT ? '确认踢出该玩家吗？' : '确认让该玩家加入酒局吗？';
        draft.dialog.confirmText = KICK_OUT ? '踢出' : '同意';
        draft.dialog.cancelText = KICK_OUT ? '取消' : '拒绝';
        draft.player = _player;
      });

    }
  }

  const Loading = () => {
    return <View className="flex">
      <ActivityIndicator color="#EE2737FF" />
    </View>;
  };

  /* 如果没有验证人脸 */
  if (!userInfo?.checkFace) {
    return <BaseLayout >
      <Text>请认证人脸</Text>
    </BaseLayout>;
  }

  return <BaseLayout>
    {loading ? <Loading /> : <>
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
            {allData.peopleList.map((people, index) => (<PeoPleItem {...people} index={index} key={people.id} onClickPlayButton={onClickPlayButton} />))}
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
      {<Dialog visible={dialog.visible} confirm={confirm} onDismiss={onDismiss} cancelText={dialog.cancelText} confirmText={dialog.confirmText}>
        <Text>{dialog.context}</Text>
        {/* <Text>{player.playerButton === 'KICK_OUT' ? '确认踢出吗?' : '确认加入酒局吗?'}</Text> */}
      </Dialog>}

    </>}
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
