import { enableFreeze } from "react-native-screens";
import ApiManager from "./apiManager";
const UserLogin = async (data) => {
    try {
        const result = await ApiManager("/auth/local", {
            method: "POST",
            headers: {
                'content-type':"application/json"
            },
            data:data
        })
        return result;
    } catch(error) {
        return error;
    }
}

export default UserLogin;