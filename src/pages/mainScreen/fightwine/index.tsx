import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, RefreshControl } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { RootStackParamList } from '@router/type';
import BaseLayout from '@components/baselayout';
import CheckLayout from '@components/baselayout/checkLayout';
import Animated from 'react-native-reanimated';
import { TabScreen, Tabs, TabsProvider } from 'react-native-paper-tabs';
import { useImmer } from 'use-immer';





const Item = () => {
  return <View className="bg-slate-500 m-2.5">
    <Text>1</Text>
  </View>;
};

const FightwineScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [data, setData] = useImmer({
    refreshing: false,
    cells: Array.from({ length: 10 }, (_, index) => ({ id: index })),
  });
  const onRefresh = () => {

  };



  return (
    <BaseLayout>
      <CheckLayout />
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
                renderItem={({ item }) => <Item {...item} />}
                ListFooterComponent={<Text className="text-center pb-5">没有更多</Text>}
                keyExtractor={item => item.id}
                data={data.cells}

                refreshControl={<RefreshControl refreshing={data.refreshing} onRefresh={onRefresh} />}
              />
            </View>
          </TabScreen>

          <TabScreen label="全部">
            <View className="bg-transparent" />
          </TabScreen>
        </Tabs>
      </TabsProvider>
    </BaseLayout>
  );
};
export default FightwineScreen;
