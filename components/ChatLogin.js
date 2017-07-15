import React, {Component, PropTypes} from 'react';

import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import { Icon } from 'react-native-elements'

import styles from '../styles';

export class ChatLogin extends Component {
  render() {
    const {props} = this;
    return (
      <View style={[styles.flx1, styles.flxRow, styles.bgBackBase, styles.selfStretch, styles.jcCenter]}>
        <TouchableOpacity style={[styles.rounded1, styles.selfCenter, styles.p2, styles.bgBase]}
          activeOpacity={0.5}
          onPress={props.onSubmit}>
          <View style={[styles.flxRow]}>
            <Text style={[styles.white, styles.f3, styles.ml1]}>Login with GitHub</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
