import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";
import { ProgressBar } from "react-native-paper";
import { Audio } from "expo-av";
import * as Progress from "react-native-progress";
const TimerScreen = ({ navigation, route }) => {
  const [sound, setSound] = React.useState();
  const {
    exerciseDurationHours,
    exerciseDurationMinutes,
    beepIntervalMinutes,
    beepIntervalSeconds,
  } = route.params;
  // console.log(beepIntervalMinutes, beepIntervalSeconds, "timer");
  const BeepInterval = beepIntervalMinutes * 60 + beepIntervalSeconds;

  // const Duration = ExerciseDuration;
  // var beepIntervalValue = BeepInterval.split(" ");
  // var BeepInterval = parseInt(beepIntervalValue[0], 10) * 60000;
  const [resetBeep, setResetBeep] = useState(BeepInterval);
  // console.log(BeepInterval, "timer");
  var timer;
  var hour = "0";
  var minute = "";
  // var time = Duration.split(" ");
  // for (var i = 0; i < time.length; i++) {
  //   if (parseInt(time[i].trim(), 10)) {
  //     hour = parseInt(time[0], 10);
  //     minute = parseInt(time[2], 10);
  //   }
  // }
  const [minutes, setMinutes] = useState(exerciseDurationMinutes);
  const [hours, setHours] = useState(exerciseDurationHours);
  const [seconds, setSeconds] = useState(0);
  const [isStart, setIsStart] = useState(true);
  const [isFinish, setIsFinish] = useState(false);
  const totalSeconds = hours * 60 * 60 + minutes * 60;
  // console.log(totalSeconds);
  const [percent, setPercent] = useState(0.3);
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

        setResetBeep((val) => val - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  });

  useEffect(() => {
    if (resetBeep == 0) {
      setResetBeep(BeepInterval);

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
    setIsFinish(!isFinish);
  };
  const onReset = () => {
    setHours(exerciseDurationHours);
    setMinutes(exerciseDurationMinutes);
    setSeconds(0);
    setIsStart(false);
    setResetBeep(BeepInterval);
    setIsFinish(true);
  };
  const onFinish = () => {
    navigation.navigate("HomeScreen");
  };
  return (
    <View style={{ backgroundColor: "rgb(242,242,242)" }}>
      <ScrollView style={[styles.view, styles.elevation]}>
        <Text style={styles.text}>
          {hours < 10 ? "0" + hours : hours}:
          {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
        </Text>
        <View style={{ paddingLeft: 20, paddingTop: 20 }}>
          {/* <Progress.Bar size={0.3} width={200} height={1} /> */}
        </View>
        <View style={[styles.card, styles.elevation]}>
          <View style={styles.button}>
            {isStart ? (
              <Icon
                color={"#707070"}
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
        </View>
      </ScrollView>
      <View style={styles.buttonGroup}>
        <View style={{ width: 100 }}>
          <Button
            disabled={!isFinish}
            title="Finish"
            color="#1e73fc"
            onPress={onFinish}
          />
        </View>
        <View style={{ width: 100 }}>
          <Button title="Reset" color="#1e73fc" onPress={onReset} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingLeft: 85,
    paddingTop: 250,
    marginLeft: 40,
    marginRight: 40,
    shadowOpacity: 1,
  },
  button: {
    height: 70,
    width: 70,
    marginLeft: 17,
    marginTop: 17,
  },
  card: {
    height: 70,
    width: 70,
    marginLeft: 85,
    // marginTop: 70,
    marginBottom: 20,
    borderRadius: 130,
    borderColor: "#DCDCDC",
    backgroundColor: "rgb(242,242,242)",
  },
  text: {
    color: "Black",
    fontFamily: "MetropolisBlackBoldItalic",

    marginLeft: 44,
    marginTop: 90,
    fontSize: 35,
    // textShadowColor:"blue"
  },
  view: {
    marginTop: 140,
    marginLeft: 70,
    height: 250,
    width: 250,
    backgroundColor: "white",
    alignContent: "center",
    borderWidth: 4,
    borderRadius: 130,
    borderColor: "#DCDCDC",
    borderStyle: "dotted",
  },
  elevation: {
    elevation: 30,
    shadowColor: "blue",
  },
});
export default TimerScreen;
