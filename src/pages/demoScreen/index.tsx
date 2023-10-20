import BaseLayout from '@components/baselayout';
import { checkFace } from '@api/checkFace';
import { useState } from 'react';
import { Button } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '@router/type';


const image = 'https://avatars.githubusercontent.com/u/15199031?v=4';

const DemoScreen = () => {
  const navigation = useNavigation<ScreenNavigationProp<'AuthenticationFacestatus'>>();
  const [base64Data, setbase64Data] = useState(image);

  async function getImage() {
    // const imageResponse = await fetch(`file://${image}`);
    const imageResponse = await fetch(`${image}`);
    const blobData = await imageResponse.blob();
    const base64Data = await blobToBase64(blobData);
    setbase64Data(base64Data);
    try {
      const { data } = await checkFace({ picBase64: base64Data as string });
      console.log(data);
      navigation.navigate('AuthenticationFacestatus', {
        status: data.success ? 1 : 0,
      });

    } catch (error) {

    }

  }

  function blobToBase64(blob: Blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }


  return (
    <BaseLayout>
      <Button onPress={getImage}>Image</Button>
      <Animated.Image source={{ uri: base64Data }} className="h-80" />
    </BaseLayout>
  );
};
export default DemoScreen;
