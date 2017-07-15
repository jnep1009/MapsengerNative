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
import Icon from 'react-native-vector-icons/Ionicons';
import { SearchBar, Grid, Col, Row, Card, ListItem } from 'react-native-elements'
import styles from '../styles';

export class SearchPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
    }

    _onClickButton(menu) {
        console.log('Search Page', menu);
        this.props.searchText(menu);
    }

    _onSubmit(e) {
        if(e.nativeEvent.key == "Enter") {
            const message = this.state.search;
            this.props.searchText(message);
        }
    }

    _onBackbutton(page){
        this.props.backButton(page);
    }


    render() {
        const {props} = this;
        const users = [
            {
                name: 'Restaurant',
                avatar: 'https://images.unsplash.com/photo-1486533803613-e0ce3d009238'
            },
            {
                name: 'Coffee',
                avatar: 'https://images.unsplash.com/photo-1428550443830-190057dc8098'
            },
            {
                name: 'Fast food',
                avatar: 'https://images.unsplash.com/photo-1496930666207-e76e8253a950'
            },
            {
                name: 'Bar',
                avatar: 'https://images.unsplash.com/photo-1461823385004-d7660947a7c0'
            },
            {
                name: 'Park',
                avatar: 'https://images.unsplash.com/photo-1445824285584-336d1e77abbf'
            },
            {
                name: 'Trail',
                avatar: 'https://images.unsplash.com/photo-1492133969098-09ba49699f47'
            }
        ];

        return (
            <View
                style={{paddingTop: 30}}
            >
                <Row size={2}>
                    <Grid>
                        <Col size={1}>
                            <TouchableOpacity style={[styles.jcEnd, styles.selfCenter]}
                                              onPress={this._onBackbutton.bind(this, "InitialConver")}>
                                <Icon
                                    style={{top:8}}
                                    name='md-arrow-round-back'
                                    size={25} color="black"/>
                            </TouchableOpacity>
                        </Col>
                        <Col size={10}>
                            <SearchBar
                                autoFocus={true}
                                round
                                lightTheme
                                ref='SearchInput'
                                onChangeText={(value) => this.setState({search: value})}
                                onKeyPress={this._onSubmit.bind(this)}
                                containerStyle={{backgroundColor: 'transparent', borderRadius: 0}}
                                placeholder='Search for places here'/>
                        </Col>
                    </Grid>
                </Row>
                <Row size={10}>
                    <Col size={12}>
                        <Card containerStyle={{padding: 0}}>
                            {
                                users.map((u, i) => {
                                    return (
                                        <ListItem
                                            onPress={() => this._onClickButton(u.name)}
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
    searchText: PropTypes.func,
    onMenuClick: PropTypes.func,
    backButton:  PropTypes.func

};
