import {useNavigation} from '@react-navigation/native';
import {View, TextInput as BaseTextInput} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {ScreenNavigationProp} from '@router/type';
import BaseLayout from '@components/baselayout';
import {useCountdown} from '@hooks/useCountdown';
import {useEffect, useState} from 'react';

const bgImage = require('@assets/imgs/login/login-register-bg.png');
const Verification = () => {
  const navigation = useNavigation<ScreenNavigationProp<'LoginOrRegister'>>();
  const [isResend, setIsResend] = useState(false);
  const {count, start, stop} = useCountdown();

  const sendVerification = () => {
    setIsResend(true);
    start();
  };

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
      {count}秒后重试
    </Text>
  );

  return (
    <BaseLayout source={bgImage}>
      <View className="absolute left-5 right-5 top-36">
        <Text className="text-[#ffffff7f]">请输入验证码</Text>
        <View className="mt-4">
          <View
            className=" bg-[#FFFFFF1A] rounded-xl h-24 w-20 px-6"
            style={{
              shadowColor: '#1affffff',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
            }}>
            <BaseTextInput
              selectionColor="transparent"
              keyboardType="numeric"
              maxLength={1}
              className="text-5xl text-center"
            />
          </View>
          <View className="mt-6">
            {isResend ? CountdownRender : ResendRender}
          </View>
        </View>
      </View>

      <View className="absolute left-5 right-5 bottom-0 h-36">
        <Button
          mode="outlined"
          labelStyle={{
            fontSize: 18,
            color: '#FFFFFF',
            fontWeight: '600',
          }}>
          登录
        </Button>
      </View>
    </BaseLayout>
  );
};

export default Verification;
