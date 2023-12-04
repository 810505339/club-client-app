import { FC, PropsWithChildren } from 'react';
import { ImageBackground, View, type ImageSourcePropType } from 'react-native';
import { StatusBar } from 'react-native';
const defaultBg = require('@assets/imgs/base/default-bg.png');

type IProps = {
  source?: ImageSourcePropType,
  className?: string
  showAppBar?: boolean
};
const BaseLayout: FC<PropsWithChildren<IProps>> = ({ source = defaultBg, className = '', children, showAppBar = true }) => {
  const classNames = `flex-1 bg-[#101010FF] ${className}`;
  return (
    <View className={classNames}>
      {source && <ImageBackground source={source} resizeMode="cover"  className="absolute left-0 right-0 bottom-0 -z-10 top-0" />}
      {showAppBar && <View style={{ paddingTop: 56 + StatusBar.currentHeight! }} />}
      {children}
    </View>
  );
};

export default BaseLayout;
