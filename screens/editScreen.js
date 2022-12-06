import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { TimePicker } from "react-native-simple-time-picker";
import SelectDuration from "./../components/SelectDuration";
import BeepInterval from "./../components/BeepInterval";
import { useFonts } from "expo-font";
import TimerScreen from "./TimerScreen";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTheme, Card, Title, Paragraph } from "react-native-paper";

const EditScreen = ({ navigation, route }) => {
  // console.log(route, "edit");
  const [loaded] = useFonts({
    MetropolisBlackItalic: require("./../assets/Metropolis-BlackItalic.otf"),
  });
   const {
    exerciseDuration,
    beepInterval,
    setEditedDuration,
    setEditedBeepInterval,
    timevalue,
    setEditedTimeValue,
    timestamp
  } = route.params;
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timestamps, setTimestamp] = useState(timestamp);
  console.log('from edittimestamp',timestamp);
  
  const [date, setDate] = useState(new Date(timestamps));
 
  const [value, setValue] = useState(timevalue);
  return (
    <Card
      style={{
        backgroundColor: "rgb(255,255,255)",
        height: 440,
        width: 350,
        borderRadius: 20,
        marginLeft: 22,
      }}
    >
      <View>
        <Text style={styles.text}>
          At what time you want to excercise daily?
        </Text>
        <View style={{ marginLeft: 130, marginRight: 130, marginTop: 30 }}>
          <Text style={{ marginLeft: 14, fontFamily: "MetropolisBlackItalic" }}>
            {value.hours}:{value.minutes} {value.ampm}
          </Text>
          <Button
            title="Set Time"
            onPress={() => {
              setShowTimePicker(true);
            }}
          />
        </View>
        <View style={styles.container}>
          {/* <TimePicker
          placeholder="00:00"
          value={value}
          onChange={(event) => {
            setValue(event);
            setEditedTimeValue(event);
          }}
        /> */}

          {showTimePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="time"
              is24Hour={false}
              display="default"
              onChange={(e) => {
                setShowTimePicker(false);
                setTimestamp(e.nativeEvent.timestamp);
                setDate(new Date(e.nativeEvent.timestamp));
                // console.log(
                //   new Date(e.nativeEvent.timestamp).getHours(),
                //   new Date(e.nativeEvent.timestamp).minutes(),
                //   "hoooooooooo"
                // );
                setEditedTimeValue((prevTimeValue) => ({
                  ...prevTimeValue,
                  hours: new Date(e.nativeEvent.timestamp).getHours(),
                  minutes: new Date(e.nativeEvent.timestamp).getMinutes(),
                  ampm:
                    new Date(e.nativeEvent.timestamp).getHours() >= 12
                      ? "PM"
                      : "AM",
                }));
                setValue((prevTimeValue) => ({
                  ...prevTimeValue,
                  hours: new Date(e.nativeEvent.timestamp).getHours(),
                  minutes: new Date(e.nativeEvent.timestamp).getMinutes(),
                  ampm:
                    new Date(e.nativeEvent.timestamp).getHours() >= 12
                      ? "PM"
                      : "AM",
                }));
              }}
            />
          )}
        </View>

        <SelectDuration
          exerciseDuration={exerciseDuration}
          setDuration={setEditedDuration}
        />

        <BeepInterval
          beepInterval={beepInterval}
          setBeepInreval={setEditedBeepInterval}
        />

        <View style={styles.button}>
          <Button
            onPress={() => {
              console.log(timestamps,"rrrrr");
              navigation.navigate("HomeScreen", {
                timestamps: timestamps,
              });
            }}
            title="Save"
            color="#1e73fc"
          />
        </View>
      </View>
    </Card>
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
    marginLeft: 25,
    marginTop: 30,
    fontFamily: "MetropolisBlackItalic",
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
    textDecorationColor: "black",
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
