import React, {Component, PropTypes} from 'react';

import {
    Image,
    ListView,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { SearchBar, Grid, Col } from 'react-native-elements'

import styles from '../styles';

export class ChatHeader extends Component {
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
                            containerStyle={{backgroundColor: 'transparent', borderRadius: 0}}
                            placeholder='Type Here...'/>
                    </Col>
                    <Col size={2}>
                        <TouchableOpacity style={[styles.jcEnd, styles.selfCenter]}
                                          onPress={props.onMenuClick}>
                            <Icon
                                style={{top:8}}
                                name='map-o'
                                size={30} color="white"/>
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
};
