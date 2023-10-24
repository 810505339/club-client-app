import { FC, PropsWithChildren } from 'react';
import { ImageBackground, View, type ImageSourcePropType } from 'react-native';
import { StatusBar } from 'react-native';

type IProps = {
  source?: ImageSourcePropType,
  className?: string
};
const BaseLayout: FC<PropsWithChildren<IProps>> = ({ source, className = '', children }) => {
  const classNames = `flex-1 ${className}`;
  return (
    <View className={classNames}>
      {source && <ImageBackground source={source} className="absolute left-0 right-0 top-0 bottom-0" />}
      <View style={{ paddingTop: 56 + StatusBar.currentHeight! }} />
      {children}
    </View>
  );
};

export default BaseLayout;
