import storage from '../index';
import { KEY } from './key';

type ISelectShop = {
  id: string,
  name: string
}
export const save = async (selectShop: ISelectShop) => {
  const { id, name } = selectShop;
  const data = {
    selectId: id,
    selectName: name,
  };
  await storage.save({
    key: KEY,
    data,
  });
  return data;
};


export const load = async () => {
  const data = await storage.load({
    key: KEY,
  });

  return data;
};

export const remove = () => {
  storage.remove({
    key: KEY,
  });
};
