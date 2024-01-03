import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BaseLayout from '@components/baselayout';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { RootStackParamList } from '@router/type';
import { useRequest } from 'ahooks';
import { winePartyByDetail } from '@api/fightwine';

const FightwineDetail = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'FightwineDetail'>>();
  const { partyId } = route.params;


  const { data } = useRequest(() => winePartyByDetail(partyId));

  console.log(data);

  return <BaseLayout>
    <View>
      <Text>FightwineDetail</Text>
    </View>
  </BaseLayout>;
};

export default FightwineDetail;
