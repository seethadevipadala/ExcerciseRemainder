import HomeScreen from "./screens/HomeScreen";
import TimerScreen from "./screens/TimerScreen";
import { Text } from "react-native";
import EditScreen from "./screens/EditScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Feather";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: (
              <Text style={{ color: "white"}}>
                {"                       "}
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
          name="EditScreen"
          component={EditScreen}
          options={{
            title: (
              <Text style={{ color: "white"}}>
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
