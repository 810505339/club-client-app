import {getHeaderTitle} from '@react-navigation/elements';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React, {type FC} from 'react';
import {Appbar} from 'react-native-paper';

export const CustomNavigationBar: FC<NativeStackHeaderProps> = ({
  navigation,
  route,
  options,
  back,
}) => {
  const title = getHeaderTitle(options, route.name);

  const Right = options.headerRight || (() => null);
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      <Right />
    </Appbar.Header>
  );
};
