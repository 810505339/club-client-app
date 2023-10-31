import { useNavigation } from '@react-navigation/native';
import BaseLayout from '@components/baselayout';
import { View, Animated, Text, RefreshControl } from 'react-native';
import { TabsProvider, Tabs, TabScreen } from 'react-native-paper-tabs';
import { ScreenNavigationProp } from '@router/type';
import { useImmer } from 'use-immer';
import { BlurView } from '@react-native-community/blur';




const DynamicItem = (props) => {
  const { } = props;
  return <View className="m-5 h-28 rounded-2xl bg-[#00000066]" >
    <BlurView
      className="absolute"
      blurType="dark"
      blurAmount={10}
      reducedTransparencyFallbackColor="white"
    />

  </View>;
};


const Dynamic = () => {

  const navigation = useNavigation<ScreenNavigationProp<'OrdersInfo'>>();
  const [data, setData] = useImmer({
    refreshing: false,
    cells: Array.from({ length: 20 }, (_, index) => {
      const img = index % 2 === 0 ? '' : undefined;


      return ({ id: `${index}`, img: img });
    }),
    types: ['全部', '待支付', '已支付', '支付失败', '已取消'],
    typeIndex: 0,
  });

  const onRefresh = () => {

  };
  const handleItemPress = () => {
    navigation.navigate('OrdersInfo');
  };

  return (<BaseLayout>
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
              renderItem={({ item }) => <DynamicItem />}
              ListFooterComponent={<Text className="text-center pb-5">没有更多</Text>}
              keyExtractor={item => (item.id)}
              data={data.cells}

              refreshControl={<RefreshControl refreshing={data.refreshing} onRefresh={onRefresh} />}
            />
          </View>
        </TabScreen>
        <TabScreen label="活动">
          <View className="bg-transparent" />
        </TabScreen>
        <TabScreen
          label="公告"
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
          label="动态"
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
  </BaseLayout>);
};

export default Dynamic;
