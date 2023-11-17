import { useNavigation } from '@react-navigation/native';
import BaseLayout from '@components/baselayout';
import { View, Animated, Text, RefreshControl, Image, ImageSourcePropType, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { TabsProvider, Tabs, TabScreen } from 'react-native-paper-tabs';
import { ScreenNavigationProp } from '@router/type';
import { useImmer } from 'use-immer';
import { BlurView } from '@react-native-community/blur';
import { useEffect, useState } from 'react';



type IProps = {
  id: string
  img?: ImageSourcePropType,
  list?: string[],
  onPress: (id: string) => void
}

const DynamicItem = (props: IProps) => {
  const { id, img, list, onPress } = props;
  const boxClass = img != undefined ? 'h-[473]' : '';
  const tagPostion = img != undefined ? 'absolute top-2.5 left-2.5' : 'mr-2.5';

  const Type = () => <View className={`${tagPostion} w-12 h-8 rounded-2xl bg-[#00000066]  flex-row justify-center items-center`}>
    <Text className="text-sm font-normal text-white">活动</Text>
  </View>;

  const TagList = () => {
    return <View className="flex-row mt-2.5">
      {list?.map((item, index) => {
        return (<View key={index} className="mx-1 rounded-2xl overflow-hidden bg-[#ffffff19] ">
          <Text className="text-xs font-light text-[#ffffff7f] py-[3] px-2.5 ">{item}</Text>
        </View>);
      })}
    </View>;
  };



  return <TouchableOpacity onPress={() => onPress(id)} className={`m-5  rounded-2xl relative ${boxClass}   overflow-hidden flex-col justify-end bg-[#5E3C18FF]`}>
    {img && <ImageBackground key={'blurryImage'} source={img} className="absolute  left-0 right-0 bottom-0 top-0" style={{ flex: 1 }} />}
    {img && <Type />}
    <View className=" p-2.5 overflow-hidden">
      <BlurView
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: 0 }}
        blurType="dark"
        blurAmount={5}
        reducedTransparencyFallbackColor="transparent"

      />
      <View className="flex-row items-center justify-start ">
        {!img && <Type />}
        <Text className="text-white text-base font-semibold flex-auto" numberOfLines={1}>F1 Singapore Grand Prix 2023</Text>
      </View>
      {list && <TagList />}
      <View className="flex-auto mt-2.5 mb-5">
        <Text numberOfLines={2} className="text-xs font-light">The iconic racing event of the 2023 Singapore Grand Prix will return to the Marina Bay circuit from …</Text>
      </View>
      <View className="flex-row justify-between">
        <Text className="text-[#ffffff59] text-xs font-semibold">2023/09/15</Text>
        <View>
          <View />
          <Text className="text-[#ffffff59] text-xs font-semibold">1235465</Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>;
};






const Dynamic = () => {

  const navigation = useNavigation<ScreenNavigationProp<'DynamicInfo'>>();
  const [data, setData] = useImmer({
    refreshing: false,
    cells: Array.from({ length: 20 }, (_, index) => {
      const img = index % 2 === 0 ? require('@assets/imgs/demo/carousel-2.jpg') : undefined;
      const list = index % 3 === 0 ? ['#免费', '#需报名'] : undefined;


      return ({ id: `${index}`, img: img, list });
    }),
    types: ['全部', '待支付', '已支付', '支付失败', '已取消'],
    typeIndex: 0,
  });

  const onRefresh = () => {

  };
  const handleItemPress = (id: string) => {
    console.log(id);


    navigation.navigate('DynamicInfo', {
      id,
    });
  };

  return (<BaseLayout>

    <TabsProvider
      defaultIndex={0}
    // onChangeIndex={handleChangeIndex} optional
    >
      <Tabs
        uppercase={true} // true/false | default=true (on material v2) | labels are uppercase
        // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
        // iconPosition // leading, top | default=leading
        style={{ backgroundColor: 'transparent' }} // works the same as AppBar in react-native-paper
        dark={true} // works the same as AppBar in react-native-paper
        // theme={} // works the same as AppBar in react-native-paper
        mode="scrollable" // fixed, scrollable | default=fixed
        showLeadingSpace={false} //  (default=true) show leading space in scrollable tabs inside the header
        disableSwipe={false} // (default=false) disable swipe to left/right gestures
      >
        <TabScreen label="全部">
          <View className="bg-transparent">
            <Animated.FlatList
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <DynamicItem {...item} onPress={handleItemPress} />}
              ListFooterComponent={<Text className="text-center pb-5">没有更多</Text>}
              keyExtractor={item => (item.id)}
              data={data.cells}
              refreshControl={<RefreshControl refreshing={data.refreshing} onRefresh={onRefresh} />}
            />
          </View>
        </TabScreen>
        <TabScreen label="活动">
          <View className="bg-transparent" />
        </TabScreen>
        <TabScreen
          label="公告"
        // optional props
        // badge={true} // only show indicator
        // badge="text"
        // badge={1}
        // onPressIn={() => {
        //   console.log('onPressIn explore');
        // }}
        // onPress={() => {
        //   console.log('onPress explore');
        // }}
        >
          <View style={{ backgroundColor: 'red', flex: 1 }} />
        </TabScreen>
        <TabScreen
          label="动态"
        // optional props
        // badge={true} // only show indicator
        // badge="text"
        // badge={1}
        // onPressIn={() => {
        //   console.log('onPressIn explore');
        // }}
        // onPress={() => {
        //   console.log('onPress explore');
        // }}
        >
          <View />
        </TabScreen>
      </Tabs>
    </TabsProvider>
  </BaseLayout>);
};




export default Dynamic;
