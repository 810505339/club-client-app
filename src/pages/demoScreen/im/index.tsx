import BaseLayout from '@components/baselayout';
import { useEffect } from 'react';
import { Button } from 'react-native-paper';
import { TencentImSDKPlugin, LogLevelEnum, V2TimSDKListener, V2TimValueCallback } from 'react-native-tim-js';


const sdkAppID = 1600009072;
const userID = 'dev2'; // 用户设置的userID
const userSig = 'eJwtzEELgjAcBfDvsnPYHPu7FLoZdihCqlsXa5v8W*Zw4oTou7fUd3u-B*9DLodzNKiOZIRFlKymjlK9e9Q4sVQDW9xJU1mLkmRxQkNSKti8qNFip4IDAAvLrD02fxMUBE*o2CwvWIdbfBgBR4CxdbW-m2L31JXOT1fO41cj3G3tadnuU1f5otyS7w8ETDFM'; // 用户计算出的userSig


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
