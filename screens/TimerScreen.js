import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const TimerScreen = ({navigation}) => {
  const timevalue = navigation.getParam("timevalue");
 console.log(timevalue)
  const [minutes, setMinutes] = useState(timevalue.minutes);
  const [hours, setHours] = useState(timevalue.hours);
  const [isStart, setIsStart] = useState(true);
  var timer;

  useEffect(() => {
    if (isStart) {
      timer = setInterval(() => {
        setMinutes(minutes - 1);
        if (minutes === 0) {
          setMinutes(59);
          setHours(hours - 1);
        }
        if (minutes === 0 && hours === 0) {
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
  // const myIcon = <Icon name="rocket" size={30} color="#900" />
  return (
    <View style={styles.view}>
      <Text style={styles.text}>
        {hours < 10 ? "0" + hours : hours}:
        {minutes < 10 ? "0" + minutes : minutes}
        {/* {myIcon}   */}
      </Text>
      {/* <Button title="Reset" onPress={start} /> */}
      <View style={styles.button}>
        {/* <Button style={{ backgroundColor: "red" }} title="S" onPress={pause} /> */}
        {isStart ? (
          <Icon
            name="pause"
            size={40}
            backgroundColor="#846588"
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
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    height: 40,
    width: 60,
    marginLeft: 55,
    marginTop: 40,
  },
  text: {
    marginLeft: 43,
    marginTop: 30,
    fontSize: 25,
  },
  view: {
    marginLeft: 125,
    height: 150,
    width: 150,
    backgroundColor: "#846588",
    alignContent: "center",
    borderRadius: 80,
  },
});
export default TimerScreen;
