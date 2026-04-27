import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function IconButton({ icon, onPress }) {

  return (

    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.icon}>{icon}</Text>
    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

  button:{
    padding:10
  },

  icon:{
    fontSize:22
  }

});