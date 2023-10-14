import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { Appbar, Text } from 'react-native-paper';
import { Image, View } from 'react-native';
import { useCallback, useRef, useState } from 'react';
import Drawer from '@components/drawer';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated'
const LOGO = require('@assets/imgs/home/logo.png')

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({ title }) => {
  return (
    <View >
      <Text className='text-[#fff] h-96'>{title}</Text>
    </View>
  );
}


const Header = ({ layout, options }: BottomTabHeaderProps) => {

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  const handlePresentModalPress = useCallback(() => {
    console.log(bottomSheetModalRef.current)
    bottomSheetModalRef.current?.present();
  }, []);
  return (<Appbar.Header style={{ backgroundColor: 'transparent' }}>
    <Image source={LOGO} className='w-16 h-8 ml-5' />
    <Appbar.Content onPress={handlePresentModalPress} title={(<Text numberOfLines={2} className='text-right w-36  absolute top-[-20] right-0'>0.2 Lounge & Club 83 Duxton Rd Shop</Text>)} tvParallaxTiltAngle={1} />

    <Appbar.Action icon="chevron-down" />
    <Drawer ref={bottomSheetModalRef} snapPoints={['50%']}>
      <Animated.FlatList data={DATA} renderItem={renderItem}
        keyExtractor={item => item.id} />
    </Drawer>
  </Appbar.Header>)
};

export default Header;
