import React from "react";
import {
  Modal,
  View,
  Text,
  Button
} from "react-native";

export default function ConfirmModal({
  visible,
  message,
  onConfirm,
  onCancel
}){

  return(

    <Modal visible={visible} transparent>

      <View style={{
        flex:1,
        justifyContent:"center",
        backgroundColor:"#0005"
      }}>

        <View style={{
          backgroundColor:"#fff",
          margin:20,
          padding:20,
          borderRadius:10
        }}>

          <Text>{message}</Text>

          <Button title="Confirm" onPress={onConfirm}/>
          <Button title="Cancel" onPress={onCancel}/>

        </View>

      </View>

    </Modal>

  );

}