import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import { useFonts } from "expo-font";
import { NavigationEvents } from "react-navigation";
import { useNavigation } from "@react-navigation/native";
import UserLogin from "../API/userApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LoginScreen = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigation = useNavigation();
  const [loaded] = useFonts({
    PlusJakartaSans: require("./../assets/PlusJakartaSans2.ttf"),
    // PlusJakartaSansExtraBold: require('./../assets/PlusJakartaSans.ttf'),
  });
  if (!loaded) {
    return null;
  }

  return (
    <View>
      <TextInput
        style={styles.email}
        underlineColorAndroid="gray"
        placeholder="Email"
        placeholderTextColor="#9a73ef"
        autoCapitalize="none"
        onChangeText={(e) => {
          setEmail(e);
          // console.log(e);
        }}
      />
      <TextInput
        style={styles.password}
        underlineColorAndroid="gray"
        placeholder="Password"
        placeholderTextColor="#9a73ef"
        autoCapitalize="none"
        onChangeText={(e) => {
          setPassword(e);
          // console.log(e);
        }}
      />
      <TouchableOpacity style={{ paddingLeft: 200 }}>
        <Text style={{ color: "blue" }}>Forgot password?</Text>
      </TouchableOpacity>
      <View style={{ paddingLeft: 150, paddingTop: 30 }}>
        <Button
          mode="contained"
          style={{ width: 95 }}
          onPress={() => {
            UserLogin({
              identifier: email,
              password: password,
            }).then((result) => {
              AsyncStorage.setItem("jwt", result.data.jwt);
              navigation.navigate('HomeScreen')
              console.log("response", result.data.jwt);
            });
          }}
        >
          Login
        </Button>
      </View>
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <Text style={{ paddingLeft: 100 }}>Don't have an account?</Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUpScreen");
          }}
        >
          <Text style={{ color: "blue" }}> Signin </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  email: {
    width: 250,
    marginLeft: 70,
    height: 50,
    marginTop: 200,
  },
  password: {
    width: 250,
    marginLeft: 70,
    height: 50,
  },
});
export default LoginScreen;
