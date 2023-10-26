import BaseLayout from '@components/baselayout';
import { RefreshControl, View } from 'react-native';
import { Divider, List, Text } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { useImmer } from 'use-immer';

const Account = () => {

  const [data, setData] = useImmer({
    refreshing: false,
    list: [
      { id: '0', title: '手机', description: '0056-85649653' },
      { id: '1', title: '登录密码', description: '未设置' },
      { id: '2', title: '支付密码', description: '未设置' },
      { id: '3', title: '第三方账号绑定', description: '未设置' },

    ],
  });

  const onRefresh = () => {

  };
  const handleItemPress = () => {

  };
  const right = (item) => {
    return (<View className=" flex-row items-center">
      <Text className="text-[#ffffff7f] font-light text-xs">{item.description}</Text>
      <List.Icon icon="chevron-right" color="#ffffff7f" />
    </View>);

  };

  const renderItem = ({ item }) => {
    return (<List.Item title={item.title} className="bg-[#00000000]" background={'#00000000'} onPress={() => handleItemPress(item)} right={() => right(item)} />);
  };


  return (<BaseLayout className="bg-[#0B0B0BFF]">
    <Animated.View className={'mx-5 rounded-xl border border-[#ffffff19] mt-2.5'}>

      <Animated.FlatList

        ItemSeparatorComponent={() => <Divider className="text-[#ffffff19]" />}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        data={data.list}
        refreshControl={<RefreshControl refreshing={data.refreshing} onRefresh={onRefresh} />}
      />
    </Animated.View>
  </BaseLayout>);
};




export default Account;
