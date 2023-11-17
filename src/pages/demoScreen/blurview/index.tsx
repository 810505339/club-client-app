import { BlurView } from '@react-native-community/blur';
import BaseLayout from '@components/baselayout';
import { Image, StyleSheet, Text, View } from 'react-native';

const IMG = require('@assets/imgs/demo/carousel-0.jpg');

export default function Menu() {
  return (
    <BaseLayout style={styles.container}>
      <Image
        key={'blurryImage'}
        source={IMG}
        style={styles.absolute}
      />
      <Text style={styles.absolute}>Hi, I am some blurred text</Text>
      <BlurView
        style={styles.absolute}
        blurType="dark"
        blurAmount={50}
        reducedTransparencyFallbackColor="white"
      />
      <Text>I'm the non blurred text because I got rendered on top of the BlurView</Text>
    </BaseLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default Menu;
