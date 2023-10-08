import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
export type RootStackParamList = {
  LoginOrRegister: undefined,
  Login: undefined,
  NewUser: undefined,
  OldUser: undefined,
  Verification: undefined,
  HomeTab: undefined,
};

export type TabParamList = {
  Home: undefined,
  Dynamic: undefined,
  Fightwine: undefined,
  User: undefined,
};

export type ScreenNavigationProp<T extends keyof RootStackParamList> = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList>,
  NativeStackNavigationProp<RootStackParamList, T>,
>;
