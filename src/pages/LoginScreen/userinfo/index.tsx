import BaseLayout from '@components/baselayout';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, Image, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { IconButton, Button, Text, TextInput } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';


const bgImage = require('@assets/imgs/login/login-register-bg.png');


const UserInfo = () => {

  const [selectImage, setSelectImage] = useState({ uri: '' });

  function handleNext() {

  }

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
    } else if (response.errorMessage) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else {
      if (response.assets) {
        const source = { uri: response.assets[0].uri };
        setSelectImage(source);
      }

      // You can now use the chosen image as an avatar
    }



  }

  const imgRender = (<IconButton
    icon="plus-thick"
    iconColor={'#ffffff'}
    size={24}
    className="w-24 h-24 rounded-full bg-[#191919]  border-[#343434]"

  />);

  const btnRender = (<Image source={selectImage} className="h-24 w-24  rounded-full" />);



  return (
    <BaseLayout source={bgImage} >
      <View className="mt-10 mx-5  flex-1"  >
        <View>
          <Text className="mb-2">您的头像</Text>
          <Pressable onPress={handleChooseImage} >
            {selectImage.uri ? btnRender : imgRender}
          </Pressable>
        </View>
        <View className="mt-10">
          <Text className="mb-2">你的昵称</Text>
          <TextInput className="bg-transparent" />
        </View>
        <View className="mt-10">
          <Text className="mb-2">你的生日</Text>
          <TextInput className="bg-transparent" />
        </View>
        {/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className=" h-32 mt-auto justify-start">
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
        </KeyboardAvoidingView> */}
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
