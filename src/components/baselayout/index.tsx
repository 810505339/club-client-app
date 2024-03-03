import { FC, PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground, View, type ImageSourcePropType } from 'react-native';
import { StatusBar } from 'react-native';
import { Text } from 'react-native-paper';
import Loading from './loading';
const defaultBg = require('@assets/imgs/base/default-bg.png');

type IProps = {
  source?: ImageSourcePropType | boolean,
  className?: string
  showAppBar?: boolean
  showNoMore?: boolean,
  loading?: boolean,
};

const RendernoMoreData = () => {
  const { t } = useTranslation();
  return <Text className="text-center">{t('flatList.noMore1')}</Text>;
};

const BaseLayout: FC<PropsWithChildren<IProps>> = ({ source = defaultBg, className = '', children, showAppBar = true, showNoMore = false, loading = false }) => {

  const classNames = `flex-1 bg-[#101010FF] ${className}`;
  return (
    <View className={classNames}>
      {source && <ImageBackground source={source} resizeMode="cover" className="absolute left-0 right-0 bottom-0 -z-10 top-0" />}
      {showAppBar && <View style={{ paddingTop: 56 + StatusBar.currentHeight! }} />}
      {showNoMore ? <RendernoMoreData /> : children}
      {loading && <Loading />}
    </View>
  );
};

export default BaseLayout;
