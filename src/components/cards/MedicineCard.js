import React from "react";
import { View,Text,StyleSheet } from "react-native";

export default function MedicineCard({ medicine }){

  return(

    <View style={styles.card}>

      <Text style={styles.name}>
        {medicine.name}
      </Text>

      <Text>
        {medicine.dosage}
      </Text>

    </View>

  );

}

const styles = StyleSheet.create({

  card:{
    padding:14,
    borderRadius:10,
    backgroundColor:"#fff",
    marginBottom:10,
    elevation:2
  },

  name:{
    fontWeight:"600"
  }

});