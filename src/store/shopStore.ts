import { getSotreList } from '@api/store';
import { proxy } from 'valtio';

type IProxy = {
  shopList: any[]
}


export const initList = async () => {
  console.log('initList', 1);

  const { data } = await getSotreList();
  console.log(data);
};

export const store = proxy<IProxy>({
  shopList: [],
});



