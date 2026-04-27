import React from "react";
import { TextInput, StyleSheet } from "react-native";

export default function SearchInput({
  value,
  onChangeText
}){

  return(

    <TextInput
      style={styles.input}
      placeholder="Search medicine"
      value={value}
      onChangeText={onChangeText}
    />

  );

}

const styles = StyleSheet.create({

  input:{
    borderWidth:1,
    borderColor:"#ddd",
    borderRadius:8,
    padding:10,
    marginBottom:10
  }

});