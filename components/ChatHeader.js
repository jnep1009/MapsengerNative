import React, {Component, PropTypes} from 'react';

import {
    Image,
    ListView,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { SearchBar, Grid, Col } from 'react-native-elements'

import styles from '../styles';

export class ChatHeader extends Component {

    _onFocus() {
        this.props.focusModal('SearchPage');
    }

    render() {
        const {props} = this;

        const containerStyle = [
            styles.flxRow,
            styles.jcBetween,
            styles.bgBase,
            styles.p1,
            styles.pt3,
        ];

        const visual = props.channel.type === 'open' ?
            (<Icon name="people" size={styles.iconSize} color="white"/>) :
            null;

        return (
            <View style={containerStyle}>
                <Grid>
                    <Col size={10}>
                        <SearchBar
                            round
                            lightTheme
                            underlineColorAndroid="transparent"
                            containerStyle={{backgroundColor: '#5a43c8', borderColor: '#5a43c8'}}
                            onFocus={ this._onFocus.bind(this) }
                            placeholder='Type Here...'/>
                    </Col>
                    <Col size={2}>
                        <TouchableOpacity style={[styles.jcEnd, styles.selfCenter]}
                                          onPress={props.onMenuClick}>
                            {this.props.currentPage === 'Conversation' ? (
                                <Icon
                                    name='ios-map-outline'
                                    size={40} color="white"/>
                            ) : this.props.currentPage === 'ShareMap' ? (
                                <Icon
                                    name='ios-chatbubbles'
                                    size={40} color="white"/>
                            ) : null}
                        </TouchableOpacity>
                    </Col>
                </Grid>
            </View>
        );
    }
}

ChatHeader.propTypes = {
    channel: PropTypes.object,
    onMenuClick: PropTypes.func,
    signOut: PropTypes.func,
    currentPage: PropTypes.string,
    focusModal: PropTypes.func
};
