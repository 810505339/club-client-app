//发起酒局

import BaseLayout from '@components/baselayout';
import { ImageBackground, TouchableOpacity, View, Image, ImageSourcePropType } from 'react-native';
import { Text } from 'react-native-paper';
const bg1 = require('@assets/imgs/home/launch/bg1.png');
const bg2 = require('@assets/imgs/home/launch/bg2.png');
const bg3 = require('@assets/imgs/home/launch/bg3.png');
const bg4 = require('@assets/imgs/home/launch/bg4.png');
const btn = require('@assets/imgs/home/launch/btn.png');

type Item = {
  title: string;
  sub: string;
  bg: ImageSourcePropType;
  color: string;
}
const list: Item[] = [
  { title: '女A男免', sub: '参与者中女性付费，男性免费', bg: bg1, color: '#79ABFFFF' },
  { title: 'AA制', sub: '参与者均摊全部费用', bg: bg2, color: '#DF9E54FF' },
  { title: '我买单', sub: '参与者中您需付费，其余人免费', bg: bg3, color: '#63E2DDFF' },
  { title: '男A女免', sub: '参与者中男性付费，女性免费', bg: bg4, color: '#EE76ADFF' },
];
const Item = (props: Item) => {
  const { title, sub, bg, color } = props;
  return (<TouchableOpacity>
    <View className="m-2.5 h-28 box-border relative px-5 py-8 rounded-2xl overflow-hidden  flex-row justify-between items-center">
      <ImageBackground source={bg} className="h-28   absolute -z-10 left-0 right-0 bottom-0 top-0" />
      <View>
        <Text className=" font-semibold text-2xl mb-1" style={{ color: color }}>{title}</Text>
        <Text className="opacity-50 text-sm font-normal">{sub}</Text>
      </View>
      <View className="flex items-center justify-center ">
        <Image source={btn} className="relative z-20 w-8 h-8" />
      </View>
    </View>
  </TouchableOpacity>);
};
const Launch = () => {
  return (<BaseLayout>
    {list.map((l, i) => (<Item key={i} {...l} />))}
  </BaseLayout>);
};



export default Launch;
