import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { Appbar, Text } from 'react-native-paper';
import { Image } from 'react-native';
import { useEffect, useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { initList, store } from '@store/shopStore';
import { useSnapshot } from 'valtio';
import { useImmer } from 'use-immer';
import CustomModal, { IItemProp } from '@components/custom-modal';
import useSelectShop from '@hooks/useSelectShop';

import { load, save } from '@storage/shop/action';
const LOGO = require('@assets/imgs/home/logo.png');



const Header = ({ layout, options, onChange }: BottomTabHeaderProps & { onChange: (value: any) => void }) => {
  const { snap, bottomSheetModalRef, shop, onPress } = useSelectShop(false);

  //点击展开
  const handlePresentModalPress = async () => {
    bottomSheetModalRef.current?.present();
  };



  useEffect(() => {
    if (shop.select.id != '') {
      save(shop.select);
      onChange(shop.select);
    }
  }, [shop.select]);

  return (<Appbar.Header style={{ backgroundColor: 'transparent' }}>
    <Image source={LOGO} className="w-16 h-8 ml-5" />
    <Appbar.Content onPress={handlePresentModalPress} title={(<Text numberOfLines={1} className="text-right w-36   absolute top-[-10]   items-center justify-center right-0">{shop.select.name}</Text>)} tvParallaxTiltAngle={1} />
    <Appbar.Action icon="chevron-down" />
    <CustomModal ref={bottomSheetModalRef} data={snap.shopList} selectValue={shop.select.id} onPress={onPress} headerText="选择门店" snapPoints={['50%']} />
  </Appbar.Header>);
};

export default Header;
