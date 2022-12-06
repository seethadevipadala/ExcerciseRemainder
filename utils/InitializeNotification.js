import * as Notifications from "expo-notifications";
// var setNotificationCategoryAsync;
export const setNotificationCategoryAsync =
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
      optiisIconDisabledons: {
        opensAppToForeground: false,
      },
    },
  ]);
export const setNotificationHandler = Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
