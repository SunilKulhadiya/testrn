import { getReminders } from "../database/services/reminderService";

import { scheduleNotification } from "./notificationService";

export const rescheduleReminders = () => {

  const reminders = getReminders();

  reminders.forEach(reminder => {

    if (reminder.enabled) {

      scheduleNotification(reminder);

    }

  });

};