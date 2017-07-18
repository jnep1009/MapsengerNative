/**  * Created by JNEP on 7/7/17.  */
import React, { Component, PropTypes } from 'react';
import { View, AppRegistry, Dimensions, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
//import { GradientView } from '../../Common'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { SearchBar, Grid, Col, Row, Card, ListItem, List, Avatar, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');


export class SearchMap extends Component {

    _onFocus() {
        this.props.focusModal('SearchPage');
    }

    _onBackbutton(page) {
        this.props.backButton(page);
    }


    _shareMarker(marker, placeIndex) {
        let chosenMarker = marker;
        chosenMarker['existing'] = 'item-shared';
        let existingPlaces = this.state.places;
        existingPlaces[placeIndex] = chosenMarker;
        const messageObj = {
            Who: this.props.user,
            // What: message,
            When: new Date().valueOf(),
            Where: marker,
            Type: 'marker',
        };
        this.setState({
            places: existingPlaces
        });
        this.props.publishMessage(messageObj);
    }

    componentWillMount() {
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
            const addressArr = obj.formatted_address.split(",");
            const woCty = addressArr.slice(0, -2).join(',');
            const country = addressArr.splice(2).join(',');
            console.log(woCty, country);
            if (allExistingID.includes(obj.id)) {
                robj = {
                    id: obj.id,
                    name: obj.name,
                    pic: obj.icon,
                    rating: obj.rating,
                    address: woCty,
                    country: country,
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
                    address: woCty,
                    country: country,
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
        this.setState({
            places: reformedPlaces
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(this.state.places, nextState.places);
        if (this.state.places === nextState.places) {
            return true;
        }
        return false;
    }

    show(marker) {
        marker.showCallout();
    }

    constructor(props) {
        super(props);
        this.state = {
            showReply: false,
            places: props.currentPOI,
            'active': false
        };
    }

    render() {
        return (
            <View style={{
            position: 'relative',
            height: height,
            marginTop: 30
            }}>
                <Grid>
                    <Row size={2}>
                        <Col size={1}>
                            <TouchableOpacity style={[styles.jcEnd, styles.selfCenter]}
                                              onPress={this._onBackbutton.bind(this, "InitialConver")}>
                                <Icon
                                    style={{
                                        marginLeft: 5,
                                        top: 2

                                    }}
                                    name='md-arrow-round-back'
                                    size={40} color="black"/>
                            </TouchableOpacity>
                        </Col>
                        <Col size={7}>
                            <SearchBar
                                round
                                lightTheme
                                onFocus={ this._onFocus.bind(this) }
                                containerStyle={{
                                backgroundColor: 'transparent',
                                borderRadius: 0,
                                    borderTopWidth:0,
                            borderBottomWidth:0}}
                                placeholder={this.props.searchText}/>
                        </Col>
                        <Col size={1}>
                            <TouchableOpacity style={[styles.jcEnd, styles.selfCenter]}
                                              onPress={this._onBackbutton.bind(this, "SearchList")}>
                                <Icon
                                    style={{top:8}}
                                    name='ios-chatbubbles'
                                    size={35} color="black"/>
                            </TouchableOpacity>
                        </Col>
                    </Row>
                    <Row size={25}>
                        <Col size={10}>
                            <MapView
                                style={{ left:0, right: 0, top:0, bottom: 0, position: 'absolute' }}
                                initialRegion={{
            latitude: this.props.currentLoc[0],
            longitude: this.props.currentLoc[1],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
                                {
                                    this.state.places.map((marker, i)=> {
                                        return (
                                            <MapView.Marker
                                                ref={ref => { i = ref; }}
                                                onPress={() => this.show(i)}
                                                coordinate={{
                                        latitude: marker.lat,
                                        longitude: marker.lng
                                    }}>
                                                {marker.existing === 'item-share' ? (
                                                    <Image
                                                        style={{width: 18, height: 26}}
                                                        source={{uri:"https://i.imgur.com/IyqkVRW.png"}}/>

                                                ) : marker.existing === 'item-shared' ? (
                                                    <Image
                                                        style={{width: 18, height: 26}}
                                                        source={{uri:"https://i.imgur.com/s3gWqrp.png"}}/>
                                                ) : null}
                                                <MapView.Callout
                                                    style={{
                                            width: 150
                                           }}
                                                >
                                                    <View
                                                    >
                                                        <Text>
                                                            {"Name" + marker.name}
                                                            {`\n`}
                                                            {"Name" + marker.address}
                                                            {`\n`}
                                                            {"Rating" + marker.rating}
                                                            {`\n`}
                                                        </Text>
                                                        <Button
                                                            style={{
                                                            marginTop: 12,
                                                        }}
                                                            onPress={this._shareMarker.bind(this, marker, i)}
                                                            title='Share'/>
                                                    </View>
                                                </MapView.Callout>
                                            </MapView.Marker>
                                        )
                                    })
                                }
                                <MapView.Marker
                                    ref={ref => { this.marker1 = ref; }}
                                    onPress={() => this.show(this.marker1)}
                                    coordinate={{
                           latitude: this.props.currentLoc[0],
                           longitude: this.props.currentLoc[1]
                        }}>
                                    <Image
                                        style={{width: 40, height: 40, borderRadius: 40 / 2, borderWidth: 1, borderColor: 'white'}}
                                        source={{uri: this.props.user.avatarUrl}}/>
                                    <MapView.Callout
                                        style={{
                             width: 60
                            }}
                                    >
                                        <View>
                                            <Text>You are here</Text>
                                        </View>
                                    </MapView.Callout>
                                </MapView.Marker>
                                {
                                    this.props.allFriends.map((friend, i) => {
                                        return (
                                            <MapView.Marker
                                                ref={ref => { friend.id = ref; }}
                                                onPress={() => this.show(friend.id)}
                                                coordinate={{
                           latitude: friend.lat,
                           longitude: friend.lng
                        }}>
                                                <Image
                                                    style={{width: 40, height: 40, borderRadius: 40 / 2, borderWidth: 1, borderColor: 'white'}}
                                                    source={{uri: friend.avatarUrl}}/>
                                                <MapView.Callout
                                                    style={{
                             width: 60
                            }}
                                                >
                                                    <View>
                                                        <Text>You are here</Text>
                                                    </View>
                                                </MapView.Callout>
                                            </MapView.Marker>
                                        )
                                    })
                                }
                            </MapView>
                        </Col>
                    </Row>
                </Grid>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    plainView: {
        width: 60,
    }
});


SearchMap.propTypes = {
    searchText: PropTypes.string,
    allPOI: PropTypes.array,
    currentPOI: PropTypes.array,
    currentLoc: PropTypes.array,
    publishMessage: PropTypes.func,
    user: PropTypes.object,
    focusModal: PropTypes.func,
    backButton: PropTypes.func,
    allFriends: PropTypes.array


}; 