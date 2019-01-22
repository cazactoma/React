import Child from './Child';
import React, {Component} from 'react';
import deviceStorage from'./deviceStorage';
import {AsyncStorage, Platform, StyleSheet, Text, Button, View, TextInput} from 'react-native';
import styles from './styles';
import Dialog, {SlideAnimation, DialogContent} from 'react-native-popup-dialog';

class UpdateInterface extends Component<Props> {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        deviceStorage.getAuth().then(value => {this.setState({token: value})})
    }
    handleLogout = () => {
        const {navigate} = this.props.navigation;
        deviceStorage.saveItem("auth", "");
        navigate('Login');
    };

    render() {
        return (

            <View style={styles.container}>
                <Text style={styles.welcome}> Context Api React-Native </Text>
                <Button title="LogOut!" onPress={this.handleLogout} style={styles.button}/>
                { this.state && this.state.token &&
                <Child key={1} token={this.state.token}/>
                }
            </View>
        );
    }
}

export default UpdateInterface;