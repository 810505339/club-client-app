import BaseLayout from '@components/baselayout';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlatList, RefreshControl, View } from 'react-native';
import { Button, Divider, List, Text } from 'react-native-paper';
import { RootStackParamList, UsertackParamList } from '@router/type';
import { useImmer } from 'use-immer';
import storage from '@storage/index';
import { resetGenericPassword } from 'react-native-keychain';

const Account = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [data, setData] = useImmer({
    refreshing: false,
    info: [
      { id: 'AccountPhone', title: '手机', description: '0056-85649653' },
      { id: '1', title: '登录密码', description: '未设置' },
      { id: '2', title: '支付密码', description: '未设置' },
      { id: '3', title: '第三方账号绑定', description: '未设置' },
    ],
    third: [
      { id: 'AccountPhone', title: 'Apple ID', description: '0056-85649653' },
      { id: '1', title: 'Google', description: '未设置' },
      { id: '2', title: 'Facebook', description: '未设置' },
      { id: '3', title: 'X', description: '未设置' },
      { id: '4', title: 'WeChat', description: '未设置' },
    ],
  });

  async function handleOut() {
    //退出登录
    await storage.clearMap();
    await resetGenericPassword();
    navigation.navigate('HomeTabs');

  }
  const handleItemPress = (item) => {
    navigation.navigate(item.id);
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
    <View className="p-2">
      <Text className="pl-2 font-bold my-4">基础账号设置</Text>
      <View className="rounded-xl border border-[#343434] bg-[#191919]">
        <FlatList
          data={data.info}
          ItemSeparatorComponent={Divider}
          keyExtractor={(item) => item.id}
          renderItem={renderItem} />
      </View>
    </View>
    <View className="p-2">
      <Text className="pl-2 font-bold my-4">第三方账号绑定</Text>
      <View className="rounded-xl border border-[#343434] bg-[#191919]">
        <FlatList
          data={data.third}
          ItemSeparatorComponent={Divider}
          keyExtractor={(item) => item.id}
          renderItem={renderItem} />
      </View>
    </View>
    <View className="p-5 flex-1 flex-row items-end">
      <Button mode="outlined" className="flex-1" textColor="white" onPress={handleOut} >退出登录</Button>
    </View>
  </BaseLayout>);
};




export default Account;
