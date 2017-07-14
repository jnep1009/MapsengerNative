/**  * Created by JNEP on 7/7/17.  */
import React, { Component, PropTypes } from 'react';
import { View, AppRegistry, Dimensions, Image, Text, StyleSheet } from 'react-native';
//import { GradientView } from '../../Common'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
const { width, height } = Dimensions.get('window');

export class ShareMap extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    show() {
        this.marker1.showCallout();
    }

    render() {
        return (
            <View style={{ position: 'relative', height: height}}>
                <MapView
                    style={{ left:0, right: 0, top:0, bottom: 0, position: 'absolute' }}
                    initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
                    <MapView.Marker
                        ref={ref => { this.marker1 = ref; }}
                        onPress={() => this.show()}
                        coordinate={{
                           latitude: 37.78825,
                           longitude: -122.4324
                        }}>
                        <Image
                            style={{width: 40, height: 40, borderRadius: 40 / 2, borderWidth: 1, borderColor: 'white'}}
                            source={{uri: this.props.user.avatarUrl}}/>
                        <MapView.Callout
                            style={styles.plainView}
                        >
                            <View
                            >
                                <Text>This is a plain view</Text>
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
    user: PropTypes.object

}; 