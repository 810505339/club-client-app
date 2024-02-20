import BaseLayout from '@components/baselayout';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useMemo, useState } from 'react';
import { ImageBackground, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { UsertackParamList } from '@router/type';
import CheckAuthLayout from '@components/baselayout/checkLayout';
import { BlurView } from '@react-native-community/blur';

const bg1Icon = require('@assets/imgs/user/bg_1.png');
const bg2Icon = require('@assets/imgs/user/bg_2.png');
const bg3Icon = require('@assets/imgs/user/bg_3.png');

const wait = (timeout: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};
const image = 'https://avatars.githubusercontent.com/u/15199031?v=4';



type IListHeader = {
  balancePress: (name: string) => void
}
const ListHeader = ({ balancePress }: IListHeader) => {
  const fontText = 'text-xs text-[#ffffff7f]';
  const box = 'items-center  h-28 pb-3 justify-end mb-2 relative';

  return <View className=" rounded-t-3xl">
    <View className="mb-8 px-5 flex   flex-row    box-border">
      <Animated.Image className={' w-24 h-24   rounded-full'} style={{ resizeMode: 'contain' }} source={{ uri: image }} />
      <View className=" ml-5   flex-auto" >
        <View><Text className="text-lg text-[#fff] font-bold">Romania Slovakiean</Text></View>
        <View className="">
          <Text numberOfLines={1} ellipsizeMode="tail">个性签名asdasd asdasd asdasdasd Personal signatPersonal </Text>
        </View>
        <View className="flex-row mt-4">
          <View className="w-24  h-6 rounded-xl  mr-2 items-end justify-center overflow-hidden">
            <BlurView
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: 0 }}
              blurType="dark"
              blurAmount={5}
              reducedTransparencyFallbackColor="transparent"

            />
            <Text className=" text-xs pr-2">已性别认证</Text>
          </View>
          <View className="w-12  h-6 rounded-xl items-end justify-center overflow-hidden">
            <BlurView
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: 0 }}
              blurType="dark"
              blurAmount={5}
              reducedTransparencyFallbackColor="transparent"

            />
            <Text className="    text-xs pr-2">男</Text>
          </View>


        </View>
      </View>
    </View>
    <View className="flex flex-row  gap-3  border-[#ffffff7f] pb-4 px-5">
      <TouchableOpacity className={`${box}  flex-grow`} onPress={() => balancePress('Information')} >
        <ImageBackground source={bg1Icon} className="absolute left-0 right-0 bottom-0 left-0 w-full h-full" />
        <Text className="text-[#E6A055FF]  text-2xl">1</Text>
        <Text className={fontText}>账户余额</Text>
      </TouchableOpacity>
      <TouchableOpacity className={`${box} w-20 `} onPress={() => balancePress('Coupons')} >
        <ImageBackground source={bg2Icon} className="absolute inset-0 w-full h-full" />
        <Text className="text-[#FF4DCEFF]  text-2xl">1</Text>
        <Text className={fontText}>优惠券</Text>
      </TouchableOpacity>
      <TouchableOpacity className={`${box} w-20`} onPress={() => balancePress('Orders')}>
        <ImageBackground source={bg3Icon} className="absolute inset-0 w-full h-full" />
        <Text className="text-[#2ECFFFFF] text-2xl ">1</Text>
        <Text className={fontText}>订单</Text>
      </TouchableOpacity>
    </View>
  </View >;
};


const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<UsertackParamList>>();
  const cells = useMemo(() => {
    return ([
      { id: 'SystemMessage', title: '系统消息', left: '', right: '' },
      { id: 'Account', title: '账号与安全', left: '', right: '' },
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

  const balancePress = (name: string) => {
    navigation.navigate(name);
  };

  const handleItemPress = (item) => {
    navigation.navigate(item.id);

  };

  const renderItem = ({ item }) => {
    return (<List.Item title={item.title} right={props => <List.Icon {...props} icon="chevron-right" />} onPress={() => handleItemPress(item)} />);
  };

  return (<BaseLayout className="bg-[#0B0B0BFF]">
    <CheckAuthLayout />
    <Animated.View>

      <Animated.FlatList
        ListHeaderComponent={() => <ListHeader balancePress={balancePress} />}
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
