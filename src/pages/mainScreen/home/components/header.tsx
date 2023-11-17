import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { Appbar, Text } from 'react-native-paper';
import { Image, View } from 'react-native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { initList, store } from '@store/shopStore';
import Drawer from '@components/drawer';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';
import { useSnapshot } from 'valtio';

const LOGO = require('@assets/imgs/home/logo.png');



const Item = ({ title }) => {
  return (
    <View >
      <Text className="text-[#fff] h-96">{title}</Text>
    </View>
  );
};


const Header = ({ layout, options }: BottomTabHeaderProps) => {

  const snap = useSnapshot(store);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  const handlePresentModalPress = useCallback(async () => {
    console.log(bottomSheetModalRef.current);
    await initList();
    bottomSheetModalRef.current?.present();
  }, []);
  return (<Appbar.Header style={{ backgroundColor: 'transparent' }}>
    <Image source={LOGO} className="w-16 h-8 ml-5" />
    <Appbar.Content onPress={handlePresentModalPress} title={(<Text numberOfLines={2} className="text-right w-36  absolute top-[-20] right-0">0.2 Lounge & Club 83 Duxton Rd Shop</Text>)} tvParallaxTiltAngle={1} />

    <Appbar.Action icon="chevron-down" />
    <Drawer ref={bottomSheetModalRef} snapPoints={['50%']}>
      <View >
        <Text className="text-white">选择门店</Text>
      </View>

      <Animated.FlatList data={store} renderItem={renderItem}
        keyExtractor={item => item.id} />
    </Drawer>
  </Appbar.Header>);
};

export default Header;
