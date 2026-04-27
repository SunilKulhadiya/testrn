export const HistorySchema = {

name: "History",

primaryKey: "_id",

properties: {

_id: "objectId",

reminderId: "objectId",

medicineName: "string",

takenAt: "date"

}

};