import { Image, ImageBackground, RefreshControl, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
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
import { useCallback, useEffect } from 'react';
import { checkAuth } from '@utils/checkAuth';
import { useNavigation } from '@react-navigation/native';
import CheckAuthLayout from '@components/baselayout/checkLayout';
import { useRequest } from 'ahooks';
import { myTicket } from '@api/ticket';
import CustomFlatList from '@components/custom-flatlist';



const BG = require('@assets/imgs/home/bg.png');


const Item = ({ item, handleItemPress }) => {
  return <TouchableWithoutFeedback onPress={() => handleItemPress(item)}>
    <View className="w-80 h-32 bg-[#FFFFFF1A] mx-auto  my-3   justify-center flex-row items-center rounded-xl border py-5 ">
      <View className="w-36 h-24 relative border border-red-500 rounded-xl -left-5 ">
        {/* <Image source={BG} className="absolute z-10 -left-10"  /> */}
      </View>
      <View className=" h-full  flex-grow  overflow-hidden flex-col relative">
        <View>
          <Text className="text-white text-lg font-600">2023/11/16</Text>
          <Text className="text-[#ffffff7f] text-xs">仅限当日 18:00-23:00 使用</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text className="absolute bottom-0 text-white text-sm">Lounge</Text>
        </View>

        <View className="bg-[#FFFFFF33] w-5 h-5 rounded border border-red-100 absolute z-10 right-5" />
      </View>
    </View>
  </TouchableWithoutFeedback>;
};

const TicketScreen = () => {

  const tabs = [
    {
      title: '全部',
      status: undefined,
    },
    {
      title: '已使用',
      status: 'USED',
    },
    {
      title: '未使用',
      status: 'UNUSED',
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

  const containerStyle = { backgroundColor: 'white', padding: 20 };

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



  const handleItemPress = useCallback((item) => {
    setData(draft => {
      draft.visible = true;
    });


  }, [data.visible]);



  return (
    <BaseLayout className="relative">
      <CheckAuthLayout />
      <TabsProvider
        defaultIndex={0}
      // onChangeIndex={handleChangeIndex} optional
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
                  <CustomFlatList renderItem={(item) => <Item  {...item} handleItemPress={handleItemPress} />} onFetchData={myTicket} />
                </View>
              </TabScreen>
            ))
          }

        </Tabs>
      </TabsProvider>

      <Portal>
        <Modal visible={data.visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
    </BaseLayout>
  );
};
export default TicketScreen;
