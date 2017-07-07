import React, {Component, PropTypes} from 'react';

import {connect} from 'react-redux';

import {
  View,
  Text,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';

import {ChatHistory} from './ChatHistory';
import {ChatInput} from './ChatInput';
import {ChatHeader} from './ChatHeader';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {conversationActions, connectionActions} from '../actions';

import {channel} from '../constants';

import {
  history,
  subscribe,
  publishMessage,
} from '../services/pubnub';

import styles from '../styles';

class BareConversation extends Component {
  constructor() {
    super();

    this.state = {
      subscription: null,
      viewPosition: new Animated.Value(0),
    };
  }

  render() {
    const {
      channels,
      history,
      friends,
      selectedChannel,
      user,
    } = this.props;

    const absStretch = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };

    // can't use array for Animated.View
    const containerStyle = Object.assign({}, absStretch, {
      backgroundColor: 'white',
      transform: [{ translateX: this.state.viewPosition }],
    });

    return (
      <View style={[styles.flx1, styles.flxCol, styles.selfStretch]}>
        <Animated.View style={containerStyle}>
          <ChatHeader
            channel={selectedChannel}/>
          <ChatHistory ref="chatHistory" history={history} fetchHistory={() => this.fetchHistory()} />
          <ChatInput
            user={user}
            publishMessage={message => this.onPublishMessage(message)} />
        </Animated.View>
      </View>
    );
  }

  componentDidMount() {
    this.subscribeToChannel();
    this.fetchHistory();
  }

  componentDidUpdate(prevProps) {
    const {props} = this;

    if (props.selectedChannel.name !== prevProps.selectedChannel.name) {
      Promise.resolve(props.clearHistory())
        .then(() => {
          this.subscribeToChannel();
          this.fetchHistory();
        });
    }
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.state.subscription.unsubscribe();
      this.setState({ subscription: null });
    }
  }

  subscribeToChannel() {
    const channel = this.props.selectedChannel.name;

    if (this.state.subscription) {
      this.state.subscription.unsubscribe();

    }
    this.setState({
      subscription: subscribe(
        channel,
        p => this.onPresenceChange(p),
        m => this.onMessageReceived(m)
      )
    });
  }

  fetchHistory() {
    const {lastMessageTimestamp, selectedChannel, addHistory} = this.props;

    return history(selectedChannel.name, lastMessageTimestamp).then(response => {
      // make sure we're not duplicating our existing history
      if (response.messages.length > 0 &&
          lastMessageTimestamp !== response.startTimeToken) {
        addHistory(response.messages, response.startTimeToken)
      }
    });
  }

  onMenuClick() {
    const toValue = this.state.menuOpen ?
      0 : -1 * (Dimensions.get('window').width - 40);

    this.setState({ menuOpen: !this.state.menuOpen }, () =>
      Animated.timing(
        this.state.viewPosition,
        { toValue, easing: Easing.inOut(Easing.ease) }
      ).start()
    );
  }

  onMessageReceived(obj) {
    this.props.addMessage(obj.message);
  }

  onPresenceChange(presenceData) {

    switch (presenceData.action) {
      case 'join':
        break;
      case 'leave':
      case 'timeout':
        break;
      case 'state-change':
        if (presenceData.state) {
          if (presenceData.state.isTyping === true) {
            //startTyping(presenceData.state.user);
          }
          else {
            //stopTyping(presenceData.state.user);
          }
        }
        break;
      default:
        break;
    }
  }

  onPublishMessage(message) {
    const {selectedChannel} = this.props;

    const channel = selectedChannel.name;

    publishMessage(channel, message)
      .catch(error => {
        console.error('Failed to publish message:', error);
      });
  }
}

BareConversation.propTypes = {
  user: PropTypes.object,
  channels: PropTypes.array,
  friends: PropTypes.array,
  history: PropTypes.array,
  selectedChannel: PropTypes.object,
  lastMessageTimestamp: PropTypes.number,
};

const mapStateToProps = state =>
  Object.assign({},
    state.conversation.toJS(), {
      friends: state.conversation.get('friends').toArray(), // <k,v> -> [v]
      channels: [channel]
    }
  );

const actions = Object.assign({}, conversationActions, {
   disconnect: connectionActions.disconnect,
});

export const Conversation = connect(mapStateToProps, actions)(BareConversation);
