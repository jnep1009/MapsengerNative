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
import Icon from 'react-native-vector-icons/Ionicons';
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

    _onFocus() {
        this.props.focusModal('SearchPage');
    }

    _onBackbutton(page){
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

    constructor(props) {
        super(props);
        this.state = {
            showReply: false,
            places: props.currentPOI,
            'active': false
        };
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
                        <Col size={1}>
                            <TouchableOpacity style={[styles.jcEnd, styles.selfCenter]}
                                              onPress={this._onBackbutton.bind(this, "InitialConver")}>
                                <Icon
                                    style={{top:8}}
                                    name='md-arrow-round-back'
                                    size={25} color="black"/>
                            </TouchableOpacity>
                        </Col>
                        <Col size={8}>
                            <SearchBar
                                round
                                lightTheme
                                onFocus={ this._onFocus.bind(this) }
                                containerStyle={{backgroundColor: 'transparent', borderRadius: 0}}
                                placeholder={this.props.searchText}/>
                        </Col>
                        <Col size={1}>
                            <TouchableOpacity style={[styles.jcEnd, styles.selfCenter]}
                                              onPress={this._onBackbutton.bind(this, "SearchMap")}>
                                <Icon
                                    style={{top:8}}
                                    name='ios-map-outline'
                                    size={35} color="black"/>
                            </TouchableOpacity>
                        </Col>
                    </Row>
                    <Row size={25}
                         style={{marginTop: -25}}
                    >
                        <Col size={12}>
                            <ScrollView>
                                {
                                    this.state.places.map((place, i) => {
                                        return (
                                            <List>

                                                { place.existing === "item-share" ? (

                                                    <ListItem
                                                        key={i}
                                                        containerStyle={{
                                                backgroundColor: 'white'
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
                                                        title={place.name}
                                                        subtitle={
                                                <View style={stylesList.subtitleView}>
                                                    <Text>
                                                    {place.distance + `away`}
                                                    {`\n`}
                                                    {place.address}
                                                     {`\n`}
                                                     {place.country}
                                                     {`\n`}
                                                     {`Rating :` + place.rating}
                                                    </Text>
                                                </View>
                                            }

                                                        rightIcon={
                                                <Button
                                                        style={{
                                                            marginTop: 12,
                                                        }}
                                                        onPress={this._shareMarker.bind(this, place, i)}
                                                        title='Share' />
                                                    }
                                                    />

                                                ) : place.existing === "item-shared" ? (

                                                    <ListItem
                                                        key={i}
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
                                                        title={place.name}
                                                        subtitle={
                                                <View style={stylesList.subtitleView}>
                                                    <Text>
                                                    {place.distance + `away`}
                                                    {`\n`}
                                                     {place.address}
                                                     {`\n`}
                                                     {place.country}
                                                     {`\n`}
                                                     {`Rating :` + place.rating}
                                                    </Text>
                                                </View>
                                            }
                                                        rightIcon={
                                                         <Image
                                                        style={{width: 18, height: 26, marginTop: 15, marginRight: 10}}
                                                        source={{uri: "https://i.imgur.com/s3gWqrp.png"}}/>}
                                                        />
                                                ) : null }
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
    publishMessage: PropTypes.func,
    user: PropTypes.object,
    focusModal: PropTypes.func,
    backButton:  PropTypes.func

};
