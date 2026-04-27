import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Switch
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";

// ===== IMPORT YOUR REUSABLE TOP APP BAR =====
import TopAppBar from "../../components/layout/TopAppBar"; // change path if needed
import {
  markReminderTaken,
  deleteReminder,
  deleteMedicineReminders,
  duplicateReminder,
  updateReminder,
  getAllReminders,
  getRemindersByTypeAndDate
} from "../../database/services/reminderService";
import { getDataReminders } from "../../database/services/reminderService";
import BottomDrawerDyn from "../../components/bottomDrawer/BottomDrawerDyn"
import AddReminderScreen from "./AddReminderScreen";

import AppConstant from "../../../src/Helper/Constant"

export default function ReminderScreen({ navigation }) {

  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  //const [activeTab, setActiveTab] = useState(false);
  const [activeTab, setActiveTab] = useState("Other");
  const [filterData, setfilterData] = useState("All");
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [DataReminders, setDataReminders] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [checkedItems, setCheckedItems] = useState({
    addReminder: false,
    deleteAll: false
  });
  const medicines = [
    { id: "1", medicine: "Paracetamol", time: "08:00 AM" },
    { id: "2", medicine: "Vitamin C", time: "09:00 PM" }
  ];

  const others = [
    { id: "1", medicine: "Drink Water", time: "10:00 AM" },
    { id: "2", medicine: "Walk 10 Minutes", time: "06:00 PM" }
  ];

  const data = activeTab === "medicines" ? DataReminders : others;

  const dummyReminders = [
    {
      _id: "1",
      name: "Paracetamol 500mg",
      time: new Date(new Date().setHours(8, 0, 0, 0)),
      taken: false,
      enabled: true,
      medicineId: "m1"
    },
    {
      _id: "2",
      name: "Vitamin C",
      time: new Date(new Date().setHours(13, 0, 0, 0)),
      taken: false,
      enabled: true,
      medicineId: "m2"
    },
    {
      _id: "3",
      name: "Calcium Tablet",
      time: new Date(new Date().setHours(21, 0, 0, 0)),
      taken: false,
      enabled: true,
      medicineId: "m3"
    }
  ];

  const formatTime = (date) =>
  new Date(date).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit"
  });
  //-------------------------
  const getScheduleLabel = (item) => {

    console.log("97 , ReminderScreen.js , item : ", item.scheduleType);

    if (item.date) {
      return `📅 ${new Date(item.date).toLocaleDateString("en-IN")}`;
    }

    if (item.monthlyDay) {
      return `📆 Every month on day ${item.monthlyDay}`;
    }

    if (item.repeat && item.repeat.trim().length > 0) {
      const days = item.repeat.split(",");
      if (days.length === 7) return "🔁 Daily";
      return `🔁 ${days.join(", ")}`;
    }

    return "🔁 Daily";
  };
  //---------------
  const getScheduleLabel2 = (item) => {

    // ✅ ONE-TIME
    if (item.date) {
      return `📅 ${new Date(item.date).toLocaleDateString("en-IN")}`;
    }

    // ✅ MONTHLY
    if (item.monthlyDay) {
      return `📆 Every month on day ${item.monthlyDay}`;
    }

    // ✅ WEEKLY / DAILY
    if (item.repeat) {

      const days = item.repeat.split(",");

      // DAILY (all 7 days)
      if (days.length === 7) {
        return "🔁 Daily";
      }

      return `🔁 ${days.join(", ")}`;
    }

    return "🔁 Daily"; // fallback
  };
  //----------------------------
  const getScheduleLabel1 = (item) => {
    switch (item.scheduleType) {
      case "ONCE":
        return item.date
          ? `On ${new Date(item.date).toDateString()}`
          : "One-time";

      case "DAILY":
        return "Daily";

      case "WEEKLY":
        return item.repeat
          ? `Weekly (${item.repeat})`
          : "Weekly";

      case "MONTHLY":
        return item.monthlyDay
          ? `Monthly (Day ${item.monthlyDay})`
          : "Monthly";

      default:
        return "";
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "DAILY": return "repeat";
      case "WEEKLY": return "view-week";
      case "MONTHLY": return "date-range";
      case "ONCE": return "event";
      default: return "notifications";
    }
  };

  //------------------------------
    useEffect(() => {
      setDrawerVisible(false);
      loadReminders();
    }, [activeTab, filterData]);
  //------------------------------
  useFocusEffect(
    useCallback(() => {
      loadReminders();
      setDrawerVisible(false);
    }, [])
  );
  //------------------------
  const loadReminders = () => {
    // const realmResults = getDataReminders(); // Realm.Results

    // console.log("98 , Plain realmResults:", realmResults);

    // const allReminders = getAllReminders();
    // console.log("All reminders in Realm : ", getAllReminders());

    const reminders = getRemindersByTypeAndDate(activeTab, filterData);

    // const plainData = allReminders.map(r => ({
    //   id: r._id.toString(),
    //   name: r.name,
    //   date: r.date ? r.date.toISOString() : null,
    //   time: r.time ? r.time.toISOString() : null,
    //   repeat: r.repeat,
    //   enabled: r.enabled,
    //   taken: r.taken,
    //   createdAt: r.createdAt.toISOString(),
    // }));

    // console.log("113 , Plain reminders:", plainData);

    // // Convert Realm objects to plain JS objects
    // const data = realmResults.map(r => ({
    //   _id: r._id.toString(),
    //   name: r.name,
    //   time: r.time,
    //   date: r.date,
    //   type: r.type || "Other",
    //   repeat: r.repeat || "",
    //   enabled: r.enabled,
    //   taken: r.taken,
    //   createdAt: r.createdAt,
    //   medicineId: r.medicineId || null
    // }));

    console.log("180 , ReminderScreen.js , ===== reminders : ", reminders);

    if (reminders.length === 0) {
      setDataReminders([]);
      setSelectedReminder(null);
    } else {
      setDataReminders(reminders);
      setSelectedReminder(reminders[0]);
    }
  };
  //-------------------------------
  const handleDelete = (item) => {

    Alert.alert(
      "Delete Reminder",
      `Delete "${item.name}" ?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            //deleteReminder(item._id);
            deleteReminder(new BSON.ObjectId(item._id));
            loadReminders(); // refresh list
          }
        }
      ]
    );

  };
  //---------------------------------
    const renderItem = ({ item }) => {

      // console.log("241 , ReminderScreen.js , item : ", item);
      const times = item.times || [];

      return (
        <View style={styles.card}>
          <View style={{ flexDirection: isRTL ? "row-reverse" : "row" }}>

            <View style={{ flex: 1 }}>

              {/* HEADER */}
              <View style={styles.cardHeader}>
                <Text style={[styles.name, { textAlign: isRTL ? "right" : "left" }]}>
                  {item.name}
                </Text>

                <TouchableOpacity
                  onPress={() => handleDelete(item)}
                  style={styles.deleteIconBtn}
                >
                  <MaterialIcons name="delete-outline" size={22} color="#E53935" />
                </TouchableOpacity>
              </View>

              {/* ⏰ TIMES (Better UI Chips) */}
              <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 8 }}>
                {times.map((t, index) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: "#E3F2FD",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 8,
                      marginRight: 8,
                      marginBottom: 6
                    }}
                  >
                    <Text style={{ fontSize: 13, color: "#1976D2" }}>
                      {formatTime(t)}
                    </Text>
                  </View>
                ))}
              </View>

              {/* 📅 SCHEDULE */}
              <Text style={{ marginTop: 6, fontSize: 13, color: "#666" }}>
                {getScheduleLabel(item)}
              </Text>

              {/* ENABLE */}
              <View
                style={{
                  flexDirection: isRTL ? "row-reverse" : "row",
                  alignItems: "center",
                  marginTop: 10
                }}
              >
                <Text style={{ marginRight: 15 }}>Enabled</Text>

                <Switch
                  value={item.enabled}
                  onValueChange={(value) => {
                    updateReminder(item._id, { enabled: value });
                    loadReminders();
                  }}
                  trackColor={{ false: "#ccc", true: "#1E6AE1" }}
                  thumbColor={item.enabled ? "#fff" : "#f4f3f4"}
                />
              </View>

              {/* TAKEN */}
              {activeTab === "Medicine" && (
                <Text style={{ marginTop: 6 }}>
                  Taken: {item.taken ? "Yes" : "No"}
                </Text>
              )}

            </View>

            {/* EDIT */}
            <TouchableOpacity
              style={styles.editIconBtn}
              onPress={() => {
                setSelectedReminder(item);
                setDrawerVisible(true);
              }}
            >
              <MaterialIcons name="edit-notifications" size={24} color="#1976D2" />
            </TouchableOpacity>

          </View>
        </View>
      );
    };  
    //------------------
    const renderItem1 = ({ item }) => (
    <View style={[styles.card, { flexDirection: "column" }]}>

      <View style={{ flexDirection: isRTL ? "row-reverse" : "row" }}>

        <View style={{ flex: 1 }}>

          {/* HEADER */}
          <View style={styles.cardHeader}>
            <Text style={[styles.name, { textAlign: isRTL ? "right" : "left" }]}>
              {item.name}
            </Text>

            <TouchableOpacity
              onPress={() => handleDelete(item)}
              style={styles.deleteIconBtn}
            >
              <MaterialIcons name="delete-outline" size={22} color="#E53935" />
            </TouchableOpacity>
          </View>

          {/* ⏰ MULTIPLE TIMES (CHIPS UI) */}
          <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 6 }}>
            {item.times?.map((t, i) => (
              <View
                key={i}
                style={{
                  backgroundColor: "#E3F2FD",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 6,
                  marginRight: 6,
                  marginBottom: 4
                }}
              >
                <Text style={{ fontSize: 12, color: "#1976D2" }}>
                  {formatTime(t)}
                </Text>
              </View>
            ))}
          </View>

          {/* 📅 SCHEDULE TYPE */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 6
            }}
          >
            <MaterialIcons
              name={getIcon(item.scheduleType)}
              size={16}
              color="#666"
              style={{ marginRight: 5 }}
            />

            <Text style={{ fontSize: 13, color: "#666" }}>
              {getScheduleLabel(item)}
            </Text>
          </View>

          {/* ENABLE SWITCH */}
          <View
            style={{
              flexDirection: isRTL ? "row-reverse" : "row",
              alignItems: "center",
              marginTop: 8
            }}
          >
            <Text style={{ marginRight: 15 }}>
              Enabled
            </Text>

            <Switch
              value={item.enabled}
              onValueChange={(value) => {
                updateReminder(item._id, { enabled: value });
                loadReminders();
              }}
              trackColor={{ false: "#ccc", true: "#1E6AE1" }}
              thumbColor={item.enabled ? "#fff" : "#f4f3f4"}
            />
          </View>

          {/* TAKEN STATUS */}
          {activeTab === "Medicine" && (
            <Text style={{ marginTop: 6 }}>
              Taken: {item.taken ? "Yes" : "No"}
            </Text>
          )}

        </View>

        {/* ✏️ EDIT BUTTON */}
        <TouchableOpacity
          style={styles.editIconBtn}
          onPress={() => {
            setSelectedReminder(item);
            setDrawerVisible(true);
          }}
        >
          <MaterialIcons name="edit-notifications" size={24} color="#1976D2" />
        </TouchableOpacity>

      </View>
    </View>
  );

////////----------////////////////////////--//////////////////////////
  return (

    <View style={styles.container}>

      {/* ================= REUSABLE TOP APP BAR ================= */}
      <TopAppBar
        title={t("reminder.title")}
        showBack={false}
        onBackPress={() => navigation.goBack()}
        rightIcons={[
          {
            icon: "dots-vertical",
            onPress: () => {
              //setSelectedReminder(item);
              setMenuVisible(true);
            }
          }
        ]}
      />

        <View style={styles.tabsContainer}>

            {/* MEDICINE TAB */}
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "Medicine" && styles.activeTab
              ]}
              onPress={() => setActiveTab("Medicine")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "Medicine" && styles.activeTabText
                ]}
              >
                Medicines
              </Text>
            </TouchableOpacity>

            {/* OTHER TAB */}
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === "Other" && styles.activeTab
              ]}
              onPress={() => setActiveTab("Other")}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === "Other" && styles.activeTabText
                ]}
              >
                Other
              </Text>
            </TouchableOpacity>

          </View>

      {menuVisible && selectedReminder && (

        <TouchableOpacity
          style={styles.menuOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >

          <View style={styles.menuBox}>

            {/* MARK AS TAKEN */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                markReminderTaken(selectedReminder._id);
                setMenuVisible(false);
              }}
            >
              <Text style={styles.menuText}>Mark as Taken</Text>

              <MaterialIcons
                name={selectedReminder.taken ? "check-box" : "check-box-outline-blank"}
                size={22}
                color={selectedReminder.taken ? "#1E6AE1" : "#999"}
              />
            </TouchableOpacity>

            {/* ENABLE / DISABLE */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                updateReminder(selectedReminder._id, {
                  enabled: !selectedReminder.enabled
                });
                setMenuVisible(false);
              }}
            >
              <Text style={styles.menuText}>
                {selectedReminder.enabled ? "Disable Reminder" : "Enable Reminder"}
              </Text>

              <MaterialIcons
                name={selectedReminder.enabled ? "toggle-on" : "toggle-off"}
                size={24}
                color="#1E6AE1"
              />
            </TouchableOpacity>

            {/* DUPLICATE */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                duplicateReminder(selectedReminder);
                setMenuVisible(false);
              }}
            >
              <Text style={styles.menuText}>Duplicate Reminder</Text>

              <MaterialIcons name="content-copy" size={22} color="#999" />
            </TouchableOpacity>

            {/* DELETE ONE */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                deleteReminder(selectedReminder._id);
                setMenuVisible(false);
              }}
            >
              <Text style={[styles.menuText, { color: "#E53935" }]}>
                Delete Reminder
              </Text>

              <MaterialIcons name="delete-outline" size={22} color="#E53935" />
            </TouchableOpacity>

            {/* DELETE ALL (same medicine) */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                deleteMedicineReminders(selectedReminder.medicineId);
                setMenuVisible(false);
              }}
            >
              <Text style={[styles.menuText, { color: "#E53935" }]}>
                Delete All Reminders
              </Text>

              <MaterialIcons name="delete-sweep" size={22} color="#E53935" />
            </TouchableOpacity>

          </View>

        </TouchableOpacity>

      )}
      {/* ================= LIST ================= */}
      {DataReminders.length === 0 ? (

        <View style={styles.emptyContainer}>
          <MaterialIcons name="notifications-off" size={60} color="#bbb" />
          <Text style={styles.emptyText}>There are no reminders</Text>
        </View>

      ) : (

          <FlatList
            key={activeTab}
            data={DataReminders}
            keyExtractor={(item) => item._id.toString()}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 20 }}
          />

      )}

      {/* ================= FAB ================= */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          setSelectedReminder([]);
          setDrawerVisible(true)
        }
        }
      >

        <MaterialIcons name="notification-add" size={28} color="#fff" />

      </TouchableOpacity>

      <BottomDrawerDyn
        visible={drawerVisible}
        onClose={() => {
          setDrawerVisible(false);
          setSelectedReminder([]);
        }
      }>
        <AddReminderScreen 
          navigation={navigation} 
          editReminder={selectedReminder}   // 👈 pass selected reminder
          onSaved={() => {
            loadReminders();           // reload list after update
            setDrawerVisible(false);
          }}/>
      </BottomDrawerDyn>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7FB"
  },

  /* ================= TABS ================= */
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 10,
    elevation: 2
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: "#F1F3F7"
  },

  activeTab: {
    backgroundColor: "#1E6AE1"
  },

  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555"
  },

  activeTabText: {
    color: "#fff"
  },

  /* ================= CARD ================= */
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    alignItems: "center",
    elevation: 2
  },

  name: {
    fontSize: 16,
    fontWeight: "600"
  },

  time: {
    color: "#777",
    marginTop: 4
  },

  takeBtn: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8
  },

  takeText: {
    color: "#fff",
    fontWeight: "600"
  },

  /* ================= FAB ================= */
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#1E6AE1",
    alignItems: "center",
    justifyContent: "center",
    elevation: 5
  },

  menuOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
    elevation: 20, // important for Android
  },

  menuBox: {
    position: "absolute",
    top: 70,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 6,
    paddingVertical: 6,
    width: 170
  },

  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  menuText: {
    fontSize: 15,
    color: "#333"
  },
  editIconBtn: {
    position: "absolute",
    bottom: 0,
    right: 10,
    padding: 6,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "94%"
  },
  deleteIconBtn: {
    padding: 2,
    marginLeft: 4
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,   // keeps it above FAB
    width: AppConstant.DEVICE_WIDTH,
    height: AppConstant.DEVICE_HEIGHT * 0.88
  },

  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: "#999",
    fontWeight: "500",
  },

});
