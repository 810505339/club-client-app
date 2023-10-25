import BaseLayout from '@components/baselayout';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useMemo, useState } from 'react';
import { RefreshControl, Text, View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { UsertackParamList } from '@router/type';
const wait = (timeout: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
const image = 'https://avatars.githubusercontent.com/u/15199031?v=4';


const ListHeader = () => {
  const fontText = 'text-xs text-[#ffffff7f]';
  const box = 'items-center border border-red-500 h-28 pb-3 justify-end mb-2';

  return <View className=" rounded-t-3xl">
    <View className="mb-8 px-5 flex   flex-row border border-rose-500  box-border">
      <Animated.Image className={' w-24 h-24   rounded-full'} style={{ borderColor: '#98000CFF', borderWidth: 2, resizeMode: 'contain' }} source={{ uri: image }} />
      <View className=" ml-5 border border-blue-500 flex-auto" >
        <View><Text className="text-lg text-[#fff] font-bold">Romania Slovakiean</Text></View>
        <View className="border">
          <Text numberOfLines={1} ellipsizeMode="tail">个性签名asdasd asdasd asdasdasd Personal signatPersonal </Text>
        </View>
        <View className="flex-row mt-4">
          <View className="w-24  h-6 rounded-xl bg-[#ffffff7f] mr-2 items-end justify-center">
            <Text className=" text-[#ffffff19]  text-xs pr-2">已性别认证</Text>
          </View>
          <View className="w-12  h-6 rounded-xl bg-[#ffffff7f] items-end justify-center">
            <Text className=" text-[#ffffff19]   text-xs pr-2">男</Text>
          </View>


        </View>
      </View>
    </View>
    <View className="flex flex-row  gap-3  border-[#ffffff7f] pb-4 px-5">
      <View className={`${box}  flex-grow`}>
        <Text className="text-[#FF4DCEFF]  text-2xl">1</Text>
        <Text className={fontText}>账户余额</Text>
      </View>
      <View className={`${box} w-20`}>
        <Text className="text-[#FF4DCEFF]  text-2xl">1</Text>
        <Text className={fontText}>优惠券</Text>
      </View>
      <View className={`${box} w-20`}>
        <Text className="text-[#2ECFFFFF] text-2xl ">1</Text>
        <Text className={fontText}>订单</Text>
      </View>
    </View>
  </View >;
};


const HomeScreen = () => {

  const navigation = useNavigation<NativeStackNavigationProp<UsertackParamList>>();

  const cells = useMemo(() => {
    return ([
      { id: 1, title: '系统消息', left: '', right: '' },
      { id: 2, title: '账号与安全', left: '', right: '' },
      { id: 3, title: '0.2 L&C 门店', left: '', right: '' },
      { id: 4, title: '服务协议', left: '', right: '' },
      { id: 5, title: '联系客服', left: '', right: '' },
      { id: 6, title: '意见反馈', left: '', right: '' },
    ]);
  }, []);



  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  const handleItemPress = () => {
    navigation.navigate('SystemMessage');

  };

  const renderItem = ({ item }) => {
    return (<List.Item title={item.title} right={props => <List.Icon {...props} icon="chevron-right" />} onPress={handleItemPress} />);
  };

  return (<BaseLayout className="bg-[#0B0B0BFF]">
    <Animated.View>

      <Animated.FlatList
        ListHeaderComponent={ListHeader}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        data={cells}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </Animated.View>
  </BaseLayout>);
};






export default HomeScreen;
