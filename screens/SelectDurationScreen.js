import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

const SelectDurationScreen = ({ getDuration, exerciseDuration }) => {
  const timeIntervel = [
    "0 hr 15 min",
    "0 hr 30 min",
    "0 hr 45 min",
    "1 hr 0 min",
    "1 hr 15 min",
    "1 hr 30 min",
    "1 hr 45 min",
    "2 hs",
  ];
  return (
    <View style={styles.exerciseView}>
      <Text style={styles.exerciseText}>How long you will excercise?</Text>
      <View style={styles.exerciseDrop}>
        <SelectDropdown
          defaultValue={exerciseDuration}
          buttonStyle={styles.exerciseDropdown}
          data={timeIntervel}
          onSelect={(event) => {
            getDuration(event);
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  exerciseView: {
    fontSize: 40,
    margin: 40,
    marginLeft: 95,
  },
  exerciseText: {
    paddingBottom: 10,
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
  exerciseDrop: {
    backgroundColor: "rgb(0,150,255)",
    width: 100,
    padding: 0,
    marginLeft: 50,
    text: {
      marginLeft: 35,
    },
    borderRadius: 10,
  },
  exerciseDropdownList: {
    backgroundColor: "rgb(255,255,255)",
  },
});
export default SelectDurationScreen;
