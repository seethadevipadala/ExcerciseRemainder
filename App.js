import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import NotificationScreen from "./screens/NotificationScreen";
import TimerScreen from "./screens/TimerScreen";
import SelectDurationScreen from "./screens/SelectDurationScreen";
import BeepIntervalScreen from "./screens/BeepIntervalScreen";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import EditScreen from "./screens/editScreen";

// import {NavigationContainer}  from "react-navigation/native";
// import createNativeStackNavigator  from "react-navigation/native-stack";

// export default function App() {
//   const Stack = createStackNavigator();
//   return (
//     <View>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen
//             name="Home"
//             component={HomeScreen}
//             options={{ title: "Welcome" }}
//           />
//           <Stack.Screen name="Profile" component={ProfileScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//       <HomeScreen />
//     </View>
//   );
// }

const navigator = createStackNavigator(
  {
    NotificationScreen: { screen: NotificationScreen },
    TimerScreen: { screen: TimerScreen },
    HomeScreen: { screen: HomeScreen },
    SelectDurationScreen: { screen: SelectDurationScreen },
    EditScreen : {screen : EditScreen},
  },
  {
    initialRouteName: "HomeScreen",
  }
);

export default createAppContainer(navigator);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
