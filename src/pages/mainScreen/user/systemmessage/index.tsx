import BaseLayout from '@components/baselayout';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Text, IconButton, Button } from 'react-native-paper';
import { UsertackParamList } from '@router/type';
import CustomFlatlist from '@components/custom-flatlist';
import { customerMessage, updateRead } from '@api/user';
import { FC, PropsWithChildren, useEffect, useRef } from 'react';

export type IItemProps = {
  content: string;
  messageTime: string;
  read: boolean;
  title: string;
  id: string
}

const SystemMessage = () => {

  const navigation = useNavigation<NativeStackNavigationProp<UsertackParamList>>();
  const flatlist = useRef();
  const handleItemPress = (id: string) => {
    navigation.navigate('SystemMessageInfo', {
      id: id,
    });
  };
  /* 全部已读 */
  const handleAllRead = async () => {
    const data = await updateRead();

    if (data.success) {
      flatlist.current!.refreshData();
    }

  };

  const HeaderRight = () => {
    return <Button icon="notification-clear-all" textColor="#ffffff" onPress={handleAllRead}>全部已读</Button>;
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderRight />,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);



  const renderItem: FC<PropsWithChildren<IItemProps>> = (props) => {
    console.log(props);

    const { content, messageTime, read, title, id } = props;
    return <TouchableWithoutFeedback onPress={() => handleItemPress(id)}>
      <View className="mx-2.5 my-2 h-20 py-2.5 pr-2.5 px-6  flex-auto border border-[#2F2F2FBF] rounded-xl bg-[#2020207f] ">
        <View className="flex-row justify-between mb-1 relative pr-3  items-center ">
          <Text className="text-white font-semibold text-sm">{title}</Text>
          <Text className="text-[#ffffff7f]  text-xs">{messageTime}</Text>
          <IconButton icon="chevron-right" size={12} iconColor="#ffffff7f" className="absolute -right-4" />
        </View>
        <View className="relative">
          {!read && <View className="w-2 h-2 rounded-full absolute bg-[#EE2737FF] -left-4 top-1" />}
          <Text className="text-[#ffffff7f]  text-xs font-light" numberOfLines={2}>{content}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>;
  };





  return (<BaseLayout>
    <CustomFlatlist keyExtractor={(item) => item.id} renderItem={(item) => renderItem(item)} onFetchData={customerMessage} ref={flatlist} />
  </BaseLayout>);
};

export default SystemMessage;
