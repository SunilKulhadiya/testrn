import React from "react";
import { Text, StyleSheet } from "react-native";

export default function SectionTitle({ title }) {

  return (
    <Text style={styles.title}>
      {title}
    </Text>
  );

}

const styles = StyleSheet.create({

  title:{
    fontSize:18,
    fontWeight:"600",
    marginVertical:10
  }

});