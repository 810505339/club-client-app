import BaseLayout from '@components/baselayout';
import { RefreshControl, View } from 'react-native';
import { Text } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { useImmer } from 'use-immer';


const ListHeader = () => {
  return <View>
    <View className="bg-[#E6A055FF] m-5 h-36 rounded-2xl relative p-5">
      <Text className="text-[#0b0b0bbf] font-normal" style={{ fontSize: 10 }}>账户余额</Text>
      <Text className="text-[#0b0b0bbf]  text-5xl font-bold  mt-2" >$23562.00</Text>
      <View className="bg-[#3F1D0AFF] absolute left-1 right-1 z-5 h-2.5  bottom-8 rounded-2xl shadow" />
      <View className="h-16 bg-[#EE2737FF] absolute left-2.5 right-2.5 -bottom-7 z-10 rounded-b-2xl flex-col shadow items-center justify-center  " >
        <View className="flex-row items-center w-full justify-center">
          <Text className="text-[#0b0b0bbf]  text-center " style={{ fontSize: 10 }}>冻结金额</Text>
          <Text className="ml-2 w-28">$2653.00</Text>
        </View>
        <View className="flex-row items-center w-full  justify-center mt-2">
          <Text className="text-[#0b0b0bbf] " style={{ fontSize: 10 }}>可用金额</Text>
          <Text className="ml-2 w-28 ">$32653.00</Text>
        </View>
      </View>
    </View>
    <View>
      <Text className="mt-8 mx-5 mb-2.5">收支明细</Text>
    </View>
  </View>;
};


const renderItem = () => {
  return <View className="mx-5 h-16 bg-[#16161680] rounded-2xl my-2.5 flex-row items-center justify-between rounded-xl">
    <View>
      <Text className="text-white font-normal text-xs mb-1">取消拼酒局</Text>
      <Text className="text-[#ffffff7f] font-normal text-xs">2023-10-13 16:41:12</Text>
    </View>
    <View>
      <Text className="text-[#10C48FFF] font-bold text-2xl">+1280.00</Text>
    </View>
  </View>;
};

const Information = () => {
  const [data, setData] = useImmer({
    refreshing: false,
    cells: Array.from({ length: 10 }, (v: unknown, k: number) => ({ id: k, name: 1 })),
  });

  const onRefresh = () => {

  };


  return (<BaseLayout className="bg-[#0B0B0BFF]">
    <Animated.View>
      <Animated.FlatList
        ListHeaderComponent={() => <ListHeader />}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        data={data.cells}
        ListFooterComponent={<Text className="text-center pb-5">没有更多</Text>}
        refreshControl={<RefreshControl refreshing={data.refreshing} onRefresh={onRefresh} />}
      />
    </Animated.View>
  </BaseLayout>);

};

export default Information;
