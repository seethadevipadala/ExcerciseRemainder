import HomeScreen from "./screens/HomeScreen";
import TimerScreen from "./screens/TimerScreen";
import EditScreen from "./screens/EditScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="EditScreen" component={EditScreen} />
        <Stack.Screen name="TimerScreen" component={TimerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
