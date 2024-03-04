import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ImageSourcePropType } from 'react-native';
export type RootStackParamList = {
  CouponsModal: {
    storeId?: string
    ticketId?: string
    activityId?: string
    boothId?: string
    winePartyMode?: string
    useScope?: string //使用范围
  },
  LoginOrRegister: undefined,
  Login: undefined,
  NewUser: undefined,
  OldUser: {
    phone: string
  },
  Chat: any,
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
    orderContext?: { label: string, value: any }[]
    headerImg?: ImageSourcePropType,
    submit?: (couponId: string | undefined) => void,  /* 优惠券id */
    couponId?: string, /* 优惠券id */
    useScope?: 'TICKET' | 'WINE_PARTY' | 'BOOTH' | 'ACTIVITY' /* 使用范围 */
    storeId?: string
    ticketId?: string
    activityId?: string
    boothId?: string
    winePartyMode?: string
    amount?: string,
    orderStatus?: string, //订单状态
    orderId?: string, //订单id
  },
  SystemMessage: undefined,
  SystemMessageInfo: {
    id: string //消息id
  },
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
      uri: string
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
  FightwineDetail: {
    partyId: string
  },
  MyWineParty: {

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
  LaunchWine: {
    winePartyMode: string
    modeName: string
  },
  Booths: {
    [propName: string]: string
  }
}
export type ScreenNavigationProp<T extends keyof RootStackParamList> = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList>,
  NativeStackNavigationProp<RootStackParamList, T>,
>;
