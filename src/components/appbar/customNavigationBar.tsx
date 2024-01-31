import { Appbar } from 'react-native-paper';
import { getHeaderTitle, getDefaultHeaderHeight } from '@react-navigation/elements';
import { View } from 'react-native';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackHeaderProps } from '@react-navigation/stack';


export default function CustomNavigationBar({
  navigation,
  route,
  options,
  back,
}: StackHeaderProps) {

  const title = getHeaderTitle(options, route.name);
  const Right = options.headerRight || (() => null);
  const insets = useSafeAreaInsets();
  const style = options.headerStyle ?? { backgroundColor: 'transparent' };


  return (
    <View>
      <Appbar.Header
        style={style}

      >
        {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
        <Appbar.Content titleStyle={{ fontSize: 17 }} title={title} />
        <Right />
      </Appbar.Header>
    </View>
  );
}
