import React from "react";
import { View } from "react-native";
import { Button, Text, StyleSheet } from "react-native";
const NotificationScreen = ({ navigation }) => {
  return (
    <View>
      <Text>WElCOME TO NOTIFICATIONSCREEN</Text>
    </View>
    // <View style={styles.view}>
    //   <Text style={styles.text}>Excercise Time!! </Text>
    //   <View style={styles.Buttons}>
    //     <Button title="Reject" color="846588" />
    //     {/* <Button
    //       title="Start"
    //       onPress={() => {
    //         navigation.navigate("TimerScreen");
    //       }}
    //       color="846588"
    //     /> */}
    //   </View>
    // </View>
  );
};
const styles = StyleSheet.create({
  view: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#bac9d6",
    border: "2px",
    borderRadius: 10,
    boxShadow: "0 0 4px 2px rgba(255,4,0,.9)",
  },
  text: {
    color: "rgb(255,255,255)",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
    marginLeft: 70,
  },
  Buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    marginBottom: 20,
    marginHorizontal: 30,
  },
});

export default NotificationScreen;
