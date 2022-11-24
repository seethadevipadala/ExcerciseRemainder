import React, { useState, useRef, useEffect } from "react";
import { BackHandler } from "react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, ScrollView, StyleSheet, Button } from "react-native";
import SelectDurationScreen from "../components/SelectDuration";
import { TimePicker } from "react-native-simple-time-picker";
import BeepIntervalScreen from "../components/BeepInterval";
import Icon from "react-native-vector-icons/Feather";
import * as Notifications from "expo-notifications";

import { useNavigation } from "@react-navigation/native";

Notifications.setNotificationCategoryAsync("category", [
  {
    buttonTitle: "Start",
    identifier: "0",
    options: {
      opensAppToForeground: true,
    },
  },

  {
    buttonTitle: "Reject",

    identifier: "1",

    options: {
      opensAppToForeground: false,
    },
  },
  {
    buttonTitle: "5 min delay",

    identifier: "2",
    options: {
      opensAppToForeground: false,
    },
  },
]);

const HomeScreen = () => {
  const navigation = useNavigation();
  const [exerciseDuration, setExerciseDuration] = useState();
  const [beepIntervals, setBeepIntervals] = useState();
  const [isIconDisabled, setIsIconDisabled] = useState(false);
  const setDuration = (e) => {
    setExerciseDuration(e);
  };
  const setBeepInreval = (e) => {
    setBeepIntervals(e);
  };
  const setEditedBeepInterval = (e) => {
    setBeepIntervals(e);
  };
  const setEditedDuration = (e) => {
    setExerciseDuration(e);
  };
  const setEditedTimeValue = (e) => {
    setTimeValue(e);
  };
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  const storeData = async () => {
    const items = {
      storedTimeValue: timevalue,
      storedExerciseDuration: exerciseDuration,
      storedBeepIntervals: beepIntervals,
    };
    try {
      await AsyncStorage.setItem("KEY", JSON.stringify(items));
    } catch (error) {}
  };
  const getData = () => {
    try {
      AsyncStorage.getItem("KEY").then((value) => {
        if (value != null) {
          var user = JSON.parse(value);
          setTimeValue(user.storedTimeValue);
          setExerciseDuration(user.storedExerciseDuration);
          setBeepIntervals(user.storedBeepIntervals);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const [timevalue, setTimeValue] = useState({
    hours: 0,
    minutes: 0,
  });
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

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    };

    getPermission();

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        if (response.actionIdentifier === "0") {
          navigation.navigate("TimerScreen", {
            ExerciseDuration:
              response.notification.request.content.data.exerciseDuration,
            BeepInterval:
              response.notification.request.content.data.beepInterval,
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
      storedValue.storedTimeValue.ampm === "pm"
        ? storedValue.storedTimeValue.hours + 12
        : storedValue.storedTimeValue.hours;
    const latestNotifacationId = await Notifications.scheduleNotificationAsync({
      content: {
        autoDismiss: true,
        title: "Exercise Notification",
        body: "It's time to start Exercise",
        categoryIdentifier: "category",
        data: {
          exerciseDuration: exerciseDuration,
          beepInterval: beepIntervals,
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
  return (
    <ScrollView>
      <View style={styles.edit}>
        {isIconDisabled && (
          <Icon
            name="edit"
            size={30}
            backgroundColor="#3b5998"
            onPress={() => {
              navigation.navigate("EditScreen", {
                exerciseDuration: exerciseDuration,
                beepInterval: beepIntervals,
                setEditedDuration: setEditedDuration,
                setEditedBeepInterval: setEditedBeepInterval,
                timevalue: timevalue,
                setEditedTimeValue: setEditedTimeValue,
              });
            }}
          />
        )}
      </View>
      <Text style={{ marginTop: 20, marginLeft: 50, fontSize: 15 }}>
        At what time you want to excercise daily?
      </Text>

      <View style={styles.container}>
        <TimePicker
          isAmpm={true}
          value={timevalue}
          onChange={(e) => {
            setTimeValue(e);
          }}
        />
      </View>

      <SelectDurationScreen
        setDuration={setDuration}
        exerciseDuration={exerciseDuration}
      />
      <BeepIntervalScreen
        setBeepInreval={setBeepInreval}
        beepInterval={beepIntervals}
      />
      <View style={styles.button}>
        <Button
          onPress={() => {
            storeData();
            scheduleLocalNotification();
            setIsIconDisabled(true);

            alert(
              `You will get notification on ${
                timevalue.hours < 10 ? "0" + timevalue.hours : timevalue.hours
              }:${
                timevalue.minutes < 10
                  ? "0" + timevalue.minutes
                  : timevalue.minutes
              }`
            );
          }}
          title="Save"
          color="#91abc2"
          disabled={!exerciseDuration || !beepIntervals || !timevalue}
        />
      </View>
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
    height: 80,
    borderRadius: 50,
    marginTop: 100,
    padding: 9,
  },
  container: {
    flex: 1,
    paddingHorizontal: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
