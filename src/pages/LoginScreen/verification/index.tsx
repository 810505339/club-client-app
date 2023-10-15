import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {ScreenNavigationProp} from '@router/type';
import BaseLayout from '@components/baselayout';
import {useCountdown} from '@hooks/useCountdown';
import {useCallback, useEffect, useState} from 'react';
import VerificationCodeField from './compoents/VerificationCodeField';

const bgImage = require('@assets/imgs/login/login-register-bg.png');

const Verification = () => {
  const navigation = useNavigation<ScreenNavigationProp<'LoginOrRegister'>>();
  const [isResend, setIsResend] = useState(false);
  const {count, start, stop} = useCountdown();

  const sendVerification = () => {
    setIsResend(true);
    start();
  };

  const codeChange = useCallback((value: string) => {
    console.log(value);
  }, []);

  useEffect(() => {
    if (count <= 0) {
      stop();
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
    <Text className="text-center text-[#ffffff7f] font-semibold">
      <Text className="text-[#EE2737]">{count}秒</Text>后重试
    </Text>
  );

  return (
    <BaseLayout source={bgImage}>
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
          labelStyle={{fontSize: 18, color: '#FFFFFF', fontWeight: '600'}}
          contentStyle={{height: 50}}>
          登录
        </Button>
      </View>
    </BaseLayout>
  );
};

export default Verification;
