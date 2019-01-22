import React, {Component} from 'react';
import {AsyncStorage, Platform, StyleSheet, Text, Button, View, TextInput} from 'react-native';
import {Content, Card, CardItem, Body} from 'native-base';
import Dialog, {SlideAnimation, DialogContent} from 'react-native-popup-dialog';
import t from 'tcomb-form-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import LoginScreen from './Components/LoginScreen';
import UpdateInterface from './Components/UpdateInterface';


const Context = React.createContext("lala");
export default class App extends Component<Props> {
    render() {
        return <AppContainer/>;
    }
};




const RootStack = createStackNavigator(
    {
        Login: LoginScreen,
        MainWindow: UpdateInterface,
    },
    {
        initialRouteName: 'Login'
    }
);

const AppContainer = createAppContainer(RootStack);
