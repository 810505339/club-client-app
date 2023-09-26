import {useNavigation} from '@react-navigation/native';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';

const HomeScreen = () => {
  const navigation = useNavigation();
  const handleToDemo = () => {
    navigation.navigate('DemoScreen');
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button icon="camera" mode="contained" onPress={handleToDemo}>
        to demo
      </Button>
    </View>
  );
};

export default HomeScreen;
