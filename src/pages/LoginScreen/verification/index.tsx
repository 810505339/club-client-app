import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { RootStackParamList, ScreenNavigationProp } from '@router/type';
import BaseLayout from '@components/baselayout';
import { useCountdown } from '@hooks/useCountdown';
import { useCallback, useEffect, useState } from 'react';
import VerificationCodeField from './component/VerificationCodeField';
import { loginApi, sendYzmApi } from '@api/login';
import { useRequest } from 'ahooks';


const bgImage = require('@assets/imgs/login/login-register-bg.png');

const Verification = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Verification'>>();
  const navigation = useNavigation<
    | ScreenNavigationProp<'AuthenticationSex'>
    | ScreenNavigationProp<'OldUser'>
  >();
  const mobile = route.params.phone;
  const [isResend, setIsResend] = useState(false);
  const { count, start, stop } = useCountdown(60);
  const [code, setCode] = useState('');

  const { runAsync, loading } = useRequest(() => sendYzmApi(mobile), {
    manual: true,
  });

  const sendVerification = async () => {
    setIsResend(true);
    start();

    await runAsync();

  };


  const codeChange = useCallback((value: string) => {
    setCode(value);
  }, []);

  const handleLogin = async () => {
    try {

      const data = await loginApi({ code, mobile });
      console.log(data, 'handleLogin');
      console.log(data.setPersonalInfo);


      //没有人脸去人脸识别
      if (!data?.user_info?.checkFace) {
        navigation.navigate('AuthenticationSex');
        return;
      }

      //设置信息
      if (!data?.user_info?.setPersonalInfo) {
        navigation.navigate('UserInfo');
        return;
      }

      navigation.navigate('HomeTabs');
    } catch (err) {

    }
  };

  useEffect(() => {
    if (count == 0) {
      setIsResend(false);
    }
  }, [count, stop]);

  const ResendRender = (
    <Text className="text-center text-[#ffffff7f]">
      没收到验证码？
      <Text className="text-white font-semibold" onPress={sendVerification}>
        重新发送
      </Text>
    </Text>
  );

  const CountdownRender = (
    <Text className="text-center text-[#ffffff7f] font-semibold" >
      <Text className="text-[#EE2737]">{count}秒</Text>后重试
    </Text>
  );

  return (
    <BaseLayout source={bgImage} loading={loading}>
      <View className="mx-5 mt-11">
        <Text className="text-[#ffffff7f]">请输入验证码</Text>
        <View className="mt-4">
          <View>
            <VerificationCodeField onChange={codeChange} />
          </View>
          <View className="mt-6">
            {isResend ? CountdownRender : ResendRender}
          </View>
        </View>
      </View>

      <View className="absolute left-5 right-5 bottom-0 h-36">
        <Button
          mode="outlined"
          style={{
            borderColor: '#FFFFFF',
            height: 50,
            borderRadius: 33,
          }}
          labelStyle={{ fontSize: 18, color: '#FFFFFF', fontWeight: '600' }}
          contentStyle={{ height: 50 }} onPress={handleLogin}>
          登录
        </Button>
      </View>
    </BaseLayout>
  );
};

export default Verification;
