import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { TabParamList } from '@router/type';
import Header from './components/header';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useCallback, useEffect, useRef } from 'react';
import BaseLayout from '@components/baselayout';
import SwiperView from './components/swiperView';
import HorizontalFlatList from './components/HorizontalFlatList';
import Drawer from '@components/drawer'
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { useSharedValue } from 'react-native-reanimated';

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


