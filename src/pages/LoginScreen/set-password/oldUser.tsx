import BaseLayout from '@components/baselayout';
import { useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import PswInput from './components/pswInput';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@router/type';
import { useRequest } from 'ahooks';
import { loginApi } from '@api/login';
import { useImmer } from 'use-immer';
import Toast from 'react-native-toast-message';
const bgImage = require('@assets/imgs/login/login-register-bg.png');

const OldUser = () => {
  const [allData, setAllData] = useImmer({
    password: '',
  });
  const route = useRoute<RouteProp<RootStackParamList, 'OldUser'>>();
  const { phone } = route.params;
  const { runAsync, loading } = useRequest(() => loginApi({
    username: phone,
    password: allData.password,
    grant_type: 'password',
  }), {
    manual: true,
  });

  function onChangeText(pwd: string) {
    setAllData(draft => {
      draft.password = pwd;
    });
  }

  async function handleLogin() {
    if (!allData.password) {
      Toast.show({
        text1: '请输入密码',
      });
      return;
    }
    //todo
    await runAsync();
  }

  return (
    <BaseLayout source={bgImage} loading={loading}>
      <View className="mx-5 mt-11">
        <PswInput label="请输入密码" onChangeText={onChangeText} />
      </View>
      <View className="absolute left-5 right-5 bottom-0  h-32">
        <Button
          mode="outlined"
          style={{
            borderColor: '#FFFFFF',
            height: 50,
            borderRadius: 33,
          }}
          labelStyle={{ fontSize: 18, color: '#FFFFFF', fontWeight: '600' }}
          contentStyle={{ height: 50 }} onPress={handleLogin}>
          登录
        </Button>
      </View>
    </BaseLayout>
  );
};

export default OldUser;
