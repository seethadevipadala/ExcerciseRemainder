import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { TimePicker } from "react-native-simple-time-picker";
import SelectDurationScreen from "./SelectDurationScreen";
import BeepIntervalScreen from "./BeepIntervalScreen";
const EditScreen = ({ navigation }) => {
  const exerciseDurations = navigation.getParam("exerciseDuration");
  const beepIntervals = navigation.getParam("beepInterval");
  const getEditedDuration = navigation.getParam("getEditedDuration");
  const getEditedBeepInterval = navigation.getParam("getEditedBeepInterval");
  const timevalue = navigation.getParam("timevalue");
  const getEditedTimeValue = navigation.getParam("getEditedTimeValue");
  const [value, setValue] = useState(timevalue);
  // console.log("edit",timevalue)
  return (
    <View>
      <Text style={styles.text}>At what time you want to excercise daily?</Text>
      <View style={styles.container}>
        <TimePicker
          value={value}
          onChange={(event) => {
            setValue(event);
            getEditedTimeValue(event);
          }}
        />
      </View>

      <SelectDurationScreen
        exerciseDuration={exerciseDurations}
        getDuration={getEditedDuration}
      />

      <BeepIntervalScreen
        beepInterval={beepIntervals}
        getBeepInterval={getEditedBeepInterval}
      />

      <View style={styles.button}>
        <Button
          onPress={() => {
            navigation.navigate("HomeScreen");
          }}
          title="Save"
          color="#91abc2"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 140,
    marginRight: 130,
    height: 50,
    borderRadius: 50,
    marginTop: 100,
    padding: 9,
  },
  text: {
    marginLeft: 70,
    marginTop: 30,
  },
  dropdown: {
    backgroundColor: "#bac9d6",
    width: 110,
    marginBottom: 20,
    marginRight: 145,
    text: {
      marginLeft: 35,
    },
    borderRadius: 10,
  },
  drop: {
    backgroundColor: "rgb(0,150,255)",
    width: 100,
    marginLeft: 150,
    marginBottom: 30,
    text: {
      marginLeft: 35,
    },
    borderRadius: 10,
  },
  dropdownList: {
    backgroundColor: "rgb(255,255,255)",
  },
  exerciseView: {
    backgroundColor: "rgb(0,150,255)",
    width: 100,
    padding: 0,
    marginLeft: 150,
    marginTop: 30,
    marginBottom: 50,
    borderRadius: 10,
  },
  exerciseDropdown: {
    backgroundColor: "#bac9d6",
    textDecorationColor: "white",
    width: 100,
    padding: 0,
    marginLeft: 70,
    text: {
      marginLeft: 35,
    },
    borderRadius: 10,
  },
  button: {
    marginLeft: 140,
    marginRight: 130,
    // backgroundColor: "#bac9d6",
    height: 80,
    // width: 170,
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
export default EditScreen;
