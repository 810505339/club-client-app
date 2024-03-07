import { FC, useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { useImmer } from 'use-immer';
import { fileStore } from '@store/getfileurl';
import { useRequest } from 'ahooks';
import { getByBoothId } from '@api/booths';
import uuid from 'react-native-uuid';
import { useTranslation } from 'react-i18next';
type IProps = {
  onPress: (index: number) => void
  index: number
  activeIndex: number,
  name: string,
  pictureFileVOs: any[],
  introduction: string
}
const img = require('@assets/imgs/base/booth_card.png');




const PackageItem = (props: IProps) => {
  const { onPress, index, activeIndex, name, pictureFileVOs, introduction } = props;
  console.log(pictureFileVOs, 'pictureFIleVOs');
  const source = pictureFileVOs ? { uri: fileStore.fileUrl + '/' + pictureFileVOs[0]?.fileName } : img;




  const border = index === activeIndex ? 'border-2 border-[#E6A055FF]' : '';
  return (<TouchableOpacity onPress={() => onPress(index)} >
    <View className={` w-24 h-16 mx-5 rounded-xl ${border} overflow-hidden `} >
      <Image resizeMode="cover" source={source} className="w-24 h-16 " />
    </View>
    <Text className="text-white text-xs font-semibold mt-2.5 truncate">{name}</Text>
    <Text className="opacity-50 text-white w-24" style={{ fontSize: 10 }} >{introduction}</Text>
  </TouchableOpacity>);
};

export type IAreaListProps = {
  boothId: string,
  onChange?: (list: any[], index: number | undefined) => void
}
const PackageList: FC<IAreaListProps> = (props) => {

  const { t } = useTranslation();
  const initList = [
    {
      id: uuid.v4(),
      name: t('confirmBooth.label3'),
      introduction: t('confirmBooth.label4'),

    },
  ];/*  */
  const { boothId, onChange } = props;
  const [data, setData] = useImmer({
    cells: initList,
    activeIndex: undefined,
  });
  const onPress = (index: number) => {
    setData(draft => {
      draft.activeIndex = index;
    });
    onChange?.(data.cells, index);
  };

  const { run } = useRequest(() => getByBoothId(boothId), {
    manual: true,
    onSuccess: (res) => {

      console.log(res.data, '酒水套餐');

      setData(draft => {
        draft.cells = [...res.data, ...initList] ?? initList;
        draft.activeIndex = undefined;
      });
    },
  });

  useEffect(() => {
    if (boothId) {
      run();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boothId]);


  return <Animated.FlatList horizontal showsHorizontalScrollIndicator={false} data={data.cells} keyExtractor={item => item.id} renderItem={({ index, item }) => <PackageItem {...item} index={index} activeIndex={data.activeIndex} onPress={onPress} />} />;

};

export default PackageList;

