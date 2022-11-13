import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import SelectDurationScreen from "./SelectDurationScreen";
import NotificationScreen from "./NotificationScreen";
import { TimePicker } from "react-native-simple-time-picker";
import BeepIntervalScreen from "./BeepIntervalScreen";
import Icon from "react-native-vector-icons/Feather";
import * as Notifications from "expo-notifications";
import TimerScreen from "./TimerScreen";
const HomeScreen = ({ navigation }) => {
  const [exerciseDuration, setExerciseDuration] = useState();
  const [beepInterval, setBeepInterval] = useState(0);
  const [isIconDisabled, setIsIconDisabled] = useState(true);
  const getDuration = (e) => {
    setExerciseDuration(e);
  };
  const aa = exerciseDuration;
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
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  const [timevalue, setTimeValue] = useState({
    hours: 0,
    minutes: 0,
  });
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    const getPermission = async () => {
      if (Constants.isDevice) {
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

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        Notifications.addNotificationResponseReceivedListener((res) => {
          navigation.navigate("TimerScreen", {
            ExerciseDuration:
              res.notification.request.content.data.exerciseDuration,
          });
        });
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const onClick = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        autoDismiss: false,
        title: "Exercise Notification",
        body: "It's time to start Exercise",
        data: {
          exerciseDuration: exerciseDuration,
        },
        color: "Green",
        vibrate: true,
      },
      trigger: {
        hour: timevalue.hours,
        minute: timevalue.minutes,
        repeats: true,
      },
    });
  };

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
            onClick();
            setIsIconDisabled(false);
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
    // backgroundColor: "#bac006",
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
