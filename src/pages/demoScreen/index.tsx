import BaseLayout from '@components/baselayout';
import { checkFace } from '@api/checkFace';
import { useCallback, useRef, useState } from 'react';
import { Button, Text } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '@router/type';
import { BottomSheetFooter, BottomSheetModal } from '@gorhom/bottom-sheet';
import { View } from 'react-native';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';


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

      <TestDrawer />
      {/* <Animated.Image source={{ uri: base64Data }} className="h-80" /> */}
    </BaseLayout>
  );
};



const TestDrawer = () => {
  const ref = useRef<BottomSheetModalMethods>(null);
  const handleClick = () => {
    console.log(ref.current);
    ref.current?.present();
  };
  // renders
  const renderFooter = useCallback(
    props => (
      <BottomSheetFooter {...props} bottomInset={24}>
        <View >
          <Text>Footer</Text>
        </View>
      </BottomSheetFooter>
    ),
    []
  );
  return <View>
    <Button onPress={handleClick}>弹窗</Button>
    <BottomSheetModal
      ref={ref}
      enablePanDownToClose
      snapPoints={['50%']}
      keyboardBlurBehavior="restore"
      enableContentPanningGesture={false}
      handleHeight={0}
      handleComponent={null}
      backgroundStyle={{

      }}
      style={{ borderRadius: 20, overflow: 'hidden' }}
      footerComponent={renderFooter}
    >
      <View>
        <Text>你好</Text>
      </View>
    </BottomSheetModal>
  </View>;
};


export default DemoScreen;
