import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, StatusBar, TextInput, Button } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import MapView, { Marker } from 'react-native-maps';
import {post} from './facade';

export default class App extends Component {
  state = {
    location: null,
    errorMessage: null,
    username: '',
    password: '',
    radius: 0,
    markers: []
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  _markFriends = async () => {
    const friends = await post({
      username: this.state.username,
      password: this.state.password,
      latitude: this.state.location.coords.latitude,
      longitude: this.state.location.coords.longitude,
      radius: this.state.radius
    },'/auth/login')

    this.setState({markers: friends})
  }

  render() {
    let text = 'Waiting..';
    let markers = []
    // init region
    let region = {
      latitude: 55.6839,
      longitude: 12.5931,
      latitudeDelta: 4.0,
      longitudeDelta: 4.0,
    }
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
      markers.push({
        latitude: this.state.location.coords.latitude,
        longitude: this.state.location.coords.longitude,
        title: 'marker1',
        description: 'description'
      })
      // add friends if any
      if (this.state.markers.length > 0) {
        this.state.markers.forEach(marker => {
          markers.push({
            latitude: marker.latitude, 
            longitude: marker.longitude,
            title: 'title',
            description: 'description'
          })
        })
      }
      region = {
        latitude: this.state.location.coords.latitude,
        longitude: this.state.location.coords.longitude,
        latitudeDelta: 1,
        longitudeDelta: 1,
      }
    }

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 0.65 }}
          region={region}
        >
          {markers.map(marker => (
            <Marker
              key={marker.title}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
        <View style={{ flex: 0.35, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{text}</Text>
          <TextInput
            style={{ height: 35, width: 350, borderColor: 'gray', borderWidth: 0.8 }}
            onChangeText={(username) => this.setState({ username })}
            value={this.state.username}
            placeholder='username'
          /><TextInput
            style={{ height: 35, width: 350, borderColor: 'gray', borderWidth: 0.8 }}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            secureTextEntry={true}
            placeholder='password'
          /><TextInput
            style={{ height: 35, width: 350, borderColor: 'gray', borderWidth: 0.8 }}
            keyboardType='numeric'
            onChangeText={(radius) => this.setState({ radius })}
            value={this.state.radius}
            placeholder='radius'
          />
          <Button 
          title='search' 
          onPress={this._markFriends} 
          style={{width: 350}}/>
        </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    flex: 0.35,
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
});