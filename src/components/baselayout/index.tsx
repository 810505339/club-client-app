import {FC, PropsWithChildren} from 'react';
import {ImageBackground, View, type ImageSourcePropType} from 'react-native';

type IProps = {
  source: ImageSourcePropType,
};
const BaseLayout: FC<PropsWithChildren<IProps>> = ({source, children}) => {
  return (
    <View className="flex-1">
      <ImageBackground source={source} className="flex-1" />
      {children}
    </View>
  );
};

export default BaseLayout;
