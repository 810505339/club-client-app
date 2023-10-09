import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { Appbar } from 'react-native-paper';
import { Image } from 'react-native';
const LOGO = require('@assets/imgs/home/logo.png')

const Header = ({ layout, options }: BottomTabHeaderProps) => {
  return (<Appbar.Header style={{ backgroundColor: 'transparent' }}>
    <Image source={LOGO} className='w-16 h-8 ml-5' />
  </Appbar.Header>)
};

export default Header;
