import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import SwiperFlatList, { Pagination, PaginationProps } from "react-native-swiper-flatlist";

const colors = ['tomato', 'thistle', 'skyblue', 'teal'];

const styles = StyleSheet.create({
  paginationContainer: {
    bottom:14,
  },
  pagination: {
    width:50,
    height:6,
    borderRadius:3,
   
  },
  activePagination:{
    width:50
  }
});

export const CustomPagination = (props: JSX.IntrinsicAttributes & PaginationProps) => {
  return (
    <Pagination
      {...props}
      paginationStyle={styles.paginationContainer}
      paginationStyleItem={styles.pagination}
      paginationDefaultColor="rgba(255,255,255,0.25)"
      paginationActiveColor="white"
      paginationStyleItemActive={styles.activePagination}
    />
  );
};

const SwiperView = () => {
  return (<View className='absolute z-10 top-60'>
    <SwiperFlatList
      autoplay
      autoplayDelay={2}
      autoplayLoop
      index={2}
      showPagination
      data={colors}
      PaginationComponent={CustomPagination}
      renderItem={({ item }) => (
        <View className="w-[100vw] h-[65vh] border">
          <Text>{item}</Text>
        </View>
      )}
    />
  </View>)
}

export default SwiperView
