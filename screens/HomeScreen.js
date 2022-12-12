import React, { useState, useRef, useEffect, useMemo } from "react";
import { BackHandler } from "react-native";
import DatePicker from "react-native-date-picker";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, ScrollView, StyleSheet, Button } from "react-native";
import SelectDuration from "../components/SelectDuration";
// import { TimePicker } from "react-native-simple-time-picker";
import TimePicker from "react-native-wheel-time-picker";
import BeepInterval from "../components/BeepInterval";
import Icon from "react-native-vector-icons/Feather";
import * as Notifications from "expo-notifications";
import setNotificationCategoryAsync from "./../utils/InitializeNotification";
import setNotificationHandler from "./../utils/InitializeNotification";
import { useNavigation } from "@react-navigation/native";
import { useTheme, Card, Title, Paragraph } from "react-native-paper";
import { useFonts } from "expo-font";
import moment from "moment";
// import MetropolisBlackRegular from "./../assets/Metropolis-BlackItalic.otf";
import DateTimePicker from "@react-native-community/datetimepicker";
import { removeNotificationSubscription } from "expo-notifications";
const HomeScreen = ({ route }) => {
  // const MILLISECONDS_PER_MINUTE = 60 * 1000;
  // const MILLISECONDS_PER_HOUR = 60 * 60 * 1000;
  // const MILLISECONDS_PER_DAY = 24 * MILLISECONDS_PER_HOUR;
  const [loaded] = useFonts({
    MetropolisBlackRegular: require("./../assets/Metropolis-BlackItalic.otf"),
  });
  // console.log(route, "lll");
  // const { timestamps } = route.params;
  // console.log(timestamps);
  const [timestamp, setTimestamp] = useState(route?.params?.timestamp);
  const [date, setDate] = useState(new Date(timestamp));
  // var time = new Date(timestamp);
  // var timeHours = time.getHours();
  // var timeMinutes = time.getMinutes();
  // console.log(timeHours, timeMinutes, "hhhhhhhhhhhhhhh");
  const [showTimePicker, setShowTimePicker] = useState(false);
  const theme = useTheme();
  const navigation = useNavigation();
  const [exerciseDurationHours, setExerciseDurationHours] = useState(0);
  const [exerciseDurationMinutes, setExerciseDurationMinutes] = useState(0);
  // const [beepIntervalSeconds, setBeepIntervalSeconds] = useState();
  const [BeepMinutes, setBeepMinutes] = useState(0);
  const [BeepSeconds, setBeepSeconds] = useState(0);
  const [isIconDisabled, setIsIconDisabled] = useState(false);
  const [aa, setAa] = useState(false);
  console.log(exerciseDurationHours, exerciseDurationMinutes, "homevalues");
  console.log(BeepMinutes, BeepSeconds, "homevalues");

  // const fun = (e) => {
  //   setExerciseDuration(e);
  // };
  const setBeepIntervalSecond = (e) => {
    setBeepSeconds(e);
    console.log(e, "seconds");
  };
  const setBeepIntervalMinute = (e) => {
    console.log(e, "minutes");
    setBeepMinutes(e);
  };
  const setDurationHour = (e) => {
    setExerciseDurationHours(e);
    // console.log("hours", e);
  };
  const setDurationMinutes = (e) => {
    setExerciseDurationMinutes(e);
    // console.log("minutes", e);
  };
  // const setBeepInreval = (e) => {
  //   setBeepIntervalSeconds(e);
  // };
  const setEditedBeepIntervalSeconds = (e) => {
    setBeepSeconds(e);
  };
  const setEditedBeepIntervalMinutes = (e) => {
    setBeepMinutes(e);
  };
  const setEditedDurationHours = (e) => {
    console.log(e, "editedhours");
    setExerciseDurationHours(e);
  };
  const setEditedDurationMinutes = (e) => {
    setExerciseDurationMinutes(e);
    console.log(e, "editedminutes");
  };
  const setEditedTimeValue = (e) => {
    setTimeValue(e);
  };

  const [timevalue, setTimeValue] = useState({
    hours: 1,
    minutes: 0,
    ampm: "am",
  });

  const storeData = async () => {
    const items = {
      storedTimeValue: timevalue,
      storedExerciseDurationHours: exerciseDurationHours,
      storedExerciseDurationMinutes: exerciseDurationMinutes,

      storedBeepIntervalMinutes: BeepMinutes,
      storedBeepIntervalSeconds: BeepSeconds,
      storeIcon: true,
      storedTimeStamp: timestamp,
    };

    try {
      await AsyncStorage.setItem("KEY", JSON.stringify(items));
    } catch (error) {}
  };

  const getData = () => {
    try {
      AsyncStorage.getItem("KEY").then((value) => {
        if (value != null) {
          var values = JSON.parse(value);
          setTimestamp(values.storedTimeStamp);
          setTimeValue(values.storedTimeValue);
          setExerciseDurationHours(values.storedExerciseDurationHours || 0);
          setExerciseDurationMinutes(values.storedExerciseDurationMinutes || 0);
          setBeepMinutes(values.storedBeepIntervalMinutes);
          setBeepSeconds(values.storedBeepIntervalSeconds);
          // setBeepIntervalSecond(values.storedBeepIntervals);
          setIsIconDisabled(values.storeIcon);
          setDate(new Date(values.storedTimeStamp));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  // console.log("timeValue from store", timevalue);

  useEffect(() => {
    getData();
  }, []);

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const getPermission = async () => {
      if (Constants) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("Enable push notifications to use the app!");
          await storage.setItem("expopushtoken", "");
          return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        await storage.setItem("expopushtoken", token);
      } else {
        alert("Must use physical device for Push Notifications");
      }
    };

    getPermission();

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        if (response.actionIdentifier === "0") {
          navigation.navigate("TimerScreen", {
            exerciseDurationHours:
              response.notification.request.content.data.exerciseDurationHours,
            exerciseDurationMinutes:
              response.notification.request.content.data
                .exerciseDurationMinutes,

            beepIntervalMinutes:
              response.notification.request.content.data.beepIntervalMinutes,
            beepIntervalSeconds:
              response.notification.request.content.data.beepIntervalSeconds,
          });
          Notifications.dismissAllNotificationsAsync();
        }
        if (response.actionIdentifier === "1") {
          Notifications.dismissAllNotificationsAsync();
          BackHandler.exitApp();
        }
        if (response.actionIdentifier === "2") {
          delayNotification();
          Notifications.dismissAllNotificationsAsync();
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const [notificationId, setNotificationId] = useState();
  const scheduleLocalNotification = async () => {
    const storedData = await AsyncStorage.getItem("KEY");
    const storedValue = JSON.parse(storedData);
    const convertedHour =
      storedValue.storedTimeValue.hours == "12 " &&
      storedValue.storedTimeValue.ampm == "pm"
        ? storedValue.storedTimeValue.hours
        : storedValue.storedTimeValue.ampm === "pm"
        ? storedValue.storedTimeValue.hours + 12
        : storedValue.storedTimeValue.hours;
    const latestNotifacationId = await Notifications.scheduleNotificationAsync({
      content: {
        autoDismiss: true,
        title: "Exercise Notification",
        body: "It's time to start Exercise",
        categoryIdentifier: "category",
        data: {
          exerciseDurationHours: exerciseDurationHours,
          exerciseDurationMinutes: exerciseDurationMinutes,
          beepIntervalMinutes: BeepMinutes,
          beepIntervalSeconds: BeepSeconds,
        },
        color: "Green",
        vibrate: true,
      },

      trigger: {
        hour: convertedHour,
        minute: storedValue.storedTimeValue.minutes,
        repeats: true,
      },
    });
    setNotificationId(latestNotifacationId);
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  };
  const delayNotification = async () => {
    const values = await AsyncStorage.getItem("KEY");
    let storedValue = JSON.parse(values);
    await Notifications.scheduleNotificationAsync({
      content: {
        autoDismiss: true,
        title: "Notification",
        body: "It's time to start Exercise",
        categoryIdentifier: "category",
        data: {
          exerciseDuration: storedValue.storedExerciseDuration,
          beepInterval: storedValue.storedBeepIntervals,
        },
        color: "Green",
        vibrate: true,
      },

      trigger: {
        seconds: 60 * 2,
        repeats: false,
      },
    });
  };
  // const [date, setDate] = useState(new Date());
  // console.log(Date.now(), "val");
  // console.log(moment(1669974132734).format('HH:MM:SS'));

  // const [time, setTime] = useState(Date.now() % MILLISECONDS_PER_DAY);
  // const [hours, minutes, ampm] = useMemo(() => {
  //   setTimeValue((prevTimeValue) => ({
  //     ...prevTimeValue,
  //     hours: hours,
  //     minutes: minutes,
  //     ampm: ampm,
  //   }));
  //   return [
  //     Math.floor(time / MILLISECONDS_PER_HOUR),
  //     Math.floor((time % MILLISECONDS_PER_HOUR) / MILLISECONDS_PER_MINUTE),
  //     time / MILLISECONDS_PER_HOUR >= 12 ? "PM" : "AM",
  //   ];
  // }, [time]);

  // console.log("from timepicker convertion", time);
  // console.log("from timestamp", moment(time).format());
  // let a;
  // var y = moment.duration(time, "milliseconds");
  // console.log("yyy", y);
  // var h = Math.floor(y.asHours());
  // console.log("dateconversion to hours", h);
  // console.log("after stored", timevalue);
  // console.log("from timepicker convertion", time);
  const removeItem = () => {
    AsyncStorage.removeItem("jwt");
    navigation.navigate("LoginScreen");
    console.log("removed");
  };
  return (
    <ScrollView style={{ backgroundColor: "rgb(242,242,242)" }}>
      <View style={styles.edit}>
        {isIconDisabled && (
          <Icon
            name="edit"
            size={30}
            // backgroundColor="white"
            onPress={() => {
              navigation.navigate("EditScreen", {
                exerciseDurationHours: exerciseDurationHours,
                exerciseDurationMinutes: exerciseDurationMinutes,

                beepIntervalSeconds: BeepSeconds,
                beepIntervalMinutes: BeepMinutes,
                setEditedDurationHours: setEditedDurationHours,
                setEditedDurationMinutes: setEditedDurationMinutes,
                setEditedBeepIntervalMinutes: setEditedBeepIntervalMinutes,
                setEditedBeepIntervalSeconds: setEditedBeepIntervalSeconds,
                timevalue: timevalue,
                timestamp: timestamp,
                setEditedTimeValue: setEditedTimeValue,
              });
            }}
          />
        )}
      </View>

      <Card
        style={{
          backgroundColor: "rgb(255,255,255)",
          height: 440,
          width: 350,
          borderRadius: 20,
          marginLeft: 22,
        }}
      >
        <Text
          style={{
            alignContent: "center",
            marginTop: 20,
            marginLeft: 27,
            fontSize: 15,
            color: "black",
            fontFamily: "MetropolisBlackRegular",
          }}
        >
          At what time you want to excercise daily?
        </Text>

        <View style={{ marginLeft: 130, marginRight: 130, marginTop: 30 }}>
          <Text
            style={{
              fontSize: 17,
              marginLeft: 5,
              fontFamily: "MetropolisBlackBoldItalic",
            }}
          >
            {timevalue.ampm === "PM" && timevalue.hours !== 12
              ? timevalue.hours - 12
              : timevalue.hours}
            :{timevalue.minutes} {timevalue.ampm}
          </Text>
          <Button
            title="Set Time"
            onPress={() => {
              setShowTimePicker(true);
            }}
          />

          {showTimePicker && (
            <DateTimePicker
              value={date}
              mode="time"
              is24Hour={false}
              display="default"
              onChange={(e) => {
                // console.log(e);
                setShowTimePicker(false);
                setTimestamp(e.nativeEvent.timestamp);
                setDate(new Date(e.nativeEvent.timestamp));

                setTimeValue((prevTimeValue) => ({
                  ...prevTimeValue,
                  hours:
                    new Date(e.nativeEvent.timestamp).getHours() === 0
                      ? 12
                      : new Date(e.nativeEvent.timestamp).getHours(),
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
          // fun={fun}
          setDurationHour={setDurationHour}
          setDurationMinute={setDurationMinutes}
          exerciseDurationMinutes={exerciseDurationMinutes}
          exerciseDurationHours={exerciseDurationHours}
        />
        {/* <Card.Title title="Card Title" subtitle="Card Subtitle" />
        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>Ok</Button>
        </Card.Actions> */}

        <BeepInterval
          setBeepIntervalSecond={setBeepIntervalSecond}
          setBeepIntervalMinute={setBeepIntervalMinute}
          BeepMinutes={BeepMinutes}
          BeepSeconds={BeepSeconds}
        />
      </Card>

      <View style={styles.button}>
        <Button
          // disabled={
          //   exerciseDurationHours ||
          //   BeepMinutes ||
          //   exerciseDurationMinutes ||
          //   BeepSeconds ||
          //   timevalue
          // }
          onPress={() => {
            // setTimeValue([...timevalue],hours=hours);
            // AsyncStorage.removeItem("jwt");
            removeItem();
            storeData();
            // fun();
            setIsIconDisabled(true);

            scheduleLocalNotification();
            alert(
              `You will get notification on ${
                timevalue.hours < 10 ? "0" + timevalue.hours : timevalue.hours
              }:${
                timevalue.minutes < 10
                  ? "0" + timevalue.minutes
                  : timevalue.minutes
              } ${timevalue.ampm}`
            );
          }}
          title="Save"
          color="#1e73fc"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  edit: {
    marginTop: 40,
    marginLeft: 360,
    backgroundColor: "white",
  },
  timeButton: {
    marginLeft: 140,
    marginRight: 130,
    height: 80,
    borderRadius: 50,
    marginTop: 100,
    padding: 9,
  },
  button: {
    marginLeft: 140,
    marginRight: 130,
    height: 80,
    borderRadius: 50,
    marginTop: 100,
    padding: 9,
  },
  container: {
    // flex: 1,
    // paddingHorizontal: 60,
    // justifyContent: "center",
    // alignItems: "center",
    // height: 200,
    // width: 200,
  },
});

export default HomeScreen;
