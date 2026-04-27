import { BSON } from "realm";

export const MedicineSchema = {
  name: "Medicine",
  primaryKey: "_id",

  properties: {

    _id: "objectId",
    name: "string",
    type: "string",
    dosage: "string",
    frequency: "string",

    notes: "string?",
    color: "string?",
    icon: "string?",

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

    createdAt: {
      type: "date",
      default: () => new Date()
    },

    isActive: {
      type: "bool",
      default: true
    },

    // reminders: {
    //   type: "linkingObjects",
    //   objectType: "Reminder",
    //   property: "medicine"
    // }

  }
};