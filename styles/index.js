import draper from 'Draper';

import {StyleSheet} from 'react-native';

export const iconSize = 40;

export const robotSize = 32;

const stylesheet = StyleSheet.create({
  // more flex
  selfStretch: { alignSelf: 'stretch' },

  // colors
  base: { color: '#009688' },
  bgBackBase: { backgroundColor: 'white' },
  bgBase: { backgroundColor: '#5a43c8' },
  royalBlue: { color: 'royalblue' },

  // other
  stackTrace: {
    color: 'red',
    fontFamily: 'Courier',
    fontSize: 10,
  },
});

export default {
  iconSize,
  robotSize,
  ...draper(),
  ...stylesheet,
};
