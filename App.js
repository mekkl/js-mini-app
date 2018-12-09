import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import Map from './src/screens/Map';
import Register from './src/screens/Register';

const MainNavigator = createStackNavigator({
  HomeScreen: { screen: HomeScreen },
  Map: { screen: Map },
  Register: { screen: Register }
});

const AppNavigator = createAppContainer(MainNavigator);

export default class App extends Component {
  render() {
    return (
      <AppNavigator style={{ backgroundColor: 'white', flex: 1 }}/>
    );
  }
}