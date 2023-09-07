import {useNavigation} from '@react-navigation/native';
import {Layout, Text, Input, Button} from '@ui-kitten/components';

import {setGenericPassword, resetGenericPassword} from 'react-native-keychain';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const username = 'Akshay';

const Login = () => {
  const navigation = useNavigation();
  const onLogin = async () => {
    await setGenericPassword(username, token);
    navigation.goBack();
  };
  const onLoginOut = () => {
    resetGenericPassword();
  };

  return (
    <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Input />
      <Button onPress={onLogin}>login in</Button>
      <Button onPress={onLoginOut}>login out</Button>
    </Layout>
  );
};

export default Login;
