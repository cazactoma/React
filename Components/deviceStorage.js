import {AsyncStorage} from "react-native";

const deviceStorage = {
    async saveItem(key, value) {
        console.log("saving", value);
        try {
            return AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log('AsyncStorage Error: ' + error.message);
        }
    },
    async getTasks() {
        return AsyncStorage.getItem("tasks").then((item) => JSON.parse(item));
    },
    async getAuth() {
        return AsyncStorage.getItem("auth").then((item) => JSON.parse(item));
    }
};

export default deviceStorage;