import uuid from 'react-native-uuid';
import { useRequest } from 'ahooks';
import { getDynamicTypeByStoreId } from '@api/dynamic';
import useSelectShop from '@hooks/useSelectShop';
import { useEffect } from 'react';

type DynamicTypeList = {
  name: string,
  id: string,
  isAll?: boolean
}

export default (): { dynamicTypeList: Array<DynamicTypeList>, storeId: string } => {
  const { shop } = useSelectShop();
  console.log(shop.select.id, 'shop.select.id');


  const { data, run } = useRequest(() => getDynamicTypeByStoreId(shop.select.id), {
    manual: true,
  });
  useEffect(() => {
    if (shop.select.id) {
      run();
    }

  }, [shop.select.id]);

  return {
    dynamicTypeList: data && [{ id: uuid.v4(), name: '全部', isAll: true }, ...data.data],
    storeId: shop.select.id,
  };
};
