//import realm from "../../database/realm";
import { getRealm, getScheduleType } from "../../database/realm";

/* GET TODAY REMINDERS */

// export const getTodayReminders = () => {

//   const today = new Date();
//   today.setHours(0,0,0,0);

//   const tomorrow = new Date(today);
//   tomorrow.setDate(today.getDate() + 1);

//   return realm
//     .objects("Reminder")
//     .filtered("time >= $0 AND time < $1", today, tomorrow)
//     .sorted("time");

// };
//---------------------------------------
export const getAllReminders = () => {

  const realm = getRealm();

  return realm.objects("Reminder");

};
//------------------------
export const getRemindersByTypeAndDate = (type, targetDate) => {
  const realm = getRealm();

  let results;

  if (targetDate === "All") {
    results = realm.objects("Reminder")
      .filtered("type == $0", type);
  } else {
    const start = new Date(targetDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(targetDate);
    end.setHours(23, 59, 59, 999);

    results = realm.objects("Reminder")
      .filtered("type == $0 AND date >= $1 AND date <= $2", type, start, end);
  }

  // ✅ CONVERT TO PLAIN ARRAY
  return results.map(r => ({
    _id: r._id?.toString?.() || r._id,
    name: r.name,
    type: r.type,
    times: r.times ? [...r.times] : [],
    time: r.time,
    scheduleType: r.scheduleType,
    date: r.date,
    monthlyDay: r.monthlyDay,
    repeat: r.repeat,
    enabled: r.enabled,
    taken: r.taken,
    createdAt: r.createdAt
  }));
};
//---------------------------------------
export const getTodayReminders = () => {
  const realm = getRealm();
  const today = new Date();

  const dayName = today.toLocaleDateString("en-US", { weekday: "short" }); // Mon
  const todayDate = today.getDate();

  return realm.objects("Reminder").filtered(`
    enabled == true AND (
      scheduleType == "DAILY" OR
      (scheduleType == "WEEKLY" AND repeat CONTAINS $0) OR
      (scheduleType == "MONTHLY" AND monthlyDay == $1) OR
      (scheduleType == "ONCE" AND date >= $2 AND date <= $3)
    )`,
    dayName,
    todayDate,
    new Date(today.setHours(0,0,0,0)),
    new Date(today.setHours(23,59,59,999))
  );
};

// export const getTodayReminders = () => {
//   const realm = getRealm();
//   const today = new Date();

//   // Start of today
//   const start = new Date(today);
//   start.setHours(0, 0, 0, 0);

//   // End of today
//   const end = new Date(today);
//   end.setHours(23, 59, 59, 999);

//   return realm.objects("Reminder").filtered("date >= $0 AND date <= $1", start, end);
// };
//---------------------------
export const getRemindersCountByDate = (targetDate) => {
  const realm = getRealm();

  const start = new Date(targetDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(targetDate);
  end.setHours(23, 59, 59, 999);

  return realm.objects("Reminder").filtered(
    'scheduleType == "ONCE" AND date >= $0 AND date <= $1',
    start,
    end
  ).length;
};

// export const getRemindersCountByDate = (targetDate) => {
//   const realm = getRealm();

//   const start = new Date(targetDate);
//   start.setHours(0, 0, 0, 0);

//   const end = new Date(targetDate);
//   end.setHours(23, 59, 59, 999);

//   return realm.objects("Reminder")
//               .filtered("date >= $0 AND date <= $1", start, end)
//               .length;
// };
//----------------------------
/* GET NEXT REMINDER */
export const getNextReminder = () => {
  const realm = getRealm();
  const now = new Date();

  return realm.objects("Reminder")
    .filtered("enabled == true")
    .sorted("time")
    .find(r => {
      return r.times.some(t => t > now);
    });
};


// export const getNextReminder = () => {

//   const now = new Date();
//   const realm = getRealm();

//   return realm
//     .objects("Reminder")
//     .filtered("time > $0 AND enabled == true", now)
//     .sorted("time")[0];

// };


/* GET MISSED REMINDERS */

export const getMissedReminders = () => {

  const now = new Date();
  const realm = getRealm();

  return realm
    .objects("Reminder")
    .filtered("time < $0 AND taken == false", now);

};


/* ADHERENCE PERCENTAGE */

export const getAdherence = () => {

  const realm = getRealm();
  const reminders = realm.objects("Reminder");

  if(reminders.length === 0){
    return 0;
  }

  const taken = reminders.filtered("taken == true").length;
  const total = reminders.length;

  return Math.round((taken / total) * 100);

};


/* WEEKLY ADHERENCE */

export const getWeeklyAdherence = () => {

  const weekStats = [];
  const realm = getRealm();

  for(let i = 0; i < 7; i++){

    const day = new Date();
    day.setDate(day.getDate() - i);

    day.setHours(0,0,0,0);

    const nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);

    const reminders = realm
      .objects("Reminder")
      .filtered("time >= $0 AND time < $1", day, nextDay);

    const taken = reminders.filtered("taken == true").length;

    weekStats.push({
      date: day,
      total: reminders.length,
      taken: taken
    });

  }

  return weekStats.reverse();

};


/* MEDICINE HISTORY */

export const getMedicineHistory = () => {

  const realm = getRealm();
  return realm
    .objects("Reminder")
    .sorted("time", true);

};

/* MEDICINE HISTORY */
export const markReminderTaken = (id) => {
  const realm = getRealm();

  const reminder = realm.objectForPrimaryKey("Reminder", id);
  if (!reminder) return;

  realm.write(() => {
    reminder.taken = true;
  });
};

// export const markReminderTaken = (id) => {

//   const realm = getRealm();

//   const reminder = realm.objectForPrimaryKey("Reminder", id);
//   if (!reminder) return;

//   realm.write(() => {
//     reminder.taken = true;
//   });

// };
///////-------
// export const addReminder = ({
//   name,
//   times,
//   date,
//   days,
//   monthlyDay,
//   isDaily
// }) => {
//   try {
//     const realm = getRealm();

//     const scheduleType = getScheduleType({
//       date,
//       days,
//       monthlyDay,
//       isDaily
//     });

//     console.log("267 , reminderService.js , scheduleType : ", scheduleType);
//     console.log("268 , reminderService.js , scheduleType : ", scheduleType);
    
//     realm.write(() => {
//       realm.create("Reminder", {
//         _id: new Realm.BSON.ObjectId(),

//         type: "Other",
//         name,

//         time: times[0],
//         times: times || [],

//         scheduleType,

//         date: scheduleType === "ONCE" ? date : null,
//         monthlyDay: scheduleType === "MONTHLY" ? monthlyDay : null,
//         repeat: scheduleType === "WEEKLY" ? days.join(",") : "",

//         enabled: true,
//         taken: false,
//         createdAt: new Date()
//       });
//     });

//     return true;

//   } catch (e) {
//     console.log("Add Error:", e);
//     return false;
//   }
// };

export const addReminder = (reminder) => {
  try {
    const realm = getRealm();

    console.log("Saving reminder => ", reminder);

    realm.write(() => {
      realm.create("Reminder", {
        _id: reminder._id,

        type: reminder.type || "Other",
        name: reminder.name,

        time: reminder.time,
        times: reminder.times || [],

        // ✅ REQUIRED FIELD (FIX)
        scheduleType: reminder.scheduleType || "daily",

        date: reminder.date || null,
        monthlyDay: reminder.monthlyDay || null,
        repeat: reminder.repeat || "",

        enabled: true,
        taken: false,
        createdAt: new Date(),
      });
    });

    console.log("Reminder saved successfully ✅");
    return true;

  } catch (error) {
    console.log("Save Error:", error.message);
    return false;
  }
};

// export const addReminder = (medicine, time, repeat = "Daily") => {

//   try {
//     const realm = getRealm();

//     realm.write(() => {
//       realm.create("Reminder", {
//         id: Date.now(),

//         medicine: medicine,
//         name: medicine.name,
//         time: time,
//         repeat: repeat,
//         enabled: true,
//         taken: false
//       });
//     });

//     return true;   // success

//   } catch (error) {
//     console.log("Save Error:", error);
//     return false;  // failed
//   }
// };
//addReminder(medicine, new Date("2026-03-20T08:00:00"), "Daily");
//addReminder(medicine, new Date("2026-03-20T08:00:00"), "Daily");
//---------------------------//////////-
export const updateReminder = (id, updates) => {
  const realm = getRealm();

  const objectId =
    typeof id === "string"
      ? new Realm.BSON.ObjectId(id)
      : id;

  const reminder = realm.objectForPrimaryKey("Reminder", objectId);

  if (!reminder) {
    console.log("Reminder not found");
    return;
  }

  realm.write(() => {
    // ✅ ONLY update provided fields
    Object.keys(updates).forEach((key) => {
      reminder[key] = updates[key];
    });
  });

  console.log("Updated reminder:", reminder);
};

// export const updateReminder = (id, data) => {

//   const realm = getRealm();

//   const reminder = realm.objectForPrimaryKey("Reminder", id);
//   if (!reminder) return;

//   realm.write(() => {

//     if (data.name !== undefined) reminder.name = data.name;
//     if (data.time !== undefined) reminder.time = data.time;
//     if (data.repeat !== undefined) reminder.repeat = data.repeat;
//     if (data.enabled !== undefined) reminder.enabled = data.enabled;
//     if (data.taken !== undefined) reminder.taken = data.taken;

//   });

// };
//updateReminder(1710922020000, {
//   time: new Date("2026-03-20T09:00:00")
// });
// ✅ 3. Example: Update time only
// updateReminder(1710922020000, {
//   time: new Date("2026-03-20T09:00:00")
// });
// ✅ 4. Example: Enable / Disable reminder
// updateReminder(reminder.id, {
//   enabled: false
// });
// ✅ 5. Example: Mark as taken
// updateReminder(reminder.id, {
//   taken: true
// });
//---------------------------
export const deleteReminder = (id) => {
  const realm = getRealm();

  const reminder = realm.objectForPrimaryKey("Reminder", id);
  if (!reminder) return;

  realm.write(() => {
    realm.delete(reminder);
  });
};

// export const deleteReminder = (id) => {

//   const realm = getRealm();

//   const reminder = realm.objectForPrimaryKey("Reminder", id);
//   if (!reminder) return;

//   realm.write(() => {
//     realm.delete(reminder);
//   });

// };
//------------------------------
export const deleteMedicineReminders = (medicineId) => {

  const realm = getRealm();

  const reminders = realm
    .objects("Reminder")
    .filtered("medicineId == $0", medicineId);

  realm.write(() => {
    realm.delete(reminders);
  });

};
//---------------
export const updateReminderTime = (id, index, newTime) => {
  const realm = getRealm();
  const reminder = realm.objectForPrimaryKey("Reminder", id);
  if (!reminder) return;

  realm.write(() => {
    if (reminder.times && reminder.times.length > index) {
      reminder.times[index] = newTime;  // ✅ update specific time
    }
  });
};
//--------------
export const addReminderTime = (id, newTime) => {
  const realm = getRealm();
  const reminder = realm.objectForPrimaryKey("Reminder", id);
  if (!reminder) return;

  realm.write(() => {
    reminder.times.push(newTime);  // ✅ add new time
  });
};
//--------------------
export const removeReminderTime = (id, index) => {
  const realm = getRealm();
  const reminder = realm.objectForPrimaryKey("Reminder", id);
  if (!reminder) return;

  realm.write(() => {
    if (reminder.times && reminder.times.length > index) {
      reminder.times.splice(index, 1);  // ✅ remove specific time
    }
  });
};
//---------
export const duplicateReminder = (reminder) => {

  const realm = getRealm();

  realm.write(() => {

    realm.create("Reminder", {
      id: Date.now(),
      medicineId: reminder.medicineId,
      name: reminder.name,
      time: new Date(reminder.time),
      repeat: reminder.repeat,
      enabled: reminder.enabled,
      taken: false
    });

  });

};
//--------------
export const createDailyReminders = (medicine) => {

  const today = new Date();
  const realm = getRealm();

  const morning = new Date(today);
  morning.setHours(8, 0, 0);

  const afternoon = new Date(today);
  afternoon.setHours(2, 0, 0);

  const night = new Date(today);
  night.setHours(9, 0, 0);

  realm.write(() => {

    realm.create("Reminder", {
      id: Date.now() + 1,
      medicineId: medicine._id,
      name: medicine.name,
      time: morning,
      repeat: "Daily"
    });

    realm.create("Reminder", {
      id: Date.now() + 2,
      medicineId: medicine._id,
      name: medicine.name,
      time: afternoon,
      repeat: "Daily"
    });

    realm.create("Reminder", {
      id: Date.now() + 3,
      medicineId: medicine._id,
      name: medicine.name,
      time: night,
      repeat: "Daily"
    });

  });

};
//-----------------