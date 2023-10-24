import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import SwiperFlatList, { Pagination, PaginationProps } from 'react-native-swiper-flatlist';

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
    width:50,
  },
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

type IProps = {
  className?: string,
  classNames?:string
}


const SwiperView:FC<IProps> = ({className}) => {
  console.log(className,'SwiperView');

  return (<View className={className}>
    <SwiperFlatList
      autoplay
      autoplayDelay={2}
      autoplayLoop
      index={2}
      showPagination
      data={colors}
      PaginationComponent={CustomPagination}
      renderItem={({ item }) => (
        <View className="w-[100vw] h-[65vh] border  border-red-500  flex-1">
          <Text className="flex-1">{item}</Text>
        </View>
      )}
    />
  </View>);
};

export default SwiperView;
