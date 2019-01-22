import {SlideAnimation} from "react-native-popup-dialog";
import React, {Component} from 'react';
import deviceStorage from'./deviceStorage';
import {AsyncStorage, Platform, StyleSheet, Text, Button, View, TextInput} from 'react-native';
import styles from './styles';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
import {Content, Card, CardItem, Body} from 'native-base';

class Child extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {tasks: []};
        this.visible = false

    }


    componentWillMount() {

        const isAvailable = () => {
            const timeout = new Promise((resolve, reject) => {
                setTimeout(reject, 15000, 'Request timed out');
            });

            const request = fetch('http://192.168.43.75:8080/tasks', {method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.props.token.token)
            });

            return Promise
                .race([timeout, request])
                .then(function (response) {
                    if (response.status == 200) {
                        response.json().then(value => {
                            deviceStorage.saveItem("tasks",value);
                        });
                    }
                    else {
                        deviceStorage.saveItem("tasks", []);
                    }
                })
                .catch(error => deviceStorage.getTasks().then(value => {this.setState({tasks: value})}));
        };
        // console.log("Aici sunt fucking tokenurileeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
        // console.log(this.props.token);
        isAvailable().then(() => deviceStorage.getTasks().then(value => {this.setState({tasks: value});this.setState({status:true})}));
    }

    handleTaskDescriptionChange = (idx) => (evt) => {
        const newTasks = this.state.tasks.map((task, sidx) => {
            if (idx !== sidx) return task;
            return {...task, descriere: evt.nativeEvent.text}
        });
        this.setState({tasks: newTasks});
    };

    handleTaskTitleChange = (idx) => (evt) => {
        evt.preventDefault();
        const newTasks = this.state.tasks.map((task, sidx) => {
            if (idx !== sidx) return task;
            return {...task, titlu: evt.nativeEvent.text}
        });
        this.setState({tasks: newTasks});
    };

    update = (idx) => () => {
        const taskSender = this.state.tasks.find((task, sidx) => {
            if (idx === sidx) return task;
        });
        console.info(taskSender);
        fetch("http://192.168.43.75:8080/tasks", {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskSender)
        }).catch((error) => {
            console.error(error);
        });
        this.setState({visible: true});
    };

    render() {
        return (
            <View style={styles.container} key={1}>
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
                        <Text style={styles.textPopUp}> {"You did it! You updated this task!"}</Text>
                    </DialogContent>
                </Dialog>
                {this.state.status && this.state.tasks.map((task, idx) =>
                    <Content key={idx} style={styles.container2}>
                        <Card>
                            <CardItem style={styles.card}>
                                <Body>
                                <TextInput style={styles.textInputs}
                                           defaultValue={task.titlu}
                                           onChange={this.handleTaskTitleChange(idx)}/>
                                <TextInput defaultValue={task.descriere}
                                           style={styles.textInputs}
                                           onChange={this.handleTaskDescriptionChange(idx)}/>
                                </Body>
                            </CardItem>
                            <CardItem style={styles.card}>
                                <Body style={styles.cardItem}>
                                <Button title="Update" onPress={this.update(idx)} style={styles.button}/>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>)
                }
            </View>

        );
    }
}

export default Child;
