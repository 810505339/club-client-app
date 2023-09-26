import {View, Text} from 'react-native';
import {Appbar} from 'react-native-paper';

const DemoScreen = () => {
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Title" subtitle={'Subtitle'} />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="dots-horizontal" onPress={() => {}} />
      </Appbar.Header>
    </View>
  );
};
export default DemoScreen;
