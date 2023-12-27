import BaseLayout from '@components/baselayout';
import { useEffect } from 'react';
import { Button } from 'react-native-paper';
import { TencentImSDKPlugin, LogLevelEnum, V2TimSDKListener, V2TimValueCallback } from 'react-native-tim-js';


const sdkAppID = 1600012259;
const userID = '1001'; // 用户设置的userID
const userSig = 'eJwtzF0LgjAUxvHvcq5DttURJ3SVEMYMJYn0LtyKgxVj2YtE372lXj6-PzwfKNUueBoHMYiAwWzYpM2toxMNzBnjk991e7SWNMQ8ZJ6FQDkW87bkjHdEFD6N2tH1b6GUEsWC4fRCZ3'; // 用户计算出的userSig


const init = async () => {
  await TencentImSDKPlugin.v2TIMManager.initSDK(
    sdkAppID,
    LogLevelEnum.V2TIM_LOG_DEBUG,
    undefined,
    true,
  );
};



const IM = () => {
  useEffect(() => {
    init();
  }, []);
  const handleLogin = async () => {
    const loginRes = await TencentImSDKPlugin.v2TIMManager.login(userID, userSig);
    console.log(loginRes);
  };

  return (<BaseLayout >
    <Button onPress={handleLogin}>登录</Button>
  </BaseLayout>);
};

export default IM;
