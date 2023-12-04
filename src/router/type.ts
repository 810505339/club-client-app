import { Launch } from 'pages/mainScreen/fightwine/launch';

import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
export type RootStackParamList = {
  LoginOrRegister: undefined,
  Login: undefined,
  NewUser: undefined,
  OldUser: undefined,
  Verification: {
    phone: string
  },
  AuthenticationSex: undefined,
  AuthenticationPower: undefined,
  Authentication: undefined,
  AuthenticationCamera: undefined,
  AuthenticationFacestatus: {
    status: number
  },
  UserInfo: undefined,
  HomeTabs: undefined,
  Demo: undefined,
  IM: undefined,
  Animated: undefined,
  Carouseldemo: undefined

} & UsertackParamList & HomeParamList & FightParamList;

export type UsertackParamList = {
  Orders: undefined,
  SystemMessage: undefined,
  SystemMessageInfo: undefined,
  Account: undefined,
  AccountPhone: undefined,
  AccountSetPhone: undefined,
  OrdersInfo: undefined,
  Coupons: undefined,
  Information: undefined,
}

export type HomeParamList = {
  Preset: undefined,
  Dynamic: undefined,
  DynamicInfo: {
    id: string
  }
}

export type TabParamList = {
  Home: undefined,
  Fightwine: undefined,
  Ticket: undefined,
  User: undefined,
};




export type FightParamList = {
  Launch: undefined,
  LaunchWine: undefined,
  Booths: undefined
}
export type ScreenNavigationProp<T extends keyof RootStackParamList> = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList>,
  NativeStackNavigationProp<RootStackParamList, T>,
>;
