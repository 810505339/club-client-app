import BaseLayout from '@components/baselayout';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useRequest } from 'ahooks';
import { customerMessageDetail } from '@api/user';
import { ScrollView, View, useWindowDimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { RootStackParamList } from '@router/type';
import { IItemProps } from './index';
import RenderHtml from 'react-native-render-html';
const SystemMessage = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'SystemMessageInfo'>>();
  const { id } = route.params;
  const { width } = useWindowDimensions();
  const { data } = useRequest<{ data: IItemProps }, any[]>(() => customerMessageDetail(id),);
  const source = {
    html: data?.data.content ?? '',
  };


  return (<BaseLayout>
    <ScrollView>
      <View className=" mx-5">

        <View className="mb-2.5 mt-4">
          <Text className="text-white font-semibold text-base text-center ">{data?.data.title}</Text>
          <RenderHtml
            contentWidth={width - 40}

            source={source}
          />
        </View>
      </View>

    </ScrollView>
  </BaseLayout>);
};

export default SystemMessage;
