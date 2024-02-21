import BaseLayout from '@components/baselayout';
import { useNavigation } from '@react-navigation/native';
import { Image, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { ScreenNavigationProp } from '@router/type';
import Toast from 'react-native-toast-message';
import { useCameraPermission } from 'react-native-vision-camera';
const bgImage = require('@assets/imgs/login/login-register-bg.png');
const authorizationImage = require('@assets/imgs/login/authorization.png');
const AuthenticationPower = () => {

  const navigation = useNavigation<ScreenNavigationProp<'Authentication'>>();
  const { hasPermission, requestPermission } = useCameraPermission();
  const checkPermission = async () => {
    const permission = await requestPermission();
    if (!permission) {
      Toast.show({
        text1: '请授权相机',
      });
      return;
    }


    navigation.navigate('AuthenticationCamera');
  };

  const handleNext = async () => {
    await checkPermission();
  };

  const textindent = '\t\t\t\t';
  return (
    <BaseLayout source={bgImage} >
      <View className="flex items-center justify-center mt-10">
        <Image source={authorizationImage} className="w-[52] h-[60]" />
      </View>
      <View className="mt-10 mx-6">
        <Text className="text-lg text-[#fff] text-center font-bold">授权声明</Text>
        <Text className="text-xs text-[#fff] my-5 leading-5">{textindent}为了给您提供更好的服务,请您通过人脸识别来完成性别认证.您上传的照片仅用于性别认证,我们不会留存</Text>
        <Text className="text-xs text-[#fff] leading-5">{textindent}点击同意则表示您同意我们根据以上方式和目的使用您提供的本人照片收集您的性别信息</Text>
      </View>

      <View className="absolute left-5 right-5 bottom-0 h-32">

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
          同意
        </Button>
      </View>

    </BaseLayout>
  );
};


export default AuthenticationPower;
