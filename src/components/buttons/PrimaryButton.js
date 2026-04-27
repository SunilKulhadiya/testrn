import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator
} from "react-native";

export default function PrimaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  style
}) {

  return (

    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.disabled,
        style
      ]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
    >

      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>
          {title}
        </Text>
      )}

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10
  },

  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  },

  disabled: {
    opacity: 0.5
  }

});