import storage from '@storage/index';
import { useEffect, useState } from 'react';
import { IM_KEY } from '@storage/shop/key';

export default () => {
  const [userInfoStorage, setuserInfoStorage] = useState<any>({});
  useEffect(() => {
    (async () => {
      const _userInfoStorage = await storage.load({ key: IM_KEY });
      setuserInfoStorage(_userInfoStorage);
    })();
  }, []);

  return userInfoStorage;
};
