import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

export default function DaySelector({ selectedDays, onChange }) {

  const toggleDay = (day) => {

    let updated = [...selectedDays];

    if (updated.includes(day)) {
      updated = updated.filter(d => d !== day);
    } else {
      updated.push(day);
    }

    onChange(updated);

  };

  return (

    <View style={styles.container}>

      {days.map(day => (

        <TouchableOpacity
          key={day}
          style={[
            styles.day,
            selectedDays.includes(day) && styles.active
          ]}
          onPress={() => toggleDay(day)}
        >

          <Text style={styles.text}>{day}</Text>

        </TouchableOpacity>

      ))}

    </View>

  );

}

const styles = StyleSheet.create({

  container:{
    flexDirection:"row",
    flexWrap:"wrap",
    marginVertical:10
  },

  day:{
    padding:10,
    borderWidth:1,
    borderRadius:6,
    margin:4
  },

  active:{
    backgroundColor:"#4CAF50"
  },

  text:{
    color:"#000"
  }

});