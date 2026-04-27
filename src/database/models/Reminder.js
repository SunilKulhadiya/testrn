export const ReminderSchema = {

name: "Reminder",

primaryKey: "_id",

properties: {

_id: "objectId",

medicineName: "string",

time: "string",

date: "date",

repeatDays: "string[]",

taken: { type: "bool", default: false },

enabled: { type: "bool", default: true }

}

};