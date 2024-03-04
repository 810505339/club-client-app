import BaseLayout from '@components/baselayout';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Image, Pressable, TouchableWithoutFeedback, NativeSyntheticEvent, TextInputFocusEventData, ImageSourcePropType } from 'react-native';
import { IconButton, Button, Text, TextInput, TouchableRipple } from 'react-native-paper';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { useImmer } from 'use-immer';
import { Keyboard } from 'react-native';
import { updateFile } from '@api/common';
import Toast from 'react-native-toast-message';
import { editUserInfoApi } from '@api/login';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@router/type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRequest } from 'ahooks';
import { detailsById } from '@api/user';

const bgImage = require('@assets/imgs/login/login-register-bg.png');


const UserInfo = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  //选择头像
  const [selectImage, setSelectImage] = useState<Asset>({ uri: '' });
  //选择日期
  const [dateTimer, setdateTimer] = useImmer({
    date: new Date(),
    show: false,
  });
  const formatDay = dayjs(dateTimer.date).format('YYYY-MM-DD');
  const [nickname, setNickname] = useState('');
  /* 是否选择头像  */
  const [isChanged, setIsChanged] = useState(false);

  useRequest(detailsById, {
    onSuccess: (res) => {
      console.log(res, 'res');
      const _data = res.data;
      if (res.success) {
        console.log(_data.avatarUrl);

        setSelectImage({ uri: _data.avatarUrl });
        setNickname(_data.nickname);
        setdateTimer(draft => {
          draft.date = _data.birthday ? dayjs(_data.birthday).toDate() : new Date();
        });
      }

    },
  });


  const onChange = (event: DateTimePickerEvent, selectDate?: Date) => {
    const currentDate = selectDate || dateTimer.date;
    console.log(event.type);

    setdateTimer(draft => {
      draft.date = currentDate;
      draft.show = false;
    });
  };

  async function handleNext() {
    if (!selectImage.uri) {
      Toast.show({
        text1: '请上传头像',
      });
      return;
    }

    if (!nickname) {
      Toast.show({
        text1: '请填写昵称',
      });
      return;
    }

    try {
      let id;
      if (isChanged) {
        const { data } = await uploadImage(selectImage);
        if (data.success) {
          console.log(data, 'uploadImage');
          console.log(data, 'uploadImage');
          id = data.data.id;
        }
      }
      const { data: userInfo } = await editUserInfoApi({ avatarFileId: id, nickname, birthday: formatDay });
      if (userInfo.data) {
        //修改用户信息成功
        navigation.navigate('HomeTabs');
      }

    } catch (error) {
      console.log(error);
    }
  }

  //选择头像
  async function handleChooseImage() {
    const response = await launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 600,// 设置选择照片的大小，设置小的话会相应的进行压缩
      maxHeight: 600,
      quality: 0.8,
      selectionLimit: 1,

    });

    if (response.didCancel) {
      console.log('User cancelled image picker');
      setIsChanged(false);
    } else if (response.errorMessage) {
      console.log('ImagePicker Error: ', response.errorMessage);
      setIsChanged(false);
    } else {
      if (response.assets) {

        setSelectImage(response.assets[0]);
        setIsChanged(true);
      }

      // You can now use the chosen image as an avatar
    }


  }

  function onFocus() {
    Keyboard.dismiss();
    setdateTimer((draft) => { draft.show = true; });

  }

  // 上传图片api调用
  async function uploadImage(params: Asset) {
    const formData = new FormData();
    formData.append('file', {
      uri: params.uri,
      type: params.type,
      name: params.fileName,
    });

    console.log(formData);

    return await updateFile(formData);
  }



  const imgRender = (<IconButton
    icon="plus-thick"
    iconColor={'#ffffff'}
    size={24}
    className="w-24 h-24 rounded-full bg-[#191919]  border-[#343434]"

  />);

  const btnRender = (<Image source={selectImage} className="h-24 w-24  rounded-full border border-red-500" />);




  return (
    <BaseLayout source={bgImage} >
      <View className="mt-10 mx-5  flex-1"  >
        <View>
          <Text className="mb-2">您的头像</Text>
          <Pressable onPress={handleChooseImage} >
            {selectImage?.uri ? btnRender : imgRender}
          </Pressable>
        </View>
        <View className="mt-10">
          <Text className="mb-2">你的昵称</Text>
          <TextInput className="bg-transparent" value={nickname} onChangeText={(text) => setNickname(text)} />
        </View>
        <View className="mt-10">
          <Text className="mb-2">你的生日</Text>
          {dateTimer.show && <DateTimePicker onChange={onChange} value={dateTimer.date} />}

          <TextInput className="bg-transparent" showSoftInputOnFocus={false} value={formatDay} onFocus={onFocus} />

        </View>

        <View className="mt-10">
          <Text className="mb-2">你的个性签名</Text>
          {dateTimer.show && <DateTimePicker onChange={onChange} value={dateTimer.date} />}

          <TextInput className="bg-transparent" showSoftInputOnFocus={false} value={formatDay} onFocus={onFocus} />

        </View>
        <View className="h-32 mt-auto  justify-start">
          <Button
            mode="outlined"
            style={{
              borderColor: '#FFFFFF',
              borderRadius: 33,
            }}
            labelStyle={{ fontSize: 18, color: '#FFFFFF', fontWeight: '600' }}
            contentStyle={{ height: 50 }}
            onPress={handleNext}
          >
            完成
          </Button>
        </View>
      </View>
    </BaseLayout>);

};


export default UserInfo;
