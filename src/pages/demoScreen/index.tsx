import {View, Platform, ImageBackground} from 'react-native';
import {Appbar, Text, Button} from 'react-native-paper';

const DemoScreen = () => {
  return (
    <View className="flex-1">
      <View className=" absolute top-0 left-0 right-0 z-30 bg-transparent">
        <Appbar.Header style={{backgroundColor: 'transparent'}}>
          <Appbar.BackAction />
        </Appbar.Header>
      </View>
      <View className="absolute top-12">
        <Button mode="outlined" className="border-red-500" onPress={() => {}}>
          Share
        </Button>
      </View>
    </View>
  );
};
export default DemoScreen;
