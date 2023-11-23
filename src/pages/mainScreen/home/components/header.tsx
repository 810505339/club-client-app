import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { Appbar, Text } from 'react-native-paper';
import { Image } from 'react-native';
import { useCallback, useEffect, useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { initList, store } from '@store/shopStore';
import { useSnapshot } from 'valtio';
import { useImmer } from 'use-immer';
import CustomModal, { IItemProp } from '@components/custom-modal';

import { load, save } from '@storage/shop/action';
const LOGO = require('@assets/imgs/home/logo.png');



const Header = ({ layout, options, onChange }: BottomTabHeaderProps & { onChange: (value: any) => void }) => {

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snap = useSnapshot(store);
  const [data, setData] = useImmer({
    select: {
      name: '',
      id: '',
    },
  });
  //点击展开
  const handlePresentModalPress = async () => {
    bottomSheetModalRef.current?.present();
  };
  //点击确定按钮
  const onPress = (value: IItemProp | undefined) => {
    bottomSheetModalRef.current?.dismiss();
    setData((draft) => {
      draft.select = value!;
    });
  };

  const init = async () => {
    let data = await load();
    const shopList = await initList();
    if (!data?.selectId) {
      data = await save(shopList[0]);
    }
    setData((draft) => {
      draft.select = { id: data.selectId, name: data.selectName };
    });
  };

  useEffect(() => {
    (init)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data.select.id != '') {
      save(data.select);
      onChange(data.select);
    }
  }, [data.select, onChange]);

  return (<Appbar.Header style={{ backgroundColor: 'transparent' }}>
    <Image source={LOGO} className="w-16 h-8 ml-5" />
    <Appbar.Content onPress={handlePresentModalPress} title={(<Text numberOfLines={1} className="text-right w-36   absolute top-[-10]   items-center justify-center right-0">{data.select.name}</Text>)} tvParallaxTiltAngle={1} />
    <Appbar.Action icon="chevron-down" />
    <CustomModal ref={bottomSheetModalRef} data={snap.shopList} selectValue={data.select.id} onPress={onPress} headerText="选择门店" snapPoints={['50%']} />
  </Appbar.Header>);
};

export default Header;
