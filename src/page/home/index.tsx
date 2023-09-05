import BaseLayout from '@components/baselayout';
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Text,
  Icon,
  Select,
  SelectItem,
  IndexPath,
  Button
} from '@ui-kitten/components';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { useRecoilState } from 'recoil';
import { textState } from 'store/index';
import { produce } from 'immer';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation, withTranslation } from 'react-i18next';
import { changeLanguage } from 'utils/i18next';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => {
  function onSelect(index: number) {
    console.log(index);
    navigation.navigate(state.routeNames[index]);
  }

  return (
    <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
      <BottomNavigationTab title="首页" icon={<Icon name="home-outline" />} />
      <BottomNavigationTab title="我的" icon={<Icon name="person-outline" />} />
    </BottomNavigation>
  );
};

const HomeScreen = () => (
  <BaseLayout title={'首页'}>
    <Navigator
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={{ headerShown: false }}>
      <Screen name="Users" component={UsersScreen} />
      <Screen name="Orders" component={OrdersScreen} />
    </Navigator>
  </BaseLayout>
);

const UsersScreen = () => {
  const [user, setUser] = useRecoilState(textState);
  const { t, i18n } = useTranslation();
  const onChange = () => {
    const newUserInfo = produce(user, darft => {
      darft.age += 1;
    });
    setUser(newUserInfo);
  };
  const onChangeLanguage = () => {

    changeLanguage('en')
  }


  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>姓名:{user.name}</Text>
      <Text>年龄:{user.age}</Text>
      <Button onPress={onChangeLanguage}>change Language</Button>
      <Text>{t('login')}</Text>
    </Layout>
  );
};

const OrdersScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState<IndexPath | IndexPath[]>(
    new IndexPath(0),
  );
  const [option] = useState(['全部', '女生', '男生']);
  const displayValue = option[(selectedIndex as IndexPath).row];
  const renderOption = (title: string, key: number): React.ReactElement => (
    <SelectItem title={title} key={key} />
  );
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h1">喜欢</Text>
      <Select
        style={styles.container}
        placeholder="Default"
        value={displayValue}
        selectedIndex={selectedIndex}
        onSelect={(index: IndexPath) => setSelectedIndex(index)}>
        {option.map(renderOption)}
      </Select>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
  },
});

export default HomeScreen;
