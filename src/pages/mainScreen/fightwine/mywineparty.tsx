/* 我的酒局 */

import BaseLayout from '@components/baselayout';
import CheckLayout from '@components/baselayout/checkLayout';
import { View } from 'react-native';
import { TabScreen, Tabs, TabsProvider } from 'react-native-paper-tabs';
import { Item } from './index';
import { useImmer } from 'use-immer';
import CustomFlatList from '@components/custom-flatlist';
import React, { useEffect, useRef } from 'react';
import { myWinePartyApi } from '@api/fightwine';
import { STATE } from './detail';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@router/type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Checkbox, Text } from 'react-native-paper';

const modeList = [
  {
    label: '全部',
    key: '1',
    winePartyStatus: undefined,
  },
  {
    label: '未开始',
    key: '2',
    winePartyStatus: STATE.未开始,
  },
  {
    label: '待入场',
    key: '3',
    winePartyStatus: STATE.待入场,
  },
  {
    label: '已入场',
    key: '4',
    winePartyStatus: STATE.已入场,
  },
  {
    label: '已取消',
    key: '5',
    winePartyStatus: STATE.已取消,
  },
  {
    label: '进行中',
    key: '6',
    winePartyStatus: STATE.进行中,
  },
];

const MyWineParty = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [data, setData] = useImmer({
    defaultIndex: 0,
    isPromoter: false,
  });
  const Dom = useRef();
  useEffect(() => {
    navigation.setOptions({
      headerRight: (props) => <View className="flex-row items-center">
        <Checkbox status={data.isPromoter ? 'checked' : 'unchecked'} onPress={changePromoter} />
        <Text>我发起的</Text>
      </View>,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, data.isPromoter]);


  const handleChangeIndex = (index: number) => {
    setData(draft => {
      draft.defaultIndex = index;
    });
  };

  const toUrl = (id: string) => {
    navigation.navigate('FightwineDetail', { partyId: id });
  };

  /* 是否是发起人 点击checkbox */
  function changePromoter() {
    setData(draft => {
      draft.isPromoter = !draft.isPromoter;
    });
    Dom.current.refreshData();

  }


  return (<BaseLayout>
    <CheckLayout />
    <TabsProvider
      defaultIndex={0}
      onChangeIndex={handleChangeIndex}
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

        {modeList.map((m, index) => (<TabScreen key={m.key} label={m.label}>
          <View className="bg-transparent">
            {/* params={{ winePartyMode: m.winePartyMode }} */}
            {index === data.defaultIndex && <CustomFlatList keyExtractor={(item) => item.id} params={{ winePartyStatus: m.winePartyStatus, isPromoter: data.isPromoter }} renderItem={(item) => <Item {...item} modeName={'测试'} onPress={toUrl} />} onFetchData={myWinePartyApi} ref={Dom} />}
          </View>
        </TabScreen>))}
      </Tabs>
    </TabsProvider>

  </BaseLayout>);
};


export default MyWineParty;
