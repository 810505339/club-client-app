import { Image, ImageBackground, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import {
  Button,
  Title,
  Paragraph, Text, Portal, Modal,
} from 'react-native-paper';
import {
  Tabs,
  TabScreen,
  TabsProvider,
  useTabIndex,
  useTabNavigation,
} from 'react-native-paper-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import BaseLayout from '@components/baselayout';
import Animated from 'react-native-reanimated';
import { useImmer } from 'use-immer';
import { memo, useCallback, useEffect } from 'react';
import { checkAuth } from '@utils/checkAuth';
import { useNavigation } from '@react-navigation/native';
import CheckAuthLayout from '@components/baselayout/checkLayout';
import { useRequest } from 'ahooks';
import { myTicket } from '@api/ticket';
import CustomFlatList from '@components/custom-flatlist';
import QRCode from 'react-native-qrcode-svg';

const qrCodeImage = require('@assets/imgs/base/qrcode.png');
const modalBg = require('@assets/imgs/modal/ticket-head-bg.png');
const modalIcon = require('@assets/imgs/modal/ticket-icon.png');

const style = StyleSheet.create({
  modal: {

    height: 400,

  },
});


const Item = memo<any>((props: any) => {
  console.log('renderItem');

  const { entranceDate, usableTimeBegin, usableTimeEnd, areaName, boothName, usageType, latestArrivalTime, handleItemPress, ticketPicture, remainNum } = props;

  const useTime = usageType === 'TICKET' ? `${usableTimeBegin}-${usableTimeEnd}使用` : `最迟入场${latestArrivalTime}`;
  const NumberRender = remainNum && <View className="bg-[#000000] rounded-xl absolute p-2 bottom-2 left-5">
    <Text>
      x
      <Text className="font-bold ">{remainNum}</Text>
    </Text>
  </View>;

  return <TouchableWithoutFeedback onPress={() => handleItemPress()}>
    <View className="w-80 h-32 bg-[#FFFFFF1A] mx-auto  my-3   justify-center flex-row items-center rounded-xl border py-5 ">
      <View className="w-36 h-24 relative  rounded-xl -left-5 ">
        {ticketPicture && <Image source={{ uri: ticketPicture }} className="w-36 h-24 rounded-xl" />}
        {NumberRender}
      </View>
      <View className=" h-full  flex-grow  overflow-hidden flex-col relative">
        <View>
          <Text className="text-white text-lg font-600">{entranceDate}</Text>
          <Text className="text-[#ffffff7f] text-xs" >{useTime}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text className="absolute bottom-0 text-white text-sm">{areaName}{boothName && `  -  ${boothName}`}</Text>
        </View>

        <View className="bg-[#FFFFFF33] w-5 h-5 rounded border border-red-100 absolute z-10 right-5 flex items-center justify-center " >
          <Image source={qrCodeImage} className="w-4 h-4" />
        </View>

      </View>
    </View>
  </TouchableWithoutFeedback>;
});

const TicketScreen = () => {

  const tabs = [
    {
      title: '未使用',
      status: 'UNUSED',
    },
    {
      title: '已使用',
      status: 'USED',
    },
    {
      title: '已过期',
      status: 'EXPIRED',
    },
  ];
  const navigation = useNavigation();
  const [data, setData] = useImmer({
    defaultIndex: 0,
    visible: false,

  });

  const containerStyle = { background: '#1E1E1E', padding: 20, margin: 20 };

  useRequest(myTicket, {
    onSuccess: (res) => {
      console.log(res);

    },

  });

  const hideModal = () => {
    setData(draft => {
      draft.visible = false;
    });
  };

  const api = useCallback(myTicket, []);


  const handleItemPress = useCallback(() => {
    setData(draft => {
      draft.visible = true;
    });
  }, [setData]);


  const handleChangeIndex = (index: number) => {
    setData(draft => {
      draft.defaultIndex = index;
    });
  };

  const getId = useCallback((item: any) => item.cusTicketId, []);
  return (
    <BaseLayout className="relative">
      <CheckAuthLayout />
      <TabsProvider
        defaultIndex={data.defaultIndex}
        onChangeIndex={handleChangeIndex}
      >
        <Tabs
          uppercase={true} // true/false | default=true (on material v2) | labels are uppercase
          // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
          // iconPosition // leading, top | default=leading
          style={{ backgroundColor: 'transparent' }} // works the same as AppBar in react-native-paper
          dark={true} // works the same as AppBar in react-native-paper
          // theme={} // works the same as AppBar in react-native-paper
          mode="scrollable" // fixed, scrollable | default=fixed
          showLeadingSpace={false} //  (default=true) show leading space in scrollable tabs inside the header
          disableSwipe={false} // (default=false) disable swipe to left/right gestures
        >

          {
            tabs.map((tab, index) => (
              <TabScreen label={tab.title} key={index}>
                <View className="bg-transparent">
                  {index === data.defaultIndex && <CustomFlatList keyExtractor={getId} params={{ status: tabs[index].status }} renderItem={(item) => <Item  {...item} handleItemPress={handleItemPress} />} onFetchData={api} />}
                </View>
              </TabScreen>
            ))
          }

        </Tabs>
      </TabsProvider>

      <Portal>
        <Modal visible={data.visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <View className="bg-[#1E1E1E] relative flex items-center" style={style.modal}>
            <ImageBackground source={modalBg} className="w-full h-44" />
            <Image source={modalIcon} className="absolute -top-10" />
            <View className="rounded-xl border p-2.5 bg-white   absolute   inset-0 top-28 flex flex-row items-center justify-center">
              <QRCode
                value="https://www.baidu.com/"
                size={260}
                logoBackgroundColor="transparent" />
            </View>
          </View>

        </Modal>
      </Portal>
    </BaseLayout>
  );
};
export default TicketScreen;
