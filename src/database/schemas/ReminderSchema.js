import Realm from "realm";
import { BSON } from "realm";

export const ReminderSchema = {
  name: "Reminder",
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    type: "string", // Medicine | Other
    name: "string",
    // legacy single time (keep for backward compatibility)
    time: "date",
    // multiple times (main field)
    times: "date[]",
    scheduleType: "string",
    // one-time reminder date
    date: "date?",
    // monthly repeat day (1–31)
    monthlyDay: "int?",
    // weekly repeat days: "Mon,Tue,Wed"
    repeat: "string",
    enabled: { type: "bool", default: true },
    taken: { type: "bool", default: false },
    createdAt: { type: "date", default: () => new Date() }
  }
};

// export const ReminderSchema = {
//   name: "Reminder",
//   primaryKey: "_id",
//   properties: {
//     _id: "objectId",
//     type: "string",     // Medicine | Other
//     name: "string",
//     time: "date",       // still keep time
//     times: "date[]",
//     date: "date?",      // optional field for specific date
//     monthlyDay: number | null, // e.g. 15 means "repeat every month on the 15th"
//     repeat: "string",   // keep for recurring reminders
//     enabled: { type: "bool", default: true },
//     taken: { type: "bool", default: false },
//     createdAt: { type: "date", default: () => new Date() }
//   }
// };
