import BaseLayout from '@components/baselayout';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RefreshControl, View, TouchableWithoutFeedback } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { UsertackParamList } from '@router/type';
import { useImmer } from 'use-immer';

const SystemMessage = () => {
  const navigation = useNavigation<NativeStackNavigationProp<UsertackParamList>>();
  const [data, setData] = useImmer({
    refreshing: false,
    list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  });
  const onRefresh = () => {

  };

  const handleItemPress = () => {
    navigation.navigate('SystemMessageInfo');

  };



  const renderItem = ({ item }) => {
    return <TouchableWithoutFeedback onPress={handleItemPress}>
      <View className="mx-2.5 my-2 h-20 py-2.5 pr-2.5 px-6  flex-auto border border-[#2F2F2FBF] rounded-xl bg-[#2020207f] ">
        <View className="flex-row justify-between mb-1 relative pr-3  items-center ">
          <Text className="text-white font-semibold text-sm">0.2 Lounge & Club 介绍</Text>
          <Text className="text-[#ffffff7f]  text-xs">14:56</Text>
          <IconButton icon="chevron-right" size={12} iconColor="#ffffff7f" className="absolute -right-3" />
        </View>
        <View className="relative">
          {item === 1 && <View className="w-2 h-2 rounded-full absolute bg-[#EE2737FF] -left-4 top-1" />}

          <Text className="text-[#ffffff7f]  text-xs font-light" numberOfLines={2}>滨海湾金沙多概念餐饮和娱乐目的地的一部分，这是一种完全身临其境的夜总会体验，完美融合了设计…</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>;
  };
  const NoMore = () => (<View className="flex-auto  justify-center items-center">
    <Text className="text-[#ffffff7f]  text-xs">暂无消息</Text>
  </View>);

  const List = () => (<Animated.FlatList
    renderItem={renderItem}
    ListFooterComponent={<Text className="text-center pb-5">没有更多</Text>}
    keyExtractor={item => item}
    data={data.list}

    refreshControl={<RefreshControl refreshing={data.refreshing} onRefresh={onRefresh} />}
  />);


  return (<BaseLayout>
    {data.list.length <= 0 ? <NoMore /> : <List />}

  </BaseLayout>);
};

export default SystemMessage;
