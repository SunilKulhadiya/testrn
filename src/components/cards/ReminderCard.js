import React from "react";
import { View, Text, Switch, StyleSheet, TouchableOpacity } from "react-native";

export default function ReminderCard({ reminder, onToggle, onDelete, onEdit }) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.medicine}>{reminder.name}</Text>
        <Text style={styles.time}>
          {new Date(reminder.time).toLocaleTimeString()}
        </Text>
        <Text style={styles.repeat}>
          {reminder.repeat || "No repeat"}
        </Text>
        <Text style={styles.detail}>Type: {reminder.type}</Text>
        <Text style={styles.detail}>Enabled: {reminder.enabled ? "Yes" : "No"}</Text>
        <Text style={styles.detail}>Taken: {reminder.taken ? "Yes" : "No"}</Text>
        <Text style={styles.detail}>
          Created: {new Date(reminder.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.actions}>
        <Switch
          value={reminder.enabled}
          onValueChange={() => onToggle(reminder._id)}
        />

        <TouchableOpacity onPress={() => onEdit(reminder)}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onDelete(reminder._id)}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  medicine: {
    fontSize: 16,
    fontWeight: "bold"
  },
  time: {
    fontSize: 18,
    marginTop: 4
  },
  repeat: {
    color: "#777",
    marginTop: 4
  },
  detail: {
    color: "#555",
    marginTop: 2
  },
  actions: {
    alignItems: "flex-end",
    justifyContent: "center"
  },
  edit: {
    color: "blue",
    marginTop: 10
  },
  delete: {
    color: "red",
    marginTop: 10
  }
});
