import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, StatusBar, TextInput, Button } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import MapView, { Marker } from 'react-native-maps';

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

    _findFriends = async () => {
        const username = this.state.username;
        const password = this.state.password;
        const radius = this.state.radius;
        const pos = { lat: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude }
        const rawResponse = await fetch('localhost:3000/node/api/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                latitude: pos.lat,
                longitude: pos.lng,
                radius: radius
            })
        });

        const friends = await rawResponse.json().catch(err => {
            this.setState({ errorMessage: err })
        });
        this.setState({ markers: friends })
    }

    render() {
        let text = 'Waiting..';
        let markers = []
        let region = {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0,
            longitudeDelta: 0.0,
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
            region = {
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude,
                latitudeDelta: 0.0322,
                longitudeDelta: 0.0221,
            }
        }

        return (
            <View style={{ flex: 1 }}>
                <MapView
                    style={{ flex: 0.65 }}
                    initialRegion={region}
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
                        onPress={this._findFriends}
                        style={{ width: 350 }} />
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