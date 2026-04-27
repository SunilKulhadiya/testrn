import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from "react-native";

export default function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry
}) {

  return (

    <View style={styles.container}>

      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    marginBottom: 16
  },

  label: {
    marginBottom: 6,
    fontSize: 14,
    color: "#555"
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 8,
    fontSize: 16
  }

});