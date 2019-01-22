import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    container2: {
        backgroundColor: '#F5FCFF',
        margin: 0,
        padding: 0,

        flexDirection: 'row'
    },
    welcome: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        color: '#6495ED',
        fontWeight: 'bold'
    },
    child: {
        fontSize: 18,
        textAlign: 'center',
        margin: 0,
        padding: 0
    },
    button: {
        left: 100
    },

    cardItem: {
        justifyContent: 'center',
    },
    text: {
        flexDirection: 'row'
    },
    card: {
        width: 500,
        margin: 0,
        padding: 0,
        justifyContent: 'center'
    },
    textPopUp: {
        fontWeight: 'bold',
        color: '#6495ED',
        fontSize: 20,
        top: 10

    },

    textInputs: {
        fontWeight: 'bold',
        color: '#6495ED',
        fontSize: 20,
        margin: 10,
        width: 275,
        borderColor: '#DCDCDC',
        borderWidth: 1
    },
    textPopUp2: {
        fontWeight: 'bold',
        color: 'darkred',
        fontSize: 20,
        top: 10
    }

});

export default styles;