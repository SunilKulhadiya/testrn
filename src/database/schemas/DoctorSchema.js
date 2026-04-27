import Realm from "realm";

export const DoctorSchema = {

  name: "Doctor",

  primaryKey: "id",

  properties: {

    id: "int",

    name: "string",

    description: "date",

    location: "string",

    enabled: { type: "bool", default: true }

  }

};
