import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Platform,
  Alert,
  Switch
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BSON } from "realm";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import DaySelector from "../../components/selectors/DaySelector";
import { addReminder, updateReminder, getRemindersCountByDate } from "../../database/services/reminderService";
import { scheduleNotification } from "../../notifications/notificationService1";
import AppConstant from "../../Helper/Constant";

export default function AddReminderScreen({ navigation, editReminder, onSaved }) {

  const [name, setName] = useState("");
  const [time, setTime] = useState(null);
  const [days, setDays] = useState([]);
  const [date, setDate] = useState(null);
  const [monthlyDay, setMonthlyDay] = useState(0);
  
  const [isDaily, setIsDaily] = useState(false);


  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [reminderTimesArray, setReminderTimesArray] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);


  const allDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // ================= EDIT MODE PREFILL =================
  useEffect(() => {
    if (!editReminder || !editReminder._id) {
      // ✅ RESET ALL FIELDS (ADD MODE)
      setName("");
      setDate(null);
      setMonthlyDay(0);
      setDays([]);
      setIsDaily(false);
      setReminderTimesArray([]);
      setEditingIndex(null);
    }
  }, [editReminder]);
  //----------------------------
  useEffect(() => {
    if (editReminder && editReminder._id) {
      
      console.log("57 , AddReminderScreen.js , editReminder : ", editReminder);

      setName(editReminder.name);
      setDate(editReminder.date ? new Date(editReminder.date) : null);

      const repeatDays = editReminder.repeat
        ? editReminder.repeat.split(",")
        : [];

              console.log("67 , AddReminderScreen.js , repeatDays : ", repeatDays, ", editReminder.repeat : ", editReminder.repeat);

      setDays(repeatDays);

      // ✅ IMPORTANT
      if (repeatDays.length === 7) {
        setIsDaily(true);
      } else {
        setIsDaily(false);
      }

      // times
      if (editReminder.times?.length > 0) {
        setReminderTimesArray(editReminder.times.map(t => new Date(t)));
      } else if (editReminder.time) {
        setReminderTimesArray([new Date(editReminder.time)]);
      }
    }
  }, [editReminder]);
  // ================= NORMALIZE TIME =================
  const normalizeTime = (dateObj) => {
    const t = new Date(0);
    t.setHours(dateObj.getHours());
    t.setMinutes(dateObj.getMinutes());
    t.setSeconds(0);
    return t;
  };
  //---------------
  const isToday = (date) => {
    const today = new Date();

    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  //--------------------
  const validateTodayOnly = (date, times = []) => {
    const now = new Date();

    // If no date → treat as today
    const baseDate = date ? new Date(date) : new Date();

    // ✅ Only validate if selected date is TODAY
    if (!isToday(baseDate)) {
      return true; // allow everything for future dates
    }

    // ❌ Validate only today's times
    for (let t of times) {
      const check = new Date(baseDate);

      check.setHours(
        t.getHours(),
        t.getMinutes(),
        0,
        0
      );

      if (check.getTime() <= now.getTime()) {
        return false; // ❌ past or current time today
      }
    }

    return true;
  };
  //-------------------
  const validateWeeklyTodayOnly = (days, times) => {
    const now = new Date();
    const today = new Date().getDay();

    const dayMap = { Sun:0, Mon:1, Tue:2, Wed:3, Thu:4, Fri:5, Sat:6 };

    for (let day of days) {
      const selectedDay = dayMap[day];

      // ✅ Only check if selected day is TODAY
      if (selectedDay === today) {
        for (let t of times) {
          const check = new Date();

          check.setHours(t.getHours(), t.getMinutes(), 0, 0);

          if (check.getTime() <= now.getTime()) {
            return false; // ❌ today's past time
          }
        }
      }
    }

    return true;
  };
  // ================= SAVE old=================
    const saveReminder = () => {

    let scheduleType = "daily";
    let finalDate = null;
    let finalMonthlyDay = null;
    let finalRepeat = "";

    if (days && days.length > 0) {
      if (days.length === 7) {
        scheduleType = "daily";
        finalRepeat = "Mon,Tue,Wed,Thu,Fri,Sat,Sun";
      } else {
        scheduleType = "weekly";
        finalRepeat = days.join(",");
      }
    }
    else if (monthlyDay) {
      scheduleType = "monthly";
      finalMonthlyDay = monthlyDay;
    }
    else if (date) {
      scheduleType = "once";
      finalDate = new Date(date);
    }

    if (!name.trim()) {
      Alert.alert("Validation", "Please enter a reminder name");
      return;
    }

    if (!reminderTimesArray || reminderTimesArray.length === 0) {
      Alert.alert("Validation", "Please select at least one time");
      return;
    }

    const reminderDate = date ? new Date(date) : new Date();
    const count = getRemindersCountByDate(reminderDate);

    // ================= EDIT =================
                console.log("139 , AddReminderScreen.js , finalRepeat : ", finalRepeat);

    if (editReminder && editReminder._id) {

      const updatedData = {
        name,
        time: reminderTimesArray[0],
        times: reminderTimesArray,

        scheduleType: scheduleType?.toUpperCase(),   // ✅ fallback
        date: finalDate || null,
        monthlyDay: finalMonthlyDay || null,
        repeat: finalRepeat || "",               // ✅ important
      };


            console.log("153 , AddReminderScreen.js , updatedData : ", updatedData);

      //updateReminder(editReminder._id, updatedData);
      updateReminder(new BSON.ObjectId(editReminder._id), updatedData);

      handleSchedule(
        editReminder._id.toString(),
        name,
        {
          times: reminderTimesArray,
          days: finalRepeat ? finalRepeat.split(",") : [],
          monthlyDay: finalMonthlyDay,
          date: finalDate
        }
      );

      Alert.alert("Success", "Reminder updated successfully");
      onSaved && onSaved();
      return;
    }
    // ================= ADD =================
    if (count >= 5) {
      Alert.alert("Limit Reached", "Max 5 reminders allowed per day");
      return;
    }

    const reminder = {
      _id: new BSON.ObjectId(),
      type: "Other",
      name,

      times: reminderTimesArray,
      time: normalizeTime(reminderTimesArray[0]), // fallback only

      scheduleType,

      date: finalDate,
      monthlyDay: finalMonthlyDay,
      repeat: finalRepeat,

      enabled: true,
      taken: false,
      createdAt: new Date()
    };

      console.log("195 , AddReminderScreen.js , reminder : ", reminder);

      const success = addReminder(reminder);

    if (success) {

      // handleSchedule(
      //   reminder._id.toString(),
      //   reminder.name,
      //   {
      //     times: reminderTimesArray,
      //     days,
      //     monthlyDay,
      //     date
      //   }
      // );

      handleSchedule(
        reminder._id.toString(),
        reminder.name,
        {
          times: reminderTimesArray,
          days: finalRepeat ? finalRepeat.split(",") : [],
          monthlyDay: finalMonthlyDay,
          date: finalDate
        }
      );

      Alert.alert("Success", "Reminder saved successfully");
      onSaved && onSaved();

    } else {
      Alert.alert("Error", "Failed to save reminder");
    }
  };

  // ================= SAVE new=================
  const saveReminder1 = () => {

    console.log("162 , AddReminderScreen.js , date : ", date, " , reminderTimesArray : ", reminderTimesArray, " , days : ", days);
    // ONE-TIME / DAILY
    if (!validateTodayOnly(date, reminderTimesArray)) {
      Alert.alert("Invalid", "Please select future time for today");
      return;
    }

    // WEEKLY
    if (days.length > 0) {
      if (!validateWeeklyTodayOnly(days, reminderTimesArray)) {
        Alert.alert("Invalid", "Today's selected time is already passed");
        return;
      }
    }

    let scheduleType = "daily";
    let finalDate = null;
    let finalMonthlyDay = null;
    let finalRepeat = "";

    if (days && days.length > 0) {
      if (days.length === 7) {
        scheduleType = "daily";
        finalRepeat = "Mon,Tue,Wed,Thu,Fri,Sat,Sun";
      } else {
        scheduleType = "weekly";
        finalRepeat = days.join(",");
      }
    }
    else if (monthlyDay) {
      scheduleType = "monthly";
      finalMonthlyDay = monthlyDay;
    }
    else if (date) {
      scheduleType = "once";
      finalDate = new Date(date);
    }

    if (!name.trim()) {
      Alert.alert("Validation", "Please enter a reminder name");
      return;
    }

    if (!reminderTimesArray || reminderTimesArray.length === 0) {
      Alert.alert("Validation", "Please select at least one time");
      return;
    }

    const reminderDate = date ? new Date(date) : new Date();
    const count = getRemindersCountByDate(reminderDate);

    // ================= EDIT =================
                console.log("139 , AddReminderScreen.js , finalRepeat : ", finalRepeat);

    if (editReminder && editReminder._id) {

      const updatedData = {
        name,
        time: reminderTimesArray[0],
        times: reminderTimesArray,

        scheduleType: scheduleType?.toUpperCase(),   // ✅ fallback
        date: finalDate || null,
        monthlyDay: finalMonthlyDay || null,
        repeat: finalRepeat || "",               // ✅ important
      };


            console.log("153 , AddReminderScreen.js , updatedData : ", updatedData);

      //updateReminder(editReminder._id, updatedData);
      updateReminder(new BSON.ObjectId(editReminder._id), updatedData);

      handleSchedule(
        editReminder._id.toString(),
        name,
        {
          times: reminderTimesArray,
          days: finalRepeat ? finalRepeat.split(",") : [],
          monthlyDay: finalMonthlyDay,
          date: finalDate
        }
      );

      Alert.alert("Success", "Reminder updated successfully");
      onSaved && onSaved();
      return;
    }
    // ================= ADD =================
    if (count >= 5) {
      Alert.alert("Limit Reached", "Max 5 reminders allowed per day");
      return;
    }

    const reminder = {
      _id: new BSON.ObjectId(),
      type: "Other",
      name,

      times: reminderTimesArray,
      time: normalizeTime(reminderTimesArray[0]), // fallback only

      scheduleType,

      date: finalDate,
      monthlyDay: finalMonthlyDay,
      repeat: finalRepeat,

      enabled: true,
      taken: false,
      createdAt: new Date()
    };

      console.log("195 , AddReminderScreen.js , reminder : ", reminder);

      const success = addReminder(reminder);

    if (success) {

      // handleSchedule(
      //   reminder._id.toString(),
      //   reminder.name,
      //   {
      //     times: reminderTimesArray,
      //     days,
      //     monthlyDay,
      //     date
      //   }
      // );

      handleSchedule(
        reminder._id.toString(),
        reminder.name,
        {
          times: reminderTimesArray,
          days: finalRepeat ? finalRepeat.split(",") : [],
          monthlyDay: finalMonthlyDay,
          date: finalDate
        }
      );

      Alert.alert("Success", "Reminder saved successfully");
      onSaved && onSaved();

    } else {
      Alert.alert("Error", "Failed to save reminder");
    }
  };
  // ================= SCHEDULER =================
  const handleSchedule = (id, name, { times = [], days = [], monthlyDay = null, date = null }) => {

    if (!times || times.length === 0) return;

    // ✅ ONE-TIME
    if (date) {
      times.forEach(t => {
        let scheduledDateTime = new Date(date);
        scheduledDateTime.setHours(t.getHours(), t.getMinutes(), 0, 0);

        scheduleNotification(id, name, scheduledDateTime);
      });
      return;
    }

    // ✅ MONTHLY
    if (monthlyDay) {
      times.forEach(t => {
        let scheduledDate = new Date();

        scheduledDate.setDate(monthlyDay);
        scheduledDate.setHours(t.getHours(), t.getMinutes(), 0, 0);

        if (scheduledDate <= new Date()) {
          scheduledDate.setMonth(scheduledDate.getMonth() + 1);
        }

        scheduleNotification(id, name, scheduledDate);
      });
      return;
    }

    // ✅ WEEKLY
    if (days && days.length > 0) {
      const dayMap = { Sun:0, Mon:1, Tue:2, Wed:3, Thu:4, Fri:5, Sat:6 };

      days.forEach(day => {
        const targetDay = dayMap[day];

        times.forEach(t => {
          let nextDate = new Date();

          while (nextDate.getDay() !== targetDay) {
            nextDate.setDate(nextDate.getDate() + 1);
          }

          nextDate.setHours(t.getHours(), t.getMinutes(), 0, 0);

          if (nextDate <= new Date()) {
            nextDate.setDate(nextDate.getDate() + 7);
          }

          scheduleNotification(id, name, nextDate);
        });
      });

      return;
    }

    // ✅ DAILY
    times.forEach(t => {
      let scheduled = new Date();

      scheduled.setHours(t.getHours(), t.getMinutes(), 0, 0);

      if (scheduled <= new Date()) {
        scheduled.setDate(scheduled.getDate() + 1);
      }

      scheduleNotification(id, name, scheduled);
    });
  };

  // ================= UI =================
  return (
    <View style={{ padding: 20 }}>

      {/* NAME */}
      <TextInput
        placeholder="Reminder Name"
        value={name}
        onChangeText={setName}
        style={{ marginBottom: 15, borderWidth: 1, padding: 10, borderRadius: 5 }}
      />

        {/* TIME */}

      <View style={{ marginVertical: 10, flexDirection: "column" }}>
        <Text style={{ fontWeight: "bold" }}>Times : </Text>
        <View style={{ marginVertical: 10, flexDirection: "row" }}>

          {reminderTimesArray.map((t, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", alignItems: "center", marginVertical: 0, marginRight: 10 }}
            >
              {/* Make the time itself clickable */}
              <TouchableOpacity
                onPress={() => {
                  setEditingIndex(index);   // store which slot to edit
                  setShowTimePicker(true);  // open picker
                }}
                style={{width: 45, height:45, color: "#7761f6" }}
              >
                <Text style={{ fontSize: 16, color: "#000000" }}>
                  {t.toLocaleTimeString()}
                </Text>
              </TouchableOpacity>

              {/* Remove button */}
              <TouchableOpacity
                onPress={() => {
                  const newTimes = [...reminderTimesArray];
                  newTimes.splice(index, 1);
                  setReminderTimesArray(newTimes);
                }}
              >
                <MaterialIcons name="close" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}
          {/* TIME */}
          <TouchableOpacity onPress={() => setShowTimePicker(true)} style={{ marginBottom: 15 }}>
            <MaterialIcons name="access-time" size={24} color="blue" />
          </TouchableOpacity>
        </View>

      </View>

      {showTimePicker && (
        <DateTimePicker
          value={time || new Date()}
          mode="time"
          display={Platform.OS === "android" ? "default" : "spinner"}
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (event.type === "set" && selectedTime) {
              const picked = new Date(selectedTime); // ✅ ensure it's a Date object

            if (editingIndex !== null) {
                const newTimes = [...reminderTimesArray];
                newTimes[editingIndex] = picked;
                setReminderTimesArray(newTimes);
                setEditingIndex(null);
              } else {
                if (reminderTimesArray.length >= 5) {
                  Alert.alert("Limit Reached", "You can only add up to 5 times.");
                  return;
                }
                setReminderTimesArray([...reminderTimesArray, picked]);
              }
            } else if (event.type === "dismissed") {
                console.log("Picker dismissed without selection");
              }
            }}
        />
      )}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start",
          marginVertical: 10
        }}>
        <View
          style={{
            width: AppConstant.DEVICE_WIDTH * 0.3,
            height: 2,
            backgroundColor: "#dcdbdb"
          }}/>
          <Text style={{ fontWeight: "bold" }}>  Either  </Text>
        <View
          style={{
            width: AppConstant.DEVICE_WIDTH * 0.3,
            height: 2,
            backgroundColor: "#dcdbdb"
          }}/>
      </View>  

      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 0 }}>
        <Text>Repeat Monthly on Day</Text>
        <TextInput
          placeholder="Day"
          keyboardType="numeric"
          value={monthlyDay ? monthlyDay.toString() : ""}
          onChangeText={(val) => {
            setMonthlyDay(parseInt(val));
            setDate(null);
            setDays([]); // ❗ clear repeat
          }
          }
          style={{ marginLeft: 10, borderWidth: 1, padding: 5, width: 50 }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start",
          marginVertical: 10
        }}>
        <View
          style={{
            width: AppConstant.DEVICE_WIDTH * 0.3,
            height: 2,
            backgroundColor: "#dcdbdb"
          }}/>
          <Text style={{ fontWeight: "bold" }}>  or  </Text>
        <View
          style={{
            width: AppConstant.DEVICE_WIDTH * 0.3,
            height: 2,
            backgroundColor: "#dcdbdb"
          }}/>
      </View>  


      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>

        <Text style={{ fontWeight: "bold" }}>Date : </Text>

        {/* DATE */}
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ marginBottom: 0 }}>
          {date ? (
            <Text style={{ fontSize: 16, color: "#000" }}>
              {date.toDateString()}
            </Text>
          ):(
            <MaterialIcons name="calendar-month" size={24} color="black" /> 
          )
        }
        </TouchableOpacity>
      </View>  

      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (event.type === "set" && selectedDate) {
              setDate(selectedDate);
              setDays([]); // ❗ clear repeat
              setMonthlyDay(0);
            }
          }}
        />
      )}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "start",
          marginVertical: 10
        }}>
        <View
          style={{
            width: AppConstant.DEVICE_WIDTH * 0.3,
            height: 2,
            backgroundColor: "#dcdbdb"
          }}/>
            <Text style={{ fontWeight: "bold" }}>  or  </Text>
        <View
          style={{
            width: AppConstant.DEVICE_WIDTH * 0.3,
            height: 2,
            backgroundColor: "#dcdbdb"
          }}/>
      </View>  

      {/* DAILY BUTTON */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10
        }}
      >
        <Text>Repeat Daily</Text>

        <Switch
          value={isDaily}
          onValueChange={(value) => {
            setIsDaily(value);
            setMonthlyDay(0);
            if (value) {
              // ON → set all days, clear date
              setDays(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
              setDate(null);
            } else {
              // OFF → clear days
              setDays([]);
            }
          }}
          trackColor={{ false: "#ccc", true: "#1E6AE1" }}
          thumbColor={isDaily ? "#fff" : "#f4f3f4"}
        />
      </View>

      {/* DAY SELECTOR */}
      <DaySelector
        key={days.join(",")}
        selectedDays={days}
        disabled={isDaily} 
        onChange={(selected) => {
          console.log("Selected days:", selected);

          setDays(selected);
          setDate(null);
          setDate(null);
          setMonthlyDay(0);

          // ✅ If user selects specific days → ALWAYS NOT daily
          if (selected.length > 0 && selected.length < 7) {
            setIsDaily(false);
          }

          // ✅ If all 7 days selected → treat as daily
          if (selected.length === 7) {
            setIsDaily(true);
          }

          // ✅ If no days → also not daily
          if (selected.length === 0) {
            setIsDaily(false);
          }

        }}
      />

      {/* STATUS TEXT */}
      <Text style={{ marginVertical: 10, color: "#666" }}>
        {date
          ? "One-time reminder"
          : days.length > 0
            ? "Repeats on selected days"
            : "Daily reminder"}
      </Text>

      {/* SAVE */}
      <Button
        title={editReminder && editReminder._id ? "Update Reminder" : "Save Reminder"}
        onPress={saveReminder}
      />

    </View>
  );
}