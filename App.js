import HomeScreen from "./screens/HomeScreen";
import TimerScreen from "./screens/TimerScreen";
import SignUpScreen from "./screens/SignUpScreen";
import { Text } from "react-native";
import EditScreen from "./screens/EditScreen";
import TestScreen from "./screens/TestScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Feather";
import LoginScreen from "./screens/LoginScreen";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function App() {
  const [jwt, setJwt] = useState();
  const getJwt = () => {
    try {
      AsyncStorage.getItem("jwt").then((value) => {
        console.log(value, "value");
        setJwt(value);
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log("getJwt");
    getJwt();
  }, []);
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={!jwt ? `LoginScreen` : `HomeScreen`}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            title: (
              <Text style={{ color: "white" }}>
                {/* {"                       "} */}
                Login Screen
              </Text>
            ),
            headerStyle: {
              backgroundColor: "#1e73fc",
            },
          }}
        />

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: (
              <Text style={{ color: "white" }}>
                {/* {"                       "} */}
                Home Screen
              </Text>
            ),
            headerStyle: {
              backgroundColor: "#1e73fc",
            },
            // headerTintColor: "#EBF2F0",
          }}
        />

        <Stack.Screen
          name="TestScreen"
          component={TestScreen}
          options={{
            title: (
              <Text style={{ color: "white" }}>
                {/* {"                       "} */}
                Home Screen
              </Text>
            ),
            headerStyle: {
              backgroundColor: "#1e73fc",
            },
            // headerTintColor: "#EBF2F0",
          }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{
            title: (
              <Text style={{ color: "white" }}>
                {"            "}
                Signup Screen
              </Text>
            ),
            headerStyle: {
              backgroundColor: "#1e73fc",
            },
            // headerTintColor: "#EBF2F0",
          }}
        />

        <Stack.Screen
          name="EditScreen"
          component={EditScreen}
          options={{
            title: (
              <Text style={{ color: "white" }}>
                {"                       "}
                Edit Screen
              </Text>
            ),
            headerStyle: {
              backgroundColor: "#1e73fc",
            },
            headerTintColor: "#EBF2FA",
            headerLeft: () => null,
          }}
        />
        <Stack.Screen
          name="TimerScreen"
          component={TimerScreen}
          options={{
            title: (
              <Text style={{ color: "white", marginLeft: 30 }}>
                {"                       "}
                Timer Screen
              </Text>
            ),
            headerStyle: {
              backgroundColor: "#1e73fc",
            },
            headerTintColor: "#EBF2FA",
            headerLeft: () => null,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
