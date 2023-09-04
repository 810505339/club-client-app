import {
  TopNavigation,
  TopNavigationAction,
  Icon,
  Divider,
  Text,
} from '@ui-kitten/components';
import {PropsWithChildren, ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import {TouchableWebElement} from '@ui-kitten/components/devsupport';
type ComponentProps = {
  title?: string;
  showTopNav?: boolean;
  TopNav?: ReactNode;
};

const renderBackAction = (): TouchableWebElement => (
  <TopNavigationAction icon={<Icon name="arrow-back" />} />
);

const BaseLayout = ({
  showTopNav = true,
  TopNav = <></>,
  title,
  children,
}: PropsWithChildren<ComponentProps>) => {
  const TopBar = showTopNav ? (
    <TopNavigation
      title={title}
      accessoryLeft={renderBackAction}
      alignment="center"
    />
  ) : (
    TopNav
  );
  return (
    <>
      {TopBar}
      <Divider />
      {children}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BaseLayout;
