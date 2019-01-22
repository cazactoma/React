import {SlideAnimation} from "react-native-popup-dialog";
import React, {Component} from 'react';
import deviceStorage from'./deviceStorage';
import {AsyncStorage, Platform, StyleSheet, Text, Button, View, TextInput} from 'react-native';
import styles from './styles';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const options = {
    fields: {
        user: {
            error: 'Username is missing'
        },
        password: {
            password: true,
            secureTextEntry: true,
            error: 'Password is missing'
        }
    }
};

const User = t.struct({
    user: t.String,
    password: t.String
});

class LoginScreen extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            value: {}
        };
    }

    componentWillMount() {
        const {navigate} = this.props.navigation;
        deviceStorage.getAuth().then(value => {
            console.log(value);
            if (value)
                navigate('MainWindow')
        });
    }

    handleLogin = () => {
        const {navigate} = this.props.navigation;
        const value = this._form.getValue();
        console.log('value: ', value);
        console.log("AM trecut");
        fetch("http://192.168.43.75:8080/users", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value)
        })
            .then(function (response) {
                if (response.status === 200){
                    response.json().then(value => {deviceStorage.saveItem("auth", value);navigate('MainWindow');});
                }
                else
                    this.setState({visible: true});
            }.bind(this))
            .catch((error) => {
                console.error(error);
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <Dialog
                    visible={this.state.visible}
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                    onTouchOutside={() => {
                        this.setState({visible: false});
                    }}
                >
                    <DialogContent>
                        <Text style={styles.textPopUp2}> {"Login information not valid! Please try again. :)"}</Text>
                    </DialogContent>
                </Dialog>
                <Text style={styles.welcome}>TaskManagement</Text>
                <Form ref={c => this._form = c}
                      type={User}
                      options={options}/>

                <Button title="Login!" onPress={this.handleLogin}/>
            </View>
        )

    }
}

export default LoginScreen;