import {View, Text, ImageBackground} from 'react-native';
import {Appbar} from 'react-native-paper';

const DemoScreen = () => {
  return (
    <View className="flex-1 relative">
      <ImageBackground
        source={require('@assets/imgs/bg.jpg')}
        className="flex-1"
      />
      <View className="absolute z-10 top-[64px]">
        <Text>1123</Text>
      </View>
    </View>
  );
};
export default DemoScreen;
