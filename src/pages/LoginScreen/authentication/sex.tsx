import BaseLayout from '@components/baselayout';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import CircularProgress from 'react-native-circular-progress-indicator';

const bgImage = require('@assets/imgs/login/login-register-bg.png');
const AuthenticationSex = () => {





  return (
    <BaseLayout source={bgImage} >
      <View className="mt-10  justify-center items-center">
        <CircularProgress
          value={100}
          radius={80}
          showProgressValue={false}
          activeStrokeColor={'#EE2737'}
          activeStrokeSecondaryColor={'#EE2737'}
          inActiveStrokeOpacity={0.5}
          activeStrokeWidth={15}
          inActiveStrokeWidth={20}
          progressValueStyle={{ fontWeight: '200', color: 'white' }}
          inActiveStrokeColor="black"
          duration={5000}
          dashedStrokeConfig={{
            count: 30,
            width: 5,
          }}
        />
        <Text className="text-lg font-bold mt-5 mb-3">即将开始人脸认证</Text>
        <Text className="text-xs color-[#ffffff7f]">本过程需要<Text className="color-[#EE2737]">您本人</Text>亲自完成，仅需1分钟！</Text>
      </View>
      <View className="absolute left-5 right-5 bottom-0 h-32">
        <Text className="text-xs color-[#ffffff7f] text-center mb-3">您提交的资料将只会用于性别认证审核</Text>
      <Button
            mode="outlined"
            style={{
              borderColor: '#FFFFFF',
              borderRadius: 33,
            }}
            labelStyle={{ fontSize: 18, color: '#FFFFFF', fontWeight: '600' }}
            contentStyle={{ height: 50 }}
           >
            开始验证
          </Button>
      </View>
    </BaseLayout>
  );
};


export default AuthenticationSex;
