import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

const BeepIntervalScreen = ({ getBeepInterval, beepInterval }) => {
  const timeIntervel = [
    "15 sec",
    "30 sec",
    "45 sec",
    "1 min",
    "2 min",
    "3 min",
    "4 min",
    "5 min",
    "10 min",
  ];
  return (
    <View>
      <Text style={{ alignSelf: "center" }}> interval for repeat steps</Text>
      <Text style={{ alignSelf: "center", marginBottom: 20 }}>
        (your phone will beep on every interval)
      </Text>
      <View>
        <SelectDropdown
          defaultValue={beepInterval}
          buttonStyle={styles.dropdown}
          dropdownStyle={styles.dropdownList}
          data={timeIntervel}
          onSelect={(event) => {
            getBeepInterval(event);
          }}
        />
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
});
export default BeepIntervalScreen;
