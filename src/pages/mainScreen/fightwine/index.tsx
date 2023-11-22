import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { RootStackParamList } from '@router/type';
import BaseLayout from '@components/baselayout';
import CheckLayout from '@components/baselayout/checkLayout';

const FightwineScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const Next = () => {

    navigation.navigate('LoginOrRegister');
  };
  return (
    <BaseLayout>
      <CheckLayout />
    </BaseLayout>
  );
};
export default FightwineScreen;
