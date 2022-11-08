import React, { useState } from "react";
import { Text, View, ScrollView, StyleSheet, Button } from "react-native";
import SelectDurationScreen from "./SelectDurationScreen";
import NotificationScreen from "./NotificationScreen";
import { TimePicker } from "react-native-simple-time-picker";
import BeepIntervalScreen from "./BeepIntervalScreen";
import Icon from "react-native-vector-icons/Feather";

const HomeScreen = ({ navigation }) => {
  const [exerciseDuration, setExerciseDuration] = useState(0);
  const [beepInterval, setBeepInterval] = useState(0);
  const [isIconDisabled, setIsIconDisabled] = useState(true);
  const getDuration = (e) => {
    setExerciseDuration(e);
  };
  const getBeepInterval = (e) => {
    setBeepInterval(e);
  };
  const getEditedBeepInterval = (e) => {
    setBeepInterval(e);
  };
  const getEditedDuration = (e) => {
    setExerciseDuration(e);
  };
  const getEditedTimeValue = (e) => {
    setTimeValue(e);
  };
  const [timevalue, setTimeValue] = useState({
    hours: 3,
    minutes: 2,
  });
  return (
    <ScrollView>
      <View style={styles.edit}>
        <Icon
          disabled={isIconDisabled}
          name="edit"
          size={30}
          backgroundColor="#3b5998"
          onPress={() => {
            navigation.navigate("EditScreen", {
              exerciseDuration: exerciseDuration,
              beepInterval: beepInterval,
              getEditedDuration: getEditedDuration,
              getEditedBeepInterval: getEditedBeepInterval,
              timevalue: timevalue,
              getEditedTimeValue: getEditedTimeValue,
            });
          }}
        />
      </View>
      <Text style={{ marginTop: 20, marginLeft: 50, fontSize: 15 }}>
        At what time you want to excercise daily?
      </Text>

      <View style={styles.container}>
        <TimePicker
          value={timevalue}
          onChange={(e) => {
            setTimeValue(e);
          }}
        />
      </View>

      <SelectDurationScreen
        getDuration={getDuration}
        exerciseDuration={exerciseDuration}
      />
      <BeepIntervalScreen
        getBeepInterval={getBeepInterval}
        beepInterval={beepInterval}
      />
      <View style={styles.button}>
        <Button
          onPress={() => {
            setIsIconDisabled(false);
            alert(`You will get notification on ${timevalue.hours < 10 ? "0" + timevalue.hours : timevalue.hours}:${timevalue.minutes<10?"0"+timevalue.minutes:timevalue.minutes}`)
          }}
          title="Save"
          style={{ backgroundColor: "red" }}
          color="#846588"
        />
      </View>
      {/* <NotificationScreen navigation={navigation} /> */}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  edit: {
    marginTop: 40,
    marginLeft: 340,
  },
  button: {
    marginLeft: 140,
    marginRight: 130,
    backgroundColor: "#846588",
    height: 50,
    borderRadius: 50,
    marginTop: 100,
    padding: 9,
  },
  container: {
    flex: 1,
    paddingHorizontal: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default HomeScreen;
