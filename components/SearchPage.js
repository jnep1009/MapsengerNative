/**
 * Created by JNEP on 7/13/17.
 */
import React, {Component, PropTypes} from 'react';

import {
    Image,
    ListView,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchBar, Grid, Col, Row, Card, ListItem } from 'react-native-elements'
import styles from '../styles';

export class SearchPage extends Component {

    _onFocus() {
        this.props.focusModal();
    }

    render() {
        const {props} = this;
        const users = [
            {
                name: 'brynn',
                avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
            },
            {
                name: 'brynn',
                avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
            }// more users here
        ];

        return (
            <View
                style={{paddingTop: 30}}
            >
                <Row size={2}>
                    <Grid>
                        <Col size={1}>
                            <TouchableOpacity style={[styles.mb3, styles.pl2]}
                                              activeOpacity={0.6}
                                              onPress={props.signOut}>
                                <View style={[styles.flxRow]}>
                                    <Icon name="power-settings-new" size={25} color="white"/>
                                    <Text style={[styles.silver, styles.ml1, {marginTop: 6}]}>Sign Out</Text>
                                </View>
                            </TouchableOpacity>
                        </Col>
                        <Col size={10}>
                            <SearchBar
                                round
                                lightTheme
                                containerStyle={{backgroundColor: 'transparent', borderRadius: 0}}
                                placeholder='Type Here...'/>
                        </Col>
                        <Col size={1}/>
                    </Grid>
                </Row>
                <Row size={10}>
                    <Col size={12}>
                        <Card containerStyle={{padding: 0}}>
                            {
                                users.map((u, i) => {
                                    return (
                                        <ListItem
                                            key={i}
                                            roundAvatar
                                            title={u.name}
                                            avatar={{uri:u.avatar}}
                                        />
                                    );
                                })
                            }
                        </Card>
                    </Col>
                </Row>
            </View>
        );
    }
}

SearchPage.propTypes = {
    //channel: PropTypes.object,
    //onMenuClick: PropTypes.func,
    //signOut: PropTypes.func,
    //focusModal: PropTypes.func
};
