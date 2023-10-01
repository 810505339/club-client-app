import {StyleSheet, Platform} from 'react-native';

export const CELL_SIZE = 76;
export const CELL_BORDER_RADIUS = 8;
export const DEFAULT_CELL_BG_COLOR = '#FFFFFF1A';
export const NOT_EMPTY_CELL_BG_COLOR = '#EE2737';
export const ACTIVE_CELL_BG_COLOR = '#FFFFFF1A';

const styles = StyleSheet.create({
  codeFieldRoot: {
    height: CELL_SIZE,
    justifyContent: 'space-between',
  },
  cell: {
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    ...Platform.select({web: {lineHeight: 65}}),
    fontSize: 30,
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: '#EE2737',
    backgroundColor: '#fff',

    // IOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    // Android
    elevation: 3,
  },
});

export default styles;
