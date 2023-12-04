import BaseLayout from '@components/baselayout';
import BoothsList from '../home/components/boothList';
import { useRequest } from 'ahooks';
import { getBoothByAreaId, getByBoothId } from '@api/booths';
import dayjs from 'dayjs';
import { Image, ImageBackground, View } from 'react-native';
import { Text } from 'react-native-paper';
import NumberInput from '@components/number-input';
const boy = require('@assets/imgs/fightwine/boys.png');
const girls = require('@assets/imgs/fightwine/girls.png');
const Booths = () => {

  const list = [
    { label: '选择卡座', render: () => <BoothsList /> },
    {
      label: '设置参与人数', render: () => (<View>
        <Text className="text-center mb-5 text-[10px]">您选择的卡座最多可容纳<Text className="text-[#E6A055FF] font-bold">6</Text>人</Text>
        <View className=" flex flex-row justify-between items-center">
        <View className="flex-col  items-center">
            <View  className=" w-[100px]  h-[100px] mb-2.5">
              <Image source={boy} className="flex-auto" />
              <View className=" absolute z-10 left-0 right-0 top-0 bottom-0 justify-center items-center">
                <Text className="  text-2xl font-semibold m-auto">男</Text>
              </View>
            </View>
            <NumberInput />
          </View>
          <View className="flex-col  items-center">
            <View  className=" w-[100px]  h-[100px] mb-2.5">
              <Image source={girls} className="flex-auto" />
              <View className=" absolute z-10 left-0 right-0 top-0 bottom-0 justify-center items-center">
                <Text className="  text-2xl font-semibold m-auto">女</Text>
              </View>
            </View>
            <NumberInput />
          </View>
        </View>
      </View>),
    },
     { label: '选择套餐', render: () => {


     } },

  ];
  // useRequest(() => getBoothByAreaId({
  //   areaId: '1729527795912048641',
  //   entranceDate: dayjs().format('YYYY-MM-DD'),
  // }));




  return (<BaseLayout className="">
    <View className="p-5">
      {list.map((item, i) => (
        <View className="mb-8" key={i}>
          <Text className="text-xs font-semibold mb-2.5">{item.label}</Text>
          {item.render()}
        </View>
      ))}



    </View>
  </BaseLayout>);
};

export default Booths;
