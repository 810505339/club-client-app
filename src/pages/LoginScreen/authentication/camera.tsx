import { View, Text, TouchableOpacity } from 'react-native';
import { useCameraDevice, Camera } from 'react-native-vision-camera';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useAppState } from '@react-native-community/hooks';
import { useCallback, useEffect, useRef, useState } from 'react';


const AuthenticationCamera = () => {
  //front
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const appState = useAppState();
  const [active, setActive] = useState(true);
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      setTimeout(() => {
        setActive(false);
      }, 0);
    });
    return unsubscribe;
  }, [navigation]);

  const isActive = active && isFocused && appState === 'active';

  const takePhoto = async () => {
    const photo = await camera.current!.takePhoto();
    console.log(photo);
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

      style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 }}
      //https://github.com/mrousavy/react-native-vision-camera/issues/1988  不然会崩溃
      fps={60}

      device={device} //此相机设备包含的物理设备类型列表。
      // video={true} //录像功能打开关闭
      // supportsVideoHDR={true}
      isActive={isActive} //是否打开相机， 可以缓存相机，加快打开速度
      photo={true} //拍照功能是否打开
    />}
    <TouchableOpacity className=" w-16 h-16 rounded-full bg-slate-500 mt-[100%] mb-[20%]" onPress={takePhoto} />
  </View>;

};

export default AuthenticationCamera;
