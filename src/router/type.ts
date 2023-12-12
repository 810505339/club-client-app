import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ImageSourcePropType } from 'react-native';
export type RootStackParamList = {
  CouponsModal: undefined,
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
  Orders: {

  },
  OrdersInfo: {
    orderContext: { label: string, value: any }[]
    headerImg?: ImageSourcePropType
  },
  SystemMessage: undefined,
  SystemMessageInfo: undefined,
  Account: undefined,
  AccountPhone: undefined,
  AccountSetPhone: undefined,
  Coupons: undefined,
  Information: undefined,
}

export type HomeParamList = {
  Preset: undefined,
  Dynamic: undefined,
  DynamicInfo: {
    id: string
    tagList: string[],
    title: string,
    content: string,
    publishDate: string,
    pageView: string,
    source: {
      uri:string
    }
  },
  ReserveBooth: undefined,
  ConfirmBooth: {
    storeId: string,
    areaId: string,
    areaName: string,
    entranceDate: string
    peopleNum: number,
    latestArrivalTime: string
  },
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
