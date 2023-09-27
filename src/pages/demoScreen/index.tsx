import {View, Platform, ImageBackground} from 'react-native';
import {Appbar} from 'react-native-paper';

const DemoScreen = () => {
  return (
    <View className="flex-1">
      <ImageBackground
        className="flex-1"
        source={require('@assets/imgs/login/bg.jpg')}
      />

      <View className=" absolute top-0 left-0 right-0 z-30 bg-transparent">
        <Appbar.Header style={{backgroundColor: 'transparent'}}>
          <Appbar.BackAction />
        </Appbar.Header>
      </View>
    </View>
  );
};
export default DemoScreen;
