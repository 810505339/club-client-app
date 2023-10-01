import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {ImageBackground, View} from 'react-native';
import {Button, Checkbox, Text, useTheme} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import {ScreenNavigationProp} from '@router/type';
import BaseLayout from '@components/baselayout';
const bgImage = require('@assets/imgs/login/login-register-bg.png');

const LoginOrRegister = () => {
  const [phone, setPhone] = useState('');
  const theme = useTheme();
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation<
    | ScreenNavigationProp<'NewUser'>
    | ScreenNavigationProp<'OldUser'>
    | ScreenNavigationProp<'Verification'>,
  >();

  //密码登录
  function handlePwsLogin() {
    checked ? navigation.navigate('OldUser') : navigation.navigate('NewUser');
  }

  //
  function handleVerification() {
    navigation.navigate('Verification');
  }

  return (
    <BaseLayout source={bgImage}>
      <View className="absolute top-36   left-5 right-5 ">
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
            className="bg-transparent flex-grow font-bold text-4xl "
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
              <Text style={{color: theme.colors.primary}}>服务条款》</Text>
              《并确认你已阅读我们
              <Text style={{color: theme.colors.primary}}>《隐私政策》</Text>。
            </Text>
          </View>
        </View>
      </View>
      <View className="absolute left-5 right-5 bottom-0 h-32 flex-row justify-between ">
        <View>
          <Button
            mode="outlined"
            style={{borderColor: '#FFFFFF', width: 162}}
            labelStyle={{fontSize: 18, color: '#FFFFFF', fontWeight: '600'}}
            onPress={handlePwsLogin}>
            密码登录
          </Button>
        </View>
        <View>
          <Button
            mode="outlined"
            style={{borderColor: '#FFFFFF', width: 162}}
            labelStyle={{fontSize: 18, color: '#FFFFFF', fontWeight: '600'}}
            onPress={handleVerification}>
            获取验证码
          </Button>
        </View>
      </View>
    </BaseLayout>
  );
};

export default LoginOrRegister;
