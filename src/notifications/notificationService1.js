import notifee, {
  AndroidImportance,
  TriggerType,
} from '@notifee/react-native';
import { NativeModules } from 'react-native';
import { RepeatFrequency } from '@notifee/react-native';
import { PermissionsAndroid, Platform } from 'react-native';

import { getAllReminders } from '../database/services/reminderService';


const { AlarmModule } = NativeModules;


// Request POST_NOTIFICATIONS (Android 13+)
export const requestNotificationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      {
        title: 'Notification Permission',
        message: 'We need permission to show medicine reminders.',
        buttonPositive: 'Allow',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

export const requestExactAlarmPermission = async () => {
  // Only Android 12+
  if (Platform.OS !== 'android' || Platform.Version < 31) {
    return true;
  }

  try {

    const SettingsModule = NativeModules.SettingsModule;

    // ✅ Safety check (prevents crash)
    if (!SettingsModule) {
      console.log("SettingsModule not linked ❌");
      return false;
    }

    // ✅ Check permission
    const allowed = await SettingsModule.canScheduleExactAlarms();

    if (allowed) {
      console.log("Exact alarm permission already granted ✅");
      return true;
    }

    // ❗ Open settings (NO popup in Android 12+)
    console.log("Opening Exact Alarm Settings ⚙️");

    if (SettingsModule.openExactAlarmSettings) {
      SettingsModule.openExactAlarmSettings();
    }

    return false;

  } catch (error) {
    console.log("Exact alarm permission error ❌", error);
    return false;
  }
};

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
    id: 'medicine-reminder-channel-v7',
    name: 'Medicine Reminders',
    description: 'Notifications for medicine schedule',
    importance: AndroidImportance.HIGH,
    sound: 'default',
    vibration: true,
  });

};

//-----------------------------
export const scheduleNotification = async (id, title, time, days = null) => {

  await createReminderChannel(); // make sure channel exists

  // ---------- CASE 1: One-time reminder ----------
  if (time instanceof Date && days === null) {

    await notifee.createTriggerNotification(
      {
        id: String(id),
        title: title || "Reminder",
        body: "Time to take reminder",
        android: {
          channelId: "medicine-reminder-channel-v7",
          pressAction: { id: "default" },
        },
      },
      {
        type: TriggerType.TIMESTAMP,
        timestamp: new Date(time).getTime(),
      }
    );

    return;
  }

  // ---------- CASE 2: Weekly reminder ----------
  if (days && days.length > 0) {

    const weekdaysMap = {
      SU: 1,
      MO: 2,
      TU: 3,
      WE: 4,
      TH: 5,
      FR: 6,
      SA: 7
    };

    for (const day of days) {

      await notifee.createTriggerNotification(
        {
          id: `${id}-${day}`,
          title: title || "Reminder",
          body: "Time to take reminder",
          android: {
            channelId: "medicine-reminder-channel-v7",
            pressAction: { id: "default" },
          },
        },
        {
          type: TriggerType.CALENDAR,
          hour: time.getHours(),
          minute: time.getMinutes(),
          weekday: weekdaysMap[day],
          repeatFrequency: RepeatFrequency.WEEKLY,
        }
      );
    }

    return;
  }

  // ---------- CASE 3: Daily reminder ----------
  await notifee.createTriggerNotification(
    {
      id: String(id),
      title: title || "Reminder",
      body: "Time to take reminder",
      android: {
        channelId: "medicine-reminder-channel-v7",
        pressAction: { id: "default" },
      },
    },
    {
      type: TriggerType.CALENDAR,
      hour: time.getHours(),
      minute: time.getMinutes(),
      repeatFrequency: RepeatFrequency.DAILY,
    }
  );
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
  repeat,
  time
}) => {
  await createReminderChannel();

  const safeId = parseInt(id, 10) || Date.now();
  const reminderDate = new Date(time);

  // Helper for notification options to avoid repetition
  const notificationOptions = {
    title: title || "Medicine Reminder",
    body: message || "Time to take your medicine",
    data: { 
      reminderId: String(safeId),
      type: 'medicine_alarm' 
    },
    android: {
      channelId: "medicine-reminder-channel-v7",
      category: 'alarm',
      importance: AndroidImportance.HIGH,
      fullScreenIntent: true, // Critical for waking screen
      pressAction: { id: "default" },
      // 🔘 ADDED ACTIONS HERE
      actions: [
        {
          title: 'Snooze (5m)',
          pressAction: { id: 'snooze' },
        },
        {
          title: 'Dismiss',
          pressAction: { id: 'dismiss' },
        },
      ],
    },
  };

  // ---------- CASE 1: ONE TIME ----------
  if (date) {
    const triggerDate = mergeDateAndTime(new Date(date), new Date(time));

    await notifee.createTriggerNotification(
      { ...notificationOptions, id: String(safeId) },
      {
        type: TriggerType.TIMESTAMP,
        timestamp: triggerDate.getTime(),
        alarmManager: true, // Ensures exactness in Notifee
      }
    );

    if (AlarmModule?.scheduleAlarm) {
      AlarmModule.scheduleAlarm(safeId, triggerDate.getTime(), title, "ONCE");
    }
    return;
  }

  // ---------- CASE 2: WEEKLY ----------
  if (repeat && repeat.length > 0) {
    const weekdaysMap = { SU: 1, MO: 2, TU: 3, WE: 4, TH: 5, FR: 6, SA: 7 };
    const normalizeDay = (day) => ({
      Sun: "SU", Mon: "MO", Tue: "TU",
      Wed: "WE", Thu: "TH", Fri: "FR", Sat: "SA"
    }[day?.trim()]);

    const days = repeat.split(",");

    for (const d of days) {
      const key = normalizeDay(d);
      if (!key) continue;

      const weekday = weekdaysMap[key];
      const notificationId = `${safeId}-${weekday}`;

      // 1. Schedule Visual Notification (Notifee)
      await notifee.createTriggerNotification(
        { ...notificationOptions, id: notificationId },
        {
          type: TriggerType.CALENDAR,
          hour: reminderDate.getHours(),
          minute: reminderDate.getMinutes(),
          weekday,
          repeatFrequency: RepeatFrequency.WEEKLY,
        }
      );

      // 2. Schedule Hardware Wakeup (Native Alarm)
      let nextTrigger = new Date();
      nextTrigger.setHours(reminderDate.getHours(), reminderDate.getMinutes(), 0, 0);
      
      const targetDayJS = weekday - 1; 
      const currentDayJS = nextTrigger.getDay();
      let daysUntil = (targetDayJS - currentDayJS + 7) % 7;

      if (daysUntil === 0 && nextTrigger.getTime() <= Date.now()) {
        daysUntil = 7;
      }
      nextTrigger.setDate(nextTrigger.getDate() + daysUntil);

      if (AlarmModule?.scheduleAlarm) {
        const alarmId = parseInt(`${safeId}${weekday}`);
        AlarmModule.scheduleAlarm(alarmId, nextTrigger.getTime(), title, "WEEKLY");
      }
    }
    return;
  }

  // ---------- CASE 3: DAILY ----------
  await notifee.createTriggerNotification(
    { ...notificationOptions, id: String(safeId) },
    {
      type: TriggerType.CALENDAR,
      hour: reminderDate.getHours(),
      minute: reminderDate.getMinutes(),
      repeatFrequency: RepeatFrequency.DAILY,
    }
  );

  let nextTrigger = new Date();
  nextTrigger.setHours(reminderDate.getHours(), reminderDate.getMinutes(), 0, 0);

  if (nextTrigger.getTime() <= Date.now()) {
    nextTrigger.setDate(nextTrigger.getDate() + 1);
  }

  if (AlarmModule?.scheduleAlarm) {
    AlarmModule.scheduleAlarm(safeId, nextTrigger.getTime(), title, "DAILY");
  }
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

    const reminders = await getAllReminders();  //getAllRemindersFromDB();

    reminders.forEach(async (reminder) => {

      await scheduleReminderNotification({
        id: reminder._id.toString(),
        title: reminder.name,
        message: "Time to take your medicine",
        date: reminder.date,
        time: reminder.time,
        repeat: reminder.repeat
      });

    });

  } catch (error) {

    console.log("Reschedule error:", error);

  }

};


// Utility to merge date + time into one Date object
const mergeDateAndTime = (date, time) => {
  const merged = new Date(date);
  merged.setHours(time.getHours());
  merged.setMinutes(time.getMinutes());
  merged.setSeconds(0);
  merged.setMilliseconds(0);

  // If merged time is already in the past, schedule for next day
  if (merged.getTime() <= Date.now()) {
    merged.setDate(merged.getDate() + 1);
  }
  return merged;
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