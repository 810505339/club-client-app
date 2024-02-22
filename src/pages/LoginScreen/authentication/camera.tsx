import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useCameraDevice, Camera, CameraPosition } from 'react-native-vision-camera';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useAppState } from '@react-native-community/hooks';
import { useEffect, useRef, useState } from 'react';
import { blobToBase64 } from '@utils/file';
import { checkFace } from '@api/checkFace';
import useUserInfo from '@hooks/useUserInfo';
import Toast from 'react-native-toast-message';
import { RootStackParamList } from 'router/type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';



const switchIcon = require('@assets/imgs/login/camera/switch.png');
const quitIcon = require('@assets/imgs/login/camera/quit.png');


const AuthenticationCamera = () => {

  const [cameraPosition, setcameraPosition] = useState<CameraPosition>('back');
  //front
  const device = useCameraDevice(cameraPosition);
  const camera = useRef<Camera>(null);
  const isFocused = useIsFocused();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const appState = useAppState();
  const [active, setActive] = useState(true);
  const { userInfoStorage, save } = useUserInfo();
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      setActive(false);
    });
    return unsubscribe;
  }, [navigation]);

  const isActive = active && isFocused && appState === 'active';

  /* 人脸识别成功 */
  const takeFaceSuccess = () => {
    const { userInfo } = userInfoStorage;/* 获取用户信息 */
    userInfo.checkFace = true;
    save(userInfo);

    Toast.show({
      text1: '人脸识别成功',
    });

    navigation.navigate('AuthenticationFacestatus', {
      status: 1,
    });
  };

  const takePhoto = async () => {
    try {
      const photo = await camera.current!.takePhoto();
      const result = await fetch(`file://${photo.path}`);
      const flieByBlob = await result.blob();
      const file = await blobToBase64(flieByBlob);
      console.log(file);

      const { data } = await checkFace({
        picBase64: file as string,
      });
      if (data.success) {
        /*  */
        takeFaceSuccess();
      }

    } catch (err) {
      console.log(err);

    }



    /* 上传照片 */

  };


  const handlequit = () => {
    navigation.goBack();
  };

  const changecamera = () => {
    setcameraPosition(cameraPosition == 'back' ? 'front' : 'back');
  };


  if (!device) {
    return (<View className="flex-1">
      <Text>请打开摄像头</Text>
    </View>);

  }

  if (!isActive) {
    return (<View className="flex-1">
      <Text>请打开摄像头</Text>
    </View>);
  }


  return <View className="h-full w-full items-center justify-end">
    {isActive && <Camera
      ref={camera}

      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      //https://github.com/mrousavy/react-native-vision-camera/issues/1988  不然会崩溃

      key={device.id}
      device={device} //此相机设备包含的物理设备类型列表。
      // video={true} //录像功能打开关闭
      // supportsVideoHDR={true}
      isActive={isActive} //是否打开相机， 可以缓存相机，加快打开速度
      photo={true} //拍照功能是否打开
      resizeMode="contain"

    />}
    <View className="  flex-row w-full items-center justify-around mb-[25%]">
      <TouchableOpacity className="p-2 rounded-full bg-[#D51D1D99]" onPress={changecamera}>
        <Image source={switchIcon} />
      </TouchableOpacity>
      <TouchableOpacity className=" w-16 h-16 rounded-full  border-2 border-white justify-center items-center" onPress={takePhoto} >
        <View className="bg-white w-14 h-14 rounded-full" />
      </TouchableOpacity>
      <TouchableOpacity className="p-2 rounded-full bg-[#00000099]" onPress={handlequit}>
        <Image source={quitIcon} />
      </TouchableOpacity>
    </View>

  </View>;

};

export default AuthenticationCamera;
