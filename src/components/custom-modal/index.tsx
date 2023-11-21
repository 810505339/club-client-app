import Drawer from '@components/drawer';
import { FC, forwardRef, useEffect, useState } from 'react';
import { View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Button, RadioButton, Text } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
const headerIcon = require('@assets/imgs/base/header.png');

export type IItemProp = {
  name: string,
  id: string,
}

const Item: FC<IItemProp> = (props) => {
  const { name, id } = props;
  return <View className="mx-5 px-2.5  rounded-xl  flex flex-row items-center border border-[#2D2424] justify-between h-10 mb-4 bg-[#221F1F80]">
    <Text className="text-white text-sm font-semibold" >{name}</Text>
    <RadioButton value={id} color="#EE2737FF" />
  </View>;
};

const ListHeaderComponent: FC<{ headerText?: string }> = ({ headerText = '标 题' }) => {
  return <View className="relative h-20 w-full">
    <FastImage
      className="absolute h-full w-full inset-0 -z-10"
      source={headerIcon}
      resizeMode={FastImage.resizeMode.cover}
    />
    <View className="h-full flex items-center">
      <View className="rounded w-10 h-1  mt-2 bg-[#0B0B0B]" />
      <View className="h-12 justify-center">
        <Text className="text-lg font-bold text-white" >{headerText}</Text>
      </View >
    </View >
  </View >;
};

const ListFooterComponent: FC<{ btnText?: string, onPress: () => void }> = ({ btnText = '确定', onPress }) => {
  return <View className="px-5" >
    <Button
      mode="outlined"
      style={{ borderColor: '#EE2737', backgroundColor: '#EE2737', height: 50, borderRadius: 33 }}
      labelStyle={{
        fontSize: 18,
        color: '#0C0C0CFF',
        fontWeight: '600',
      }}
      contentStyle={{ height: 50 }}
      onPress={onPress}
    >
      {btnText}
    </Button>
  </View>;
};


export type IModalProp = {
  btnText?: string;
  headerText?: string;
  data: IItemProp[],
  onPress: (value: IItemProp | undefined) => void,
  selectValue: string,
  snapPoints: string[]
}



const CustomModal = forwardRef<BottomSheetModal, IModalProp>((props, ref) => {
  const { btnText, headerText, data, onPress, selectValue,snapPoints } = props;
  const [value, setValue] = useState<string>(selectValue);
  useEffect(() => {
    setValue(selectValue);
  }, [selectValue]);
  function onDismiss() {
    setValue(selectValue);
  }

  //['33.3%']
  return <Drawer snapPoints={snapPoints} ref={ref} onDismiss={onDismiss} >
    <View className="h-full pb-5">
      <ListHeaderComponent headerText={headerText} />
      <RadioButton.Group onValueChange={(value) => setValue(value)} value={value}>
        {data.map((item) => <Item key={item.id} {...item} />)}
      </RadioButton.Group>
      <ListFooterComponent btnText={btnText} onPress={() => onPress(data?.find(d => d.id == value))} />
    </View>
  </Drawer>;
});




export default CustomModal;
