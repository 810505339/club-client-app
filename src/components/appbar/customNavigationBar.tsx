import {Appbar} from 'react-native-paper';
import {getHeaderTitle,getDefaultHeaderHeight} from '@react-navigation/elements';
import {View} from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';


export default function CustomNavigationBar({
  navigation,
  route,
  options,
  back,
}: NativeStackHeaderProps) {
  const title = getHeaderTitle(options, route.name);
  const Right = options.headerRight || (() => null);
  const insets = useSafeAreaInsets();

  return (
    <View>
      <Appbar.Header
        style={{backgroundColor: 'transparent'}}

        >
        {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
        <Appbar.Content titleStyle={{fontSize: 17}} title={title} />
        <Right />
      </Appbar.Header>
    </View>
  );
}
