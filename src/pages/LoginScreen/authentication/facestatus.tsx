import BaseLayout from '@components/baselayout';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { RootStackParamList, ScreenNavigationProp } from '@router/type';

const bgImage = require('@assets/imgs/login/login-register-bg.png');
const DURATION = 500;

const Facestatus = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'AuthenticationFacestatus'>>();
  const navigation = useNavigation<ScreenNavigationProp<'UserInfo'>>();
  //1 or 0
  const status = route.params.status;

  const opacity = useSharedValue(0);
  const mt = useSharedValue(0);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    marginTop: mt.value,
  }));

  useEffect(() => {
    opacity.value = withTiming(1, { duration: DURATION });
    mt.value = withTiming(50, { duration: DURATION });
  }, [opacity, mt]);


  function handleNext() {
    navigation.navigate('UserInfo');
  }


  return (<BaseLayout source={bgImage} >
    <View className="pt-16">
      <Animated.View className="rounded-full w-28 h-28 bg-fuchsia-700 mx-auto" style={[style]} />
      <View>
        <Text className="text-[#fff] font-bold text-2xl text-center mt-5 mb-3">{status == 1 ? '认证通过' : '认证不通过'}</Text>
        <Text className="text-[#fff]  text-xs mx-8 text-center">{status == 1 ? '恭喜您，您已通过验证欢迎您来到0.2 Lounge & Club的世界' : '请在光线好的地方重新拍摄，五官清晰的照片更容易认证通过哦'}</Text>
      </View>
    </View>
    <View className="absolute left-5 right-5 bottom-0 h-32">
      <Button
        mode="outlined"
        style={{
          borderColor: '#FFFFFF',
          borderRadius: 33,
        }}
        labelStyle={{ fontSize: 18, color: '#FFFFFF', fontWeight: '600' }}
        contentStyle={{ height: 50 }}
        onPress={handleNext}
      >
        {status == 1 ? '下一步' : '重新拍照'}

      </Button>
    </View>
  </BaseLayout>);

};


export default Facestatus;
