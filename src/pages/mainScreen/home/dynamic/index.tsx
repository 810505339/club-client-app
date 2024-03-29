import { useNavigation } from '@react-navigation/native';
import BaseLayout from '@components/baselayout';
import { View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { TabsProvider, Tabs, TabScreen } from 'react-native-paper-tabs';
import { ScreenNavigationProp } from '@router/type';

import { BlurView } from '@react-native-community/blur';

import useGetDynamicType from './hooks/useGetDynamicType';
import CustomFlatList from '@components/custom-flatlist';
import { getDynamicList } from '@api/dynamic';

import { fileStore } from '@store/getfileurl';
import { useTranslation } from 'react-i18next';


const hot = require('@assets/imgs/base/hot.png');


type IProps = {
  id: string
  type: string,
  publishDate: string,
  pageView: string,
  pictureFile: any[]
  onPress: (id: string) => void
  dynamicTitleCn: string,
  dynamicTitleUk: string,
  dynamicContentCn: string,
  dynamicContentUk: string,
  amount: string,
  whetherSignUp: string // 是否报名 1:0
}

const DynamicItem = (props: IProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation<ScreenNavigationProp<'DynamicInfo'>>();
  const { id, onPress, type, pageView, publishDate, pictureFile, dynamicTitleCn, dynamicTitleUk, dynamicContentCn, dynamicContentUk, whetherSignUp, amount } = props;
  const source = pictureFile && { uri: fileStore.fileUrl + '/' + pictureFile[0]?.fileName };
  const boxClass = source != undefined ? 'h-[473]' : '';
  const tagPostion = source != undefined ? 'absolute top-2.5 left-2.5' : 'mr-2.5';
  const title = dynamicTitleCn;
  const content = dynamicContentCn;
  const signText = whetherSignUp == '1' ? t('dynamic.tagList.tag1') : '';
  const amountText = amount == '0' ? t('dynamic.tagList.tag2') : t('dynamic.tagList.tag3');

  const RenderList = () => {

    const tempList = [signText, amountText].filter(s => s);

    return tempList;
  };
  const list: string[] = RenderList();


  const handleItemPress = (id: string) => {
    console.log(id);
    navigation.navigate('DynamicInfo', {
      id,
      tagList: [type, ...list],
      title,
      content,
      publishDate,
      pageView,
      source,

    });
  };

  const Type = () => <View className={`${tagPostion} w-12 h-8 rounded-2xl bg-[#00000066]  flex-row justify-center items-center`}>
    <Text className="text-sm font-normal text-white">{type}</Text>
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



  return <TouchableOpacity onPress={() => handleItemPress(id)} className={`m-5  rounded-2xl relative ${boxClass}   overflow-hidden flex-col justify-end bg-[#5E3C18FF]`}>
    {pictureFile && <ImageBackground key={'blurryImage'} source={source} className="absolute  left-0 right-0 bottom-0 top-0" style={{ flex: 1 }} />}
    {pictureFile && <Type />}
    <View className=" p-2.5 overflow-hidden">
      <BlurView
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, top: 0 }}
        blurType="dark"
        blurAmount={5}
        reducedTransparencyFallbackColor="transparent"

      />
      <View className="flex-row items-center justify-start ">
        {!pictureFile && <Type />}
        <Text className="text-white text-base font-semibold flex-auto" numberOfLines={1}>{title}</Text>
      </View>
      {pictureFile && <TagList />}
      <View className="flex-auto mt-2.5 mb-5">
        {/* <Text numberOfLines={2} className="text-xs font-light">{content}</Text> */}
      </View>
      <View className="flex-row justify-between">
        <Text className="text-[#ffffff59] text-xs font-semibold">{publishDate}</Text>
        <View className="flex-row">
          <Image source={hot} />
          <Text className="text-[#ffffff59] text-xs font-semibold">
            {pageView}
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>;
};






const Dynamic = () => {



  const { dynamicTypeList, storeId } = useGetDynamicType();


  // const [data, setData] = useImmer({
  //   refreshing: false,
  //   cells: Array.from({ length: 20 }, (_, index) => {
  //     const img = index % 2 === 0 ? require('@assets/imgs/demo/carousel-2.jpg') : undefined;
  //     const list = index % 3 === 0 ? ['#免费', '#需报名'] : undefined;


  //     return ({ id: `${index}`, img: img, list });
  //   }),

  // });


  return (<BaseLayout showNoMore={dynamicTypeList?.length === 1} >
    {storeId && dynamicTypeList?.length >= 2 && <TabsProvider
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
        mode="fixed" // fixed, scrollable | default=fixed
        showLeadingSpace={false} //  (default=true) show leading space in scrollable tabs inside the header
        disableSwipe={false} // (default=false) disable swipe to left/right gestures
      >
        {dynamicTypeList.map((dynamicType) => {
          const typeId = dynamicType.isAll ? '' : dynamicType.id;

          return (<TabScreen label={dynamicType.name} key={dynamicType.id}>
            <View className="bg-transparent">
              <CustomFlatList keyExtractor={(item)=>item.id} renderItem={(item) => <DynamicItem {...item} />} params={{ typeId, storeId }} onFetchData={getDynamicList} key={dynamicType.id} />
            </View>
          </TabScreen>);
        })}

      </Tabs>
    </TabsProvider>}

  </BaseLayout>);
};




export default Dynamic;
