import notifee, {
  AndroidImportance,
  TriggerType,
} from '@notifee/react-native';


/*
--------------------------------
1. Request Permission
--------------------------------
*/
export const configureNotifications = async () => {

  await notifee.requestPermission();

};


/*
--------------------------------
2. Create Android Channel
--------------------------------
*/
export const createReminderChannel = async () => {

  await notifee.createChannel({
    id: 'medicine-reminder-channel',
    name: 'Medicine Reminders',
    description: 'Notifications for medicine schedule',
    importance: AndroidImportance.HIGH,
    vibration: true,
  });

};


/*
--------------------------------
3. Schedule Reminder Notification
--------------------------------
*/
export const scheduleReminderNotification = async ({
  id,
  title,
  message,
  date,
}) => {

  const trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: new Date(date).getTime(),
  };

  await notifee.createTriggerNotification(
    {
      id: String(id),

      title: title || "Medicine Reminder",

      body: message || "Time to take your medicine",

      android: {
        channelId: "medicine-reminder-channel",
        pressAction: {
          id: "default",
        },
      },
    },
    trigger
  );

};


/*
--------------------------------
4. Cancel Reminder
--------------------------------
*/
export const cancelReminderNotification = async (id) => {

  await notifee.cancelNotification(String(id));

};


/*
--------------------------------
5. Cancel All Notifications
--------------------------------
*/
export const cancelAllNotifications = async () => {

  await notifee.cancelAllNotifications();

};


/*
--------------------------------
6. Reschedule All Reminders
--------------------------------
*/
export const rescheduleReminders = async () => {

  try {

    const reminders = await getAllRemindersFromDB();

    reminders.forEach(async (reminder) => {

      await scheduleReminderNotification({
        id: reminder.id,
        title: reminder.title,
        message: reminder.message,
        date: reminder.time
      });

    });

  } catch (error) {

    console.log("Reschedule error:", error);

  }

};


/*
--------------------------------
Example DB function
--------------------------------
*/
const getAllRemindersFromDB = async () => {

  return [

    {
      id: 1,
      title: "Paracetamol",
      message: "Take 1 tablet after food",
      time: new Date(Date.now() + 60000),
    },

    {
      id: 2,
      title: "Vitamin D",
      message: "Take capsule",
      time: new Date(Date.now() + 120000),
    },

  ];

};