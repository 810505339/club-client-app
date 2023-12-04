import { FC, PropsWithChildren } from 'react';
import { ImageBackground, View, type ImageSourcePropType } from 'react-native';
import { StatusBar } from 'react-native';

type IProps = {
  source?: ImageSourcePropType,
  className?: string
  showAppBar?: boolean
};
const BaseLayout: FC<PropsWithChildren<IProps>> = ({ source, className = '', children, showAppBar = true }) => {
  const classNames = `flex-1 bg-[#101010FF] ${className}`;
  return (
    <View className={classNames}>
      {source && <ImageBackground source={source} className="fixed inset-0" />}
      {showAppBar && <View style={{ paddingTop: 56 + StatusBar.currentHeight! }} />}
      {children}
    </View>
  );
};

export default BaseLayout;
