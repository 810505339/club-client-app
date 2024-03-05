import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { Button, Checkbox, Text, useTheme } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { ScreenNavigationProp } from '@router/type';
import BaseLayout from '@components/baselayout';
import Toast from 'react-native-toast-message';
import { loginApi, sendYzmApi } from '@api/login';
import { useRequest } from 'ahooks';
const bgImage = require('@assets/imgs/login/login-register-bg.png');


const LoginOrRegister = () => {


  const [phone, setPhone] = useState('');
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation<
    | ScreenNavigationProp<'NewUser'>
    | ScreenNavigationProp<'OldUser'>
    | ScreenNavigationProp<'Verification'>
  >();

  const { loading, runAsync } = useRequest(() => sendYzmApi(phone), {
    manual: true,
  });

  //密码登录
  function handlePwsLogin() {
    /* 是否允许通过 */
    const isPass = verify();

    if (isPass) {
      /* 密码登录 */
      navigation.navigate('OldUser', {
        phone: phone,
      });
    }

  }

  //
  async function handleVerification() {
    const isPass = verify();
    //发送验证码
    if (isPass) {
      try {
        const { data } = await runAsync();
        if (data) {
          navigation.navigate('Verification', {
            phone,
          });
        }
      } catch (err) {

      }
    }






  }
  /* 验证规则是否通过 */
  function verify() {
    if (!checked) {
      Toast.show({ text1: '请勾选' });
      return false;
    }

    if (phone.length < 11) {
      Toast.show({ text1: '手机号错误' });
      return false;
    }
    return true;
  }

  return (
    <BaseLayout source={bgImage} loading={loading}>
      <View className="mx-5 mt-11">
        <View>
          <Text className="text-[#ffffff7f] text-sx">请输入你的联系电话</Text>
        </View>
        <View className="flex-row items-center mt-4 w-full">
          <Text className="font-bold text-4xl ml-2">0065</Text>
          <Text className="font-bold text-4xl ml-2 mr-1">-</Text>
          <TextInput
            keyboardType="numeric"
            maxLength={11}
            value={phone}
            onChangeText={text => setPhone(text)}
            className="bg-transparent flex-grow font-bold text-2xl "
          />
        </View>
        <View className="flex-row items-start justify-start  mt-6 relative">
          <View>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
          </View>
          <View className="flex-1 ">
            <Text className="text-[#ffffff7f]">
              继续下一步，即表示你同意0.2Lounge & Club 的
              <Text className="text-[#EE2737]">《服务条款》</Text>
              并确认你已阅读我们
              <Text className="text-[#EE2737]">《隐私政策》</Text>
            </Text>
          </View>
        </View>
      </View>
      <View className="absolute left-5 right-5 bottom-0 h-32 flex-row justify-between ">
        <View>
          <Button
            mode="outlined"
            style={{
              borderColor: '#FFFFFF',
              borderRadius: 33,
            }}
            labelStyle={{ fontSize: 18, color: '#FFFFFF', fontWeight: '600' }}
            contentStyle={{ height: 50 }}
            onPress={handlePwsLogin}>
            密码登录
          </Button>
        </View>
        <View>
          <Button
            mode="outlined"
            style={{
              borderColor: '#FFFFFF',

              borderRadius: 33,
            }}
            labelStyle={{ fontSize: 18, color: '#FFFFFF', fontWeight: '600' }}
            contentStyle={{ height: 50 }}
            onPress={handleVerification}>
            获取验证码
          </Button>
        </View>
      </View>
    </BaseLayout>
  );
};

export default LoginOrRegister;
