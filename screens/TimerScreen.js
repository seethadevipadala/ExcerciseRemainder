import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import { Audio } from "expo-av";
const TimerScreen = ({ navigation, route }) => {
  const [sound, setSound] = React.useState();
  const { ExerciseDuration, BeepInterval } = route.params;
  const Duration = "0 hr 2 min";
  var beepIntervalValue = BeepInterval.split(" ");
  var beepValue = parseInt(beepIntervalValue[0], 10) * 60000;
  const [resetBeep, setResetBeep] = useState(beepValue);

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
  const [seconds, setSeconds] = useState(0);
  const [isStart, setIsStart] = useState(true);
  const [isFinish, setIsFinish] = useState(false);
  useEffect(() => {
    if (isStart) {
      timer = setInterval(() => {
        setSeconds(seconds - 1);
        if (seconds === 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
        if (minutes === 0) {
          setMinutes(59);
          setHours(hours - 1);
        }
        if (hours === 0 && minutes === 0) {
          setHours(0);
          setMinutes(0);
        }
        if (hours === 0 && minutes === 0 && seconds === 0) {
          setSeconds(0);
          setIsFinish(true);
        }
        setResetBeep((val) => val - 1000);
        console.log(resetBeep);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  });

  useEffect(() => {
    if (resetBeep == 0) {
      setResetBeep(beepValue);

      playSound();
    }
  }, [resetBeep]);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("./../assets/beep/beep.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }
  const pause = () => {
    setIsStart(!isStart);
  };
  const onReset = () => {
    setHours(hour);
    setMinutes(minute);
    setSeconds(0);
    setIsStart(false);
    setResetBeep(beepValue);
  };
  const onReject = () => {
    navigation.navigate("HomeScreen");
  };
  return (
    <View>
      <ScrollView style={styles.view}>
        <Text style={styles.text}>
          {hours < 10 ? "0" + hours : hours}:
          {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
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
        <Button
          disabled={!isFinish}
          title="Finish"
          color="#91abc2"
          onPress={onReject}
        />
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
    marginLeft: 56,
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
