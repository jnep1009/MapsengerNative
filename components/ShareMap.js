/**  * Created by JNEP on 7/7/17.  */
import React, { Component, PropTypes } from 'react';
import { View, AppRegistry, Dimensions, Image, Text, StyleSheet } from 'react-native';
//import { GradientView } from '../../Common'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
const { width, height } = Dimensions.get('window');

export class ShareMap extends Component {

    componentWillMount() {
        console.log(this.props.fromWhere, this.props.currentLoc, this.props.placeMarkerLoc);
        if (this.props.fromWhere === 'marker') {
            console.log('yes marker');
            this.setState({
                currentShowLoc: this.props.placeMarkerLoc
            });
        } else {
            this.setState({
                currentShowLoc: this.props.currentLoc
            });
        }
        const markerHistory = this.props.allPOI;
        const getMarker = markerHistory.filter(function (el) {
            return el.Type === 'marker';
        });
        const reformedPlaces = getMarker.map(function (obj) {
            return {
                markerID: obj.Where.markerID,
                lat: obj.Where.lat,
                lng: obj.Where.lng,
                name: obj.Where.name,
                pic: obj.Where.pic,
                rating: obj.Where.rating,
                address: obj.Where.address,
                background: '#ffffff',
                imgBorderColor: 'black',
                distance: obj.Where.distance,
            };
        });
        this.setState({
            POI: reformedPlaces,
        });
    }

    show(marker) {
        marker.showCallout();
    }

    constructor(props) {
        super(props);
        this.state = {
            POI: '',
            currentShowLoc: [0, 1]
        };
    }

    render() {
        return (
            <View style={{ position: 'relative', height: height}}>
                <MapView
                    style={{ left:0, right: 0, top:0, bottom: 0, position: 'absolute' }}
                    initialRegion={{
            latitude: this.state.currentShowLoc[0],
            longitude: this.state.currentShowLoc[1],
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
                    {
                        this.state.POI.map((marker, i) => {
                            return (
                                <MapView.Marker
                                    ref={ref => { i = ref; }}
                                    onPress={() => this.show(i)}
                                    coordinate={{
                                        latitude: marker.lat,
                                        longitude: marker.lng
                                    }}>
                                    <Image
                                        style={{width: 18, height: 26}}
                                        source={{uri:"https://i.imgur.com/s3gWqrp.png"}}/>
                                    <MapView.Callout
                                        style={{
                                            width: 150
                                           }}
                                    >
                                        <View
                                        >
                                            <Text
                                            style={{
                                                fontSize: 15
                                            }}>
                                                {marker.name}
                                                {`\n`}
                                            </Text>
                                            <Text>
                                                {"Address" + marker.address}
                                                {`\n`}
                                            </Text>
                                            <Text>
                                                {"Rating" + marker.rating}
                                                {`\n`}
                                            </Text>
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
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    plainView: {
        width: 60,
    }
});


ShareMap.propTypes = {
    currentLoc: PropTypes.array,
    currentPOI: PropTypes.array,
    user: PropTypes.object,
    allPOI: PropTypes.array,
    fromWhere: React.PropTypes.string,
    placeMarkerLoc: React.PropTypes.array

}; 