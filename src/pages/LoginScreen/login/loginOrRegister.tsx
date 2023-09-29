import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {ImageBackground, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
const bgImage = require('@assets/imgs/login/login-register-bg.png');

const LoginOrRegister = () => {
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();

  function handleLogin() {
    navigation.navigate('LoginOrRegister');
  }

  return (
    <View className="relative flex-1">
      <ImageBackground source={bgImage} className="flex-1 " />
      <View className="absolute top-36   left-5 right-5 ">
        <View>
          <Text className="text-[#ffffff7f] text-sx">请输入你的联系电话</Text>
        </View>
        <View className="flex-row items-center mt-4 w-full">
          <Text className="font-bold text-4xl ml-2">0065</Text>
          <Text className="font-bold text-4xl ml-3 mr-1">-</Text>
          <TextInput
            keyboardType="numeric"
            maxLength={11}
            value={phone}
            onChange={text => setPhone(text)}
            className="bg-transparent flex-grow flex-shrink-0 font-bold text-4xl "
            activeUnderlineColor="#EE2737"
          />
        </View>
      </View>
      <View className="absolute left-5 right-5 bottom-0 h-32 flex-row justify-between ">
        <View>
          <Button
            mode="outlined"
            style={{borderColor: '#FFFFFF', width: 162}}
            labelStyle={{fontSize: 18, color: '#FFFFFF', fontWeight: '600'}}
            onPress={handleLogin}>
            密码登录
          </Button>
        </View>
        <View>
          <Button
            mode="outlined"
            style={{borderColor: '#FFFFFF', width: 162}}
            labelStyle={{fontSize: 18, color: '#FFFFFF', fontWeight: '600'}}
            onPress={handleLogin}>
            获取验证码
          </Button>
        </View>
      </View>
    </View>
  );
};

export default LoginOrRegister;
