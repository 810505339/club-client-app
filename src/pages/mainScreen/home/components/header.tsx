import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { Appbar, Menu, Text } from 'react-native-paper';
import { Image } from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

const LOGO = require('@assets/imgs/home/logo.png')

const Header = ({ layout, options }: BottomTabHeaderProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  return (<Appbar.Header style={{ backgroundColor: 'transparent' }}>
    <Image source={LOGO} className='w-16 h-8 ml-5' />
    <Appbar.Content title={(<Text numberOfLines={2} className='text-right w-36  absolute top-[-20] right-0'>0.2 Lounge & Club 83 Duxton Rd Shop</Text>)} tvParallaxTiltAngle={1} />

    <Appbar.Action icon="chevron-down" />
  </Appbar.Header>)
};

export default Header;
