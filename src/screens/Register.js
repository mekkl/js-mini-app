import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    View,
    Button
} from 'react-native';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            userName: '',
            password: ''
        };
    }

    render() {
        return (
            <ScrollView style={{ padding: 20 }}>
                <Text
                    style={{ fontSize: 27 }}>
                    Register
                </Text>
                <TextInput onChangeText={(firstName) => {this.setState({firstName})}} placeholder='Firstname' value={this.state.firstName} />
                <TextInput onChangeText={(lastName) => {this.setState({lastName})}} placeholder='Lastname' value={this.state.lastName} />
                <TextInput onChangeText={(email) => {this.setState({email})}} placeholder='Email' value={this.state.email} />
                <TextInput onChangeText={(userName) => {this.setState({userName})}} placeholder='Username' value={this.state.userName} />
                <TextInput onChangeText={(password) => {this.setState({password})}} placeholder='Password' value={this.state.password} secureTextEntry={true}/>
                <View style={{ margin: 7 }} />
                <Button onPress={() => {console.log('pressed register')}} title="Submit" />
            </ScrollView>
        )
    }
}