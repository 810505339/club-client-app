import {useNavigation} from '@react-navigation/native';
import {View, Text, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import {ScreenNavigationProp, TabParamList} from '@router/type';
import Header from './components/header';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

const HomeScreen = () => {
  const navigation =
    useNavigation<BottomTabNavigationProp<TabParamList, 'Home'>>();
  navigation.setOptions({
    header: props => <Header {...props} />,
  });
  return (
    <View>
      <ScrollView horizontal={true} />
    </View>
  );
};

export default HomeScreen;
