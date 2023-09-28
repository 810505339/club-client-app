import {useNavigation} from '@react-navigation/native';
import {ImageBackground, View} from 'react-native';
import {Button, Text} from 'react-native-paper';

const bgImage = require('@assets/imgs/login/bg.png');

const Login = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1">
      <ImageBackground source={bgImage} className="flex-1" />
      <View className="absolute left-16 right-16 bottom-0 h-52">
        <Button
          mode="outlined"
          style={{borderColor: '#EE2737'}}
          labelStyle={{fontSize: 18, color: '#EE2737'}}>
          登录 / 注册
        </Button>

        <View className="text-center text-white w-full relative">
          <View className="w-12 h-1 border" />
          <Text className="text-xs">三方账号登录</Text>
          <View className="w-12 h-1" />
        </View>
      </View>
    </View>
  );
};

export default Login;
