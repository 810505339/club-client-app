import { View, Text, PermissionsAndroid, Platform, AppState } from 'react-native';
import { Button } from 'react-native-paper';

import { useCameraDevice, Camera, useCameraDevices } from 'react-native-vision-camera';
import BaseLayout from '@components/baselayout';
import { useRef, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { useAppState } from '@react-native-community/hooks';
import requestCameraPermission from '@utils/androidPermissions';

const CameraDemo = () => {
  const device = useCameraDevice('front');
  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = isFocused && appState === 'active';




  if (!device) {
    return <BaseLayout>
      <View className="flex-1">
        <Text>请打开摄像头</Text>
      </View>
    </BaseLayout>;
  }


  return (
    <BaseLayout>
      {isFocused && <Camera
        style={{ flex: 1 }}

        // zoom={zoom} //镜头广角大小，获取正常大小
        device={device} //此相机设备包含的物理设备类型列表。
        // video={true} //录像功能打开关闭
        // supportsVideoHDR={true}
        isActive={isActive} //是否打开相机， 可以缓存相机，加快打开速度
        photo={true} //拍照功能是否打开
      />}
    </BaseLayout>
  );
};

export default CameraDemo;
