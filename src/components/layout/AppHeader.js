import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";

export default function AppHeader({
  title,
  onBack,
  rightComponent
}) {

  return (

    <View style={styles.container}>

      {onBack ? (
        <TouchableOpacity
          style={styles.back}
          onPress={onBack}
        >
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
      ) : (
        <View style={{ width: 40 }} />
      )}

      <Text style={styles.title}>{title}</Text>

      <View style={styles.right}>
        {rightComponent}
      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    elevation: 3
  },

  back: {
    width: 40
  },

  backText: {
    fontSize: 22
  },

  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600"
  },

  right: {
    width: 40,
    alignItems: "flex-end"
  }

});