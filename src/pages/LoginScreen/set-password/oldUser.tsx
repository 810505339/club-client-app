import BaseLayout from '@components/baselayout';
import {useState} from 'react';
import {View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
const bgImage = require('@assets/imgs/login/login-register-bg.png');

const OldUser = () => {
  const [iconVisible, setIconVisible] = useState(false);

  return (
    <BaseLayout source={bgImage}>
      <View className="absolute  top-36 left-5 right-5">
        <TextInput
          label="请输入您的密码"
          secureTextEntry={!iconVisible}
          right={
            <TextInput.Icon
              onPress={() => setIconVisible(!iconVisible)}
              icon={iconVisible ? 'eye-off' : 'eye'}
            />
          }
          className="bg-transparent text-xl"
        />
      </View>
      <View className="absolute left-5 right-5 bottom-36">
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

export default OldUser;
