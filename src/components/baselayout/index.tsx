import {FC, PropsWithChildren} from 'react';
import {ImageBackground, View, type ImageSourcePropType} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import {useWindowDimensions} from 'react-native';


type IProps = {
  source: ImageSourcePropType,
};
const BaseLayout: FC<PropsWithChildren<IProps>> = ({source, children}) => {
  const headerHight = useHeaderHeight();
  const windowWidth = useWindowDimensions().width;
const windowHeight = useWindowDimensions().height;

  return (
    <View className="relative" >
      <ImageBackground source={source}  className="absolute left-0 right-0 top-0 bottom-0" />
      <View style={{height:headerHight}} />
       {children}
    </View>
  );
};

export default BaseLayout;
