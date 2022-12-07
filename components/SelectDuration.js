import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { useTheme } from "react-native-paper";
import { useFonts } from "expo-font";
import { Button } from "react-native-paper";
const SelectDurationScreen = ({
  setDurationMinute,
  setDurationHour,
  exerciseDurationHours,
  exerciseDurationMinutes,
}) => {
  const [loaded] = useFonts({
    MetropolisBlackItalic: require("./../assets/Metropolis-BlackItalic.otf"),
    // PlusJakartaSansExtraBold: require('./../assets/PlusJakartaSans.ttf'),
  });
  // if (!loaded) {
  //   return null;
  // }
  console.log(exerciseDurationHours, exerciseDurationMinutes, "selectee");
  // const values = await AsyncStorage.getItem("KEY");
  // let storedValue = JSON.parse(values);
  const val = exerciseDurationHours;
  const theme = useTheme();
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
  useEffect(() => {
    console.log("useeffect", exerciseDurationHours, exerciseDurationMinutes);
    setDurationHours(exerciseDurationHours);
    setDurationMinutes(exerciseDurationMinutes);
  }, [exerciseDurationHours, exerciseDurationMinutes]);
  let [durationHours, setDurationHours] = useState(0);
  let [durationMinutes, setDurationMinutes] = useState(0);

  console.log(durationHours, "duration");
  return (
    <View style={styles.exerciseView}>
      <Text
        style={{
          marginHorizontal: 48,
          paddingBottom: 10,
          color: "black",
          fontSize: 15,
          fontFamily: "MetropolisBlackItalic",
        }}
      >
        How long you will excercise?
      </Text>
      {/* <View style={styles.exerciseDrop}> */}
      <View style={{ flexDirection: "row", marginLeft: 40, marginRight: 40 }}>
        <Text
          style={{
            color: "black",
            fontSize: 15,
            marginTop: 10,
            paddingRight: 20,
            fontFamily: "MetropolisBlackItalic",
          }}
        >
          {durationHours}:{`${durationMinutes} MIN`}
        </Text>
        <Button
          mode="outlined"
          style={{ width: 95 }}
          onPress={() => {
            setDurationMinutes(durationMinutes + 10);
            if (durationMinutes === 50) {
              setDurationMinutes(0);
              setDurationHours(durationHours + 1);
              setDurationMinute(0);
              setDurationHour(durationHours + 1);
            } else {
              setDurationHour(durationHours);
              setDurationMinute(durationMinutes + 10);
            }
          }}
        >
          +10 min
        </Button>
        <Button
          mode="outlined"
          style={{ width: 95 }}
          onPress={() => {
            if (durationMinutes === 0 && durationHours === 0) {
              console.log("kk")
              setDurationHours(0);
              setDurationMinutes(0);
            }
            else if(durationMinutes === 0 && durationHours !== 0) {
              setDurationMinutes(50);
              setDurationHours(durationHours - 1);
              setDurationHour(durationHours - 1);
              setDurationMinute(50);
            } else {
              setDurationMinute(durationMinutes - 10);
              setDurationMinute(durationMinutes - 10);
              setDurationHour(durationHours);
            };
            // setDurationHour(durationHours);
            // setDurationMinute(durationMinutes);
           
          }}
        >
          -10 min
        </Button>

        {/* <SelectDropdown
          buttonTextStyle={{ color: "black" }}
          selectedRowTextStyle={{ color: "#1e73fc" }}
          defaultButtonText="0"
          defaultValue={exerciseDuration}
          buttonStyle={styles.exerciseDropdown}
          data={timeIntervel}
          onSelect={(event) => {
            setDuration(event);
          }}
        /> */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  exerciseView: {
    fontSize: 40,
    margin: 30,
    marginLeft: 5,
  },

  exerciseDropdown: {
    backgroundColor: "#dde3ed",
    // textDecorationColor: "white",
    width: 140,
    padding: 0,
    marginLeft: 30,
    text: {
      marginLeft: 55,
    },
    borderRadius: 10,
  },
  exerciseDrop: {
    backgroundColor: "#1e73fc",
    width: 140,
    padding: 0,
    marginLeft: 43,
    text: {
      marginLeft: 35,
    },
    borderRadius: 10,
  },
  exerciseDropdownList: {
    // backgroundColor: "rgb(255,255,255)",
  },
});
export default SelectDurationScreen;
