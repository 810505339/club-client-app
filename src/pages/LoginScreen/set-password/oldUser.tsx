import BaseLayout from '@components/baselayout';
import {useState} from 'react';
import {View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import PswInput from './components/pswInput';
const bgImage = require('@assets/imgs/login/login-register-bg.png');

const OldUser = () => {
  return (
    <BaseLayout source={bgImage}>
      <View className="mx-5 mt-11">
        <PswInput label="请输入密码" />
      </View>
      <View className="absolute left-5 right-5 bottom-0  h-32">
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

export default OldUser;
