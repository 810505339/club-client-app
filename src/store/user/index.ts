import { atom, selector } from 'recoil';
import { IUserType } from './type';
import { loginApi } from '@api/login';
import { setGenericPassword } from 'react-native-keychain';
export const TOKENKEY = 'TOKENKEY';

const userAtom = atom({
  key: 'userAtom', // unique ID (with respect to other atoms/selectors)
  default: {
    userInfo: {

    },
  },
  effects: [
    ({ node, onSet }) => {
      onSet((oldValue, newValue) => {
        console.log(oldValue, newValue, 111111111111111);
      });
    },
  ],
});


const userAtomType = atom<IUserType>({
  key: 'userAtomType',
  default: IUserType.loginIn,
});



const userSelector = selector({
  key: 'userSelector',
  get: async ({ get, getCallback }) => {

    await loginApi({});
  },

});


export { userAtom, userSelector };
