import BaseLayout from '@components/baselayout';
import {useState} from 'react';
import {ImageBackground, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
const bgImage = require('@assets/imgs/login/login-register-bg.png');

const NewUser = () => {
  const [iconVisible, setIconVisible] = useState(false);
  const [iconVisible1, setIconVisible1] = useState(false);

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

        <TextInput
          label="确认密码"
          secureTextEntry={!iconVisible1}
          right={
            <TextInput.Icon
              onPress={() => setIconVisible1(!iconVisible1)}
              icon={iconVisible1 ? 'eye-off' : 'eye'}
            />
          }
          className="bg-transparent text-xl mt-12"
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

export default NewUser;
