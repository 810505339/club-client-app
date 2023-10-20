import BaseLayout from '@components/baselayout';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';


const bgImage = require('@assets/imgs/login/login-register-bg.png');


const UserInfo = () => {

  function handleNext() {

  }


  return (<BaseLayout source={bgImage} >
    <View className="pt-16" />
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
        完成
      </Button>
    </View>
  </BaseLayout>);

};


export default UserInfo;
