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



const BG = require('@assets/imgs/home/bg.png');


const renderItem = ({ item, handleItemPress }) => {
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

  const navigation = useNavigation();
  const [data, setData] = useImmer({
    refreshing: false,
    cells: [1, 2, 3, 4, 5, 6, 7],
    visible: false,

  });

  const containerStyle = { backgroundColor: 'white', padding: 20 };

  const hideModal = () => {
    setData(draft => {
      draft.visible = false;
    });
  };

  const onRefresh = () => {

  };

  const handleItemPress = useCallback((item) => {
    setData(draft => {
      draft.visible = true;
    });


  }, [data]);



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
          <TabScreen label="全部">
            <View className="bg-transparent">
              <Animated.FlatList
                ListHeaderComponent={<Text className="text-center pt-5 pb-2.5">营业时间内可以入场，请安排好您的时间</Text>}
                renderItem={({ item }) => renderItem({ item, handleItemPress })}
                ListFooterComponent={<Text className="text-center pb-5">没有更多</Text>}
                keyExtractor={item => item}
                data={data.cells}

                refreshControl={<RefreshControl refreshing={data.refreshing} onRefresh={onRefresh} />}
              />
            </View>
          </TabScreen>
          <TabScreen label="未使用">
            <View className="bg-transparent" />
          </TabScreen>
          <TabScreen
            label="已使用"
          // optional props
          // badge={true} // only show indicator
          // badge="text"
          // badge={1}
          // onPressIn={() => {
          //   console.log('onPressIn explore');
          // }}
          // onPress={() => {
          //   console.log('onPress explore');
          // }}
          >
            <View style={{ backgroundColor: 'red', flex: 1 }} />
          </TabScreen>
          <TabScreen
            label="已过期"
          // optional props
          // badge={true} // only show indicator
          // badge="text"
          // badge={1}
          // onPressIn={() => {
          //   console.log('onPressIn explore');
          // }}
          // onPress={() => {
          //   console.log('onPress explore');
          // }}
          >
            <View />
          </TabScreen>
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
