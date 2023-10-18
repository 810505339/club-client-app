import { atom, selector } from 'recoil';
import { IUserType } from './type';
import { loginApi } from '@api/login';
import { setGenericPassword } from 'react-native-keychain';
const TOKENKEY = 'TOKENKEY';

const userAtom = atom({
  key: 'userAtom', // unique ID (with respect to other atoms/selectors)
  default: {
    token: '',
    userInfo: {

    },
  },
  effects: [
    ({ node, onSet }) => {
      onSet((oldValue, newValue) => {
        console.log(oldValue, newValue);
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
  get: async ({ get }) => {
    const type = get(userAtomType);
    const user = get(userAtom);
    switch (type) {
      case IUserType.loginIn:
        await setGenericPassword(TOKENKEY, user.token);

      case IUserType.loginOut:

      default:
        return type;
    }
  },

});


export { userAtom, userSelector };
