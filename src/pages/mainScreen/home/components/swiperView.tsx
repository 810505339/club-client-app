import { View } from "react-native";
import { Text  } from "react-native-paper";
import SwiperFlatList from "react-native-swiper-flatlist";

const colors = ['tomato', 'thistle', 'skyblue', 'teal'];

const SwiperView = () => {
  return (<View >
    <SwiperFlatList
      autoplay
      autoplayDelay={2}
      autoplayLoop
      index={2}
      showPagination
      data={colors}
      renderItem={({ item }) => (
        <View className="w-[100vw] border">
          <Text>{item}</Text>
        </View>
      )}
    />
  </View>)
}

export default SwiperView
