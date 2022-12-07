import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import SelectDropdown from "react-native-select-dropdown";
import { useFonts } from "expo-font";
const BeepIntervalScreen = ({
  setBeepIntervalMinute,
  BeepMinutes,
  setBeepIntervalSecond,
  BeepSeconds,
}) => {
  const timeIntervel = ["1 min", "2 min", "3 min", "4 min", "5 min"];
  useEffect(() => {
    // console.log(beepInterval, "useEffect");
    setBeepSeconds(BeepSeconds);
    setbeepMinutes(BeepMinutes);
  }, [BeepMinutes, BeepSeconds]);
  const [beepMinutes, setbeepMinutes] = useState(0);
  const [beepSeconds, setBeepSeconds] = useState(0);
  console.log(BeepMinutes, BeepSeconds)
  const [loaded] = useFonts({
    MetropolisBlackItalic: require("./../assets/Metropolis-BlackItalic.otf"),
  });
  return (
    <View>
      <Text
        style={{
          alignSelf: "center",
          fontSize: 17,
          fontFamily: "MetropolisBlackItalic",
        }}
      >
        Interval for repeat steps
      </Text>
      <Text
        style={{
          alignSelf: "center",
          fontSize: 15,
          marginBottom: 20,
          color: "black",
          fontFamily: "MetropolisBlackItalic",
        }}
      >
        (your phone will beep on every interval)
      </Text>
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
          {`${beepMinutes}`}:{`${beepSeconds} SEC`}
        </Text>
        <Button
          mode="outlined"
          style={{ width: 95 }}
          onPress={() => {
            if (beepSeconds === 50) {
              setbeepMinutes(beepMinutes + 1);

              setBeepSeconds(0);
              setBeepIntervalMinute(beepMinutes + 1);
              setBeepIntervalSecond(0);
            } else {
              setBeepSeconds(beepSeconds + 10);
              setBeepIntervalSecond(beepSeconds + 10);
              setBeepIntervalMinute(beepMinutes);
            }
          }}
        >
          +10 sec
        </Button>
        <Button
          mode="outlined"
          style={{ width: 100 }}
          onPress={() => {
            // console.log(beepSeconds, "beepSeconds");
            if (beepMinutes === 0 && beepSeconds === 0) {
              setbeepMinutes(0);
              setBeepSeconds(0);
            } else if (beepSeconds === 0) {
              setbeepMinutes(beepMinutes - 1);

              setBeepSeconds(50);
              setBeepIntervalMinute(beepMinutes - 1);
              setBeepIntervalSecond(50);
            } else {
              setBeepIntervalSecond(beepSeconds - 10);
              setBeepSeconds(beepSeconds - 10);
              setBeepIntervalMinute(beepMinutes);
            }
          }}
        >
          -10 sec
        </Button>
        {/* <SelectDropdown
          buttonTextStyle={{ color: "black" }}
          defaultButtonText="0"
          selectedRowTextStyle={{ color: "#1e73fc" }}
          defaultValue={beepInterval}
          buttonStyle={styles.dropdown}
          dropdownStyle={styles.dropdownList}
          data={timeIntervel}
          onSelect={(event) => {
            setBeepInreval(event);
          }}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text1: {
    marginLeft: 110,
  },
  text2: {
    paddingBottom: 30,
    marginLeft: 70,
  },
  dropdown: {
    backgroundColor: "#dde3ed",
    width: 110,
    marginBottom: 20,
    marginRight: 145,
    text: {
      marginLeft: 35,
    },
    borderRadius: 10,
  },
  drop: {
    backgroundColor: "#1e73fc",
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
});
export default BeepIntervalScreen;
