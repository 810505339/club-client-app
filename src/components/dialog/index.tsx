import { ReactNode, PropsWithChildren } from 'react';
import { Image, View } from 'react-native';
import { Button, Modal, Portal, Text } from 'react-native-paper';
const headerIcon = require('@assets/imgs/base/modalHeader.png');
type IProps = {
  visible: boolean /* 是否显示弹窗 */
  confirm: () => void /* 点击确定按钮 */
  onDismiss: () => void /* 点击取消 */
  title?: ReactNode,
  confirmText?: string,
  cancelText?: string
}

const Dialog = (props: PropsWithChildren<IProps>) => {
  const { visible, confirm, onDismiss, title, children, confirmText, cancelText } = props;
  const _title = title ? title : <Text>提示</Text>;
  const _confirmText = confirmText ?? '确定';
  const _cancelText = cancelText ?? '取消';
  return <Portal>
    <Modal visible={visible} dismissable={false} >
      <View className="w-[285]  bg-[#222222FF] items-center m-auto rounded-2xl relative ">
        <Image source={headerIcon} resizeMode="contain" className="w-[285] h-[60] absolute -top-2 left-0 right-0" />
        <View>
          {_title}
        </View>
        <View className="m-auto py-8 px-5">
          {children}
        </View>
        <View className="flex-row justify-around items-center  w-full px-5 pb-5 ">
          <Button className="bg-transparent flex-1 mr-5" mode="outlined" labelStyle={{ fontWeight: 'bold' }} textColor="#ffffffbf" onPress={onDismiss} >{_cancelText}</Button>
          <Button className="bg-[#EE2737FF] flex-1" textColor="#000000FF" labelStyle={{ fontWeight: 'bold' }} mode="contained" onPress={confirm} >{_confirmText}</Button>
        </View>
      </View>
    </Modal>
  </Portal>;
};

export default Dialog;
