import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";

const TimerScreen = ({ navigation }) => {
  const Duration = navigation.getParam("ExerciseDuration");

  var timer;
  var hour = "";
  var minute = "";
  var time = Duration.split(" ");
  for (var i = 0; i < time.length; i++) {
    if (parseInt(time[i].trim(), 10)) {
      hour = parseInt(time[0], 10);
      minute = parseInt(time[2], 10);
    }
  }
  const [minutes, setMinutes] = useState(minute);
  const [hours, setHours] = useState(hour);
  const [isStart, setIsStart] = useState(false);
  useEffect(() => {
    if (isStart) {
      timer = setInterval(() => {
        setMinutes(minutes - 1);
        if (minutes === 0) {
          setMinutes(59);
          setHours(hours - 1);
        }
        if (hours === 0 && minutes === 0) {
          setHours(0);
          setMinutes(0);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  });
  const pause = () => {
    setIsStart(!isStart);
  };
  const onReset = () => {
    setHours(hour);
    setMinutes(minute);
    // onStart();
    setIsStart(false);
  };
  const onReject = () => {
    // alert(`Do you want to exit? `)
    navigation.navigate("HomeScreen");
  };
  // const onStart = () => {
  //   setIsStart(true);
  //   setHours(hour);
  //   setMinutes(minute);
  // };
  return (
    <View>
      <ScrollView style={styles.view}>
        <Text style={styles.text}>
          {hours < 10 ? "0" + hours : hours}:
          {minutes < 10 ? "0" + minutes : minutes}
        </Text>
        <View style={styles.button}>
          {isStart ? (
            <Icon
              name="pause"
              size={40}
              backgroundColor="#bac9d6"
              onPress={pause}
            />
          ) : (
            <Icon
              name="play"
              size={40}
              backgroundColor="#3b5998"
              onPress={pause}
            />
          )}
        </View>
      </ScrollView>
      <View style={styles.buttonGroup}>
        {/* <Button title="Start" color="#bac9d6" onPress={onStart} /> */}
        <Button title="Reject" color="#91abc2" onPress={onReject} />
        <Button title="Reset" color="#91abc2" onPress={onReset} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingLeft: 85,
    paddingTop: 20,
    marginLeft: 40,
    marginRight: 40,
    shadowOpacity: 1,
  },
  button: {
    height: 40,
    width: 60,
    marginLeft: 85,
    marginTop: 40,
  },
  text: {
    marginLeft: 73,
    marginTop: 30,
    fontSize: 25,
  },
  view: {
    marginTop: 20,
    marginLeft: 87,
    height: 210,
    width: 210,
    backgroundColor: "#bac9d6",
    alignContent: "center",
    borderRadius: 130,
  },
});
export default TimerScreen;
