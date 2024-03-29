import BaseLayout from '@components/baselayout';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import CircularProgress from 'react-native-circular-progress-indicator';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from 'router/type';

const bgImage = require('@assets/imgs/login/login-register-bg.png');
const faceImage = require('@assets/imgs/login/face.png');
const DURATION = 1000;

const AuthenticationSex = () => {

  const opacity = useSharedValue(0.5);
  const scale = useSharedValue(1);
  const navigation = useNavigation<ScreenNavigationProp<'AuthenticationPower'>>();

  const handleNext = () => {
    navigation.navigate('AuthenticationPower');
  };



  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));
  useEffect(() => {
    //withRepeat -1,true  无限次数 true 是否往返运动
    opacity.value = withRepeat(withTiming(0.8, { duration: DURATION }), -1, true);
    scale.value = withRepeat(withTiming(1.2, { duration: DURATION }), -1, true);

  }, [opacity, scale]);


  return (
    <BaseLayout source={bgImage} >
      <View className="mt-10  justify-center items-center">
        <View className="relative">
          <View className=" absolute  z-1 top-0 left-0 right-0 bottom-0 justify-center items-center">
            <Animated.View className="w-20 h-20 rounded-full " style={[animatedStyle]} >
              <Animated.Image source={faceImage} className={'w-20 h-20'} />
            </Animated.View>
          </View>
          <CircularProgress
            value={50}
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

        </View>



        <Text className="text-lg font-bold mt-5 mb-3" >即将开始人脸认证</Text>
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
          contentStyle={{ height: 50 }} onPress={handleNext}
        >
          开始验证
        </Button>
      </View>


    </BaseLayout>
  );
};


export default AuthenticationSex;
