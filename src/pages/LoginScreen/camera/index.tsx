import { View,Text,PermissionsAndroid, Platform} from 'react-native';
import {Button} from 'react-native-paper';

import { useCameraDevice,Camera, useCameraDevices } from 'react-native-vision-camera';
import BaseLayout from '@components/baselayout';
import { useRef, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

const CameraDemo = () => {


  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>(
    'back',
  );

const device = useCameraDevice('back');
const isFocused = useIsFocused();


console.log(device);

const requestPermission = async () => {
  try {

    // 要使请求权限功能生效，需在 AndroidManifest.xml 文件中配置需要请求的权限

    // 权限列表
    const permissions = [
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ];

    if (Platform.OS === 'android') {
      //  PermissionsAndroid.requestMultiple 向用户请求多个权限
      const results = await PermissionsAndroid.requestMultiple(permissions);
      // 返回值为一个 object，key 为各权限名称，值为PermissionsAndroid.RESULTS
      const allPermissionsGranted = Object.values(results).every(result => result === PermissionsAndroid.RESULTS.GRANTED);
      let check = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
      console.log(device,check,'check');
      if (allPermissionsGranted) {
        setPermissionsGranted(true);
      }
    } else {
      setPermissionsGranted(false);
    }


  } catch (err) {
    console.error(err);
  }
};

if (!device)
    {return  <BaseLayout><Button  mode="outlined" onPress={requestPermission}>测试摄像头</Button></BaseLayout>;}







  return (
    <BaseLayout>

    {isFocused && <Camera
        style={{flex:1}}

// zoom={zoom} //镜头广角大小，获取正常大小
device={device} //此相机设备包含的物理设备类型列表。
// video={true} //录像功能打开关闭
// supportsVideoHDR={true}
isActive={true} //是否打开相机， 可以缓存相机，加快打开速度
photo={true} //拍照功能是否打开
/>}



    </BaseLayout>
  );
};

export default CameraDemo;
