import Realm from "realm";

import { MedicineSchema } from "./schemas/MedicineSchema";
import { ReminderSchema } from "./schemas/ReminderSchema";
import { IntakeLogSchema } from "./schemas/IntakeLogSchema";

let realmInstance = null;

export const getRealm = () => {
  if (realmInstance) return realmInstance;

  realmInstance = new Realm({
    schema: [ReminderSchema],
    schemaVersion: 3, // 🔥 bump version
    migration: (oldRealm, newRealm) => {
      if (oldRealm.schemaVersion < 3) {
        const oldObjects = oldRealm.objects("Reminder");
        const newObjects = newRealm.objects("Reminder");

        for (let i = 0; i < oldObjects.length; i++) {
          const oldObj = oldObjects[i];
          const newObj = newObjects[i];

          if (oldObj.date) newObj.scheduleType = "ONCE";
          else if (oldObj.monthlyDay) newObj.scheduleType = "MONTHLY";
          else if (oldObj.repeat) newObj.scheduleType = "WEEKLY";
          else newObj.scheduleType = "DAILY";
        }
      }
    }
  });

  return realmInstance;
};

export const getScheduleType = ({ date, days, monthlyDay, isDaily }) => {

  if (date) return "ONCE";

  if (monthlyDay) return "MONTHLY";

  if (days && days.length > 0) {
    return days.length === 7 ? "DAILY" : "WEEKLY";
  }

  if (isDaily) return "DAILY";

  return "DAILY"; // ✅ NEVER return NONE
};
