import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { ScreenNavigationProp, TabParamList } from '@router/type';
import Header from './components/header';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useEffect } from 'react';
import BaseLayout from '@components/baselayout';


const HOMEBG = require('@assets/imgs/bg.jpg')
const HomeScreen = () => {
  const navigation =
    useNavigation<BottomTabNavigationProp<TabParamList, 'Home'>>();

  useEffect(() => {
    navigation.setOptions({
      header: props => <Header {...props} />,
    });
  }, [])
  return (
    <BaseLayout source={HOMEBG}>

    </BaseLayout>
  );
};

export default HomeScreen;
