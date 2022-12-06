import React from "react";
import { Button, View, Text, TouchableOpacity } from "react-native";
import { useFonts } from "expo-font";
const WelcomeScreen = () => {
  const [loaded] = useFonts({
    PlusJakartaSans: require("./../assets/PlusJakartaSans2.ttf"),
    // PlusJakartaSansExtraBold: require('./../assets/PlusJakartaSans.ttf'),
  });
  if (!loaded) {
    return null;
  }
  return (
    <View>
      <Text
        style={{
          alignSelf: "center",
          fontSize: 20,
          fontFamily: "PlusJakartaSans",
          fontWeight: "700",
        }}
      >
        Welcome to the page
      </Text>
      <TouchableOpacity>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 25,
            fontFamily: "PlusJakartaSans",
            fontStyle: "italic",
          }}
        >
          Let's get started!!!{" "}
        </Text>
      </TouchableOpacity>
      <Text style={{ fontSize: 25 }}>welcome</Text>
    </View>
  );
};
export default WelcomeScreen;
