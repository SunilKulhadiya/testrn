import React from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";

export default function EmptyState({
  title,
  subtitle
}) {

  return (

    <View style={styles.container}>

      <Text style={styles.icon}>📭</Text>

      <Text style={styles.title}>
        {title}
      </Text>

      {subtitle && (
        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      )}

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },

  icon: {
    fontSize: 48,
    marginBottom: 10
  },

  title: {
    fontSize: 18,
    fontWeight: "600"
  },

  subtitle: {
    marginTop: 6,
    color: "#777",
    textAlign: "center"
  }

});