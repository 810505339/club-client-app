import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { IItemProp } from 'components/custom-modal';
import { useEffect, useRef } from 'react';
import { load, save } from '@storage/shop/action';
import { useImmer } from 'use-immer';
import { findIndex, initList, store } from '@store/shopStore';
import { useSnapshot } from 'valtio';

export default (isStore = true) => {

  const [shop, setShop] = useImmer({
    select: {
      id: '',
    },
  });
  //store中拿到门店渲染
  const snap = useSnapshot(store);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  //点击确定按钮
  const onPress = (value: IItemProp | undefined) => {
    bottomSheetModalRef.current?.dismiss();
    setShop((draft) => {
      draft.select = value!;
    });
  };
  //初始化 判断是否存在已选择的门店id 如果没有的话就把默认选择第一个门店
  const init = async () => {
    let data = null;
    try {
       data = await load();
    } finally {
      const shopList = isStore ? store.shopList : await initList();
      const index = shopList.findIndex((item) => item.id === data?.selectId);


      if (!data?.selectId || !~index) {
        data = await save(shopList[0]);
      }
      setShop((draft) => {
        draft.select = { id: data.selectId };
      });
    }




  };

  const shopName = findIndex(shop.select.id)?.name;

  const showShop = () => {
    bottomSheetModalRef.current?.present();
  };

  useEffect(() => {


    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    bottomSheetModalRef,
    onPress,
    shop,
    init,
    setShop,
    snap,
    shopName,
    showShop,
  };
};
