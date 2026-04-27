import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function TimePickerInput({ time, onPress }) {

  return(

    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >

      <Text style={styles.text}>
        {time.toLocaleTimeString()}
      </Text>

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

  container:{
    borderWidth:1,
    borderColor:"#ddd",
    padding:12,
    borderRadius:8
  },

  text:{
    fontSize:16
  }

});