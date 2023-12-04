import BaseLayout from '@components/baselayout';
import CustomFlatList from '@components/custom-flatlist';
import { View } from 'react-native';




export default function Menu() {

  const renderItem = ({ item,index }) => {
    return <View>{index}</View>;
  };

  return (
    <BaseLayout >
      <CustomFlatList data={[1, 2, 3, 4, 5, 6, 7, 8]} renderItem={renderItem}  />
    </BaseLayout>
  );
}


export default Menu;
