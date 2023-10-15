import {FC, PropsWithChildren} from 'react';
import {ImageBackground, View, type ImageSourcePropType} from 'react-native';
import {StatusBar} from 'react-native';

type IProps = {
  source: ImageSourcePropType,
};
const BaseLayout: FC<PropsWithChildren<IProps>> = ({source, children}) => {
  return (
    <View className="flex-1">
      <ImageBackground source={source}  className="absolute left-0 right-0 top-0 bottom-0" />
      <View  style={{paddingTop:56 + StatusBar.currentHeight!}}/>
       {children}
    </View>
  );
};

export default BaseLayout;
