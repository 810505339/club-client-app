import {Appbar} from 'react-native-paper';
import {getHeaderTitle} from '@react-navigation/elements';
import {useState} from 'react';
import {View} from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';

export default function CustomNavigationBar({
  navigation,
  route,
  options,
  back,
}: NativeStackHeaderProps) {
  const title = getHeaderTitle(options, route.name);
  const Right = options.headerRight || (() => null);

  return (
    <View>
      <Appbar.Header
        style={{backgroundColor: 'transparent'}}
        statusBarHeight={StatusBar.currentHeight}>
        {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
        <Appbar.Content titleStyle={{fontSize: 17}} title={title} />
        <Right />
      </Appbar.Header>
    </View>
  );
}
