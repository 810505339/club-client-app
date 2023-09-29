import {useNavigation} from '@react-navigation/native';
import {ImageBackground, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {LoginOrRegisterScreenNavigationProp} from '@router/type';

const bgImage = require('@assets/imgs/login/bg.png');

const Login = () => {
  const navigation = useNavigation<LoginOrRegisterScreenNavigationProp>();
  function handleLogin() {
    navigation.navigate('LoginOrRegister');
  }
  return (
    <View className="flex-1">
      <ImageBackground source={bgImage} className="flex-1" />
      <View className="absolute left-16 right-16 bottom-0 h-64">
        <Button
          mode="outlined"
          style={{borderColor: '#EE2737'}}
          labelStyle={{fontSize: 18, color: '#EE2737'}}
          onPress={handleLogin}>
          登录 / 注册
        </Button>

        <View className="relative mt-16">
          <View className="w-8 h-0 border-t border-[#ffffff7f] absolute top-[50%] left-14" />
          <Text className="text-xs text-center text-[#ffffff7f] ">
            三方账号登录
          </Text>
          <View className="w-8 h-0 border-t border-[#ffffff7f] absolute top-[50%] right-14" />
        </View>
      </View>
    </View>
  );
};

export default Login;
