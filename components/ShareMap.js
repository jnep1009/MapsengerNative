/**  * Created by JNEP on 7/7/17.  */
import React, { Component } from 'react';
import { View, AppRegistry, Dimensions } from 'react-native';
//import { GradientView } from '../../Common'
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');
export class ShareMap extends Component {
    constructor() {
        super();
        this.state = {};
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
          }}
                />
            </View>
        )
            ;
    }
}
ShareMap.propTypes = {}; 