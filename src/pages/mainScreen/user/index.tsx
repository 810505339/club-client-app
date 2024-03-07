import BaseLayout from '@components/baselayout';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image, ImageBackground, Pressable, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { Appbar, Divider, List } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { UsertackParamList } from '@router/type';
import CheckAuthLayout from '@components/baselayout/checkLayout';
import { BlurView } from '@react-native-community/blur';
import { useRequest } from 'ahooks';
import { detailsById, mineInfo } from '@api/user';
import CustomModal from '@components/custom-modal';
import useLanguageSelect from './hooks/useLanguageSelect';
import { useImmer } from 'use-immer';


const bg1Icon = require('@assets/imgs/user/bg_1.png');
const bg2Icon = require('@assets/imgs/user/bg_2.png');
const bg3Icon = require('@assets/imgs/user/bg_3.png');
const manIcon = require('@assets/imgs/user/man.png');
const womanIcon = require('@assets/imgs/user/woman.png');
const certifiedIcon = require('@assets/imgs/user/certified.png');
const noCertifiedIcon = require('@assets/imgs/user/noCertified.png');
const logoIcon = require('@assets/imgs/base/logo.png');
const editIcon = require('@assets/imgs/user/edit.png');
const languageIcon = require('@assets/imgs/user/language.png');




type IListHeader = {
  balancePress: (name: string) => void
}
const ListHeader = ({ balancePress }: IListHeader) => {
  const { data } = useRequest(mineInfo);
  const { data: _userInfo } = useRequest(detailsById);
  /* 用户信息 */
  const userInfo = _userInfo?.data;
  const info = data?.data;


  const fontText = 'text-xs text-[#ffffff7f]';
  const box = 'items-center  h-28 pb-3 justify-end mb-2 relative';

  const sexIcon = userInfo?.gender === 1 ? manIcon : womanIcon;
  const isCertifiedIcon = userInfo?.checkFace ? certifiedIcon : noCertifiedIcon;
  const sexText = userInfo?.gender === 1 ? '男' : '女';
  const isCertifieText = userInfo?.checkFace ? '已性别认证' : '未性别认证';

  return <View className=" rounded-t-3xl">
    <View className="mb-8 px-5 flex   flex-row    box-border">
      <View className="w-24 h-24   rounded-full">
        {userInfo?.avatarUrl && <Image className={' w-24  h-24 rounded-full'} resizeMode="cover" source={{ uri: userInfo?.avatarUrl }} />}
      </View>
      <View className=" ml-5   flex-auto" >
        <View><Text className="text-lg text-[#fff] font-bold">{userInfo?.nickname}</Text></View>
        <View >
          <Text numberOfLines={1} ellipsizeMode="tail" className="text-white opacity-50">个性签名 {userInfo?.personalSignature}</Text>
        </View>
        <View className="flex-row mt-4">
          <View className="  h-6 rounded-xl  mr-2 items-end justify-center overflow-hidden">
            <BlurView
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: 0 }}
              blurType="dark"
              blurAmount={5}
              reducedTransparencyFallbackColor="transparent"

            />
            <Image source={isCertifiedIcon} className="w-4 h-4 absolute left-2" />
            <Text className=" text-xs pl-8 pr-2 text-white opacity-50">{isCertifieText}</Text>
          </View>

          {userInfo?.checkFace && <View className=" h-6 rounded-xl items-end justify-center overflow-hidden">
            <BlurView
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: 0 }}
              blurType="dark"
              blurAmount={5}
              reducedTransparencyFallbackColor="transparent"


            />
            <Image source={sexIcon} className="w-4 h-4 absolute left-2" />
            <Text className="text-xs pl-8 pr-2 text-white opacity-50">{sexText}</Text>
          </View>}



        </View>
      </View>
    </View>
    <View className="flex flex-row  gap-3  border-[#ffffff7f] pb-4 px-5">
      <TouchableOpacity className={`${box}  flex-grow`} onPress={() => balancePress('Information')} >
        <ImageBackground source={bg1Icon} className="absolute right-0 bottom-0 left-0 w-full h-full" />
        <Text className="text-[#E6A055FF]  text-2xl">{info?.balanceAmount}</Text>
        <Text className={fontText}>账户余额</Text>
      </TouchableOpacity>
      <TouchableOpacity className={`${box} w-20 `} onPress={() => balancePress('Coupons')} >
        <ImageBackground source={bg2Icon} className="absolute inset-0 w-full h-full" />
        <Text className="text-[#FF4DCEFF]  text-2xl">{info?.couponCount}</Text>
        <Text className={fontText}>优惠券</Text>
      </TouchableOpacity>
      <TouchableOpacity className={`${box} w-20`} onPress={() => balancePress('Orders')}>
        <ImageBackground source={bg3Icon} className="absolute inset-0 w-full h-full" />
        <Text className="text-[#2ECFFFFF] text-2xl ">{info?.orderCount}</Text>
        <Text className={fontText}>订单</Text>
      </TouchableOpacity>
    </View>
  </View >;
};


const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<UsertackParamList>>();

  useEffect(() => {
    navigation.setOptions({
      header: () => <Header navigation={navigation} />,
    });

  }, [navigation]);
  const [allData, setAllData] = useImmer({
    refreshing: false,
  });

  function onRefresh() {
    setAllData(draft => {
      draft.refreshing = true;
      draft.refreshing = false;
    });
  }



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
        refreshControl={<RefreshControl refreshing={allData.refreshing} onRefresh={onRefresh} />}
        data={cells}
      />
    </Animated.View>
  </BaseLayout>);
};



const Header = ({ navigation }) => {
  const { bottomSheetModalRef, languageList, showLanguage, selectLanguage, selectValue } = useLanguageSelect();

  function toUserInfo() {
    navigation.navigate('UserInfo');
  }

  return ((<Appbar.Header style={{ backgroundColor: 'transparent' }} className="flex-row items-center justify-between px-4  pb-4">
    <Image source={logoIcon} />
    <View className="flex-row items-center gap-x-4">
      <Pressable onPress={toUserInfo}>
        <Image source={editIcon} />
      </Pressable>
      <Pressable onPress={showLanguage}>
        <Image source={languageIcon} />
      </Pressable>
    </View>

    <CustomModal ref={bottomSheetModalRef} data={languageList} selectValue={selectValue} headerText="选择语言" onPress={selectLanguage} snapPoints={['50%']} />
  </Appbar.Header>));
};






export default HomeScreen;
