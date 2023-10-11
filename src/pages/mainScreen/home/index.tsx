import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, Image, StyleSheet, Button } from 'react-native';
import { } from 'react-native-paper';
import { ScreenNavigationProp, TabParamList } from '@router/type';
import Header from './components/header';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import BaseLayout from '@components/baselayout';
import BottomSheet from '@gorhom/bottom-sheet';

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import SwiperView from './components/swiperView';
import HorizontalFlatList from './components/HorizontalFlatList';



const HOMEBG = require('@assets/imgs/home/bg.png')

const HomeScreen = () => {
  const navigation =
    useNavigation<BottomTabNavigationProp<TabParamList, 'Home'>>();

  useEffect(() => {
    navigation.setOptions({
      header: props => <Header {...props} />,
    });
  }, [navigation])
  return (
    <BaseLayout source={HOMEBG}>
      <HorizontalFlatList />
      <SwiperView />
    </BaseLayout>
  );
};



// const HomeScreen = () => {
//   // ref
//   const bottomSheetModalRef = useRef<BottomSheetModal>(null);

//   // variables
//   const snapPoints = useMemo(() => ['50%', '50%'], []);

//   // callbacks
//   const handlePresentModalPress = useCallback(() => {
//     bottomSheetModalRef.current?.present();
//   }, []);
//   const handleSheetChanges = useCallback((index: number) => {
//     console.log('handleSheetChanges', index);
//   }, []);

//   // renders
//   return (
//     <BottomSheetModalProvider>
//       <View style={styles.container}>
//         <Button
//           onPress={handlePresentModalPress}
//           title="Present Modal"
//           color="black"
//         />
//         <BottomSheetModal
//           ref={bottomSheetModalRef}
//           index={1}
//           snapPoints={snapPoints}
//           onChange={handleSheetChanges}
//         >
//           <View style={styles.contentContainer}>
//             <Text>Awesome 🎉</Text>
//           </View>
//         </BottomSheetModal>
//       </View>
//     </BottomSheetModalProvider>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     justifyContent: 'center',
//     backgroundColor: 'grey',
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
// });

export default HomeScreen;


