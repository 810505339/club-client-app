// import React from 'react';
// import { StyleSheet, Text, View, TouchableHighlight, ToastAndroid, Button } from 'react-native';
// import XgPush from 'tpns_rn_plugin';
// import AndroidApi from 'tpns_rn_plugin/AndroidApi';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   setBtnStyle: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#000000',
//     borderRadius: 4,
//     backgroundColor: '#3e83d7',
//     padding: 5,
//   },
//   textStyle: {
//     textAlign: 'center',
//     fontSize: 15,
//     color: '#ffffff',
//   },
//   itemStyle: {
//     marginTop: 20,
//     marginLeft: 10,
//     marginRight: 10,
//   },
// });
// const Index = () => {
//   /**
//     *添加回调
//     */
//   const addListener = () => {

//     //DeviceToken回调
//     AndroidApi.onRegisteredDeviceToken = result => {
//       ToastAndroid.show('token:' + result.xgToken, 1000);
//       console.log('===onRegisteredDeviceToken====:' + JSON.stringify(result));
//     };
//     XgPush.addOnRegisteredDeviceTokenListener(this.onRegisteredDeviceToken);

//     //注册成功回调
//     AndroidApi.onRegisteredDone = result => {
//       console.log('===onRegisteredDone====:' + JSON.stringify(result));
//     };
//     XgPush.addOnRegisteredDoneListener(AndroidApi.onRegisteredDone);

//     //注销推送服务回调
//     AndroidApi.unRegistered = result => {
//       console.log('===unRegistered====:' + JSON.stringify(result));
//     };
//     XgPush.addUnRegisteredListener(AndroidApi.unRegistered);

//     //收到通知消息回调
//     AndroidApi.onReceiveNotificationResponse = result => {
//       console.log('===onReceiveNotificationResponse====:' + JSON.stringify(result));
//     };
//     XgPush.addOnReceiveNotificationResponseListener(AndroidApi.onReceiveNotificationResponse);

//     //收到透传、静默消息回调
//     AndroidApi.onReceiveMessage = result => {
//       console.log('===onReceiveMessage====:' + JSON.stringify(result));
//     };
//     XgPush.addOnReceiveMessageListener(this.onReceiveMessage);

//     //设置角标回调仅iOS
//     AndroidApi.xgPushDidSetBadge = result => {
//       console.log('===xgPushDidSetBadge====:' + JSON.stringify(result));
//     };
//     XgPush.addXgPushDidSetBadgeListener(this.xgPushDidSetBadge);

//     //绑定账号和标签回调
//     AndroidApi.xgPushDidBindWithIdentifier = result => {
//       console.log('===xgPushDidBindWithIdentifier====:' + JSON.stringify(result));
//     };
//     XgPush.addXgPushDidBindWithIdentifierListener(this.xgPushDidBindWithIdentifier);

//     //解绑账号和标签回调
//     AndroidApi.xgPushDidUnbindWithIdentifier = result => {
//       console.log('===xgPushDidUnbindWithIdentifier====:' + JSON.stringify(result));
//     };
//     XgPush.addXgPushDidUnbindWithIdentifierListener(this.xgPushDidUnbindWithIdentifier);

//     //更新账号和标签回调
//     AndroidApi.xgPushDidUpdatedBindedIdentifier = result => {
//       console.log('===xgPushDidUpdatedBindedIdentifier====:' + JSON.stringify(result));
//     };
//     XgPush.addXgPushDidUpdatedBindedIdentifierListener(this.xgPushDidUpdatedBindedIdentifier);

//     //清除所有账号和标签回调
//     AndroidApi.xgPushDidClearAllIdentifiers = result => {
//       console.log('===xgPushDidClearAllIdentifiers====:' + JSON.stringify(result));
//     };
//     XgPush.addXgPushDidClearAllIdentifiersListener(AndroidApi.xgPushDidClearAllIdentifiers);

//     //通知点击回调
//     AndroidApi.xgPushClickAction = result => {
//       console.log('===xgPushClickAction====:' + JSON.stringify(result));
//     };
//     XgPush.addXgPushClickActionListener(AndroidApi.xgPushClickAction);

//   };
//   const openOtherChannel = () => {
//     //华为

//     //小米
//     AndroidApi.setMiPushAppId('自己小米平台注册所得AppId');
//     AndroidApi.setMiPushAppKey('自己小米平台注册所得AppKey');
//     //魅族
//     AndroidApi.setMzPushAppId('自己魅族平台注册所得AppId');
//     AndroidApi.setMzPushAppKey('自己魅族平台注册所得AppKey');
//     //vivo
//     //oppo
//     AndroidApi.setOppoPushAppId('自己OPPO平台注册所得AppKey');
//     AndroidApi.setOppoPushAppKey('自己OPPO平台注册所得AppSecret');
//     AndroidApi.enableOppoNotification(true);

//     AndroidApi.enableOtherPush(true);
//     AndroidApi.regPush();
//   };


//   return (<View style={styles.container}>

//     <View style={styles.itemStyle}>
//       <Button title="添加回调,所有操作之前调用"
//         onPress={() => addListener()
//         } />
//     </View>

//     <View style={{ flexDirection: 'row' }}>
//       <View style={styles.itemStyle}>
//         <Button title="注册推送"
//           onPress={() => {
//             XgPush.setEnableDebug(true);
//             XgPush.startXg('1600001061', 'IMC341U0L072');
//           }
//           } />
//       </View>

//       <View style={styles.itemStyle}>
//         <Button title="注消推送"
//           onPress={() => XgPush.stopXg()
//           } />
//       </View>

//       <View style={styles.itemStyle}>
//         <Button title="设置心跳"
//           onPress={() => AndroidApi.setHeartbeatIntervalMs(50000)
//           } />

//       </View>
//     </View>


//     <View style={{ flexDirection: 'row' }}>
//       <View style={styles.itemStyle}>
//         <Button title="绑定一个标签"
//           onPress={() => XgPush.setTags({ tags: ['123', '456'] })
//           } />
//       </View>

//       <View style={styles.itemStyle}>
//         <Button title="解绑一个标签"
//           onPress={() => XgPush.deleteTags({ tags: ['123'] })
//           } />
//       </View>
//     </View>

//     <View style={{ flexDirection: 'row' }}>
//       <View style={styles.itemStyle}>
//         <Button title="绑定一个账号"
//           onPress={() => XgPush.setAccount('123321', 0)
//           } />
//       </View>

//       <View style={styles.itemStyle}>
//         <Button title="解绑一个账号"
//           onPress={() => XgPush.deleteAccount('123321', 0)
//           } />
//       </View>
//     </View>

//     <View style={{ flexDirection: 'row' }}>
//       <View style={styles.itemStyle}>
//         <Button title="绑定多个标签"
//           onPress={() => XgPush.setTags({ tags: ['123', '321', '23457'] })
//           } />
//       </View>
//       <View style={styles.itemStyle}>
//         <Button title="解绑多个标签"
//           onPress={() => XgPush.deleteTags({ tags: ['123', '321', '23457'] })
//           } />
//       </View>
//     </View>


//     <View style={{ flexDirection: 'row' }}>
//       <View style={styles.itemStyle}>
//         <Button title="更新账号"
//           onPress={() => XgPush.updateBindIdentifiers({ tags: ['123', '321', '23457'] }, 2)
//           } />
//       </View>
//       <View style={styles.itemStyle}>
//         <Button title="获取token"
//           onPress={() => AndroidApi.getToken((token) => {
//             ToastAndroid.show(token, 1000);

//           })
//           } />
//       </View>
//       <View style={styles.itemStyle}>
//         <Button title="开启第三方"
//           onPress={() => openOtherChannel()} />
//       </View>
//     </View>
//   </View>);
// };




