import { getSotreList } from '@api/store';
import { load } from '@storage/shop/action';
import { proxy } from 'valtio';

export type IShopItem = {
  id: string,
  name: string,
}

type IProxy = {
  shopList: IShopItem[]

}
export const store = proxy<IProxy>({
  shopList: [],
});


export const initList = async () => {
  const { data } = await getSotreList();
  store.shopList = data.data;
  return data.data;
};




