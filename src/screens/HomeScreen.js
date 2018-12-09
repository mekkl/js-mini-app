import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, StatusBar, TextInput, Button } from 'react-native';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            isLoggedIn: false
        };
    }

    render() {
        return (
            <View style={styles.container} >
                <Button title='Map' onPress={() => this.props.navigation.navigate('Map')} style={styles.button} />
                <Button title='Register' onPress={() => this.props.navigation.navigate('Register')} style={styles.button}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        padding: 20,
        justifyContent: 'space-evenly',
        
    },
    button: {
        height: 50,
        width: 150,
        fontSize: 18,
        textAlign: 'center',
    },
});