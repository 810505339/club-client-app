import {Appbar, Menu} from 'react-native-paper';
import {getHeaderTitle} from '@react-navigation/elements';
import {useState} from 'react';
import {View} from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';

export default function CustomNavigationBar({
  navigation,
  route,
  options,
  back,
}: NativeStackHeaderProps) {
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header className="absolute bg-transparent top-0 left-0 right-0 h-[64px] z-10">
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}
