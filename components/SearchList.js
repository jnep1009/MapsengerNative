/**
 * Created by JNEP on 7/13/17.
 */
/**
 * Created by JNEP on 7/13/17.
 */
import React, {Component, PropTypes} from 'react';
import geolib from 'geolib';
import {
    Image,
    ListView,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SearchBar, Grid, Col, Row, Card, ListItem, List, Avatar, Button } from 'react-native-elements'
import styles from '../styles';

const stylesList = StyleSheet.create({
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5
    },
    ratingImage: {
        height: 19.21,
        width: 100
    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey'
    }
});

export class SearchList extends Component {

    _shareMarker(marker) {
        const markerId = '#' + marker.id;
        const markerIdButton = '#' + marker.id + "button";
        $(markerIdButton).hide();
        $(markerId).removeClass('item-share');
        $(markerId).addClass('item-shared');
        const messageObj = {
            Who: this.props.user,
            // What: message,
            When: new Date().valueOf(),
            Where: marker,
            Type: 'marker',
        };
        this.props.sendMessage(messageObj);
    }

    constructor(props) {
        super(props);
        this.state = {
            showReply: false,
            places: props.currentPOI,
            'active': false
        };
    }

    componentWillMount() {
        console.log(' Prop Current POI', this.state.places);
        const userCurrentLoc = this.props.currentLoc;
        const allExistingID = [];
        let robj;
        const markerHistory = this.props.allPOI;
        const getMarker = markerHistory.filter(function (el) {
            return el.Type === 'marker';
        });
        getMarker.map(function (existingMarker) {
            allExistingID.push(existingMarker.Where.id);
        });
        const reformedPlaces = this.state.places.map(function (obj) {
            const disLat = obj.geometry.location.lat;
            const disLng = obj.geometry.location.lng;
            const totalDistance = geolib.getDistance(
                {latitude: disLat, longitude: disLng},
                {latitude: userCurrentLoc[0], longitude: userCurrentLoc[1]}
            );
            const distanceInMiles = totalDistance / 6000;
            if (allExistingID.includes(obj.id)) {
                robj = {
                    id: obj.id,
                    name: obj.name,
                    pic: obj.icon,
                    rating: obj.rating,
                    address: obj.formatted_address,
                    background: '#ffffff',
                    imgBorderColor: 'black',
                    distance: String(distanceInMiles.toFixed(2)) + ' Miles',
                    lat: disLat,
                    lng: disLng,
                    existing: 'item-shared'
                };
            } else {
                robj = {
                    id: obj.id,
                    name: obj.name,
                    pic: obj.icon,
                    rating: obj.rating,
                    address: obj.formatted_address,
                    background: '#ffffff',
                    imgBorderColor: 'black',
                    distance: String(distanceInMiles.toFixed(2)) + ' Miles',
                    lat: disLat,
                    lng: disLng,
                    existing: 'item-share'
                };
            }
            return robj;
        });
        console.log('reformed Place', reformedPlaces);
        this.setState({
            places: reformedPlaces
        });
    }


    _onClickButton(menu) {
        //this.props.searchText(menu);
    }


    render() {
        const {props} = this;
        return (
            <View
                style={{paddingTop: 30}}
            >
                <Grid>
                    <Row size={1}>
                        <Col size={12}>
                            <SearchBar
                                round
                                lightTheme
                                containerStyle={{backgroundColor: 'transparent', borderRadius: 0}}
                                placeholder={this.props.searchText}/>
                        </Col>
                    </Row>
                    <Row size={25}
                    style={{marginTop: -25}}
                    >
                        <Col size={12}>
                            <ScrollView>
                                {
                                    this.props.currentPOI.map((u, i) => {
                                        return (
                                            <List>
                                                <ListItem
                                                    containerStyle={{
                                                backgroundColor: 'transparent'
                                            }}
                                                    titleStyle={{
                                                fontSize: 23,
                                                color: "black"
                                            }}
                                                    subtitleStyle={{
                                                fontSize: 22,
                                                color: "black"
                                            }}
                                                    roundAvatar
                                                    title='Little Thai'
                                                    subtitle={
                                                <View style={stylesList.subtitleView}>
                                                    <Text>{`Hi~ \n this is a test message.`}</Text>
                                                </View>
                                            }
                                                    rightIcon={
                                                <Button
                                                    style={{
                                                        marginTop: 10,
                                                    }}
                                                    title='Share' />
                                            }
                                                />
                                            </List>
                                        );
                                    })
                                }
                            </ScrollView>
                        </Col>
                    </Row>
                </Grid>
            </View>
        );
    }
}

SearchList.propTypes = {
    searchText: PropTypes.string,
    allPOI: PropTypes.array,
    currentPOI: PropTypes.array,
    currentLoc: PropTypes.array,
    sendMessage: PropTypes.func,
    user: PropTypes.object,
};
