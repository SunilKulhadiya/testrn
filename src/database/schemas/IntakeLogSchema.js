import Realm from "realm";

export const IntakeLogSchema = {

  name: "IntakeLog",

  primaryKey: "id",

  properties: {

    id: "int",

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
