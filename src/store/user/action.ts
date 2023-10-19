import { TOKENKEY, userAtom } from '@store/user';
import { useSetRecoilState } from 'recoil';
import { loginApi } from '@api/login';
import { setGenericPassword } from 'react-native-keychain';


function useUserActions() {

  useSetRecoilState(userAtom);
  return {
    login,
  };


  async function login({ code, mobile }: { code: string, mobile: string }) {
    const { data } = await loginApi({ code, mobile });
    console.log(data);

    await setGenericPassword(TOKENKEY, data.access_token);
    return data;

  }
}

export {
  useUserActions,
};
