import React, {Component} from 'react';

import {
  View,
  Text,
  ScrollView,
  ListView,
  Dimensions,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {Button } from 'react-native-elements'

import {User} from './User';

import {messageCount} from '../constants';

import styles from '../styles';

const renderMessage = (index, data) => {
  const msgDate = new Date(data.When);
  const messageType = data.Type;
  const msgDateTime = msgDate.toLocaleDateString() + ' at ' + msgDate.toLocaleTimeString();
};

export class ChatHistory extends Component {
  constructor() {
    super();

    this.state = {
      loadingHistory: false,
    };
  }

  onScroll(e) {
    if (e.nativeEvent.contentOffset.y === 0) {
      this.setState({
        loadingHistory: true,
      });

      this.props.fetchHistory();
    }
  }

  scrollToNewMessages(contentHeight) {
    this.scrollHeight = contentHeight;

    let scrollOffset;
    if (this.state.loadingHistory) {
      this.setState({
        loadingHistory: false,
      });

      scrollOffset = 0;
    }
    else {
      scrollOffset = this.scrollHeight - this.viewHeight;
    }

    this.refs.scrollView.scrollTo({x: 0, y: scrollOffset, animate: true});
  }

  onScrollLayout(e) {
    this.scrollHeight = e.nativeEvent.layout.height;
  }

  _onClickButton(location) {
    this.props.getMarker(location);
  }

  render() {
    const {history} = this.props;

    const messages = history.filter(h => h.Who && h.Who.login != null);

    return (
      <View
            style={[styles.flx1, styles.flxRow, styles.selfStretch]}>
        <ScrollView ref="scrollView"
                    onLayout={e => this.viewHeight = e.nativeEvent.layout.height}
                    onContentSizeChange={(contentWidth, contentHeight) => this.scrollToNewMessages(contentHeight)}
                    onScroll={this.onScroll.bind(this)}>
          {messages.length === 0 ?
              (<Text style={[styles.italic, styles.p2, styles.center]}>No messages</Text>) :
              messages.map((h, index) =>
              {
                  return (
                      <View style={[styles.flx1, styles.flxRow, styles.p1, styles.borderBHl, {borderColor: '#aaa'}]} key={index}>
                          <View style={[styles.mt1]}>
                              <User uri={h.Who.avatarUrl} size={32} />
                          </View>
                          <View style={[styles.flxCol, styles.ml2]}>
                              <View>
                                  <Text>{h.Who.login}</Text>
                              </View>
                              <View style={[styles.flxRow]}>
                              </View>
                              {h.Type === 'marker' ? (
                                  <View style={[styles.mt1]}>
                                      <Text>Check this one
                                          {`\n`}
                                      </Text>
                                      <Button
                                          onPress={() => this._onClickButton(h.Where)}
                                          style={{

                                             }}
                                          title={h.Where.name} />
                                  </View>
                              ): h.Type === 'message' ? (
                                  <View style={[styles.mt1]}>
                                      <Text>{h.What}</Text>
                                  </View>
                              ): null}
                          </View>
                      </View>
                  );

              })}
        </ScrollView>
      </View>
    );
  }
}

ChatHistory.propTypes = {
  history: React.PropTypes.array,
  fetchHistory: React.PropTypes.func,
  getMarker: React.PropTypes.func,
};
