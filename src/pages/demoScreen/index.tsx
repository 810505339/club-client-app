import BaseLayout from '@components/baselayout';
import { checkFace } from '@api/checkFace';
import { useCallback, useRef, useState } from 'react';
import { Button, Text } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationProp } from '@router/type';
import { BottomSheetFooter, BottomSheetModal } from '@gorhom/bottom-sheet';
import { Image, View } from 'react-native';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';




const DemoScreen = () => {

  const navigation = useNavigation();


  function toChat() {
    navigation.navigate('Chat', {
      conversation: {
        // userID: userId,
        conversationID: `c2c_${1755121255683485697}`,
        showName: '群聊',
        groupID: 1755121255683485697,
        type: 2,
        initialMessageList: [],
        unMount: (message: V2TimMessage[]) => { },
      },
    });
  }


  return (
    <BaseLayout>
      <Button onPress={toChat}>上传人脸</Button>
    </BaseLayout>
  );
};






export default DemoScreen;
