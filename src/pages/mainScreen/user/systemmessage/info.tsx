import BaseLayout from '@components/baselayout';
import { RefreshControl, ScrollView, View } from 'react-native';
import { Text, IconButton } from 'react-native-paper';

import { useImmer } from 'use-immer';

const SystemMessage = () => {
  const [data, setData] = useImmer({
    refreshing: false,
  });


  return (<BaseLayout>
    <ScrollView refreshControl={<RefreshControl refreshing={data.refreshing} />}>
      <View className=" mx-5">
        <View className="border border-red-500 rounded-xl h-48" />
        <View className="mb-2.5 mt-4">
          <Text className="text-white font-semibold text-base text-center ">新加坡鸡尾酒节热闹回归</Text>
          <Text className="text-white text-sm pb-24">The main monthly oil market only has the ability to collect and install ten cars of people from the two capital districts, and the high starting point is the integration of national transportation, home maintenance, heavy standards, Wang Hua Xin Li price, and three sets of prices, which are widely compared and need to be adjusted according to the new North standard and other regulations. There is a possibility of a common regulatory effect.
            The main monthly oil market only has the ability to collect and install ten cars of people from the two capital districts, and the high starting point is the integration of national transportation, home maintenance, heavy standards, Wang Hua Xin Li price, and three sets of prices, which are widely compared and need to be adjusted according to the new North standard and other regulations. There is a possibility of a common regulatory effect.
            The main monthly oil market only has the ability to collect and install ten cars of people from the two capital districts, and the high starting point is the integration of national transportation, home maintenance, heavy standards, Wang Hua Xin Li price, and three sets of prices, which are widely compared and need to be adjusted according to the new North standard and other regulations. There is a possibility of a common regulatory effect.
            The main monthly oil market only has the ability to collect and install ten cars of people from the two capital districts, and the high starting point is the integration of national transportation, home maintenance, heavy standards, Wang Hua Xin Li price, and three sets of prices, which are widely compared and need to be adjusted according to the new North standard and other regulations. There is a possibility of a common regulatory effect.
            The main monthly oil market only has the ability to collect and install ten cars of people from the two capital districts, and the high starting point is the integration of national transportation, home maintenance, heavy standards, Wang Hua Xin Li price, and three sets of prices, which are widely compared and need to be adjusted according to the new North standard and other regulations. There is a possibility of a common regulatory effect.
            The main monthly oil market only has the ability to collect and install ten cars of people from the two capital districts, and the high starting point is the integration of national transportation, home maintenance, heavy standards, Wang Hua Xin Li price, and three sets of prices, which are widely compared and need to be adjusted according to the new North standard and other regulations. There is a possibility of a common regulatory effect.
          </Text>
        </View>
      </View>

    </ScrollView>
  </BaseLayout>);
};

export default SystemMessage;
