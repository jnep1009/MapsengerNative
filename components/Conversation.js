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
import {ShareMap} from './ShareMap';
import {SearchPage} from './SearchPage';
import {SearchList} from './SearchList';
import {SearchMap} from './SearchMap';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {conversationActions, connectionActions} from '../actions';

import {channel} from '../constants';

import {
    history,
    subscribe,
    publishMessage,
    participants,
    settingState
} from '../services/pubnub';

import styles from '../styles';

class BareConversation extends Component {
    constructor() {
        super();

        this.state = {
            mainPage: 'InitialConver',
            activePage: 'Conversation',
            subscription: null,
            viewPosition: new Animated.Value(0),
            currentLoc: [],
            allPOI: '',
            searchedPOI: '',
            currentPOI: '',
            fromWhereToMap: '',
            mapCenter: '',
            allFriends: '',

        };
    }

    _setNavigation(page) {
        this.setState({
            fromWhereToMap: 'chat',
            mainPage: page
        })
    }

    getMarker(marker) {
        console.log('get marker', marker);
        this.setState({
            mapCenter: [marker.lat, marker.lng],
            fromWhereToMap: 'marker',
            activePage: 'ShareMap'
        });
    }

    getText(infoSearch) {
        console.log(this.state.currentLoc);
        const lat = this.state.currentLoc[0];
        const lng = this.state.currentLoc[1];
        const googleMapApi = "https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyAh11AWjqh_cDS1PG44o1JLXmGi_zoVjt8";
        const query = googleMapApi + '&query=' + infoSearch + '+&location=' + lat + "," + lng+ '&radius=3000';
        fetch(query)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                this.setState({
                    currentPOI: responseData.results,
                    searchedPOI: infoSearch,
                    mainPage: 'SearchList'
                });
            })
            .done();
    }


    render() {
        const {
            channels,
            history,
            friends,
            disconnect,
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
            transform: [{translateX: this.state.viewPosition}],
        });

        return (
            <View style={[styles.flx1, styles.flxCol, styles.selfStretch]}>
                {this.state.mainPage === 'InitialConver' ? (
                    <Animated.View style={containerStyle}>
                        <ChatHeader
                            currentPage={this.state.activePage}
                            signOut={disconnect}
                            channel={selectedChannel}
                            focusModal={this._setNavigation.bind(this)}
                            onMenuClick={this.onMenuClick.bind(this)}/>
                        {this.state.activePage === 'Conversation' ? (
                            <ChatHistory ref="chatHistory"
                                         getMarker={this.getMarker.bind(this)}
                                         history={history}
                                         fetchHistory={() => this.fetchHistory()}/>)
                            : this.state.activePage === 'ShareMap' ? (
                            <ShareMap
                                allFriends={this.state.allFriends}
                                fromWhere={this.state.fromWhereToMap}
                                currentLoc={this.state.currentLoc}
                                user={user}
                                allPOI={this.props.history}
                                placeMarkerLoc={this.state.mapCenter}
                            />
                        ) : null }
                        <ChatInput
                            user={user}
                            publishMessage={message => this.onPublishMessage(message)}/>
                    </Animated.View>
                ) : this.state.mainPage === 'SearchPage' ? (
                    <Animated.View style={containerStyle}>
                        <SearchPage
                            searchText={this.getText.bind(this)}
                            backButton={this._setNavigation.bind(this)}
                            onMenuClick={this.onMenuClick.bind(this)}
                        />
                    </Animated.View>
                ) : this.state.mainPage === 'SearchList' ? (
                    <SearchList
                        user={user}
                        searchText={this.state.searchedPOI}
                        allPOI={history}
                        currentPOI={this.state.currentPOI}
                        currentLoc={this.state.currentLoc}
                        backButton={this._setNavigation.bind(this)}
                        focusModal={this._setNavigation.bind(this)}
                        publishMessage={message => this.onPublishMessage(message)}
                    />
                ) : this.state.mainPage === 'SearchMap' ? (
                    <SearchMap
                        allFriends={this.state.allFriends}
                        user={user}
                        allPOI={this.props.history}
                        currentLoc={this.state.currentLoc}
                        currentPOI={this.state.currentPOI}
                        searchText={this.state.searchedPOI}
                        focusModal={this._setNavigation.bind(this)}
                        backButton={this._setNavigation.bind(this)}
                        publishMessage={message => this.onPublishMessage(message)}
                    />
                ) : null }
            </View>
        );
    }

    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const pic = this.props.user.avatarUrl;
                settingState(this.props.selectedChannel.name, this.props.user.id, lat, lng, pic);
                this.setState({
                    currentLoc: [lat, lng]
                })
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }

    componentDidMount() {
        console.log(this.props.user);
        participants(this.props.selectedChannel.name).then(response => {
            console.log(response);
            this.setState({
                allFriends: response
            })
        });

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
            this.setState({subscription: null});
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
        const active = this.state.activePage;
        let newActive;
        switch (active) {
            case 'Conversation': // foo is 0 so criteria met here so this block will run 
                newActive = 'ShareMap';
                break;
            case 'ShareMap': // no break statement in 'case 0:' so this case will run as well 
                newActive = 'Conversation';
                break; // it encounters this break so will not continue into 'case 2:' 
            case 'SearchPage':
                newActive = 'SEARCH_MAP';
                break;
            case 'SEARCH_MAP':
                newActive = 'Conversation';
                break;
            default:
                console.log('default');
                newActive = 'SECOND';
        }
        this.setState({
            activePage: newActive
            //fromWhereToMap: 'main', 
            // forMapAnimation: false 
        });
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
